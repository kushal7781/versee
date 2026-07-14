import { PCComponent } from "@/types/configurator";
import generatedCPUs from "./generated_cpus.json";

export const dummyComponents: PCComponent[] = [
  ...generatedCPUs as PCComponent[],
  // --- Motherboards ---
  {
    id: "mobo-z97-a",
    category: "motherboard",
    name: "ASUS Z97-A",
    brand: "ASUS",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    availability: "Low Stock",
    specs: {
      type: "motherboard",
      socket: "LGA1150",
      formFactor: "ATX",
      chipset: "Z97",
      memoryType: "DDR3",
      memorySlots: 4,
      maxMemory: "32 GB",
      pcieSlots: ["PCIe 3.0 x16", "PCIe 3.0 x8"],
      m2Slots: 1,
      sataPorts: 6,
      wifi: false,
      tdp: 15
    }
  },
  {
    id: "mobo-z790-aorus",
    category: "motherboard",
    name: "Gigabyte Z790 AORUS ELITE AX",
    brand: "Gigabyte",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    availability: "In Stock",
    specs: {
      type: "motherboard",
      socket: "LGA1700",
      formFactor: "ATX",
      chipset: "Z790",
      memoryType: "DDR5",
      memorySlots: 4,
      maxMemory: "192 GB",
      pcieSlots: ["PCIe 5.0 x16"],
      m2Slots: 4,
      sataPorts: 4,
      wifi: true,
      tdp: 25
    }
  },
  {
    id: "mobo-b650-tomahawk",
    category: "motherboard",
    name: "MSI MAG B650 TOMAHAWK WIFI",
    brand: "MSI",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    availability: "In Stock",
    specs: {
      type: "motherboard",
      socket: "AM5",
      formFactor: "ATX",
      chipset: "B650",
      memoryType: "DDR5",
      memorySlots: 4,
      maxMemory: "192 GB",
      pcieSlots: ["PCIe 4.0 x16"],
      m2Slots: 3,
      sataPorts: 6,
      wifi: true,
      tdp: 20
    }
  },

  // --- GPUs ---
  {
    id: "gpu-gtx-750-ti",
    category: "gpu",
    name: "EVGA GeForce GTX 750 Ti SC",
    brand: "EVGA",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    availability: "Low Stock",
    specs: {
      type: "gpu",
      chipset: "GTX 750 Ti",
      vram: "2 GB",
      memoryType: "GDDR5",
      coreClock: "1176 MHz",
      boostClock: "1255 MHz",
      length: 170,
      tdp: 60,
      slots: 2,
      pcie: "PCIe 3.0 x16",
      outputs: ["DVI", "HDMI", "DisplayPort"]
    }
  },
  {
    id: "gpu-rtx-4090",
    category: "gpu",
    name: "ASUS ROG Strix GeForce RTX 4090 OC",
    brand: "ASUS",
    price: 1999.99,
    msrp: 1599.00,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    availability: "In Stock",
    specs: {
      type: "gpu",
      chipset: "RTX 4090",
      vram: "24 GB",
      memoryType: "GDDR6X",
      coreClock: "2235 MHz",
      boostClock: "2640 MHz",
      length: 357,
      tdp: 450,
      slots: 4,
      pcie: "PCIe 4.0 x16",
      outputs: ["HDMI 2.1a", "DisplayPort 1.4a x 3"]
    }
  },
  {
    id: "gpu-rx-7900-xtx",
    category: "gpu",
    name: "Sapphire NITRO+ Radeon RX 7900 XTX",
    brand: "Sapphire",
    price: 1049.99,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    availability: "In Stock",
    specs: {
      type: "gpu",
      chipset: "RX 7900 XTX",
      vram: "24 GB",
      memoryType: "GDDR6",
      coreClock: "1855 MHz",
      boostClock: "2680 MHz",
      length: 320,
      tdp: 355,
      slots: 3,
      pcie: "PCIe 4.0 x16",
      outputs: ["HDMI 2.1", "DisplayPort 2.1 x 2"]
    }
  },

  // --- Memory ---
  {
    id: "ram-ddr3-16gb",
    category: "memory",
    name: "Corsair Vengeance Pro 16 GB (2 x 8 GB) DDR3-2400",
    brand: "Corsair",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    availability: "In Stock",
    specs: {
      type: "memory",
      memoryType: "DDR3",
      capacity: "16 GB (2 x 8 GB)",
      speed: "2400 MHz",
      latency: "CL11",
      voltage: "1.65V",
      rgb: false,
      tdp: 10
    }
  },
  {
    id: "ram-ddr5-32gb",
    category: "memory",
    name: "G.Skill Trident Z5 RGB 32 GB (2 x 16 GB) DDR5-6000",
    brand: "G.Skill",
    price: 115.99,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    availability: "In Stock",
    specs: {
      type: "memory",
      memoryType: "DDR5",
      capacity: "32 GB (2 x 16 GB)",
      speed: "6000 MHz",
      latency: "CL30",
      voltage: "1.35V",
      rgb: true,
      tdp: 12
    }
  },

  // --- Cases ---
  {
    id: "case-nzxt-h9",
    category: "case",
    name: "NZXT H9 Flow ATX Mid Tower",
    brand: "NZXT",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    availability: "In Stock",
    specs: {
      type: "case",
      formFactor: "ATX",
      supportedMotherboards: ["Mini ITX", "Micro ATX", "ATX"],
      maxLengthGPU: 435,
      maxHeightCooler: 165,
      maxLengthPSU: 200,
      includedFans: 4
    }
  },
  {
    id: "case-mini-itx-nr200",
    category: "case",
    name: "Cooler Master MasterBox NR200",
    brand: "Cooler Master",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    availability: "In Stock",
    specs: {
      type: "case",
      formFactor: "Mini ITX",
      supportedMotherboards: ["Mini ITX", "Mini DTX"],
      maxLengthGPU: 330,
      maxHeightCooler: 155,
      maxLengthPSU: 130,
      includedFans: 2
    }
  },

  // --- Coolers ---
  {
    id: "cooler-noctua-d15",
    category: "cooler",
    name: "Noctua NH-D15 chromax.black",
    brand: "Noctua",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    availability: "In Stock",
    specs: {
      type: "cooler",
      coolerType: "Air",
      supportedSockets: ["LGA1150", "LGA1151", "LGA1200", "LGA1700", "AM4", "AM5"],
      height: 165,
      rgb: false,
      tdp: 5
    }
  },
  {
    id: "cooler-corsair-h150i",
    category: "cooler",
    name: "Corsair iCUE H150i ELITE CAPELLIX XT",
    brand: "Corsair",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    availability: "In Stock",
    specs: {
      type: "cooler",
      coolerType: "AIO 360",
      supportedSockets: ["LGA1200", "LGA1700", "AM4", "AM5"],
      radiatorLength: 397,
      rgb: true,
      tdp: 15
    }
  },

  // --- PSU ---
  {
    id: "psu-corsair-rm850x",
    category: "psu",
    name: "Corsair RM850x (2021) 850 W 80+ Gold",
    brand: "Corsair",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    availability: "In Stock",
    specs: {
      type: "psu",
      wattage: 850,
      efficiency: "80+ Gold",
      modular: "Full",
      formFactor: "ATX"
    }
  }
];
