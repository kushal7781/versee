export type ComponentCategory =
  | "cpu"
  | "gpu"
  | "motherboard"
  | "memory"
  | "storage"
  | "psu"
  | "case"
  | "cooler"
  | "case-fan"
  | "monitor"
  | "keyboard"
  | "mouse"
  | "headset"
  | "microphone"
  | "speakers"
  | "webcam"
  | "mouse-pad"
  | "gaming-chair";

export type SocketType = 
  | "LGA775" | "LGA1155" | "LGA1150" | "LGA1151" | "LGA1200" | "LGA1700" 
  | "AM2" | "AM3" | "AM4" | "AM5" | "sTR4" | "sTRX4";

export type MemoryType = "DDR2" | "DDR3" | "DDR4" | "DDR5";

export type FormFactor = "Mini ITX" | "Micro ATX" | "ATX" | "E-ATX" | "Mini DTX";

export interface CPUSpecs {
  type: "cpu";
  socket: SocketType;
  cores: number;
  threads: number;
  baseClock: string; // e.g., "3.4 GHz"
  boostClock: string;
  tdp: number; // in Watts
  iGPU: boolean;
  cache: string; // e.g., "36 MB"
  launchDate: string; // e.g., "Q4 2023"
  generation: string; // e.g., "14th Gen", "Ryzen 7000"
}

export interface GPUSpecs {
  type: "gpu";
  chipset: string; // e.g., "RTX 4090", "RX 7900 XTX"
  vram: string; // e.g., "24 GB"
  memoryType: string; // e.g., "GDDR6X"
  coreClock: string;
  boostClock: string;
  length: number; // in mm
  tdp: number; // in Watts
  slots: number; // e.g., 2, 3
  pcie: string; // e.g., "PCIe 4.0 x16"
  outputs: string[];
}

export interface MotherboardSpecs {
  type: "motherboard";
  socket: SocketType;
  formFactor: FormFactor;
  chipset: string; // e.g., "Z790", "B650"
  memoryType: MemoryType;
  memorySlots: number;
  maxMemory: string; // e.g., "192 GB"
  pcieSlots: string[];
  m2Slots: number;
  sataPorts: number;
  wifi: boolean;
  tdp?: number; // Usually negligible, maybe 15W-30W for board
}

export interface MemorySpecs {
  type: "memory";
  memoryType: MemoryType;
  capacity: string; // e.g., "32 GB (2 x 16 GB)"
  speed: string; // e.g., "6000 MHz"
  latency: string; // e.g., "CL30"
  voltage: string;
  rgb: boolean;
  tdp: number; // usually 3-5W per stick
}

export interface StorageSpecs {
  type: "storage";
  capacity: string;
  storageType: "HDD" | "SATA SSD" | "M.2 SATA" | "NVMe Gen3" | "NVMe Gen4" | "NVMe Gen5";
  interface: string; // e.g., "SATA 6 Gb/s", "PCIe 4.0 x4"
  readSpeed?: string;
  writeSpeed?: string;
  formFactor: string; // e.g., "2.5\"", "M.2 2280", "3.5\""
  tdp: number; // usually 5-10W
}

export interface PSUSpecs {
  type: "psu";
  wattage: number;
  efficiency: "80+ White" | "80+ Bronze" | "80+ Silver" | "80+ Gold" | "80+ Platinum" | "80+ Titanium";
  modular: "Full" | "Semi" | "No";
  formFactor: string; // e.g., "ATX", "SFX"
}

export interface CaseSpecs {
  type: "case";
  formFactor: FormFactor;
  supportedMotherboards: FormFactor[];
  maxLengthGPU: number; // in mm
  maxHeightCooler: number; // in mm
  maxLengthPSU: number; // in mm
  includedFans: number;
}

export interface CoolerSpecs {
  type: "cooler";
  coolerType: "Air" | "AIO 120" | "AIO 240" | "AIO 280" | "AIO 360" | "AIO 420";
  supportedSockets: SocketType[];
  height?: number; // for air coolers in mm
  radiatorLength?: number; // for AIOs in mm
  rgb: boolean;
  tdp: number; // fan power
}

export interface PeripheralSpecs {
  type: "peripheral";
  connection?: "Wired" | "Wireless";
  rgb?: boolean;
  [key: string]: unknown;
}

export type ComponentSpecs = 
  | CPUSpecs 
  | GPUSpecs 
  | MotherboardSpecs 
  | MemorySpecs 
  | StorageSpecs 
  | PSUSpecs 
  | CaseSpecs 
  | CoolerSpecs 
  | PeripheralSpecs;

export interface PCComponent {
  id: string;
  category: ComponentCategory;
  name: string;
  brand: string;
  price: number; // current price
  msrp?: number;
  image: string;
  description?: string;
  rating: number;
  availability: "In Stock" | "Out of Stock" | "Low Stock";
  specs: ComponentSpecs;
}
