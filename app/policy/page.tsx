export default function PolicyMatrixPage() {
  return (
    <div className="px-8 md:px-12 pt-10 pb-20 max-w-[1600px] mx-auto space-y-12 min-h-full flex flex-col bg-background">
      <div className="flex items-center justify-between pb-6 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Policy Matrix</h1>
          <p className="text-sm text-muted-foreground mt-1">Materiality thresholds, grace periods, and scoring weights.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center border border-dashed border-border/60 rounded-2xl bg-secondary/10">
        <p className="text-muted-foreground text-sm font-medium">Policy Matrix Configuration (Coming Soon)</p>
      </div>
    </div>
  );
}
