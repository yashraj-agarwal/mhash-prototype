interface Props {
  score: number;
}

export function PriorityScore({ score }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-anvaya-red/10 border border-anvaya-red/30 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.1)]">
      <div className="text-7xl font-light tracking-tight text-anvaya-red">
        {score} <span className="text-3xl text-anvaya-red/50 font-normal">/ 100</span>
      </div>
      <div className="mt-4 text-sm font-bold text-anvaya-red uppercase tracking-widest">
        Priority Score
      </div>
    </div>
  );
}
