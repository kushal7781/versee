"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { dummyComponents } from "@/data/components";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LivePreview from "./LivePreview";

export default function ProductList() {
  const { activeCategory, selectComponent, selectedComponents } = useBuilderStore();

  if (!activeCategory) {
    return <LivePreview />;
  }

  const products = dummyComponents.filter((c) => c.category === activeCategory);
  const selectedComponentId = selectedComponents[activeCategory]?.id;

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold capitalize">{activeCategory}s</h2>
          <p className="text-sm text-white/50 mt-1">Showing {products.length} compatible options</p>
        </div>
        {/* We can add sort/filter dropdowns here later */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {products.map((product) => {
            const isSelected = selectedComponentId === product.id;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className={cn(
                  "relative group flex flex-col rounded-2xl border bg-black/40 backdrop-blur-md overflow-hidden transition-all duration-300",
                  isSelected ? "border-primary shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "border-white/10 hover:border-white/30 hover:bg-white/5"
                )}
              >
                {/* Image Section */}
                <div className="aspect-square w-full relative bg-white/5 p-6 flex items-center justify-center overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500" 
                  />
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                      <CheckCircle className="w-3 h-3" /> Selected
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="text-xs font-semibold text-white/50 mb-1">{product.brand}</div>
                  <h3 className="text-base font-bold text-white mb-2 line-clamp-2 flex-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Specs Pill */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                      <span key={key} className="text-[10px] uppercase font-bold tracking-wider bg-white/10 text-white/70 px-2 py-1 rounded-md">
                        {value}
                      </span>
                    ))}
                  </div>

                  {/* Action Section */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div>
                      <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                      <div className={cn(
                        "text-[10px] font-medium uppercase tracking-wider",
                        product.availability === "In Stock" ? "text-green-400" : "text-orange-400"
                      )}>
                        {product.availability}
                      </div>
                    </div>
                    <button
                      onClick={() => selectComponent(activeCategory, product)}
                      className={cn(
                        "h-10 px-4 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95",
                        isSelected 
                          ? "bg-white/10 text-white cursor-default" 
                          : "bg-white text-black hover:bg-gray-200 hover:shadow-lg"
                      )}
                    >
                      {isSelected ? "Selected" : "Add to Build"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
