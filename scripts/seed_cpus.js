const fs = require('fs');
const path = require('path');

const generateIntelCPUs = () => {
  const cpus = [];
  const generations = [
    { gen: "Pentium", prefix: "Pentium", models: ["4 630", "4 640", "4 650", "D 820", "D 830", "D 945", "D 950", "E2180", "E2200", "E5200", "E5300", "E5400", "E5700", "G620", "G840", "G860", "G2020", "G3220", "G3258", "G4400", "G4560", "Gold G5400", "Gold G6400", "Gold G7400"], socket: "LGA775", cores: 2, tdp: 65, price: 15 },
    { gen: "Celeron", prefix: "Celeron", models: ["D 347", "D 352", "420", "430", "E1200", "E1400", "E3300", "E3400", "G530", "G1610", "G1820", "G3900", "G3930", "G4900", "G5900", "G6900"], socket: "LGA775", cores: 2, tdp: 65, price: 10 },
    { gen: "Xeon", prefix: "Xeon", models: ["X5460", "E5450", "X3440", "X5650", "X5670", "E3-1230 v2", "E3-1240 v3", "E5-1650 v2", "E5-2670", "E5-2690", "E5-2697 v2", "W-3175X"], socket: "LGA2011", cores: 8, tdp: 130, price: 50 },
    { gen: "Core 2 Duo", prefix: "Core 2 Duo", models: ["E8400", "E8500", "E8600", "E7500", "E7600", "E6700", "E6600", "E6400", "E6300", "E4700"], socket: "LGA775", cores: 2, tdp: 65, price: 15 },
    { gen: "Core 2 Quad", prefix: "Core 2 Quad", models: ["Q6600", "Q6700", "Q8400", "Q9400", "Q9550", "Q9650", "Q9300", "Q8200", "Q8300"], socket: "LGA775", cores: 4, tdp: 95, price: 25 },
    { gen: "1st Gen Core", prefix: "Core", models: ["i3-530", "i3-540", "i5-750", "i5-760", "i7-860", "i7-870", "i7-920", "i7-950", "i7-980X", "i7-990X"], socket: "LGA1156", cores: 4, tdp: 95, price: 30 },
    { gen: "2nd Gen Sandy Bridge", prefix: "Core", models: ["i3-2100", "i3-2120", "i5-2300", "i5-2400", "i5-2500", "i5-2500K", "i7-2600", "i7-2600K", "i7-2700K", "i7-3820", "i7-3930K", "i7-3960X"], socket: "LGA1155", cores: 4, tdp: 95, price: 40 },
    { gen: "3rd Gen Ivy Bridge", prefix: "Core", models: ["i3-3220", "i3-3240", "i5-3330", "i5-3450", "i5-3470", "i5-3570", "i5-3570K", "i7-3770", "i7-3770K", "i7-4930K", "i7-4960X"], socket: "LGA1155", cores: 4, tdp: 77, price: 50 },
    { gen: "4th Gen Haswell", prefix: "Core", models: ["i3-4130", "i3-4150", "i3-4160", "i5-4430", "i5-4440", "i5-4460", "i5-4570", "i5-4590", "i5-4670", "i5-4670K", "i5-4690", "i5-4690K", "i7-4770", "i7-4770K", "i7-4790", "i7-4790K", "i7-5820K", "i7-5960X"], socket: "LGA1150", cores: 4, tdp: 84, price: 60 },
    { gen: "5th Gen Broadwell", prefix: "Core", models: ["i5-5675C", "i7-5775C"], socket: "LGA1150", cores: 4, tdp: 65, price: 100 },
    { gen: "6th Gen Skylake", prefix: "Core", models: ["i3-6100", "i3-6300", "i5-6400", "i5-6500", "i5-6600", "i5-6600K", "i7-6700", "i7-6700K"], socket: "LGA1151", cores: 4, tdp: 65, price: 70 },
    { gen: "7th Gen Kaby Lake", prefix: "Core", models: ["i3-7100", "i3-7300", "i3-7350K", "i5-7400", "i5-7500", "i5-7600", "i5-7600K", "i7-7700", "i7-7700K", "i9-7900X", "i9-7980XE"], socket: "LGA1151", cores: 4, tdp: 65, price: 80 },
    { gen: "8th Gen Coffee Lake", prefix: "Core", models: ["i3-8100", "i3-8350K", "i5-8400", "i5-8500", "i5-8600", "i5-8600K", "i7-8700", "i7-8700K", "i7-8086K"], socket: "LGA1151", cores: 6, tdp: 65, price: 110 },
    { gen: "9th Gen", prefix: "Core", models: ["i3-9100F", "i3-9100", "i5-9400F", "i5-9400", "i5-9600K", "i5-9600KF", "i7-9700", "i7-9700F", "i7-9700K", "i7-9700KF", "i9-9900K", "i9-9900KF", "i9-9900KS"], socket: "LGA1151", cores: 8, tdp: 95, price: 150 },
    { gen: "10th Gen", prefix: "Core", models: ["i3-10100", "i3-10100F", "i3-10300", "i5-10400", "i5-10400F", "i5-10500", "i5-10600K", "i5-10600KF", "i7-10700", "i7-10700F", "i7-10700K", "i7-10700KF", "i9-10900", "i9-10900F", "i9-10900K", "i9-10900KF", "i9-10980XE"], socket: "LGA1200", cores: 8, tdp: 125, price: 180 },
    { gen: "11th Gen", prefix: "Core", models: ["i5-11400", "i5-11400F", "i5-11500", "i5-11600K", "i5-11600KF", "i7-11700", "i7-11700F", "i7-11700K", "i7-11700KF", "i9-11900K", "i9-11900KF"], socket: "LGA1200", cores: 8, tdp: 125, price: 200 },
    { gen: "12th Gen", prefix: "Core", models: ["i3-12100", "i3-12100F", "i5-12400", "i5-12400F", "i5-12500", "i5-12600", "i5-12600K", "i5-12600KF", "i7-12700", "i7-12700F", "i7-12700K", "i7-12700KF", "i9-12900", "i9-12900F", "i9-12900K", "i9-12900KF", "i9-12900KS"], socket: "LGA1700", cores: 12, tdp: 125, price: 250 },
    { gen: "13th Gen", prefix: "Core", models: ["i3-13100", "i3-13100F", "i5-13400", "i5-13400F", "i5-13500", "i5-13600K", "i5-13600KF", "i7-13700", "i7-13700F", "i7-13700K", "i7-13700KF", "i9-13900", "i9-13900F", "i9-13900K", "i9-13900KF", "i9-13900KS"], socket: "LGA1700", cores: 16, tdp: 125, price: 350 },
    { gen: "14th Gen", prefix: "Core", models: ["i3-14100", "i3-14100F", "i5-14400", "i5-14400F", "i5-14500", "i5-14600K", "i5-14600KF", "i7-14700", "i7-14700F", "i7-14700K", "i7-14700KF", "i9-14900", "i9-14900F", "i9-14900K", "i9-14900KF", "i9-14900KS"], socket: "LGA1700", cores: 20, tdp: 125, price: 400 },
    { gen: "Intel Core Ultra", prefix: "Core Ultra", models: ["5 245K", "5 245KF", "7 265K", "7 265KF", "9 285K"], socket: "LGA1851", cores: 14, tdp: 125, price: 450 }
  ];

  generations.forEach(g => {
    g.models.forEach((m, idx) => {
      let actualCores = g.cores;
      let actualTdp = g.tdp;
      let actualPrice = g.price + (idx * 5);
      
      if (m.includes("i9") || m.includes("9 285") || m.includes("X")) { actualCores += 8; actualTdp += 65; actualPrice += 150; }
      else if (m.includes("i7") || m.includes("7 265")) { actualCores += 4; actualTdp += 30; actualPrice += 80; }
      else if (m.includes("i3") || m.includes("Pentium") || m.includes("Celeron")) { actualCores = Math.max(2, actualCores - 2); actualTdp -= 20; actualPrice -= 40; }

      const name = `Intel ${g.prefix} ${m}`;
      cpus.push({
        id: `cpu-intel-${m.toLowerCase().replace(/\s+/g, '-')}`,
        category: "cpu",
        name,
        brand: "Intel",
        price: Math.max(15, actualPrice) - 0.01,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&auto=format&fit=crop&q=60",
        rating: 4.5 + Math.random() * 0.5,
        availability: Math.random() > 0.8 ? "Low Stock" : "In Stock",
        specs: {
          type: "cpu",
          socket: g.socket,
          cores: actualCores,
          threads: actualCores * (m.includes("Pentium") || m.includes("Celeron") ? 1 : 2),
          baseClock: (2.5 + Math.random() * 1.5).toFixed(1) + " GHz",
          boostClock: m.includes("Pentium") || m.includes("Celeron") ? "N/A" : (3.5 + Math.random() * 2.5).toFixed(1) + " GHz",
          tdp: actualTdp,
          iGPU: !m.includes("F") && !m.includes("KF"),
          cache: (actualCores * 2) + " MB",
          launchDate: g.gen,
          generation: g.gen
        }
      });
    });
  });
  return cpus;
};

