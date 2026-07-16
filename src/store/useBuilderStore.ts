import { create } from "zustand";
import { 
  PCComponent, 
  ComponentCategory,
  CPUSpecs,
  GPUSpecs,
  MotherboardSpecs,
  MemorySpecs,
  PSUSpecs,
  CaseSpecs,
  CoolerSpecs
} from "@/types/configurator";

interface BuilderState {
  selectedComponents: Partial<Record<ComponentCategory, PCComponent>>;
  activeCategory: ComponentCategory | null;
  budget: number | null;
  
  selectComponent: (category: ComponentCategory, component: PCComponent) => void;
  removeComponent: (category: ComponentCategory) => void;
  setActiveCategory: (category: ComponentCategory | null) => void;
  setBudget: (budget: number | null) => void;
  clearBuild: () => void;

  getSubtotal: () => number;
  getEstimatedWattage: () => number;
  getCompatibilityIssues: () => string[];
  getProgress: () => { current: number; total: number };
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  selectedComponents: {},
  activeCategory: null,
  budget: null,

  selectComponent: (category, component) =>
    set((state) => ({
      selectedComponents: { ...state.selectedComponents, [category]: component },
    })),

  removeComponent: (category) =>
    set((state) => {
      const newSelected = { ...state.selectedComponents };
      delete newSelected[category];
      return { selectedComponents: newSelected };
    }),

  setActiveCategory: (category) => set({ activeCategory: category }),
  setBudget: (budget) => set({ budget }),
  clearBuild: () => set({ selectedComponents: {}, activeCategory: null }),

  getSubtotal: () => {
    const { selectedComponents } = get();
    return Object.values(selectedComponents).reduce(
      (total, comp) => total + (comp?.price || 0),
      0
    );
  },

  getEstimatedWattage: () => {
    const { selectedComponents } = get();
    let total = 0;
    Object.values(selectedComponents).forEach((comp) => {
      if (comp?.specs && "tdp" in comp.specs && typeof comp.specs.tdp === "number") {
        total += comp.specs.tdp;
      }
    });
    // Add buffer for fans/rgb/motherboard if not explicitly added
    return total > 0 ? total + 50 : 0;
  },

  getCompatibilityIssues: () => {
    const { selectedComponents } = get();
    const issues: string[] = [];

    const cpu = selectedComponents["cpu"]?.specs as CPUSpecs | undefined;
    const mobo = selectedComponents["motherboard"]?.specs as MotherboardSpecs | undefined;
    const psu = selectedComponents["psu"]?.specs as PSUSpecs | undefined;
    const caseComp = selectedComponents["case"]?.specs as CaseSpecs | undefined;
    const gpu = selectedComponents["gpu"]?.specs as GPUSpecs | undefined;
    const ram = selectedComponents["memory"]?.specs as MemorySpecs | undefined;
    const cooler = selectedComponents["cooler"]?.specs as CoolerSpecs | undefined;

    // CPU <-> Motherboard
    if (cpu && mobo) {
      if (cpu.socket !== mobo.socket) {
        issues.push(`Socket mismatch: CPU uses ${cpu.socket}, but Motherboard uses ${mobo.socket}.`);
      }
    }

    // RAM <-> Motherboard
    if (ram && mobo) {
      if (ram.memoryType !== mobo.memoryType) {
        issues.push(`Memory mismatch: RAM is ${ram.memoryType}, but Motherboard supports ${mobo.memoryType}.`);
      }
    }

    // GPU <-> Case
    if (caseComp && gpu) {
      if (gpu.length > caseComp.maxLengthGPU) {
        issues.push(`GPU Length (${gpu.length}mm) exceeds Case clearance (${caseComp.maxLengthGPU}mm).`);
      }
    }

    // Cooler <-> CPU Socket
    if (cooler && cpu) {
      if (!cooler.supportedSockets.includes(cpu.socket)) {
        issues.push(`Cooler does not list support for CPU socket ${cpu.socket}.`);
      }
    }

    // Cooler <-> Case clearance
    if (cooler && caseComp) {
      if (cooler.coolerType === "Air" && cooler.height && cooler.height > caseComp.maxHeightCooler) {
        issues.push(`Air Cooler height (${cooler.height}mm) exceeds Case clearance (${caseComp.maxHeightCooler}mm).`);
      }
      // Note: AIO radiator clearance would require more advanced data, omitted for simplicity
    }

    // Motherboard <-> Case Form Factor
    if (mobo && caseComp) {
      if (!caseComp.supportedMotherboards.includes(mobo.formFactor)) {
        issues.push(`Case does not support ${mobo.formFactor} motherboards.`);
      }
    }

    // PSU Wattage <-> System TDP
    if (psu) {
      const estWattage = get().getEstimatedWattage();
      if (estWattage > psu.wattage) {
        issues.push(`Estimated wattage (${estWattage}W) exceeds PSU capacity (${psu.wattage}W).`);
      }
    }

    return issues;
  },

  getProgress: () => {
    const { selectedComponents } = get();
    const categories: ComponentCategory[] = [
      "cpu",
      "cooler",
      "motherboard",
      "memory",
      "storage",
      "gpu",
      "case",
      "psu",
    ];
    let current = 0;
    categories.forEach((cat) => {
      if (selectedComponents[cat]) current++;
    });
    return { current, total: categories.length };
  },
}));
