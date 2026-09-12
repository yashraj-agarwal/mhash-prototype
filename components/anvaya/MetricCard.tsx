import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  valueClassName?: string;
}

export function MetricCard({ label, value, highlight, valueClassName = "" }: MetricCardProps) {
  return (
    <Card className={highlight ? "border-anvaya-orange/30 bg-anvaya-orange/5" : "bg-card/50"}>
      <CardContent className="p-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className={`mt-3 text-4xl font-light tracking-tight ${highlight ? 'text-anvaya-orange' : 'text-foreground'} ${valueClassName}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
