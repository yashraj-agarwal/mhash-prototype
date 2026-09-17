import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPersona, SESSION_COOKIE } from '@/lib/auth/personas';
import { buildIntelligenceContext } from '@/lib/intelligence/context';

const SYSTEM_PROMPT = `You are ANVAYA, the post-award intelligence copilot for public works.
You answer from GRAPH OBJECTS supplied in context: projects, award snapshots, parties, change events, evidence, review cases, and contractor concentration.
Treat every change as a variation that may be legitimate. Use the words alignment, variation, needs explanation, needs evidence, intervene.
Do not invent documents, amounts, parties, or dates that are not in the context.
If memory notes are present, use them as continuing officer intent.

TONE: analytical, concise, no filler.
FORMAT: short bullets for facts; 1-2 sentence implications.`;

export async function POST(req: Request) {
  try {
    const jar = await cookies();
    if (!getPersona(jar.get(SESSION_COOKIE)?.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, pathname, memory, officer } = await req.json();
    const graphContext = buildIntelligenceContext(typeof pathname === 'string' ? pathname : '/');
    const memoryBlock = Array.isArray(memory) && memory.length
      ? memory.map((note: string) => `- ${note}`).join('\n')
      : 'none yet';

    const systemMessage = {
      role: 'system',
      content: `${SYSTEM_PROMPT}

OFFICER: ${officer || 'unknown'}
SESSION MEMORY:
${memoryBlock}

GRAPH CONTEXT:
${graphContext}`,
    };

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      const lastUser = [...(messages || [])].reverse().find((m: { role: string }) => m.role === 'user');
      const text = simulateFromGraph(graphContext, lastUser?.content || '');
      const encoder = new TextEncoder();
      const mockStream = new ReadableStream({
        async start(controller) {
          const words = text.split(' ');
          for (let i = 0; i < words.length; i++) {
            const chunk = JSON.stringify({
              choices: [{ delta: { content: words[i] + (i < words.length - 1 ? ' ' : '') } }],
            });
            controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
            await new Promise((r) => setTimeout(r, 18));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });

      return new Response(mockStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const payload = {
      model: 'openai/gpt-oss-120b',
      messages: [systemMessage, ...(messages || [])],
      temperature: 0.1,
      stream: true,
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 },
    );
  }
}

function simulateFromGraph(graphContext: string, question: string) {
  const active = graphContext.includes('ACTIVE PROJECT FILE: none')
    ? null
    : graphContext.split('ACTIVE PROJECT FILE:\n')[1]?.split('\n\n')[0];
  if (active) {
    const first = active.split('\n')[0];
    return `${first}\n\nFrom the graph on this file:\n- Award vs later facts are both on the same project object.\n- Material change events and evidence gaps are already attached to the review case.\n- Recommended action stays request evidence until a variation order or lab report is committed.\n\nQuestion received: ${question || 'general alignment'}.`;
  }
  return `Queue view.\n\nHighest-priority files are listed in GRAPH CONTEXT. Repeated contractors appear under CONTRACTOR CONCENTRATION. Open a project file to compare the award snapshot with later facts.\n\nQuestion received: ${question || 'general rollup'}.`;
}
