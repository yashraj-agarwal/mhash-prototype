"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import Link from 'next/link';
import { ArrowRight } from "lucide-react";

const settings = { word: "ANVAYA", scrollLength: 2.4, interactive: true, annotations: false };
const family = 'var(--font-sans), Arial, sans-serif';

export default function LandingPage(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div data-demo-scroll data-slipstream-demo tabIndex={0} role="region" aria-label="Anvaya. Scroll to step inside."
      style={{ width: "100%", height: "100%", overflowY: "auto", background: "#fff", containerType: "inline-size", fontFamily: family, WebkitOverflowScrolling: "touch" }}>
      <style>{`
        [data-slipstream-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-slipstream-demo] [data-gp-hint]{display:none;}
        [data-slipstream-demo] [data-gp-enter]{min-height:46px;padding:0 24px;gap:28px;background:#142b22;border:none;border-radius:99px;color:#fff;font-size:14px;font-weight:600;box-shadow:0 4px 14px rgba(20,43,34,0.15);transition:transform .2s,box-shadow .2s,background .2s;}
        [data-slipstream-demo] [data-gp-enter]:hover{background:#176247;box-shadow:0 6px 20px rgba(23,98,71,0.2);transform:translateY(-1px);}
        [data-slipstream-demo] [data-gp-enter]:focus-visible{outline:2px solid #176247;outline-offset:4px;}
        [data-slipstream-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-slipstream-demo] [data-gp-select]{border-color:transparent;border-radius:8px;font-size:12px;color:#626964;}
        [data-sublime-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-sublime-logo]{font-size:22px;font-weight:700;letter-spacing:-.04em;color:#142b22;}
        [data-sublime-category]{font-size:13px;font-weight:500;line-height:1.5;color:#71766f;text-transform:uppercase;letter-spacing:0.1em;}
        [data-sublime-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 40px);margin:0;text-align:center;font-size:14px;font-weight:500;line-height:1.5;letter-spacing:.02em;color:#71766f;}
        [data-sublime-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 40px) 24px auto;margin:0;text-align:center;font-size:18px;font-weight:500;line-height:1.5;color:#142b22;}
        [data-sublime-scroll]{position:absolute;inset:auto 24px 7%;text-align:center;color:#a1a7a4;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;}
        @media(any-pointer:coarse){[data-sublime-scroll]{bottom:13%;}}
        @container(max-width:450px){[data-sublime-category]{max-width:12ch;text-align:right;}[data-sublime-eyebrow]{font-size:12px;}[data-sublime-support]{font-size:16px;}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-sublime-header]{top:18px;}[data-sublime-support]{top:calc(var(--gp-word-bottom,50%) + 16px);}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}[data-sublime-scroll]{display:none;}}
        [data-slipstream-demo] [data-gp-content]{padding:6rem clamp(1.25rem,5cqw,5rem) 8rem;font-family:inherit;}
        [data-slipstream-demo] section,[data-slipstream-demo] [data-gp-caption]{font-family:inherit;}
        [data-slipstream-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(3rem,6svh,5rem);}
        [data-slipstream-copy] h2{max-width:54rem;margin:0;color:inherit;font-size:clamp(2.5rem,2rem + 2.5cqw,4rem);font-weight:500;line-height:1.1;letter-spacing:-0.02em;text-wrap:balance;}
        [data-slipstream-features]{display:grid;width:100%;grid-template-columns:1fr;gap:2rem;}
        [data-slipstream-feature]{border-top:1px solid rgba(251,251,250,.2);padding-top:1.5rem;}
        [data-slipstream-feature] h3{margin:0;color:inherit;font-size:1.25rem;font-weight:600;line-height:1.2;letter-spacing:-0.01em;}
        [data-slipstream-feature] p{margin:.75rem 0 0;color:rgba(251,251,250,.8);font-size:1rem;font-weight:400;line-height:1.6;}
        [data-slipstream-no]{display:inline-block;margin-right:1rem;color:rgba(251,251,250,.6);font:600 .85rem var(--font-sans);letter-spacing:.05em;transform:translateY(-.1em);}
        @container(min-width:768px){[data-slipstream-features]{grid-template-columns:repeat(3,minmax(0,1fr));gap:4rem;}}
      `}</style>
      
      {mounted ? (
        <GlyphPortal 
          word={s.word} 
          fontFamily={family} 
          fontWeight={700} 
          style={{ fontFamily: family }} 
          scrollLength={s.scrollLength} 
          interactive={s.interactive} 
          annotations={s.annotations} 
          enterLabel="Enter Platform"
          background={
            <div style={{ position: "absolute", inset: 0, overflow: 'hidden' }}>
              <div style={{ position: "absolute", inset: 0, backgroundColor: '#0c1212' }} />
              <img 
                src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80" 
                alt="Architecture" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, mixBlendMode: 'luminosity' }}
              />
              <div style={{ position: "absolute", inset: 0, background: 'linear-gradient(135deg, rgba(12,18,18,0.9) 0%, rgba(20,43,34,0.95) 100%)' }} />
            </div>
          }
          front={
            <>
              <div data-sublime-header>
                <span data-sublime-logo>ANVAYA</span>
                <span data-sublime-category>Post-Award Intelligence</span>
              </div>
              <p data-sublime-eyebrow>Deterministic gap analysis starts here.</p>
              <p data-sublime-support>Follow the facts.</p>
              <span data-sublime-scroll>Scroll to enter</span>
            </>
          }
        >
          <div data-slipstream-copy>
            <h2>Intelligence that prevents public infrastructure failure.</h2>
            <div data-slipstream-features>
              <div data-slipstream-feature>
                <h3><span data-slipstream-no>01</span>Extract Facts</h3>
                <p>Anvaya automatically parses contracts, bills, and reports to establish the ground truth of what was promised versus what is being delivered.</p>
              </div>
              <div data-slipstream-feature>
                <h3><span data-slipstream-no>02</span>Detect Variations</h3>
                <p>Our deterministic engine compares the facts and flags material variations in cost, schedule, and quality immediately.</p>
              </div>
              <div data-slipstream-feature>
                <h3><span data-slipstream-no>03</span>Analyze Evidence</h3>
                <p>Missing a variation order or quality certificate? Anvaya finds the gaps before they become systemic risks.</p>
              </div>
            </div>
            
            <div className="mt-16 flex justify-center w-full">
              <Link href="/command-center" className="inline-flex items-center justify-center gap-3 px-12 py-4 bg-white text-[#142b22] font-semibold rounded-full hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl">
                Enter Command Center
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </GlyphPortal>
      ) : (
        <div role="status" style={{ height: "100%", display: "grid", placeItems: "center", color: "#a1a7a4", fontSize: 13, fontWeight: 500 }}>
          Loading...
        </div>
      )}
    </div>
  );
}
