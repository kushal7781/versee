"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { ComponentCategory } from "@/types/configurator";
import { Cpu, Wind, HardDrive, Monitor, Fan, Battery, Box, Headphones, Keyboard, Mouse, Type } from "lucide-react";
import { cn } from "@/lib/utils";

// Simplified icons for now
const categoryConfig: { id: ComponentCategory; name: string; icon: any }[] = [
  { id: "cpu", name: "Processor (CPU)", icon: Cpu },
  { id: "cooler", name: "CPU Cooler", icon: Wind },
  { id: "motherboard", name: "Motherboard", icon: Box },
  { id: "memory", name: "Memory (RAM)", icon: HardDrive },
  { id: "storage", name: "Storage", icon: HardDrive },
  { id: "gpu", name: "Graphics Card", icon: Monitor },
  { id: "case", name: "Case", icon: Box },
  { id: "psu", name: "Power Supply", icon: Battery },
  { id: "case-fan", name: "Case Fans", icon: Fan },
  { id: "monitor", name: "Monitor", icon: Monitor },
];

export default function CategorySidebar() {
  const { selectedComponents, activeCategory, setActiveCategory } = useBuilderStore();

  return (
    <div className="flex flex-col gap-2 p-4 md:p-6 h-full overflow-y-auto w-full">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      
      {categoryConfig.map((cat) => {
        const selected = selectedComponents[cat.id];
        const isActive = activeCategory === cat.id;

        return (
          <div
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-4 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border border-transparent",
              isActive ? "bg-white/10 border-white/20 shadow-lg shadow-black/50" : "hover:bg-white/5",
              selected ? "bg-white/5" : ""
            )}
          >
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300",
              selected ? "bg-primary text-primary-foreground" : "bg-black/40 text-muted-foreground"
            )}>
              <cat.icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white/90">{cat.name}</h3>
              {selected ? (
                <p className="text-xs text-muted-foreground truncate">{selected.name}</p>
              ) : (
                <p className="text-xs text-white/40">Not selected</p>
              )}
            </div>

            <div className="flex-shrink-0 text-right">
              {selected ? (
                <span className="text-sm font-medium">${selected.price.toFixed(2)}</span>
              ) : (
                <button
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg font-medium transition-colors",
                    isActive ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  Choose
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
