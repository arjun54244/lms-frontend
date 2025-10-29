import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ComponentType } from "react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  trend?: string;
  className?: string;
  onClick?: () => void;
}

export function MetricCard({ title, value, icon: Icon, trend, className, onClick }: MetricCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-gradient-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-primary opacity-10 blur-2xl transition-transform group-hover:scale-110" />
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="mt-2 text-xs text-muted-foreground">{trend}</p>
            )}
          </div>
          <div className="rounded-lg bg-gradient-primary p-3 shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
}
