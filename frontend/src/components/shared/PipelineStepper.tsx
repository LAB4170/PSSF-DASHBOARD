import { cn } from "@/lib/utils";
import { Check, X, Clock } from "lucide-react";

export type PipelineStep = {
  name: string;
  status: "completed" | "active" | "pending" | "exception";
  date?: string;
  tat_days?: number;
};

interface PipelineStepperProps {
  steps: PipelineStep[];
  className?: string;
}

export function PipelineStepper({ steps, className }: PipelineStepperProps) {
  return (
    <div className={cn("flex items-start w-full relative pt-2", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div key={step.name} className={cn("relative flex flex-col items-center", isLast ? "w-10" : "flex-1")}>
            {/* The line connecting nodes */}
            {!isLast && (
              <div 
                className={cn(
                  "absolute top-[11px] left-[50%] right-[-50%] h-[2px] z-0",
                  step.status === "completed" ? "bg-[color:var(--gold)]" : "bg-border"
                )}
              />
            )}
            
            {/* The node */}
            <div 
              className={cn(
                "relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 bg-surface",
                step.status === "completed" ? "border-[color:var(--gold)] bg-[color:var(--gold)]/10 text-[color:var(--gold)]" :
                step.status === "active" ? "border-[color:var(--teal)] bg-[color:var(--teal)]/10 text-[color:var(--teal)] shadow-[0_0_0_4px_rgba(11,127,123,0.15)] animate-pulse" :
                step.status === "exception" ? "border-[color:var(--destructive)] bg-[color:var(--destructive)]/10 text-[color:var(--destructive)]" :
                "border-border text-muted-foreground"
              )}
            >
              {step.status === "completed" && <Check className="w-3.5 h-3.5" />}
              {step.status === "exception" && <X className="w-3.5 h-3.5" />}
              {step.status === "active" && <Clock className="w-3 h-3" />}
              {step.status === "pending" && <div className="w-1.5 h-1.5 rounded-full bg-border" />}
            </div>
            
            {/* Text labels */}
            <div className="mt-2 flex flex-col items-center text-center px-1">
              <span className={cn(
                "text-[10px] sm:text-xs font-semibold leading-tight",
                step.status === "active" ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.name}
              </span>
              {step.date && (
                <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                  {step.date}
                </span>
              )}
              {step.tat_days !== undefined && (
                <span className="text-[9px] font-mono text-muted-foreground mt-0.5">
                  {step.tat_days}d
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
