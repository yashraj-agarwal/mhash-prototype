"use client";
import { ReviewCase } from "@/types";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function CaseBrief({ reviewCase }: { reviewCase: ReviewCase }) {
  const [text, setText] = useState("");
  const fullText = `Project NH-42 has materially diverged from its approved baseline across cost, subcontracting, material specification and schedule.

The ₹2.2 Cr cost increase exceeds the configured threshold and no approved Variation Order is currently linked. The material grade (VG-40 to VG-30) and named subcontractor also differ from the award snapshot.

Additional evidence is recommended before escalation.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-border bg-card rounded-3xl p-8 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary/10"></div>
      
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-[13px] font-semibold tracking-tight text-foreground">AI CASE BRIEF</h3>
      </div>
      
      <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed font-medium text-[16px] whitespace-pre-wrap min-h-[160px]">
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-5 bg-primary ml-1 align-middle"
        />
      </div>
    </div>
  );
}
