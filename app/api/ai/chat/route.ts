import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are ANVAYA, an advanced Post-Award Intelligence System for public infrastructure projects.
Your role is to assist government officials, auditors, and engineers in tracking project drift, material variations, schedule delays, and evidence gaps.

TONE & PERSONALITY:
- Analytical, highly concise, objective. 
- Use Bloomberg-terminal style information density.
- Do not use generic AI filler ("I'd be happy to help", "As an AI").
- State facts directly. 

CONTEXT AWARENESS:
- You may receive context about the current project the user is viewing. Use it to inform your answers.
- The user is viewing a dashboard for Indian public infrastructure projects.

FORMATTING:
- Use bullet points for data.
- Keep paragraphs to 1-2 sentences.
- Emphasize critical deviations (Cost, Schedule, Material).`;

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Return a simulated stream for UI demonstration when API key is missing
      const encoder = new TextEncoder();
      const mockStream = new ReadableStream({
        async start(controller) {
          const text = "SYSTEM NOTE: GROQ_API_KEY is not configured in .env.local. This is a simulated response.\n\nBased on the current project data, there are several material variations detected. I recommend checking the Intelligence Network for gaps in the evidence.";
          const words = text.split(" ");
          
          for (let i = 0; i < words.length; i++) {
            const chunk = JSON.stringify({
              choices: [{ delta: { content: words[i] + (i < words.length - 1 ? " " : "") } }]
            });
            controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
            await new Promise(r => setTimeout(r, 50));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      });
      
      return new Response(mockStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Prepare messages array
    const systemMessage = {
      role: 'system',
      content: `${SYSTEM_PROMPT}\n\nCURRENT UI CONTEXT:\n${context || 'No specific project context active.'}`
    };

    const payload = {
      model: 'openai/gpt-oss-120b',
      messages: [systemMessage, ...messages],
      temperature: 0.1,
      stream: true,
    };

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    // Proxy the SSE stream directly to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
