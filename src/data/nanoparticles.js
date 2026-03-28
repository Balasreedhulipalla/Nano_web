export const nanoparticles = {
  gold: {
    name: "Gold Nanoparticles",
    symbol: "Au",
    color: "#EAB308",
    gradient: ["#EAB308", "#CA8A04"],
    overview: "Gold nanoparticles are widely used in biomedical applications due to their unique optical properties and biocompatibility.",
    properties: {
      size: "1-100 nm",
      shape: "Spherical, Rod, Star",
      color: "Red to purple",
      stability: "High"
    },
    applications: [
      "Cancer therapy and diagnosis",
      "Drug delivery systems",
      "Biosensing and imaging",
      "Photothermal therapy",
      "Catalysis"
    ],
    toxicity: {
      level: "Low",
      description: "Generally considered biocompatible with minimal toxicity at therapeutic doses."
    },
    stats: {
      papers: "45,230",
      citations: "892,450",
      growth: "+12%"
    }
  },
  silver: {
    name: "Silver Nanoparticles",
    symbol: "Ag",
    color: "#94A3B8",
    gradient: ["#94A3B8", "#64748B"],
    overview: "Silver nanoparticles are known for their potent antimicrobial properties and wide use in consumer products.",
    properties: {
      size: "10-100 nm",
      shape: "Spherical, Triangular",
      color: "Yellow to grey",
      stability: "Moderate"
    },
    applications: [
      "Antimicrobial surfaces",
      "Wound dressing",
      "Water purification",
      "Conductive inks",
      "SERS detection"
    ],
    toxicity: {
      level: "Moderate",
      description: "Can show toxicity to aquatic organisms and certain human cells at high concentrations."
    },
    stats: {
      papers: "38,150",
      citations: "756,200",
      growth: "+8%"
    }
  },
  aluminum: {
    name: "Aluminum Nanoparticles",
    symbol: "Al",
    color: "#60A5FA",
    gradient: ["#60A5FA", "#2563EB"],
    overview: "Aluminum nanoparticles are highly reactive and used primarily in propellants and energetic materials.",
    properties: {
      size: "20-150 nm",
      shape: "Spherical",
      color: "Black/Grey",
      stability: "Lower (Reactive)"
    },
    applications: [
      "Solid rocket propellants",
      "Explosives/Pyrotechnics",
      "Catalysis",
      "Hydrogen production",
      "Ceramic additives"
    ],
    toxicity: {
      level: "Moderate",
      description: "Inhalation should be avoided; can cause respiratory issues if not handled properly."
    },
    stats: {
      papers: "12,400",
      citations: "245,600",
      growth: "+5%"
    }
  },
  // Add more as needed...
};
