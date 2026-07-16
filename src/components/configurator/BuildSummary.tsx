"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { AlertCircle, CheckCircle2, Zap, Save, ShoppingCart, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BuildSummary() {
  const { 
    getSubtotal, 
    getEstimatedWattage, 
    getCompatibilityIssues, 
    getProgress,
    clearBuild
  } = useBuilderStore();

  const subtotal = getSubtotal();
  const wattage = getEstimatedWattage();
  const issues = getCompatibilityIssues();
  const { current, total } = getProgress();
  const progressPercent = (current / total) * 100;

  return (
    <div className="flex flex-col h-full bg-black/60 backdrop-blur-md border-l border-white/10 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Build Summary</h2>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Components Selected</span>
          <span className="font-bold">{current} / {total}</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Compatibility Badge */}
      <div className={cn(
        "flex items-start gap-3 p-4 rounded-xl mb-6 border transition-colors",
        issues.length === 0 
          ? "bg-green-500/10 border-green-500/20 text-green-400" 
          : "bg-red-500/10 border-red-500/20 text-red-400"
      )}>
        {issues.length === 0 ? (
          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1">
          <h4 className="font-bold text-sm">
            {issues.length === 0 ? "Fully Compatible" : "Compatibility Issues Found"}
          </h4>
          {issues.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs opacity-80 list-disc list-inside">
              {issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Wattage */}
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Est. Wattage</div>
            <div className="font-bold">{wattage}W</div>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
        <div className="flex justify-between text-sm text-white/60">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-white/60">
          <span>Est. Shipping</span>
          <span>{subtotal > 0 ? "$19.99" : "$0.00"}</span>
        </div>
        <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/10">
          <span>Total</span>
          <span>${(subtotal > 0 ? subtotal + 19.99 : 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        <button 
          onClick={clearBuild}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold">
          <Save className="w-4 h-4" /> Save
        </button>
        <button className="col-span-2 flex items-center justify-center gap-2 h-12 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors text-sm font-bold shadow-lg shadow-white/10">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
