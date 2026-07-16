"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { motion } from "framer-motion";
import { Cpu, Fan, Box } from "lucide-react";

export default function LivePreview() {
  const { selectedComponents } = useBuilderStore();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-display font-bold mb-2">Live Build Preview</h2>
        <p className="text-white/50 text-sm max-w-md mx-auto">
          Select components from the sidebar to assemble your rig. Your selections will appear here.
        </p>
      </div>

      {/* PC Chassis Visual */}
      <div className="relative w-72 h-96 border-4 border-white/10 rounded-xl bg-black/50 shadow-2xl overflow-hidden backdrop-blur-sm z-10">
        {/* Motherboard Grid lines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Motherboard Zone */}
        {selectedComponents["motherboard"] && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="absolute top-8 left-8 right-16 bottom-24 border-2 border-primary/30 bg-primary/5 rounded-md flex items-center justify-center"
          >
            <Box className="w-12 h-12 text-primary/40 opacity-50 absolute right-4 bottom-4" />
          </motion.div>
        )}

        {/* CPU Zone */}
        {selectedComponents["cpu"] && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-12 bg-white text-black font-bold flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"
          >
            <Cpu className="w-6 h-6" />
          </motion.div>
        )}

        {/* Cooler Zone (Over CPU) */}
        {selectedComponents["cooler"] && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute top-16 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-cyan-400/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] z-30"
          >
            <Fan className="w-8 h-8 text-cyan-400 animate-spin-slow" />
          </motion.div>
        )}

        {/* RAM Zone */}
        {selectedComponents["memory"] && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="absolute top-16 right-20 w-8 h-24 flex gap-1 z-20"
          >
            <div className="w-2 h-full bg-gradient-to-t from-fuchsia-500 to-purple-500 rounded-sm shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
            <div className="w-2 h-full bg-gradient-to-t from-fuchsia-500 to-purple-500 rounded-sm shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
          </motion.div>
        )}

        {/* GPU Zone */}
        {selectedComponents["gpu"] && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="absolute top-48 left-6 right-16 h-12 bg-zinc-800 border border-zinc-700 rounded-md shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center px-4 z-40"
          >
            <div className="text-[10px] font-bold text-green-400 tracking-widest border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded">GEFORCE RTX</div>
          </motion.div>
        )}

        {/* PSU Zone */}
        {selectedComponents["psu"] && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="absolute bottom-4 left-6 right-6 h-16 bg-zinc-900 border-t border-zinc-700 flex items-center justify-between px-4 z-20"
          >
             <div className="text-[10px] font-bold text-white/50">850W GOLD</div>
             <Fan className="w-8 h-8 text-white/20" />
          </motion.div>
        )}

      </div>
    </div>
  );
}