const generateAMDCPUs = () => {
  const cpus = [];
  const generations = [
    { gen: "Athlon", prefix: "Athlon", models: ["64 X2 3800+", "64 X2 4200+", "64 X2 5000+", "64 X2 6000+", "64 X2 6400+", "II X2 250", "II X3 450", "II X4 620", "II X4 630", "X4 760K", "X4 860K", "X4 880K", "X4 950", "200GE", "220GE", "240GE", "3000G"], socket: "AM4", cores: 2, tdp: 35, price: 40 },
    { gen: "A-Series", prefix: "A-Series", models: ["A6-7400K", "A8-7600", "A10-7700K", "A10-7850K", "A10-7870K", "A10-7890K", "A6-9500", "A8-9600", "A10-9700", "A12-9800"], socket: "AM4", cores: 4, tdp: 65, price: 50 },
    { gen: "Phenom", prefix: "Phenom", models: ["X3 8750", "X4 9550", "X4 9850", "X4 9950", "II X2 550", "II X3 720", "II X4 945", "II X4 955", "II X4 965", "II X6 1055T", "II X6 1090T", "II X6 1100T"], socket: "AM3", cores: 4, tdp: 95, price: 60 },
    { gen: "FX Series", prefix: "FX", models: ["4100", "4130", "4300", "4350", "6100", "6200", "6300", "6350", "8120", "8150", "8300", "8320", "8320E", "8350", "8370", "8370E", "9370", "9590"], socket: "AM3+", cores: 4, tdp: 95, price: 80 },
    { gen: "Ryzen 1000", prefix: "Ryzen", models: ["3 1200", "3 1200 AF", "3 1300X", "5 1400", "5 1500X", "5 1600", "5 1600 AF", "5 1600X", "7 1700", "7 1700X", "7 1800X"], socket: "AM4", cores: 4, tdp: 65, price: 100 },
    { gen: "Ryzen 2000", prefix: "Ryzen", models: ["3 2200G", "3 2300X", "5 2400G", "5 2500X", "5 2600", "5 2600X", "7 2700", "7 2700E", "7 2700X", "7 2700X Gold Edition"], socket: "AM4", cores: 4, tdp: 65, price: 120 },
    { gen: "Ryzen 3000", prefix: "Ryzen", models: ["3 3100", "3 3200G", "3 3300X", "5 3400G", "5 3600", "5 3600X", "5 3600XT", "7 3700X", "7 3800X", "7 3800XT", "9 3900", "9 3900X", "9 3900XT", "9 3950X"], socket: "AM4", cores: 4, tdp: 65, price: 140 },
    { gen: "Ryzen 4000", prefix: "Ryzen", models: ["3 4100", "3 4300G", "5 4500", "5 4600G", "7 4700G"], socket: "AM4", cores: 4, tdp: 65, price: 110 },
    { gen: "Ryzen 5000", prefix: "Ryzen", models: ["5 5500", "5 5600G", "5 5600", "5 5600X", "5 5600X3D", "5 5600GT", "7 5700", "7 5700G", "7 5700X", "7 5700X3D", "7 5800", "7 5800X", "7 5800X3D", "9 5900", "9 5900X", "9 5950X"], socket: "AM4", cores: 6, tdp: 65, price: 180 },
    { gen: "Ryzen 7000", prefix: "Ryzen", models: ["5 7500F", "5 7600", "5 7600X", "7 7700", "7 7700X", "7 7800X3D", "9 7900", "9 7900X", "9 7900X3D", "9 7950X", "9 7950X3D"], socket: "AM5", cores: 6, tdp: 105, price: 250 },
    { gen: "Ryzen 8000", prefix: "Ryzen", models: ["3 8300G", "5 8500G", "5 8600G", "7 8700G", "7 8700F", "5 8400F"], socket: "AM5", cores: 6, tdp: 65, price: 220 },
    { gen: "Ryzen 9000", prefix: "Ryzen", models: ["5 9600X", "7 9700X", "9 9900X", "9 9950X"], socket: "AM5", cores: 6, tdp: 120, price: 350 },
    { gen: "Threadripper", prefix: "Ryzen Threadripper", models: ["1900X", "1920X", "1950X", "2920X", "2950X", "2970WX", "2990WX", "3960X", "3970X", "3990X", "5965WX", "5975WX", "5995WX", "7960X", "7970X", "7980X"], socket: "sTRX4", cores: 24, tdp: 250, price: 1200 }
  ];

  generations.forEach(g => {
    g.models.forEach((m, idx) => {
      let actualCores = g.cores;
      let actualTdp = g.tdp;
      let actualPrice = g.price + (idx * 5);
      
      if (m.includes("9 ")) { actualCores += 6; actualTdp += 40; actualPrice += 150; }
      else if (m.includes("7 ") || m.includes("X6")) { actualCores += 2; actualTdp += 20; actualPrice += 80; }
      else if (m.includes("3 ") || m.includes("X2")) { actualCores = Math.max(2, actualCores - 2); actualTdp -= 10; actualPrice -= 40; }

      if (m.includes("FX-6") || m.includes("6100") || m.includes("6200") || m.includes("6300") || m.includes("6350")) actualCores = 6;
      if (m.includes("FX-8") || m.includes("8120") || m.includes("8150") || m.includes("8320") || m.includes("8350") || m.includes("8370")) actualCores = 8;
      if (m.includes("9370") || m.includes("9590")) { actualCores = 8; actualTdp = 220; }
      if (m.includes("X3D")) { actualPrice += 100; }

      const name = `AMD ${g.prefix} ${m}`;
      cpus.push({
        id: `cpu-amd-${m.toLowerCase().replace(/\s+/g, '-')}`,
        category: "cpu",
        name,
        brand: "AMD",
        price: Math.max(19, actualPrice) - 0.01,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&auto=format&fit=crop&q=60",
        rating: 4.5 + Math.random() * 0.5,
        availability: Math.random() > 0.8 ? "Low Stock" : "In Stock",
        specs: {
          type: "cpu",
          socket: g.socket,
          cores: actualCores,
          threads: g.gen === "FX Series" ? actualCores : actualCores * 2,
          baseClock: (3.0 + Math.random() * 1.5).toFixed(1) + " GHz",
          boostClock: (3.8 + Math.random() * 1.8).toFixed(1) + " GHz",
          tdp: actualTdp,
          iGPU: m.includes("G"),
          cache: m.includes("X3D") ? "96 MB" : (actualCores * 4) + " MB",
          launchDate: g.gen,
          generation: g.gen
        }
      });
    });
  });
  return cpus;
};

const allIntelCPUs = generateIntelCPUs();
const allAMDCPUs = generateAMDCPUs();
const massiveCPUDatabase = [...allIntelCPUs, ...allAMDCPUs];

console.log(`Generated ${allIntelCPUs.length} Intel CPUs.`);
console.log(`Generated ${allAMDCPUs.length} AMD CPUs.`);
console.log(`Total CPUs Generated: ${massiveCPUDatabase.length}`);

const outputPath = path.join(__dirname, '../src/data/generated_cpus.json');
fs.writeFileSync(outputPath, JSON.stringify(massiveCPUDatabase, null, 2));

console.log(`Successfully wrote database to ${outputPath}`);
