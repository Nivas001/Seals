export type ItemSpecificData = {
  tagline?: string;
  description?: string;
  image?: string;
  specs?: { label: string; value: string }[];
  benefits?: string[];
  applications?: string[];
};

export const ITEM_SPECIFIC_DATA: Record<string, ItemSpecificData> = {
  // ==========================================
  // 1. PUMPS (10 items)
  // ==========================================
  "Mono-block Pump": {
    image: "/images/monoblock-pump.jpg",
    tagline: "Compact, single-shaft pump and motor assembly for space-constrained utility lines.",
    description:
      "High-efficiency monoblock centrifugal pump where the impeller is directly mounted on the extended motor shaft. Eliminates coupling misalignment and vibration while saving valuable plant floor space.",
    specs: [
      { label: "Configuration", value: "Single-stage monoblock, close-coupled" },
      { label: "Casing", value: "Cast Iron FG260 / SS304 / SS316" },
      { label: "Impeller", value: "Closed / Semi-open bronze or stainless steel" },
      { label: "Head range", value: "Up to 65 meters" },
      { label: "Flow capacity", value: "Up to 120 m³/hr" },
      { label: "Shaft seal", value: "Mechanical seal (Carbon vs Ceramic / SiC vs SiC)" },
      { label: "Motor rating", value: "IE2 / IE3 energy efficient, 0.5 HP to 25 HP" },
    ],
    benefits: [
      "Compact footprint with zero coupling alignment issues",
      "Quiet, vibration-free operation across industrial utility loops",
      "Direct motor drive ensures maximum mechanical power transfer",
      "Easy maintenance and low lifetime operating cost",
    ],
    applications: ["Chemical", "Food", "Breweries", "Oil & Gas"],
  },
  "Lime Slurry Pump": {
    image: "/images/lime-slurry-pump.jpg",
    tagline: "Heavy-duty abrasion-resistant pump engineered for high-solids lime slurries.",
    description:
      "Specialized centrifugal slurry pump designed to handle erosive and scaling lime slurries in flue gas desulfurization (FGD), effluent treatment plants, and chemical synthesis. Features thick wear liners and low operating speeds.",
    specs: [
      { label: "Configuration", value: "Heavy-duty horizontal slurry pump" },
      { label: "Casing & Liners", value: "High-chrome alloy (27% Cr) / Replaceable elastomer liners" },
      { label: "Impeller", value: "Semi-open or vortex non-clog high-chrome alloy" },
      { label: "Solids handling", value: "Up to 45% by weight, particle size up to 25 mm" },
      { label: "Head range", value: "Up to 55 meters" },
      { label: "Sealing", value: "Expeller (dynamic seal) or double mechanical seal with flush" },
      { label: "Speed", value: "Low RPM (600–1450 RPM) to minimize erosive wear" },
    ],
    benefits: [
      "Exceptional wear life against erosive lime grit and crystalline scale",
      "Low-speed operation prevents rapid impeller degradation and cavitation",
      "Heavy-duty shaft and bearing assembly withstand high radial slurry loads",
      "Replaceable wear liners reduce long-term maintenance expenditure",
    ],
    applications: ["Chemical", "Dye Manufacturing", "Oil & Gas"],
  },
  "Dosing Pump": {
    image: "/images/dosing-pump.jpg",
    tagline: "Precision metering pump for accurate chemical injection and pH control.",
    description:
      "Positive displacement chemical dosing pump offering repeatable flow accuracy within ±1%. Available in motor-driven diaphragm, solenoid, and plunger configurations for dosing acids, alkalis, coagulants, and additives.",
    specs: [
      { label: "Type", value: "Positive displacement (Diaphragm / Plunger)" },
      { label: "Dosing head", value: "PP / PVDF / PTFE / SS316L / Hastelloy-C" },
      { label: "Diaphragm", value: "Solid virgin PTFE or composite elastomer" },
      { label: "Flow capacity", value: "0.1 L/hr to 5000 L/hr" },
      { label: "Pressure rating", value: "Up to 100 bar (plunger) / up to 16 bar (diaphragm)" },
      { label: "Accuracy", value: "±1% steady-state metering accuracy" },
      { label: "Control", value: "Manual micrometer stroke or 4-20mA / Modbus auto-control" },
    ],
    benefits: [
      "Extremely precise and repeatable chemical metering for process quality",
      "Leak-free hermetic sealing with PTFE diaphragms ensures operator safety",
      "Wide turndown ratio (up to 1:100) handles dynamic plant feed requirements",
      "Compatible with automated SCADA and pH/ORP feedback control loops",
    ],
    applications: ["Chemical", "Pharma", "Food", "Beverages", "Breweries"],
  },
  "Horizontal Axial Flow Pump": {
    image: "/images/axial-flow-pump.jpg",
    tagline: "High-capacity, low-head elbow pump for evaporator and crystallizer circulation.",
    description:
      "Engineered axial flow propeller pump designed for recirculating massive volumes of liquid at low differential heads. Ideal for chemical evaporators, brine concentration, and industrial drainage.",
    specs: [
      { label: "Configuration", value: "Horizontal elbow / foot mounted propeller pump" },
      { label: "Casing", value: "SS304 / SS316 / Duplex Stainless Steel / Ni-Resist" },
      { label: "Impeller", value: "High-efficiency axial propeller, fixed or adjustable pitch" },
      { label: "Flow capacity", value: "500 m³/hr to 15,000 m³/hr" },
      { label: "Head range", value: "1 meter to 8 meters" },
      { label: "Drive", value: "V-belt or direct gear reducer drive" },
      { label: "Sealing", value: "Double mechanical seal or hydrodynamic expeller seal" },
    ],
    benefits: [
      "Massive flow volumes with minimal power consumption at low heads",
      "Gentle fluid handling prevents crystal breakdown in chemical evaporators",
      "Robust shaft support with heavy-duty thrust bearing housing",
      "Highly corrosion-resistant metallurgy matched to chemical brines",
    ],
    applications: ["Chemical", "Dye Manufacturing", "Food"],
  },
  "Centrifugal Pump": {
    image: "/images/centrifugal-pump.jpg",
    tagline: "Standard ISO 2858 / DIN 24256 back-pull-out process pump for versatile duty.",
    description:
      "The industrial workhorse for fluid transfer across chemical, food, and utility plants. Fully compliant with ISO 2858 dimensional standards, featuring a back-pull-out design that allows rotating element inspection without disturbing pipework.",
    specs: [
      { label: "Standard", value: "ISO 2858 / DIN 24256 dimensional compliance" },
      { label: "Casing", value: "WCB Carbon Steel / CF8 (SS304) / CF8M (SS316) / CD4MCu" },
      { label: "Impeller", value: "Closed high-efficiency, dynamically balanced to ISO 1940" },
      { label: "Flow capacity", value: "Up to 850 m³/hr" },
      { label: "Head range", value: "Up to 140 meters" },
      { label: "Sealing", value: "Single/double mechanical seal (API 682 ready) or gland packing" },
      { label: "Temperature", value: "-40 °C to +220 °C (with cooling jacket)" },
    ],
    benefits: [
      "True back-pull-out design drastically cuts maintenance downtime",
      "High hydraulic efficiency reduces motor power consumption",
      "100% interchangeable spares with major ISO process pump OEMs",
      "Heavy-duty bearing housing designed for 25,000+ hours L10h life",
    ],
    applications: ["Chemical", "Food", "Pharma", "Breweries", "Oil & Gas"],
  },
  "Fire Fighting Pump": {
    image: "/images/fire-fighting-pump.jpg",
    tagline: "Dedicated emergency fire suppression pump package to TAC / NFPA standards.",
    description:
      "High-reliability fire suppression pump set including main electric pump, standby diesel engine pump, and jockey pump. Designed to instantly deliver high-pressure water to plant hydrant and sprinkler networks during emergencies.",
    specs: [
      { label: "Configuration", value: "Horizontal split case or end-suction centrifugal package" },
      { label: "Compliance", value: "TAC (Tariff Advisory Committee) / NFPA 20 guidelines" },
      { label: "Flow capacity", value: "150 GPM to 2500 GPM (35 m³/hr to 570 m³/hr)" },
      { label: "Head range", value: "50 meters to 150 meters (7 bar to 15 bar)" },
      { label: "Drives", value: "IE3 Electric motor & automatic start standby Diesel engine" },
      { label: "Impeller & Shaft", value: "Bronze / SS316 impeller on SS410 high-tensile shaft" },
      { label: "Sealing", value: "Asbestos-free graphited gland packing with lantern ring" },
    ],
    benefits: [
      "Unconditional starting reliability during critical fire emergencies",
      "Automatic pressure drop sensing starts jockey or main pump instantly",
      "Heavy-duty bronze impellers prevent seizure during long idle periods",
      "Complete skid-mounted package with integrated control panel",
    ],
    applications: ["Chemical", "Oil & Gas", "Pharma", "Food"],
  },
  "Vertical Axial Flow Pump": {
    image: "/images/vertical-axial-flow-pump.jpg",
    tagline: "Space-saving vertical propeller pump for deep sumps, intake and flood control.",
    description:
      "Vertical suspended-bowl axial flow pump designed to lift large volumes of water or process media from underground sumps, rivers, and intake basins. Requires minimal surface floor space while keeping the motor safely above flood level.",
    specs: [
      { label: "Installation", value: "Vertical column suspended bowl, sump depth up to 10m" },
      { label: "Casing & Column", value: "Cast Iron / Carbon Steel / SS316 / Duplex SS" },
      { label: "Impeller", value: "Axial flow propeller in bronze or stainless steel" },
      { label: "Flow capacity", value: "800 m³/hr to 20,000 m³/hr" },
      { label: "Head range", value: "2 meters to 12 meters" },
      { label: "Lubrication", value: "Product-lubricated or enclosed oil-lubricated line shaft" },
      { label: "Discharge", value: "Above or below floor discharge head options" },
    ],
    benefits: [
      "Submerged impeller ensures zero priming problems or suction cavitation",
      "Minimum surface footprint saves valuable pump house real estate",
      "High-capacity flood, raw water intake, and cooling tower capability",
      "Heavy-duty thrust bearing assembly handles vertical axial loads",
    ],
    applications: ["Chemical", "Oil & Gas", "Dye Manufacturing"],
  },
  "Pump with Priming Chamber": {
    image: "/images/pump-with-priming-chamber.jpg",
    tagline: "Self-priming centrifugal pump package with integrated vacuum priming chamber.",
    description:
      "End-suction centrifugal pump fitted with an external priming tank or vacuum assist chamber. Enables reliable suction lift from underground tanks or pits without the need for manual foot valves or continuous priming water.",
    specs: [
      { label: "Suction lift", value: "Up to 7.5 meters negative suction lift" },
      { label: "Priming chamber", value: "SS304 / SS316 / Epoxy-coated heavy gauge mild steel" },
      { label: "Pump type", value: "Centrifugal end-suction or self-priming non-clog" },
      { label: "Flow capacity", value: "Up to 300 m³/hr" },
      { label: "Head range", value: "Up to 60 meters" },
      { label: "Sealing", value: "Mechanical seal with dry-running oil bath protection" },
      { label: "Solids handling", value: "Up to 20 mm semi-solids (variant dependent)" },
    ],
    benefits: [
      "Eliminates unreliable foot valves and suction line air locks",
      "Automatic re-priming on intermittent or aerated liquid supply",
      "Safe surface-level installation keeps maintenance crews out of sumps",
      "Ideal for effluent pits, solvent transfer, and barge unloading",
    ],
    applications: ["Chemical", "Pharma", "Breweries", "Dye Manufacturing"],
  },
  "SS Milk Pump with Stand": {
    image: "/images/ss-milk-pump-with-stand.jpg",
    tagline: "Hygienic SS316L centrifugal pump on stainless steel trolley for dairy & pharma.",
    description:
      "Ultra-hygienic sanitary centrifugal pump constructed entirely from electropolished SS316L stainless steel. Mounted on a vibration-dampened SS stand or mobile trolley with tri-clover sanitary connections for rapid CIP/SIP cleaning.",
    specs: [
      { label: "Metallurgy", value: "SS316L wetted parts, internal Ra < 0.4 µm mirror finish" },
      { label: "Connections", value: "Sanitary Tri-Clover / SMS / DIN 11851 thread" },
      { label: "Flow capacity", value: "1 m³/hr to 60 m³/hr" },
      { label: "Head range", value: "Up to 45 meters" },
      { label: "Sealing", value: "Food-grade sanitary mechanical seal (FDA & EC 1935/2004)" },
      { label: "Motor", value: "Washdown safe IP66 stainless steel shrouded motor" },
      { label: "Mounting", value: "SS304 mobile trolley with adjustable anti-vibration feet" },
    ],
    benefits: [
      "Zero crevice design prevents bacterial growth and contamination",
      "100% Clean-In-Place (CIP) and Sterilize-In-Place (SIP) compatible",
      "Gentle fluid handling preserves milk fat globules and emulsions",
      "Portable stainless steel trolley allows multi-station plant flexibility",
    ],
    applications: ["Food", "Beverages", "Pharma", "Breweries"],
  },
  "Horizontal Split Case Pump": {
    image: "/images/horizontal-split-case-pump.jpg",
    tagline: "Axially split double-suction pump for high-flow cooling water and utility duties.",
    description:
      "Heavy-duty horizontal split case centrifugal pump featuring an axially split casing and double-suction impeller. Enables complete rotor removal for inspection and maintenance simply by lifting the upper casing half, without disturbing piping or motor alignment.",
    specs: [
      { label: "Casing split", value: "Horizontal axial split, WCB / Cast Iron / Duplex SS" },
      { label: "Impeller", value: "Double-suction closed impeller for balanced axial thrust" },
      { label: "Flow capacity", value: "200 m³/hr to 10,000 m³/hr" },
      { label: "Head range", value: "15 meters to 180 meters" },
      { label: "Bearings", value: "Grease or oil-lubricated heavy-duty ball/roller bearings" },
      { label: "Efficiency", value: "Up to 88% peak hydraulic efficiency" },
      { label: "Sealing", value: "Cartridge mechanical seals or stuffing box gland packing" },
      { label: "Seal Flush / Balance Line", value: "External stainless steel tubing/rod loop with top valve for continuous chamber cooling and pressure balancing" },
    ],
    benefits: [
      "In-line piping remains untouched during major rotor maintenance",
      "Double-suction impeller practically eliminates hydraulic axial thrust",
      "Exceptionally long bearing and seal life under heavy continuous duty",
      "High energy efficiency across large cooling tower and plant utility loops",
    ],
    applications: ["Chemical", "Oil & Gas", "Food", "Dye Manufacturing"],
  },

  // ==========================================
  // 2. MECHANICAL SEALS (14 items)
  // ==========================================
  "Single Spring": {
    tagline: "Unbalanced/balanced pusher seal with a single coil spring for general utility.",
    description:
      "Robust pusher-type mechanical seal featuring a large-diameter single coil spring. Highly resistant to clogging in dirty fluids and wastewater, offering simple installation and long service life across pumps and agitators.",
    specs: [
      { label: "Design", value: "Single coil helical spring, unbalanced/balanced pusher" },
      { label: "Shaft size", value: "10 mm to 100 mm" },
      { label: "Face materials", value: "Carbon / Ceramic / Silicon Carbide (SiC) / Tungsten Carbide" },
      { label: "Secondary seal", value: "FKM (Viton) / EPDM / NBR / PTFE O-rings" },
      { label: "Pressure rating", value: "Up to 10 bar (unbalanced) / up to 25 bar (balanced)" },
      { label: "Temperature", value: "-30 °C to +200 °C (elastomer dependent)" },
      { label: "Speed", value: "Up to 15 m/s rubbing speed" },
    ],
    benefits: [
      "Large open coil spring prevents clogging by fibrous solids and sludge",
      "Self-aligning capability compensates for minor shaft deflection",
      "Direct drop-in replacement for standard industrial pump seal chambers",
      "Cost-effective sealing solution with simple field rebuild capability",
    ],
    applications: ["Chemical", "Food", "Breweries", "Oil & Gas"],
  },
  "Conical Spring": {
    tagline: "Directional single conical spring seal that self-tightens with shaft rotation.",
    description:
      "Compact mechanical seal employing a tapered conical spring that grips the shaft or sleeve, transmitting torque without set screws or drive pins. Complies with DIN 24960 (EN 12756) installation dimensions.",
    specs: [
      { label: "Design", value: "Conical tapered spring, rotation directional (RH / LH)" },
      { label: "Standard", value: "DIN 24960 / EN 12756 L1k short housing" },
      { label: "Shaft size", value: "10 mm to 80 mm" },
      { label: "Face materials", value: "Steatite Ceramic / Carbon / Silicon Carbide" },
      { label: "Secondary seal", value: "FKM / EPDM / NBR O-rings" },
      { label: "Pressure rating", value: "Up to 10 bar" },
      { label: "Temperature", value: "-20 °C to +180 °C" },
    ],
    benefits: [
      "Extremely compact axial length fits tight centrifugal pump housings",
      "Positive torque transmission via spring grip prevents shaft fretting",
      "No set screws required, eliminating shaft scoring and damage",
      "Widely standardized across European and DIN chemical pumps",
    ],
    applications: ["Chemical", "Food", "Beverages"],
  },
  "Wave Spring": {
    tagline: "Compact mechanical seal utilizing a sinus wave spring for short stuffing boxes.",
    description:
      "Engineered mechanical seal utilizing a sinus wave spring instead of traditional helical coils. Reduces the required axial installation length by up to 50%, making it ideal for compact pumps, compressors, and rotary lobe pumps.",
    specs: [
      { label: "Design", value: "Sinus wave spring, balanced/unbalanced pusher" },
      { label: "Shaft size", value: "14 mm to 100 mm" },
      { label: "Face materials", value: "Silicon Carbide / Tungsten Carbide / Premium Carbon" },
      { label: "Secondary seal", value: "FKM / FFKM / PTFE encapsulated O-rings" },
      { label: "Pressure rating", value: "Up to 25 bar" },
      { label: "Temperature", value: "-40 °C to +220 °C" },
      { label: "Spring material", value: "Hastelloy-C / SS316 stainless steel wave spring" },
    ],
    benefits: [
      "Ultra-short axial length solves space constraints in compact pump heads",
      "Uniform 360-degree face loading ensures even wear and low leakage",
      "Wave spring design resists fouling in medium-viscosity fluids",
      "Ideal for rotary lobe, gear, and hygienic hygienic transfer pumps",
    ],
    applications: ["Food", "Pharma", "Chemical", "Beverages"],
  },
  "Multi Spring": {
    tagline: "Multi-spring balanced/unbalanced seal providing uniform face loading.",
    description:
      "The industry standard for chemical process pumps. Uses a series of small peripheral springs around the seal face to distribute mechanical face load with uniform mathematical precision, ensuring even wear and reliable sealing.",
    specs: [
      { label: "Design", value: "Multiple peripheral springs, balanced or unbalanced" },
      { label: "Standard", value: "ISO 3069 / DIN 24960 / API 682 Category 1" },
      { label: "Shaft size", value: "14 mm to 120 mm" },
      { label: "Face materials", value: "Silicon Carbide (SiC) / Tungsten Carbide / Antimony Carbon" },
      { label: "Secondary seal", value: "FKM / FFKM / EPDM / PTFE wedge or O-ring" },
      { label: "Pressure rating", value: "Up to 35 bar (balanced)" },
      { label: "Temperature", value: "-50 °C to +250 °C" },
    ],
    benefits: [
      "Uniform face pressure distribution prevents thermal distortion and blow-by",
      "Springs are isolated from process fluid in internal designs, preventing corrosion",
      "Interchangeable seal faces allow quick reconfiguration for different solvents",
      "Standard fitment across ANSI and ISO chemical process pumps",
    ],
    applications: ["Chemical", "Pharma", "Oil & Gas", "Dye Manufacturing"],
  },
  "Rubber Bellow": {
    tagline: "Elastomer bellows seal where the rubber bellows acts as secondary seal and drive.",
    description:
      "Highly versatile non-pusher mechanical seal featuring an elastomeric bellows that eliminates sliding O-rings on the shaft. The bellows grips the shaft tightly, accommodating shaft runout and preventing fretting corrosion.",
    specs: [
      { label: "Design", value: "Elastomeric rubber bellows, non-pusher, single spring" },
      { label: "Shaft size", value: "10 mm to 100 mm" },
      { label: "Face materials", value: "Carbon / Ceramic / Silicon Carbide" },
      { label: "Bellows material", value: "FKM (Viton) / EPDM / NBR / Neoprene" },
      { label: "Pressure rating", value: "Up to 12 bar" },
      { label: "Temperature", value: "-30 °C to +150 °C" },
      { label: "Drive mechanism", value: "Positive drive through rubber bellows grip" },
    ],
    benefits: [
      "No relative sliding movement on the shaft eliminates fretting wear",
      "Accommodates significant shaft end-play and radial misalignment",
      "Single-piece bellows construction prevents hang-up in dirty water and slurry",
      "Fast, economical replacement for water pumps, chillers, and marine duties",
    ],
    applications: ["Food", "Breweries", "Chemical", "Beverages"],
  },
  "Teflon Bellow": {
    tagline: "Externally mounted PTFE bellows seal engineered for extremely corrosive acids.",
    description:
      "Specialized chemical seal constructed with a machined virgin PTFE bellows and external clamping assembly. Designed for highly aggressive mineral acids, halogens, and solvents where metallic springs cannot contact the liquid.",
    specs: [
      { label: "Design", value: "Externally mounted, PTFE bellows, multi-spring external clamp" },
      { label: "Wetted parts", value: "100% Virgin PTFE / Glass-filled PTFE / SiC / Ceramic" },
      { label: "Shaft size", value: "18 mm to 100 mm" },
      { label: "Face materials", value: "High-purity Ceramic / Silicon Carbide / Glass-filled PTFE" },
      { label: "Pressure rating", value: "Up to 5 bar (external mount)" },
      { label: "Temperature", value: "-20 °C to +120 °C" },
      { label: "Metal parts", value: "Alloy 20 / Hastelloy-C external clamping ring (non-wetted)" },
    ],
    benefits: [
      "Total chemical inertness against concentrated H2SO4, HNO3, HCl, and solvents",
      "External mounting keeps all metal springs and clamps safely outside the media",
      "Eliminates expensive exotic alloy shafts by sealing on standard glass-lined or alloy sleeves",
      "Rapid external installation without dismantling pump casing",
    ],
    applications: ["Chemical", "Dye Manufacturing", "Pharma"],
  },
  "Metal Bellow": {
    tagline: "Edge-welded metal bellows seal for high-temperature heat transfer oils and hydrocarbons.",
    description:
      "High-performance mechanical seal featuring an edge-welded metal bellows that acts as both spring element and secondary sealing barrier. Eliminates elastomer O-ring temperature limits, excelling in hot oil, refinery, and cryogenic service.",
    specs: [
      { label: "Design", value: "Edge-welded metal bellows, non-pusher, balanced" },
      { label: "Bellows material", value: "Alloy 718 (Inconel) / Hastelloy-C / AM350" },
      { label: "Shaft size", value: "19 mm to 100 mm" },
      { label: "Face materials", value: "Silicon Carbide / Tungsten Carbide / Premium Carbon" },
      { label: "Secondary seal", value: "Flexible Graphite (Grafoil) rings — zero elastomer" },
      { label: "Pressure rating", value: "Up to 25 bar" },
      { label: "Temperature", value: "-75 °C to +400 °C (with graphite secondary)" },
    ],
    benefits: [
      "Operates at extreme temperatures up to 400 °C without elastomer degradation",
      "Self-cleaning welded bellows design prevents clogging and coking in hot oil",
      "Eliminates O-ring hang-up and shaft fretting in high-vibration refinery pumps",
      "Hydraulically balanced for high-pressure hydrocarbon and boiler feed duty",
    ],
    applications: ["Oil & Gas", "Chemical", "Plastics"],
  },
  "Cartridge Seals": {
    tagline: "Pre-assembled single cartridge seal with sleeve and gland plate for zero-error fitting.",
    description:
      "Self-contained mechanical seal cartridge pre-assembled on a shaft sleeve with gland plate and centering clips. Eliminates measuring, scribing, and impeller gap setting errors during plant maintenance shutdowns.",
    specs: [
      { label: "Configuration", value: "Single cartridge, balanced, stationary/rotary head" },
      { label: "Standard", value: "Fits ANSI B73.1 / ISO 2858 big bore and taper bore seal chambers" },
      { label: "Shaft size", value: "24 mm to 120 mm (1 inch to 4.75 inch)" },
      { label: "Face materials", value: "Silicon Carbide vs Silicon Carbide / SiC vs Carbon" },
      { label: "Metallurgy", value: "SS316 / Duplex SS / Hastelloy-C wetted hardware" },
      { label: "Pressure rating", value: "Up to 25 bar" },
      { label: "Flush ports", value: "Integrated API Plan 11, 13, 21, or 32 flush connections" },
    ],
    benefits: [
      "Foolproof drop-in installation cuts pump maintenance turnaround by 75%",
      "Pre-set working height prevents premature face failure from incorrect spring compression",
      "Integrated flush ports provide positive face cooling and lubrication",
      "Heavy-duty drive collar handles high starting torque without shaft slipping",
    ],
    applications: ["Chemical", "Pharma", "Food", "Oil & Gas"],
  },
  "Double Cartridge Seal": {
    tagline: "Dual cartridge seal assembly arranged in tandem or back-to-back with barrier fluid.",
    description:
      "Advanced dual cartridge mechanical seal containing two pairs of sealing faces with an internal barrier fluid chamber. Designed for zero emissions on toxic, carcinogenic, abrasive, or crystallizing process fluids.",
    specs: [
      { label: "Configuration", value: "Double cartridge (Back-to-Back, Tandem, or Face-to-Face)" },
      { label: "Compliance", value: "API 682 Type A/B, Arrangement 2 or 3" },
      { label: "Shaft size", value: "24 mm to 140 mm" },
      { label: "Face materials", value: "Inboard: SiC vs SiC / Outboard: SiC vs Carbon" },
      { label: "Barrier fluid", value: "Compatible with API Plan 52 (buffer) or Plan 53A/B/C (barrier)" },
      { label: "Pressure rating", value: "Up to 40 bar barrier pressure" },
      { label: "Temperature", value: "-40 °C to +260 °C" },
    ],
    benefits: [
      "Zero process emissions to atmosphere — guarantees EPA and environmental compliance",
      "Barrier fluid lubricates and cools seal faces even if pump runs dry",
      "Handles up to 40% abrasive slurries without particles entering sealing interface",
      "Complete modular cartridge allows rapid changeout on critical reactor pumps",
    ],
    applications: ["Chemical", "Oil & Gas", "Pharma", "Dye Manufacturing"],
  },
  "Grundfos": {
    tagline: "Dedicated OEM replacement mechanical seal kits designed for Grundfos pump ranges.",
    description:
      "Precision-engineered direct replacement mechanical seal assemblies for Grundfos CR, CRN, CH, and TP multistage inline pumps. 100% dimensionally identical to OEM part numbers for plug-and-play maintenance.",
    specs: [
      { label: "Compatibility", value: "Grundfos CR, CRN, CRI, CH, TP, and NB pump series" },
      { label: "Shaft size", value: "12 mm, 16 mm, 22 mm, 28 mm, 33 mm standard sizes" },
      { label: "Seal types", value: "HQQE, HQQV, HUBB, BUBE OEM code equivalents" },
      { label: "Face materials", value: "Silicon Carbide vs Silicon Carbide / Tungsten Carbide vs SiC" },
      { label: "Elastomers", value: "EPDM (water/clean CIP) or FKM Viton (chemicals/hot water)" },
      { label: "Pressure rating", value: "Up to 25 bar multistage operating pressure" },
      { label: "Temperature", value: "-30 °C to +150 °C" },
    ],
    benefits: [
      "100% drop-in dimensional fit — no pump modification or shaft adaptation needed",
      "Premium Silicon Carbide faces resist thermal shock in boiler feed duty",
      "Significant cost savings and immediate stock availability vs OEM spare kits",
      "Available in potable water certified EPDM and chemical resistant FKM grades",
    ],
    applications: ["Food", "Beverages", "Chemical", "Pharma"],
  },
  "Grundfos — Star Type": {
    tagline: "Star-drive splined seal assembly for newer generation Grundfos CR pumps.",
    description:
      "Specialized splined 'star-drive' mechanical seal cartridge designed for new generation Grundfos CR and CRN multistage pumps. The hex/star drive mechanism provides positive torque transfer directly from the shaft sleeve.",
    specs: [
      { label: "Drive mechanism", value: "Splined hex / star positive torque engagement" },
      { label: "Compatibility", value: "New generation Grundfos CR 10, 15, 20, 32, 45, 64, 90, 150 series" },
      { label: "Shaft size", value: "12 mm, 16 mm, 22 mm star-drive sleeves" },
      { label: "Face materials", value: "Sintered Silicon Carbide vs Silicon Carbide (SiC/SiC)" },
      { label: "Secondary seal", value: "Peroxide-cured EPDM or FKM O-rings" },
      { label: "Pressure rating", value: "Up to 30 bar high-pressure multistage rating" },
      { label: "Temperature", value: "-30 °C to +180 °C" },
    ],
    benefits: [
      "Star-drive spline eliminates drive collar slipping under high start-up torque",
      "Pre-assembled cartridge design allows seal replacement in under 15 minutes",
      "Optimized hydraulic balance prevents face popping during pressure surges",
      "Cold-chain safe storage ensures elastomer freshness upon installation",
    ],
    applications: ["Food", "Pharma", "Chemical", "Breweries"],
  },
  "Agitator Reactor Seal": {
    tagline: "Top/side entering double seal assembly for chemical reactors and fermenters.",
    description:
      "Heavy-duty top and side entering double mechanical seal engineered for chemical reaction vessels, fermenters, and mixing autoclaves. Accommodates severe shaft runout, angular deflection, and thermal expansion.",
    specs: [
      { label: "Configuration", value: "Top/bottom entering double seal, dry-running or liquid-lubricated" },
      { label: "Flange mount", value: "DIN 28138 / DIN 28154 sanitary and glass-lined vessel flanges" },
      { label: "Shaft size", value: "30 mm to 200 mm" },
      { label: "Runout tolerance", value: "Accommodates up to 3.0 mm radial shaft runout & deflection" },
      { label: "Face materials", value: "Silicon Carbide / Carbon / FDA-grade Tungsten Carbide" },
      { label: "Bearing support", value: "Optional integrated double floating roller bearing cartridge" },
      { label: "Pressure rating", value: "Full vacuum (0.1 bar abs) to 25 bar reactor pressure" },
    ],
    benefits: [
      "Engineered to survive extreme shaft whipping in high-viscosity polymer mixing",
      "Dry-running nitrogen barrier options eliminate liquid contamination of pure pharma batches",
      "Sanitary debris well prevents seal face wear particles from entering product",
      "Integrated cooling jacket maintains stable face temperature during exothermic reactions",
    ],
    applications: ["Pharma", "Chemical", "Dye Manufacturing", "Food"],
  },
  "Rotary Union": {
    tagline: "Precision rotating joint for transferring steam, thermal oil, or coolant into rotating rolls.",
    description:
      "High-precision rotating mechanical union designed to introduce or remove heating steam, hot oil, cooling water, or hydraulic fluid into rotating dryer rolls, calenders, and mixer drums without leakage.",
    specs: [
      { label: "Passages", value: "Single passage or dual passage (fixed / rotating syphon pipe)" },
      { label: "Connections", value: "1/4 inch to 4 inch BSP / NPT threaded or flanged rotor end" },
      { label: "Media", value: "Saturated steam, hot thermal oil, cooling water, compressed air" },
      { label: "Max Speed", value: "Up to 3000 RPM (size and media dependent)" },
      { label: "Max Pressure", value: "Up to 40 bar hydraulic / 17 bar steam" },
      { label: "Max Temperature", value: "Up to 300 °C (with graphite/spherical carbon seal ring)" },
      { label: "Seal interface", value: "Micro-lapped spherical carbon-graphite vs hardened steel/SiC" },
    ],
    benefits: [
      "Spherical carbon seal ring allows self-alignment and compensates for roll eccentricity",
      "Two-wide spaced ball bearings provide rigid rotor support and smooth high-speed rotation",
      "Quick-release end cap allows carbon seal ring replacement while union remains on machine",
      "Spring-loaded seal interface maintains positive leak-tight contact during pressure drops",
    ],
    applications: ["Plastics", "Chemical", "Dye Manufacturing", "Food"],
  },
  "Rotary Joint": {
    tagline: "High-speed, multi-passage rotary joint for CNC automation and hydraulic clamping.",
    description:
      "Compact, multi-passage rotary joint engineered for high-speed machine tool spindles, indexing tables, and automated manufacturing cells. Transfers coolant, hydraulic clamping oil, and pneumatic air simultaneously.",
    specs: [
      { label: "Passages", value: "2, 4, 6, or 8 independent fluid/air passages" },
      { label: "Speed rating", value: "Up to 5000 RPM continuous rotation" },
      { label: "Pressure rating", value: "Up to 250 bar hydraulic clamping pressure / 10 bar air" },
      { label: "Seal design", value: "Balanced mechanical seal or specialized gap-controlled hydrostatic seal" },
      { label: "Rotor material", value: "Hardened and ground stainless steel with ceramic coating" },
      { label: "Housing", value: "Anodized aluminium or stainless steel with drainage ports" },
      { label: "Filtration", value: "Requires 10 µm media filtration for maximum seal lifespan" },
    ],
    benefits: [
      "Multi-lumen design allows independent transfer of dissimilar fluids without cross-talk",
      "Low rotational torque prevents spindle motor drag and heat generation at high speeds",
      "Integrated labyrinth drain ports protect spindle bearings from accidental seal leakage",
      "Ultra-compact housing fits directly into rotary indexing tables and robotic end-effectors",
    ],
    applications: ["Plastics", "Chemical", "Oil & Gas"],
  },

  // ==========================================
  // 3. ELASTOMERS (15 items)
  // ==========================================
  "Oil Seal": {
    tagline: "Rotary shaft lip seals (TC, SC, nitrile, FKM, silicone) with spring-loaded sealing lips.",
    description:
      "Precision metal-cased and rubber-covered rotary shaft oil seals featuring a garter spring-loaded sealing lip and secondary dust lip (TC design). Prevents lubricant escape while excluding external dirt and moisture in gearboxes and motors.",
    specs: [
      { label: "Profiles", value: "TC (double lip with spring), SC (single lip), TA, SA, TB, SB" },
      { label: "Elastomer grades", value: "NBR (Nitrile) / FKM (Viton) / Silicone / Polyacrylate (ACM)" },
      { label: "Metal case", value: "Carbon steel SPCC or SS304 / SS316 outer case and garter spring" },
      { label: "Shaft diameter", value: "6 mm to 500 mm metric and imperial dimensions" },
      { label: "Pressure limit", value: "Up to 0.5 bar (standard) / up to 5 bar (special pressure lip)" },
      { label: "Temperature", value: "-40 °C to +200 °C (FKM grade)" },
      { label: "Shaft speed", value: "Up to 25 m/s peripheral surface velocity" },
    ],
    benefits: [
      "Precision garter spring maintains constant radial lip load over years of service",
      "Outer rubber coating compensates for minor housing bore imperfections and thermal expansion",
      "Secondary auxiliary dust lip prevents ingress of abrasive grit and washdown water",
      "Available in chemical and heat-resistant FKM Viton for synthetic gearbox lubricants",
    ],
    applications: ["Chemical", "Food", "Plastics", "Oil & Gas"],
  },
  "O-Rings": {
    tagline: "Precision moulded O-rings in FKM, FFKM, EPDM, NBR, and Silicone to AS568 & metric sizes.",
    description:
      "The universal toroidal seal for static and dynamic fluid power applications. Compression moulded with zero flash and tight cross-sectional tolerances, available in thousands of standard AS568, BS1806, and ISO 3601 sizes.",
    specs: [
      { label: "Standards", value: "AS568 (USA), BS1806 / BS4518 (UK), ISO 3601, JIS B2401" },
      { label: "Compounds", value: "NBR, EPDM, FKM (Viton), FFKM (Kalrez equiv), Silicone, HNBR" },
      { label: "Hardness", value: "70 Shore A (standard), 80/90 Shore A for high pressure" },
      { label: "Cross section (CS)", value: "1.0 mm to 15.0 mm cord thickness" },
      { label: "Internal dia (ID)", value: "1.5 mm to 1500 mm continuous moulded sizes" },
      { label: "Compliance", value: "FDA 21 CFR 177.2600, USP Class VI, WRAS, EC 1935/2004 available" },
      { label: "Temperature", value: "-60 °C to +320 °C (with FFKM perfluoroelastomer)" },
    ],
    benefits: [
      "Ultra-smooth surface finish and flash-free parting lines guarantee zero leak paths",
      "Extensive inventory of common metric and AS568 sizes for immediate same-day dispatch",
      "Custom compound formulation for extreme chemical resistance against aggressive solvents",
      "Complete batch traceability with physical property test certificates upon request",
    ],
    applications: ["Chemical", "Pharma", "Food", "Beverages", "Oil & Gas"],
  },
  "Butterfly Gasket": {
    tagline: "Replacement elastomer seat liners and gaskets for wafer and lug-style butterfly valves.",
    description:
      "Heavy-duty elastomeric valve seat liners designed for concentric wafer, lug, and flanged butterfly valves. Provides bubble-tight bi-directional shut-off while isolating the valve body from the corrosive process media.",
    specs: [
      { label: "Compatibility", value: "Fits standard 2 inch to 24 inch (DN50 to DN600) butterfly valves" },
      { label: "Elastomers", value: "EPDM / FKM (Viton) / NBR / PTFE-bonded EPDM / Silicone" },
      { label: "Seat profile", value: "Boot-style seat liner with integrated flange sealing ribs" },
      { label: "Pressure rating", value: "PN10 / PN16 / ANSI Class 150 bi-directional bubble-tight rating" },
      { label: "Temperature", value: "-30 °C to +180 °C (compound dependent)" },
      { label: "Backing ring", value: "Rigid phenolic or aluminum insert ring reinforced options" },
    ],
    benefits: [
      "Integrated O-ring ribs on flange face eliminate the need for separate flange gaskets",
      "Low operating torque geometry reduces valve actuator sizing requirements",
      "High abrasion resistance against slurries, dry powders, and pneumatic conveying lines",
      "Food-grade EPDM and white silicone options certified for hygienic beverage lines",
    ],
    applications: ["Food", "Chemical", "Beverages", "Breweries"],
  },
  "PTFE Envelope Gasket": {
    tagline: "PTFE outer sheath with EPDM/NBR rubber insert for maximum chemical resistance.",
    description:
      "Composite flange gasket combining the universal chemical inertness of a virgin PTFE outer envelope with the high resilience and recovery of an internal elastomeric or CNAF core. Ideal for glass-lined and plastic pipe flanges.",
    specs: [
      { label: "Construction", value: "Machined or slit virgin PTFE envelope with insert core" },
      { label: "Core material", value: "EPDM rubber / NBR rubber / CNAF non-asbestos sheet" },
      { label: "Flange standard", value: "ANSI B16.21 Class 150/300, DIN PN10/16/25/40, JIS" },
      { label: "Pipe sizes", value: "1/2 inch to 24 inch (DN15 to DN600)" },
      { label: "pH range", value: "pH 0 to 14 total chemical immunity (except molten alkali metals)" },
      { label: "Temperature", value: "-50 °C to +200 °C" },
      { label: "Bolt torque", value: "Low seating stress required — ideal for fragile glass-lined flanges" },
    ],
    benefits: [
      "100% protection of the resilient core from corrosive acids, halogens, and solvents",
      "Low bolt load seating prevents cracking of glass-lined reactors and FRP/PVDF flanges",
      "FDA compliant virgin PTFE surface prevents product contamination in pharma synthesis",
      "Reusable envelope design allows core replacement during scheduled piping inspections",
    ],
    applications: ["Chemical", "Pharma", "Dye Manufacturing"],
  },
  "Champion Gasket": {
    tagline: "Compressed non-asbestos fiber (CNAF) and graphite jointing gaskets cut to standard.",
    description:
      "High-pressure jointing gaskets cut from genuine Champion and premium CNAF compressed non-asbestos fiber sheets. Impregnated with heat-resistant binders and nitrile rubber for reliable sealing on steam, water, and oil flanges.",
    specs: [
      { label: "Sheet grades", value: "Champion Style 39, Style 54, Style 51, Metallic wire reinforced" },
      { label: "Flange standards", value: "ASME B16.21, DIN 2690, EN 1514-1 raised & full face" },
      { label: "Thickness", value: "1.5 mm, 2.0 mm, 3.0 mm standard stock thicknesses" },
      { label: "Max Pressure", value: "Up to 100 bar (grade and thickness dependent)" },
      { label: "Max Temperature", value: "Up to 400 °C continuous steam/oil service" },
      { label: "Surface treatment", value: "Anti-stick graphite coating on both faces available" },
    ],
    benefits: [
      "Asbestos-free formulation fully compliant with international health & safety standards",
      "High compressive strength resists creep relaxation and bolt torque loss over time",
      "Precision CNC flash cutting ensures dimensional accuracy without tooling delays",
      "Excellent blow-out resistance on high-pressure steam boiler headers and refinery piping",
    ],
    applications: ["Chemical", "Oil & Gas", "Plastics", "Food"],
  },
  "Metallic & Non-Metallic Gasket": {
    tagline: "Spiral wound, ring joint (RTJ), and full-face rubber gaskets for industrial piping.",
    description:
      "A comprehensive portfolio of metallic and semi-metallic gaskets for critical high-pressure and high-temperature joints. Includes ASME B16.20 spiral wound gaskets with inner/outer rings and API 6A Ring Type Joints (RTJ).",
    specs: [
      { label: "Spiral Wound (SWG)", value: "SS316/SS304 winding with Flexible Graphite or PTFE filler" },
      { label: "Guide rings", value: "Carbon steel outer centering ring / SS316 inner reinforcing ring" },
      { label: "Ring Type Joint (RTJ)", value: "Style R (oval/octagonal), RX, and BX in Soft Iron or SS316" },
      { label: "Non-Metallic", value: "Full-face and ring gaskets in Neoprene, EPDM, FKM, Silicone" },
      { label: "Pressure rating", value: "ANSI Class 150 to Class 2500 / API up to 15,000 PSI" },
      { label: "Temperature", value: "-200 °C (cryogenic) to +550 °C (graphite SWG)" },
    ],
    benefits: [
      "Spiral wound V-shape metal crown provides spring-like elastic recovery under thermal cycling",
      "Inner stainless steel ring prevents radial buckling and protects gasket from media erosion",
      "RTJ metal-to-metal sealing handles ultra-high pressure oilfield wellheads and manifolds",
      "Manufactured in strict compliance with ASME, API, and DIN piping specifications",
    ],
    applications: ["Oil & Gas", "Chemical", "Pharma"],
  },
  "Tri-clover Gaskets": {
    tagline: "Sanitary clamp gaskets in EPDM, Platinum Silicone, FKM & PTFE for hygienic lines.",
    description:
      "Sanitary hygienic clamping gaskets designed for Tri-Clamp (Tri-Clover) fittings in dairy, beverage, pharmaceutical, and biotechnology processing lines. Moulded with absolute dimensional precision to ensure zero interior protrusion.",
    specs: [
      { label: "Standards", value: "BS 4825-3, ASME BPE, DIN 32676, ISO 2852 sanitary clamp sizes" },
      { label: "Size range", value: "1/2 inch to 8 inch (DN10 to DN200) standard tri-clamp sizes" },
      { label: "Compounds", value: "Platinum Cured Silicone / EPDM / FKM (Viton) / Solid PTFE / PTFE-EPDM" },
      { label: "Compliance", value: "FDA 21 CFR 177.2600, USP Class VI (<87> & <88>), 3-A Sanitary" },
      { label: "Temperature", value: "-50 °C to +230 °C (compound dependent)" },
      { label: "Screen gaskets", value: "Available with integrated SS316 filter mesh (10 to 100 mesh)" },
    ],
    benefits: [
      "Zero interior step or crevice alignment prevents bacterial accumulation in piping lines",
      "Outgassing-free and non-leaching formulations preserve taste, aroma, and drug purity",
      "Excellent resistance to repetitive Clean-In-Place (CIP) caustic and acid sterilization",
      "Color-coded compounds available for easy plant-wide maintenance identification",
    ],
    applications: ["Food", "Pharma", "Beverages", "Breweries"],
  },
  "Black Rubber Diaphragm": {
    tagline: "Nylon/fabric-reinforced elastomer diaphragms for AODD pumps and control valves.",
    description:
      "High-flexibility elastomeric diaphragms reinforced with high-tenacity nylon or polyester fabric weave. Engineered for air-operated double diaphragm (AODD) pumps, pneumatic control valves, and pressure reducing regulators.",
    specs: [
      { label: "Elastomer matrix", value: "NBR (Nitrile) / Neoprene / EPDM / FKM (Viton) / Butyl" },
      { label: "Fabric reinforcement", value: "High-tensile Nylon 6.6 / Polyester / Nomex woven fabric" },
      { label: "PTFE facing", value: "Optional two-piece or bonded virgin PTFE media-contact overlay" },
      { label: "Size range", value: "25 mm to 600 mm diameter, convoluted or flat profiles" },
      { label: "Pressure differential", value: "Up to 16 bar dynamic pulsing pressure differential" },
      { label: "Flex life", value: "Engineered for >10 million continuous flexing cycles" },
    ],
    benefits: [
      "Fabric reinforcement prevents rupture and tearing under high-pressure pneumatic pulsing",
      "Convoluted rolling profile ensures frictionless, linear stroke travel without hysteresis",
      "Exact OEM replacement fit for Wilden, Sandpiper, Aro, and Graco AODD pumps",
      "PTFE-faced variants handle pure solvents, aggressive acids, and abrasive slurries",
    ],
    applications: ["Chemical", "Dye Manufacturing", "Pharma", "Food"],
  },
  "Rubber Extruded Cord": {
    tagline: "Endless vulcanized or cut-to-length O-ring cord stock in Nitrile, FKM & Sponge.",
    description:
      "Precision extruded solid and cellular (sponge) rubber cord stock. Used for manufacturing large-diameter custom O-rings by site vulcanizing/splicing, or as continuous groove seals on large container lids, enclosures, and hatch doors.",
    specs: [
      { label: "Cross section (CS)", value: "1.5 mm to 30.0 mm diameter round cord (square profiles available)" },
      { label: "Compounds", value: "NBR 70 Shore A / FKM Viton / EPDM / Neoprene / Silicone" },
      { label: "Sponge cord", value: "EPDM and Silicone closed-cell sponge (15 to 30 Shore A equiv)" },
      { label: "Tolerances", value: "Extruded to ISO 3302-1 Class E1/E2 precision tolerances" },
      { label: "Supply format", value: "10m, 25m, 50m continuous spools or custom vulcanized rings" },
      { label: "Temperature", value: "-40 °C to +250 °C (material dependent)" },
    ],
    benefits: [
      "Allows immediate emergency creation of non-standard large O-rings on plant floor",
      "Closed-cell sponge cord provides excellent weatherproofing and IP67 dust sealing",
      "High extrusion density prevents compression set and flattening over long periods",
      "Viton cord stock handles hot chemical vapor sealing in large reactor dome covers",
    ],
    applications: ["Chemical", "Food", "Plastics", "Oil & Gas"],
  },
  "PU Seal": {
    tagline: "High-tensile Polyurethane (PU) U-cups, rod seals, and wiper rings for hydraulics.",
    description:
      "Heavy-duty thermoplastic polyurethane (TPU) hydraulic seals engineered for mobile and industrial hydraulic cylinders. Exhibits exceptional tensile strength, abrasion resistance, and extrusion resistance compared to standard rubber.",
    specs: [
      { label: "Profiles", value: "U-cup rod seals, piston seals, wiper/scraper rings, buffer seals" },
      { label: "Material grade", value: "High-performance ether/ester-based Polyurethane (90–95 Shore A)" },
      { label: "Operating pressure", value: "Up to 400 bar hydraulic working pressure without back-up rings" },
      { label: "Shaft speed", value: "Up to 0.5 m/s reciprocating stroking speed" },
      { label: "Temperature", value: "-35 °C to +110 °C continuous hydraulic oil temperature" },
      { label: "Fluid compatibility", value: "Mineral hydraulic oils (HLP), lubricating oils, water-glycol" },
    ],
    benefits: [
      "5× to 10× higher wear and abrasion resistance compared to traditional nitrile rubber seals",
      "Superior extrusion resistance prevents nibbling under high-pressure hydraulic spikes",
      "Sharp sealing lip geometry scrapes away dried mud, ice, and dirt on cylinder rods",
      "Low friction characteristics prevent stick-slip during slow precision hydraulic movements",
    ],
    applications: ["Plastics", "Oil & Gas", "Chemical"],
  },
  "Rubber Sheet": {
    tagline: "Commercial and premium grade rubber sheeting in NBR, Neoprene, EPDM, and Viton.",
    description:
      "High-grade industrial elastomeric sheeting in roll or slab form. Engineered for site gasket cutting, flange jointing, acoustic dampening, shot-blast booth lining, and chemical resistance table covering.",
    specs: [
      { label: "Elastomer types", value: "NBR (Nitrile), Neoprene (CR), EPDM, Natural Rubber (NR), FKM (Viton)" },
      { label: "Thickness range", value: "1.0 mm to 50.0 mm thickness in 1200mm / 1500mm roll widths" },
      { label: "Reinforcement", value: "Available as pure rubber or 1-ply / 2-ply cotton/nylon fabric insertion" },
      { label: "Hardness", value: "40, 50, 60, 70, 80 Shore A hardness grades" },
      { label: "Surface finish", value: "Smooth both sides, or cloth-impression finish for bonding" },
      { label: "Specialty grades", value: "White FDA food grade, electrical insulating (up to 33kV), shot-blast tan" },
    ],
    benefits: [
      "Consistent thickness and vulcanization across entire roll width ensures uniform gaskets",
      "Fabric-reinforced insertion sheets prevent tearing and bolt torque extrusion on wide flanges",
      "White FDA nitrile and EPDM sheets certified for direct food and pharmaceutical contact",
      "High-abrasion pure natural rubber (Para/Tan) provides exceptional chute and hopper lining",
    ],
    applications: ["Chemical", "Food", "Plastics", "Oil & Gas"],
  },
  "PTFE Tubes": {
    tagline: "Extruded virgin and carbon/bronze-filled PTFE tubing and hollow bar stock.",
    description:
      "High-precision extruded and compression-moulded polytetrafluoroethylene (PTFE) tubing, pipes, and hollow cylinders. Used for conveying highly corrosive chemicals, or as machining stock for custom valve seats, bushings, and insulators.",
    specs: [
      { label: "Material grades", value: "100% Virgin PTFE, 25% Carbon-filled, 15% Glass-filled, 60% Bronze-filled" },
      { label: "Size range", value: "OD 4 mm to 300 mm / Wall thickness 1.0 mm to 50 mm" },
      { label: "Chemical resistance", value: "Inert to virtually all chemicals and solvents (pH 0 to 14)" },
      { label: "Temperature range", value: "-200 °C to +260 °C continuous service temperature" },
      { label: "Dielectric strength", value: "Excellent electrical insulation (up to 40 kV/mm)" },
      { label: "Friction coeff.", value: "Lowest coefficient of friction of any known solid material (0.05)" },
    ],
    benefits: [
      "Zero moisture absorption and total non-wetting surface prevent product build-up",
      "Carbon and bronze-filled grades offer 500× better wear resistance for machined bushings",
      "Easily machined using standard lathes and milling tools to produce intricate valve components",
      "FDA and USP Class VI compliant virgin grades ensure zero contamination in medical/pharma use",
    ],
    applications: ["Chemical", "Pharma", "Food", "Dye Manufacturing"],
  },
  "Nylon Cable Tie": {
    tagline: "Heavy-duty industrial polyamide 6.6 cable ties, UV-resistant black and natural.",
    description:
      "Industrial-strength self-locking cable ties manufactured from high-impact Polyamide 6.6 (Nylon). Designed for bundling electrical wiring, securing pneumatic hoses, and attaching identification tags in harsh processing plants.",
    specs: [
      { label: "Material", value: "Virgin Polyamide 6.6 (Nylon 6.6), halogen-free and silicone-free" },
      { label: "Tensile strength", value: "8 kg (approx. 18 lb) to 114 kg (250 lb) heavy-duty loop tensile" },
      { label: "Length & Width", value: "100 mm to 1000 mm length / 2.5 mm to 12.6 mm width" },
      { label: "Color options", value: "Natural white (indoor) / UV-stabilized carbon black (outdoor)" },
      { label: "Flammability", value: "UL 94 V-2 self-extinguishing flame retardant rating" },
      { label: "Operating temp.", value: "-40 °C to +85 °C continuous (heat stabilized up to +105 °C available)" },
    ],
    benefits: [
      "Precision ratchet teeth and bent tip design allow fast, low-insertion-force manual zipping",
      "UV-stabilized black ties resist solar radiation degradation in outdoor refinery cable trays",
      "High loop tensile strength prevents accidental snapping under heavy cable bundle loads",
      "Resistant to oils, greases, and common plant cleaning solvents",
    ],
    applications: ["Chemical", "Oil & Gas", "Food", "Plastics"],
  },
  "Custom Rubber Products": {
    tagline: "Client-drawing specific rubber-to-metal bonded dampers, bellows & grommets.",
    description:
      "Tailor-made elastomeric mouldings and rubber-to-metal bonded assemblies produced exactly to customer CAD drawings or samples. We utilize compression, transfer, and injection moulding across all polymer classes.",
    specs: [
      { label: "Moulding methods", value: "Precision compression moulding, transfer moulding, and injection" },
      { label: "Elastomers", value: "FKM, FFKM, EPDM, NBR, HNBR, Neoprene, Butyl, Polyacrylic, Silicone" },
      { label: "Metal bonding", value: "Chemlok rubber-to-metal bonding on SS304/SS316, brass, and steel" },
      { label: "Tooling", value: "In-house CNC mould tool design and rapid prototyping" },
      { label: "Quality control", value: "100% optical inspection, hardness testing, and dimensional verification" },
      { label: "Lead time", value: "Rapid prototype samples in 10–15 days from drawing approval" },
    ],
    benefits: [
      "Complete engineering support from compound formulation to final geometric tolerance analysis",
      "Rubber-to-metal bonding exhibits bond tear strength exceeding the tensile strength of the rubber",
      "Solves obsolete OEM spare part problems by reverse-engineering worn plant components",
      "Economical production runs accommodating both small batch prototypes and large annual contracts",
    ],
    applications: ["Chemical", "Pharma", "Food", "Oil & Gas"],
  },
  "Suction Cups": {
    tagline: "Vacuum suction cups and bellows pads in non-marking silicone, NBR & PU.",
    description:
      "High-grip vacuum suction cups and bellow gripper pads engineered for automated robotic pick-and-place packaging, sheet metal handling, and carton erecting. Features single and multi-fold bellows for handling curved or uneven surfaces.",
    specs: [
      { label: "Profiles", value: "Flat cups, single-fold bellows, 1.5-fold bellows, multi-fold bellows" },
      { label: "Materials", value: "Non-marking Silicone (white/translucent), NBR (black), Polyurethane (blue)" },
      { label: "Diameter range", value: "5 mm to 250 mm diameter" },
      { label: "Fittings", value: "Integrated aluminum or stainless steel G1/8, G1/4, M5 threaded nipples" },
      { label: "Temperature", value: "-30 °C to +200 °C (Silicone) / -10 °C to +80 °C (NBR/PU)" },
      { label: "Compliance", value: "FDA food-grade silicone options for direct contact with food parcels" },
    ],
    benefits: [
      "Multi-fold bellows design absorbs workpiece height variations and grips curved packages cleanly",
      "Ultra-soft silicone lip conforms to textured cardboard cartons and flexible foil pouches",
      "Non-marking silicone compounds leave zero oil rings or chemical residue on pristine glass/pharma vials",
      "Quick-change push-in fittings minimize robot end-effector maintenance downtime",
    ],
    applications: ["Food", "Pharma", "Beverages", "Plastics"],
  },

  // ==========================================
  // 4. SILICONE (9 items)
  // ==========================================
  "Silicone Sheet": {
    tagline: "Translucent and white platinum-cured silicone sheeting compliant with FDA & USP.",
    description:
      "Premium food and pharmaceutical grade silicone rubber sheeting manufactured from high-purity platinum or peroxide-cured silicone compounds. Combines extreme temperature flexibility with total physiological inertness.",
    specs: [
      { label: "Cure system", value: "Platinum-cured (ultra-pure, tear resistant) or Peroxide-cured" },
      { label: "Compliance", value: "FDA 21 CFR 177.2600, USP Class VI, EC 1935/2004, WRAS certified" },
      { label: "Thickness", value: "0.5 mm to 25.0 mm thickness in 1000mm / 1200mm roll widths" },
      { label: "Hardness", value: "40, 50, 60, 70 Shore A (±5 Shore A tolerance)" },
      { label: "Color", value: "Standard translucent, medical white, red iron oxide, or custom blue" },
      { label: "Temperature", value: "-60 °C to +230 °C continuous (+260 °C intermittent peak)" },
    ],
    benefits: [
      "Completely odorless, tasteless, and non-toxic — will not taint sensitive food or drug batches",
      "Exceptional resistance to UV, ozone, weathering, and fungal growth over decades of use",
      "Withstands repeated Clean-In-Place (CIP) and steam autoclaving sterilization cycles",
      "High elongation and tear strength allow easy gasketing on irregular vessel flanges",
    ],
    applications: ["Food", "Pharma", "Beverages", "Breweries"],
  },
  "Silicone Bellows": {
    tagline: "Flexible, cleanroom-moulded silicone dust boots and expansion joints for chutes.",
    description:
      "Hygienic flexible silicone bellows and expansion joints designed for powder transfer chutes, vibratory feeders, and weighing cells in pharma and food plants. Isolates mechanical vibration while maintaining an airtight sterile seal.",
    specs: [
      { label: "Construction", value: "Seamless compression moulded or hand-built fabric-reinforced" },
      { label: "Material grade", value: "100% Platinum Cured Silicone, translucent or white FDA/USP Class VI" },
      { label: "Reinforcement", value: "Optional polyester or Nomex fabric ply for positive pressure lines" },
      { label: "Diameter range", value: "50 mm to 800 mm internal diameter, custom convolute counts" },
      { label: "End fittings", value: "Plain cuff for worm clamps or integrated Tri-Clover sanitary flanges" },
      { label: "Temperature", value: "-60 °C to +220 °C continuous operating range" },
    ],
    benefits: [
      "Translucent walls allow visual inspection of powder flow and blockage detection without removal",
      "Ultra-smooth interior surface prevents powder retention and bacterial cross-contamination",
      "Highly flexible convolutes absorb 3D mechanical vibration on load cells without damping errors",
      "CIP and SIP cleanable without removing bellows from the processing line",
    ],
    applications: ["Pharma", "Food", "Beverages"],
  },
  "Extruded Door Gasket": {
    tagline: "Custom silicone profile extrusions (D-profiles, E-profiles) for ovens and autoclaves.",
    description:
      "Continuous lengths of extruded silicone rubber sealing profiles. Specifically designed for sealing door perimeters on industrial drying ovens, sterilization autoclaves, environmental test chambers, and cleanroom airlocks.",
    specs: [
      { label: "Profiles", value: "D-section, E-section, P-section, T-bar, lip seals, box profiles, custom" },
      { label: "Material grade", value: "High-temperature silicone (up to 260°C) or steam-resistant grades" },
      { label: "Hardness", value: "40, 50, 60, 70 Shore A solid, or closed-cell silicone sponge" },
      { label: "Supply format", value: "Continuous 25m/50m coils or vulcanized endless picture-frame gaskets" },
      { label: "Color", value: "Red iron oxide (heat resistant), white, translucent, gray, black" },
      { label: "Compliance", value: "FDA food contact and medical cleanroom compatible grades available" },
    ],
    benefits: [
      "Maintains elastic recovery and sealing resilience even after thousands of hours at 250 °C",
      "Can be vulcanized at corners to create seamless 90-degree picture-frame door seals",
      "Excellent resistance to high-pressure steam in hospital and pharmaceutical sterilizers",
      "Custom profile extrusion tooling available in short 7-day lead times from CAD drawing",
    ],
    applications: ["Pharma", "Food", "Chemical"],
  },
  "Silicone Inflatable Gasket": {
    tagline: "Pneumatically inflated silicone seal profiles that expand to close large gaps.",
    description:
      "Advanced pneumatic sealing profiles that expand when inflated with compressed air (1 to 3 bar) to form a bubble-tight barrier between separating doors and domes. Rapidly deflates when air is vented to allow zero-friction door opening.",
    specs: [
      { label: "Principle", value: "Pneumatic inflation (1.5 to 3.0 bar air pressure) via integrated valve" },
      { label: "Profiles", value: "Flat top, domed top, ribbed top, rectangular, and circular geometries" },
      { label: "Material grade", value: "High-strength Platinum Cured Silicone, tear-resistant formulation" },
      { label: "Supply format", value: "Custom vulcanized endless rings or rectangular frames with air valve" },
      { label: "Air valve fitting", value: "Integrated SS304/SS316 or brass inflation stem with PU hose barb" },
      { label: "Cycle life", value: "Tested for >100,000 inflation/deflation fatigue cycles" },
    ],
    benefits: [
      "Solves sealing challenges on large door spans where mechanical latch clamping is uneven",
      "Zero friction during door opening/closing extends gasket life and prevents seal shearing",
      "Guarantees 100% airtight containment on pharmaceutical isolators and glove boxes",
      "Instant deflation allows rapid access during emergency batch processing cycles",
    ],
    applications: ["Pharma", "Food", "Chemical"],
  },
  "Silicone Diaphragms": {
    tagline: "High-flex platinum silicone diaphragms with optional PTFE facing for metering.",
    description:
      "Precision-moulded silicone diaphragms engineered for sanitary dosing pumps, aseptic valves, and pressure regulators. Combines the high flex-life of platinum silicone with optional bonded PTFE media faces.",
    specs: [
      { label: "Construction", value: "Solid platinum silicone or PTFE-bonded silicone composite" },
      { label: "Reinforcement", value: "Optional Nomex or polyester fabric interlayer for burst resistance" },
      { label: "Diameter range", value: "20 mm to 400 mm diameter, flat or rolling convoluted profiles" },
      { label: "Compliance", value: "FDA 21 CFR 177.2600, USP Class VI, 3-A Sanitary standard" },
      { label: "Temperature", value: "-60 °C to +220 °C continuous operating temperature" },
      { label: "Sterilization", value: "Withstands in-line SIP steam sterilization at 135 °C / 2.5 bar" },
    ],
    benefits: [
      "Ultra-hygienic non-stick surface prevents bacterial colonization in drug metering lines",
      "PTFE-faced composite models provide total chemical immunity against aggressive CIP acids",
      "Exceptional flex fatigue resistance ensures millions of accurate dosing pump strokes",
      "Direct replacement fit for ITT Pure-Flo, Saunders, and Gemü aseptic diaphragm valves",
    ],
    applications: ["Pharma", "Food", "Beverages"],
  },
  "Silicone Endless Gasket": {
    tagline: "Seamless vulcanized endless silicone gaskets for large manhole covers & vessels.",
    description:
      "Large-diameter endless O-rings and rectangular lip seals produced by precision hot-plate vulcanization of extruded silicone profiles. Creates a strong, seamless joint that eliminates leak-prone manual butt-gluing on site.",
    specs: [
      { label: "Manufacturing", value: "Precision hot-plate vulcanization / corner moulding of extruded profiles" },
      { label: "Joint strength", value: "Vulcanized joint tensile strength > 90% of parent cord material" },
      { label: "Size range", value: "From 200 mm ID up to 5000+ mm diameter endless loops or frames" },
      { label: "Profiles used", value: "O-ring cord, square cord, lip seals, U-channels, custom profiles" },
      { label: "Material grade", value: "FDA compliant white, translucent, or red silicone (40–70 Shore A)" },
      { label: "Temperature", value: "-60 °C to +230 °C continuous service" },
    ],
    benefits: [
      "Eliminates hard, brittle glue spots and leak paths common in cold-glued site gaskets",
      "Economical solution for ultra-large diameter vessel domes and filter press plates",
      "Allows custom rectangular and multi-angle picture frame seals without expensive giant moulds",
      "Withstands heavy mechanical clamping loads without joint parting or separation",
    ],
    applications: ["Food", "Pharma", "Chemical", "Breweries"],
  },
  "Silicone Sleeves": {
    tagline: "Flexible transparent and reinforced silicone transfer sleeves for tablet presses.",
    description:
      "Hygienic cylindrical silicone connecting sleeves and drop tubes. Engineered for gravity flow of pharmaceutical powders, tablets, and food granules between sifters, hoppers, tablet presses, and packaging machines.",
    specs: [
      { label: "Construction", value: "Ultra-pure translucent platinum silicone, seamless extruded tubing" },
      { label: "Wall thickness", value: "1.5 mm, 2.0 mm, 3.0 mm, 5.0 mm heavy-duty wall options" },
      { label: "Diameter range", value: "25 mm to 300 mm internal diameter cut to custom lengths" },
      { label: "Compliance", value: "USP Class VI, FDA 21 CFR 177.2600, EU 1935/2004 full compliance" },
      { label: "Surface finish", value: "Ultra-smooth Ra < 0.2 µm inner bore to prevent powder bridging" },
      { label: "Sterilization", value: "Autoclavable, gamma irradiable, and ethylene oxide (EtO) compatible" },
    ],
    benefits: [
      "High transparency allows instant visual verification of product flow and cleanliness",
      "Anti-static (conductive black) silicone options available to safely dissipate electrostatic charges",
      "Flexible walls allow quick clamping with standard stainless steel hygienic hose clips",
      "Tear-resistant formulation prevents nibbling and contamination of valuable pharma powders",
    ],
    applications: ["Pharma", "Food", "Beverages"],
  },
  "Silicone Suction Cups": {
    tagline: "Food-grade, non-marking silicone vacuum gripper pads for packaging & pharma.",
    description:
      "Ultra-clean vacuum suction cups moulded from FDA and USP Class VI compliant platinum silicone. Designed for high-speed robotic pick-and-place lines handling fragile bakery goods, chocolate boxes, and glass medicine vials.",
    specs: [
      { label: "Material grade", value: "100% Platinum Cured Silicone (40 or 50 Shore A softness)" },
      { label: "Profiles", value: "Flat bellows, 1.5-fold, 2.5-fold, and deep egg-crate handling pads" },
      { label: "Diameter range", value: "6 mm to 150 mm diameter" },
      { label: "Fittings", value: "Precision machined SS316 or anodized aluminum threaded inserts" },
      { label: "Temperature", value: "-50 °C to +200 °C (allows handling of hot fresh-baked items)" },
      { label: "Compliance", value: "FDA food contact certified, zero silicone oil migration" },
    ],
    benefits: [
      "100% non-marking surface guarantees zero silicone oil rings on clear glass vials or glossy cartons",
      "Super-soft 40 Shore A lip gently seals over uneven, porous, or delicate food surfaces",
      "Withstands high-temperature washdown and chemical sanitization in food packaging plants",
      "Flex bellows absorb mechanical shock during rapid robotic arm deceleration",
    ],
    applications: ["Food", "Pharma", "Beverages"],
  },
  "Silicone Rubber Custom Products": {
    tagline: "Tailor-made silicone mouldings, multi-lumen tubing & colored medical parts.",
    description:
      "Custom-engineered silicone components manufactured to exacting client specifications using liquid silicone rubber (LSR) injection or high-consistency rubber (HCR) compression moulding in cleanroom environments.",
    specs: [
      { label: "Moulding methods", value: "LSR (Liquid Silicone Rubber) injection & HCR compression moulding" },
      { label: "Cleanroom", value: "Manufactured in ISO Class 7 / Class 8 cleanroom facilities on request" },
      { label: "Specialty grades", value: "Fluorosilicone (FVMQ - fuel resistant), electrically conductive, X-ray detectable" },
      { label: "Hardness range", value: "10 Shore A (gel-like soft) to 80 Shore A (rigid)" },
      { label: "Color matching", value: "Custom RAL / Pantone color matching with FDA-approved pigments" },
      { label: "Prototyping", value: "Rapid 3D printed mould tooling for prototype delivery in 7–10 days" },
    ],
    benefits: [
      "LSR injection moulding achieves micro-gram weight accuracy and flash-free tolerances",
      "X-ray and metal-detectable silicone options prevent accidental foreign object contamination in food",
      "Fluorosilicone (FVMQ) combines wide temperature range with resistance to jet fuel and solvents",
      "Complete regulatory documentation package including material TSE/BSE free declarations",
    ],
    applications: ["Pharma", "Food", "Chemical"],
  },

  // ==========================================
  // 5. HOSES (6 items)
  // ==========================================
  "Carbon Free Hose": {
    tagline: "Non-conductive, carbon-free rubber hose for furnace coolant lines and power cables.",
    description:
      "Specialized electrical insulating cooling hose manufactured from high-grade synthetic rubber without any carbon black filler. Designed for cooling heavy current-carrying water cables in electric arc furnaces and induction melting equipment.",
    specs: [
      { label: "Inner tube", value: "Special non-conductive, carbon-free EPDM / Nitrile synthetic rubber" },
      { label: "Reinforcement", value: "High-tensile synthetic textile cord or asbestos-free fabric plies" },
      { label: "Outer cover", value: "Green / white abrasion, weather, and heat-resistant synthetic rubber" },
      { label: "Electrical rating", value: "Electrical resistance > 10^8 Ohms/meter at 5000V DC" },
      { label: "Working pressure", value: "10 bar (150 PSI) / Burst pressure 30 bar (450 PSI)" },
      { label: "Size range", value: "1/2 inch to 4 inch (12.7 mm to 101.6 mm ID)" },
      { label: "Temperature", value: "-40 °C to +120 °C continuous water coolant temperature" },
    ],
    benefits: [
      "Total absence of carbon black prevents electrical short circuits and tracking across hoses",
      "High thermal resistance survives radiant heat from molten steel and induction furnaces",
      "Excellent flexibility allows tight bending around tilting furnace cradles without kinking",
      "Superior cover formulation resists ozone, sparks, and incidental oil splashes",
    ],
    applications: ["Chemical", "Plastics", "Oil & Gas"],
  },
  "Nylon Braided Hose": {
    tagline: "Clear flexible PVC/polyurethane hose reinforced with high-tensile nylon yarn.",
    description:
      "Versatile transparent flexible hose constructed from virgin PVC or Polyurethane with an embedded high-tensile nylon textile braid. Delivers high working pressure capability while maintaining visual flow monitoring.",
    specs: [
      { label: "Construction", value: "Crystal clear virgin PVC/PU tube, high-tenacity nylon braid, clear cover" },
      { label: "Working pressure", value: "Up to 15 bar (220 PSI) working pressure / 45 bar burst" },
      { label: "Size range", value: "6 mm to 50 mm (1/4 inch to 2 inch ID)" },
      { label: "Compliance", value: "Non-toxic, cadmium-free, food contact safe (EU 10/2011)" },
      { label: "Temperature", value: "-10 °C to +65 °C" },
      { label: "Flexibility", value: "High flexibility with small minimum bend radius without tube flattening" },
    ],
    benefits: [
      "Transparent walls allow immediate visual detection of air bubbles, blockages, or fluid contamination",
      "Embedded nylon braid prevents hose expansion and bursting under high pneumatic/water pressure",
      "Smooth inner bore minimizes fluid friction loss and prevents scale accumulation",
      "Lightweight, kink-resistant, and easy to terminate with standard hose barbs and jubilee clips",
    ],
    applications: ["Food", "Chemical", "Plastics", "Beverages"],
  },
  "Food Grade Thunder Hose": {
    tagline: "Heavy-duty, wire-reinforced hygienic rubber hose for milk, beer, and wine transfer.",
    description:
      "Premium sanitary suction and delivery hose engineered for breweries, dairies, and liquid food processing. Features an ultra-smooth, taste-free white NBR/EPDM inner tube reinforced with steel helical wire and textile plies.",
    specs: [
      { label: "Inner tube", value: "Smooth white FDA/3-A food-grade NBR / EPDM rubber, phthalate-free" },
      { label: "Reinforcement", value: "High-strength synthetic textile plies with embedded steel helix wire" },
      { label: "Outer cover", value: "Blue or red EPDM, corrugated or wrapped impression, weather resistant" },
      { label: "Working pressure", value: "10 bar (150 PSI) working / Full vacuum (0.9 bar) suction rating" },
      { label: "Size range", value: "25 mm to 100 mm (1 inch to 4 inch ID)" },
      { label: "Compliance", value: "FDA 21 CFR 177.2600, 3-A Sanitary Class II, BfR XXI Cat 2" },
      { label: "Sterilization", value: "CIP and SIP cleanable with steam up to 130 °C for 30 minutes" },
    ],
    benefits: [
      "Will not impart any taste, odor, or color to sensitive beverages, milk, or edible oils",
      "Embedded steel helix wire prevents hose collapse under high vacuum pump suction",
      "Heavy-duty outer cover survives dragging across rough brewery floors and washdown chemicals",
      "Available with professionally swaged sanitary Tri-Clover or DIN 11851 stainless steel end fittings",
    ],
    applications: ["Food", "Beverages", "Breweries"],
  },
  "Platinum Cured Silicone Transparent Tube": {
    tagline: "Ultra-pure, medical and pharma grade translucent silicone tubing with zero leachables.",
    description:
      "Top-tier unreinforced silicone tubing manufactured exclusively from platinum-cured silicone in cleanroom conditions. Designed for critical fluid transfer in vaccine production, peristaltic dosing pumps, and intravenous drug filling.",
    specs: [
      { label: "Material grade", value: "100% Platinum Cured Silicone, ultra-low extractables/leachables" },
      { label: "Cleanroom", value: "Extruded and packaged in ISO Class 7 cleanroom facility" },
      { label: "Size range", value: "0.5 mm ID to 25 mm ID, micro-bore and thick-wall peristaltic sizes" },
      { label: "Compliance", value: "USP Class VI, ISO 10993 biocompatibility, FDA 21 CFR 177.2600, European Ph." },
      { label: "Hardness", value: "50 or 60 Shore A (optimized for maximum peristaltic pump flex life)" },
      { label: "Temperature", value: "-60 °C to +230 °C continuous" },
      { label: "Sterilization", value: "Autoclave, Ethylene Oxide (EtO), and Gamma radiation up to 50 kGy" },
    ],
    benefits: [
      "Total absence of peroxide by-products guarantees zero interaction with sensitive biologic proteins",
      "Mirror-smooth bore minimizes protein binding and bacterial biofilm adherence",
      "Superior elastic recovery provides over 1000 hours of continuous pumping in peristaltic heads",
      "Supplied with complete validation packages and lot-traceable certificates of analysis",
    ],
    applications: ["Pharma", "Food", "Beverages"],
  },
  "Flexible Ducting Hose": {
    tagline: "PU and PVC wire-reinforced flexible ducting for extraction of dust, fumes & sawdust.",
    description:
      "Lightweight and highly flexible ducting hose constructed from abrasion-resistant Polyurethane (PU) or PVC film reinforced with a spring steel wire helix. Designed for dust collection, chemical fume extraction, and ventilation.",
    specs: [
      { label: "Wall material", value: "Polyurethane (ester/ether PU - 0.4mm to 1.5mm wall) or flame-retardant PVC" },
      { label: "Helix reinforcement", value: "Copper-coated or galvanized spring steel wire helix" },
      { label: "Diameter range", value: "25 mm to 500 mm (1 inch to 20 inch internal diameter)" },
      { label: "Compressibility", value: "3:1 to 5:1 axial compressibility for easy storage and transport" },
      { label: "Temperature", value: "-40 °C to +90 °C (+125 °C short term peak for PU)" },
      { label: "Properties", value: "High abrasion resistance, microbial resistant, static conductive options" },
    ],
    benefits: [
      "Polyurethane walls offer 10× greater abrasion resistance than PVC against wood shavings and grain",
      "Extreme flexibility allows installation around tight plant obstructions without elbow fittings",
      "Exposed copper wire helix can be grounded to eliminate static electricity buildup in powder dust",
      "Lightweight construction places minimal structural load on overhead ventilation duct hangers",
    ],
    applications: ["Plastics", "Chemical", "Food"],
  },
  "Platinum Cured Silicone Braided Hose": {
    tagline: "High-pressure sanitary hose with platinum silicone bore and SS/polyester braid.",
    description:
      "High-pressure sanitary transfer hose combining a ultra-clean platinum-cured silicone inner tube, high-strength polyester textile or 316L stainless steel wire braid reinforcement, and a smooth outer silicone cover.",
    specs: [
      { label: "Inner bore", value: "Seamless, ultra-smooth Platinum Cured Silicone (USP Class VI / FDA)" },
      { label: "Reinforcement", value: "Multi-ply polyester braid or 316L stainless steel wire mesh braid" },
      { label: "Outer cover", value: "Smooth or cloth-wrapped white/translucent platinum silicone cover" },
      { label: "Working pressure", value: "Up to 16 bar (230 PSI) at 20 °C (size dependent)" },
      { label: "Size range", value: "6 mm to 50 mm (1/4 inch to 2 inch ID)" },
      { label: "Temperature", value: "-60 °C to +200 °C continuous high-pressure transfer" },
      { label: "End fittings", value: "Available with 316L sanitary Tri-Clamp fittings swaged in-house" },
    ],
    benefits: [
      "Handles high-pressure pump discharge in pharmaceutical and biotech filtration skids",
      "Outer silicone cover withstands daily washdown with foam cleaners and boiling water",
      "Will not kink or collapse when bent around tight radii on portable processing carts",
      "Complete assembly validated for zero endotoxins and full batch traceability",
    ],
    applications: ["Pharma", "Food", "Beverages", "Breweries"],
  },

  // ==========================================
  // 6. STAINLESS STEEL (9 items)
  // ==========================================
  "SS Rod": {
    tagline: "Precision ground and polished round bars in SS304, SS316, SS316L, and Duplex (2205).",
    description:
      "High-purity austenitic and duplex stainless steel round bar stock. Precision turned, peeled, and centerless ground to tight h6/h7 diameter tolerances. Ideal for machining pump shafts, valve spindles, and fasteners.",
    specs: [
      { label: "Grades available", value: "AISI 304 / 304L / 316 / 316L / 410 / 420 / Duplex 2205 (UNS S31803)" },
      { label: "Diameter range", value: "3.0 mm to 250.0 mm round bar (hex and square stock available)" },
      { label: "Length", value: "3000 mm / 6000 mm random lengths or precision cut-to-size blanks" },
      { label: "Dimensional tolerance", value: "ISO h6, h7, h9 centerless ground & polished finish" },
      { label: "Surface roughness", value: "Ra < 0.4 µm mirror polished or bright drawn finish" },
      { label: "Certification", value: "EN 10204 3.1 material test certificate (MTC) with 100% PMI testing" },
    ],
    benefits: [
      "Centerless grinding ensures superior roundness and straightness for high-speed rotating shafts",
      "Duplex 2205 grade offers double the yield strength of SS316 with superior chloride pitting resistance",
      "Ultrasonically tested to guarantee internal freedom from cracks, inclusions, and voids",
      "Immediate cut-to-length service reduces scrap waste and machining time for plant workshops",
    ],
    applications: ["Chemical", "Food", "Pharma", "Oil & Gas"],
  },
  "SS Shaft": {
    tagline: "Pump shafts precision turned, ground, and keyed from high-tensile SS316 or SS410.",
    description:
      "Custom machined pump and agitator shafts manufactured from high-tensile stainless steel. Precision ground bearing journals, milled keyways, and threaded impeller ends machined to exact ISO geometric tolerances.",
    specs: [
      { label: "Metallurgy", value: "SS316 / SS410 hardened / Duplex 2205 / Super Duplex 2507 / Monel K500" },
      { label: "Machining accuracy", value: "Bearing journals ground to ISO IT6 tolerance, total runout < 0.01 mm" },
      { label: "Keyways", value: "Milled to DIN 6885 / ISO R773 standards with radiused internal corners" },
      { label: "Length & Diameter", value: "Up to 3000 mm length / up to 150 mm diameter" },
      { label: "Heat treatment", value: "Stress relieved and hardened/tempered (for 400 series & Duplex)" },
      { label: "Surface coatings", value: "Optional hard chrome plating (25 µm) or HVOF tungsten carbide coating" },
    ],
    benefits: [
      "Zero shaft deflection under peak hydraulic loads extends mechanical seal and bearing lifespan",
      "Precision ground bearing seats eliminate fretting vibration and bearing spin",
      "100% dynamic balancing and runout verification performed prior to dispatch",
      "Manufactured directly from client CAD drawings or reverse-engineered from worn sample shafts",
    ],
    applications: ["Chemical", "Pharma", "Oil & Gas", "Food"],
  },
  "SS Sleeve": {
    tagline: "Replaceable shaft protection sleeves in hardened SS316, Stellite coated, or ceramic.",
    description:
      "Precision machined shaft protection sleeves designed to slide over pump shafts under the stuffing box or mechanical seal. Protects the expensive main shaft from erosive packing wear and corrosive media attack.",
    specs: [
      { label: "Base metallurgy", value: "SS316L / Duplex 2205 / SS410 / Alloy 20 / Hastelloy-C" },
      { label: "Hard facing options", value: "Stellite Grade 6 overlay / HVOF Tungsten Carbide / Hard Chrome (50 µm)" },
      { label: "Ceramic sleeves", value: "Solid Alumina (Al2O3) or Zirconia ceramic sleeves for extreme wear" },
      { label: "Internal bore", value: "Precision reamed to H7 tolerance with internal O-ring drive grooves" },
      { label: "OD finish", value: "Precision ground and super-finished to Ra < 0.2 µm for seal face contact" },
      { label: "Drive mechanism", value: "Drive slot, keyway, or grub screw collar locking" },
    ],
    benefits: [
      "Sacrificial sleeve concept saves thousands of dollars by preventing main pump shaft replacement",
      "Stellite and tungsten carbide hard-facing outlasts standard stainless steel sleeves by 10× in slurry",
      "Ultra-smooth ground outer diameter prevents premature wear of mechanical seal secondary O-rings",
      "Integrated internal O-ring seal prevents corrosive fluid migration between shaft and sleeve inner bore",
    ],
    applications: ["Chemical", "Oil & Gas", "Dye Manufacturing"],
  },
  "SS Flanges": {
    tagline: "Forged and machined stainless steel flanges (Slip-on, Weld-neck, Blind) to ANSI & DIN.",
    description:
      "High-pressure forged stainless steel pipe flanges machined to ASME, DIN, and EN standards. Includes Weld-Neck (WN), Slip-On (SO), Blind (BL), Socket Weld (SW), and Lap Joint flanges with serrated raised face finishes.",
    specs: [
      { label: "Flange types", value: "Weld Neck (WN), Slip-On (SO), Blind, Socket Weld, Lap Joint, Threaded" },
      { label: "Standards", value: "ASME B16.5 Class 150 to 2500 / DIN EN 1092-1 PN10 to PN100 / JIS" },
      { label: "Material grades", value: "ASTM A182 F304 / F304L / F316 / F316L / F51 (Duplex 2205)" },
      { label: "Size range", value: "1/2 inch to 24 inch (DN15 to DN600) nominal pipe size" },
      { label: "Flange facing", value: "Raised Face (RF) phonographic serrated finish (3.2–6.3 µm Ra) or RTJ" },
      { label: "Certification", value: "EN 10204 3.1 MTC, NACE MR0175 / ISO 15156 compliant for sour service" },
    ],
    benefits: [
      "Forged grain structure ensures superior tensile strength and absence of internal porosity",
      "Precision CNC machined gasket seating faces guarantee leak-free joints under high bolt loads",
      "Duplex F51 flanges handle aggressive chloride stress corrosion cracking in marine and offshore lines",
      "Complete traceability with heat numbers stamped directly on the flange rim",
    ],
    applications: ["Oil & Gas", "Chemical", "Pharma"],
  },
  "SS C-Clip": {
    tagline: "External and internal retaining circlips & C-clips in spring-temper stainless steel.",
    description:
      "Precision stamped and heat-treated stainless steel retaining rings (circlips / C-clips). Designed to fit into machined shaft or bore grooves, providing a rigid axial shoulder for retaining bearings, gears, and mechanical seal collars.",
    specs: [
      { label: "Ring types", value: "External shaft circlips (DIN 471) / Internal bore circlips (DIN 472) / E-clips" },
      { label: "Material grade", value: "Spring-temper Stainless Steel AISI 301 / AISI 316 / PH 17-7" },
      { label: "Size range", value: "Shaft / bore diameters from 3 mm up to 300 mm metric and imperial" },
      { label: "Hardness", value: "Heat-treated to 44–51 HRC for maximum spring retention force" },
      { label: "Thickness tolerance", value: "Precision ground thickness (±0.02 mm) to prevent axial bearing play" },
      { label: "Finish", value: "Passivated and deburred with rounded edges to prevent stress risers in grooves" },
    ],
    benefits: [
      "Replaces bulky threaded nuts and set collars, allowing more compact mechanical assembly designs",
      "SS316 and PH 17-7 grades resist rust and hydrogen embrittlement in chemical and food washdowns",
      "High shear strength prevents accidental dislodging under heavy axial shock loads",
      "Easy installation and removal using standard circlip pliers during pump overhauls",
    ],
    applications: ["Chemical", "Food", "Plastics", "Oil & Gas"],
  },
  "SS Clamps": {
    tagline: "Heavy-duty T-bolt hose clamps, worm drive clips, and pipe brackets in SS304/SS316.",
    description:
      "High-clamping-force stainless steel hose clips and piping support brackets. Includes heavy-duty T-bolt super clamps for high-pressure reinforced hoses, worm drive jubilee clips, and rubber-lined P-clips for tube vibration damping.",
    specs: [
      { label: "Clamp styles", value: "T-bolt heavy-duty super clamps, Worm-drive clips, P-clips, 2-bolt pipe saddles" },
      { label: "Material grades", value: "All-stainless construction: W4 (all SS304) or W5 (all SS316 marine grade)" },
      { label: "Clamping range", value: "8 mm to 300 mm diameter hose and pipe clamping range" },
      { label: "Band design", value: "Beveled smooth band edges with internal tongue to prevent hose cutting" },
      { label: "Bolt & Nut", value: "High-tensile SS316 T-bolt with nylon-insert self-locking locknut" },
      { label: "Vibration liner", value: "Optional EPDM or silicone rubber cushion lining on P-clips and saddles" },
    ],
    benefits: [
      "T-bolt design provides 360-degree uniform sealing band pressure without distorting rigid hoses",
      "W5 all-SS316 construction prevents galvanic corrosion in coastal and chemical atmosphere exposures",
      "Smooth underside band prevents slicing into expensive silicone and food-grade rubber hoses",
      "Self-locking nuts prevent clamp loosening under severe pump and engine vibration",
    ],
    applications: ["Food", "Chemical", "Beverages", "Oil & Gas"],
  },
  "Tri Clover Clamps": {
    tagline: "Quick-release sanitary hinge clamps in polished SS304/SS316 for hygienic pipework.",
    description:
      "Heavy-duty investment cast stainless steel sanitary hinge clamps designed for connecting Tri-Clover (Tri-Clamp) flanged ferrules. Features a single-pin or two-pin heavy-duty hinge with ergonomic wing nut or hex nut fastening.",
    specs: [
      { label: "Clamp styles", value: "Single-pin hinge, 2-pin heavy duty, 3-piece high pressure, bolted hex nut" },
      { label: "Standards", value: "ASME BPE, 3-A Sanitary, DIN 32676, ISO 2852 compatible sizes" },
      { label: "Material grade", value: "Investment cast CF8 (SS304) or CF8M (SS316L) stainless steel" },
      { label: "Size range", value: "1/2 inch to 8 inch (DN10 to DN200) standard clamp sizes" },
      { label: "Pressure rating", value: "Up to 40 bar with heavy-duty bolted clamps / 15 bar with wing nut" },
      { label: "Surface finish", value: "Electropolished and barrel tumbled to Ra < 0.6 µm bright hygienic finish" },
    ],
    benefits: [
      "Allows instantaneous tool-free disassembly of sanitary piping for daily CIP/SIP inspection",
      "Two-pin heavy-duty hinge profile provides uniform pressure around the entire ferrule gasket circumference",
      "All-SS316L high-pressure bolted models handle pharmaceutical sterile filtration skid pressures",
      "Smooth rounded contours prevent accumulation of food splatter and bacterial washdown traps",
    ],
    applications: ["Food", "Pharma", "Beverages", "Breweries"],
  },
  "SS Impeller": {
    tagline: "Investment cast and precision machined impellers in CF8M (SS316) or Duplex.",
    description:
      "Precision investment cast (lost-wax) and 5-axis CNC machined pump impellers. Available in closed, semi-open, and open vortex geometries in corrosion-resistant stainless steel alloys. Statically and dynamically balanced to ISO 1940 Grade G6.3.",
    specs: [
      { label: "Casting method", value: "Precision investment casting (lost-wax process) for ultra-smooth vane passages" },
      { label: "Alloy grades", value: "CF8M (SS316), CF3M (SS316L), CD4MCu (Duplex SS), CN7M (Alloy 20), Hastelloy" },
      { label: "Impeller types", value: "Closed radial flow, semi-open chemical, open vortex non-clog, axial propeller" },
      { label: "Diameter range", value: "100 mm to 600 mm outer diameter, custom trimmed to exact head/flow" },
      { label: "Balancing", value: "Dynamically balanced on computerized 2-plane balancing machines to ISO G6.3" },
      { label: "Hub & Keyway", value: "Precision bored to H7 tolerance with DIN standard keyway or splines" },
    ],
    benefits: [
      "Investment cast smooth internal vane surfaces improve pump hydraulic efficiency by 3% to 5%",
      "CD4MCu Duplex alloy provides outstanding resistance to cavitation erosion and acid slurry wear",
      "Precision dynamic balancing eliminates vibration, extending motor bearing and mechanical seal life",
      "Direct replacement impellers reverse-engineered for KSB, Sulzer, Grundfos, and Goulds process pumps",
    ],
    applications: ["Chemical", "Food", "Dye Manufacturing", "Oil & Gas"],
  },
  "SS Pump Spare Parts": {
    tagline: "Complete rebuild kits including casing wearing rings, gland plates & shaft nuts.",
    description:
      "Comprehensive precision machined stainless steel replacement hardware for chemical and utility centrifugal pumps. Includes casing wear rings, impeller nuts, lantern rings, stuffing box glands, and bearing housing end covers.",
    specs: [
      { label: "Components", value: "Casing wear rings, impeller wear rings, lantern rings, gland followers, shaft nuts" },
      { label: "Material grades", value: "SS316L, SS410 hardened, Duplex 2205, Nitronic 50/60 (anti-galling), Bronze" },
      { label: "Wear ring clearances", value: "Machined to API 610 / ISO 2858 standard running clearance tolerances" },
      { label: "Anti-galling", value: "Nitronic 60 wear rings used against SS316 impellers to prevent seizure" },
      { label: "Gland plates", value: "Precision drilled for 4-bolt / 2-bolt stuffing boxes and mechanical seal plates" },
      { label: "Traceability", value: "All wetted metallic parts supplied with EN 10204 3.1 material certificates" },
    ],
    benefits: [
      "Restores worn pump internal running clearances to factory original efficiency, saving motor power",
      "Nitronic 60 anti-galling alloys allow tighter wear ring clearances without risk of metal-to-metal seizure",
      "Eliminates long OEM lead times with rapid local machining of critical breakdown components",
      "Complete packaged overhaul kits simplify storeroom inventory and plant maintenance planning",
    ],
    applications: ["Chemical", "Pharma", "Oil & Gas", "Food"],
  },

  // ==========================================
  // 7. BEARINGS (2 items)
  // ==========================================
  "Ball Bearings": {
    tagline: "Deep groove, angular contact, and self-aligning ball bearings from SKF, FAG & NTN.",
    description:
      "Premium rolling element ball bearings supplied from 100% genuine authorized manufacturer distributions including SKF, FAG, NTN, and INA. Engineered for electric motors, pumps, gearboxes, and high-speed industrial spindles.",
    specs: [
      { label: "Bearing types", value: "Deep groove ball (6000/6200/6300), Angular contact (7200/7300), Self-aligning" },
      { label: "Brands supplied", value: "SKF, FAG, NTN, INA, NSK — 100% genuine cold-chain verified stock" },
      { label: "Internal clearance", value: "CN (normal), C3 (motor/pump standard), C4 (high temp/vibration)" },
      { label: "Cage material", value: "Pressed steel (J), Machined brass (M), Polyamide resin (TVP/P)" },
      { label: "Sealing options", value: "Open, Dual metal shields (2Z/ZZ), Dual rubber contact seals (2RS/DDU)" },
      { label: "Precision class", value: "ISO Normal (P0), High precision P6 (ABEC-3), Spindle precision P4 (ABEC-7)" },
      { label: "Lubrication", value: "Pre-greased for life with high-temperature lithium complex or polyurea grease" },
    ],
    benefits: [
      "Guaranteed 100% genuine brand stock — eliminates premature plant failures from counterfeit bearings",
      "C3 and C4 internal clearances compensate for thermal shaft expansion in hot pump operating loops",
      "Machined brass cage (M) variants withstand severe shock loads and lubrication starvation in chemical pumps",
      "Expert cross-reference technical support across all major Japanese and European bearing designations",
    ],
    applications: ["Chemical", "Food", "Oil & Gas", "Plastics"],
  },
  "Ceramic Bearings": {
    tagline: "Silicon Nitride (Si3N4) and Zirconia hybrid/full ceramic bearings for extreme speed.",
    description:
      "Advanced hybrid ceramic bearings (steel rings with Silicon Nitride Si3N4 balls) and full ceramic bearings (Zirconia ZrO2 or Si3N4 rings and balls). Designed for extreme speeds, high temperatures, electrical insulation, and corrosive chemical immersion.",
    specs: [
      { label: "Construction", value: "Hybrid (52100/SS rings + Si3N4 balls) or Full Ceramic (ZrO2 / Si3N4 throughout)" },
      { label: "Ball material", value: "Hot Isostatically Pressed (HIP) Silicon Nitride (Si3N4) — grade G5 precision" },
      { label: "Cage options", value: "PEEK, PTFE, Full Complement (no cage), or High-Temp Phenolic" },
      { label: "Max Speed", value: "Up to 50% higher RPM rating than steel bearings due to 40% lower ball weight" },
      { label: "Temperature", value: "Up to 300 °C (Hybrid with PEEK cage) / up to 800 °C (Full Si3N4 without cage)" },
      { label: "Electrical property", value: "100% electrical insulator — prevents EDM current fluting in VFD motor bearings" },
      { label: "Corrosion resistance", value: "Full ceramic models operate submerged in acids, alkalis, and seawater without rust" },
    ],
    benefits: [
      "Total electrical insulation eliminates VFD-induced electrical bearing fluting in AC motor drives",
      "Si3N4 ceramic balls are 60% lighter and 50% harder than steel, reducing centrifugal ball skidding at high RPM",
      "Can operate completely dry without grease or oil lubrication in vacuum and cleanroom environments",
      "Extends bearing service life by 5× to 10× in demanding semiconductor, pharma, and chemical pumps",
    ],
    applications: ["Pharma", "Chemical", "Plastics", "Oil & Gas"],
  },

  // ==========================================
  // 8. COUPLINGS (3 items)
  // ==========================================
  "Chain Coupling": {
    tagline: "Robust power transmission coupling using duplex roller chain wrapped around two hubs.",
    description:
      "High-torque flexible shaft coupling consisting of two hardened steel sprockets wrapped by a double-strand roller chain. Compact, rugged design that transmits high torque while accommodating angular and parallel shaft misalignment.",
    specs: [
      { label: "Construction", value: "Two precision machined steel sprocket hubs + duplex roller chain" },
      { label: "Bore range", value: "12 mm to 150 mm shaft bore diameter with keyway and set screws" },
      { label: "Torque capacity", value: "Up to 8,500 Nm nominal torque rating" },
      { label: "Max speed", value: "Up to 5000 RPM (with sealed aluminum grease cover)" },
      { label: "Misalignment", value: "Accommodates 1° angular and 0.3 mm parallel shaft misalignment" },
      { label: "Lubrication", value: "Requires periodic grease lubrication or enclosed aluminum casing" },
      { label: "Material", value: "C45 Carbon Steel hubs with induction hardened sprocket teeth" },
    ],
    benefits: [
      "Exceptionally high torque-to-size ratio compared to elastomer jaw couplings",
      "Allows rapid shaft disconnection simply by removing one connecting link pin in the roller chain",
      "Absorbs heavy shock loads in agricultural, mining, and timber processing machinery",
      "No axial thrust load transmitted between driving motor and driven pump shafts",
    ],
    applications: ["Chemical", "Plastics", "Oil & Gas"],
  },
  "Jaw Coupling": {
    tagline: "Flexible shaft coupling with elastomeric spider insert (NBR/PU) for vibration damping.",
    description:
      "The industry-standard flexible coupling for pump and motor sets (Lovejoy / Rotex style). Consists of two metallic hubs interlocking over an elastomeric 'spider' insert that dampens torsional vibration and absorbs shock loads.",
    specs: [
      { label: "Construction", value: "Two 3-jaw or 4-jaw metallic hubs + central elastomeric spider insert" },
      { label: "Hub materials", value: "High-grade Cast Iron GG25 / Sintered Steel / Aluminum / SS316" },
      { label: "Spider compounds", value: "NBR Nitrile (80 Shore A), Polyurethane PU (92/98 Shore A), Hytrel" },
      { label: "Bore range", value: "6 mm to 110 mm with standard DIN keyways or taper-bush mounting" },
      { label: "Torque capacity", value: "Up to 2,400 Nm nominal torque" },
      { label: "Misalignment", value: "Accommodates up to 1.3° angular and 0.5 mm parallel misalignment" },
      { label: "Temperature", value: "-40 °C to +100 °C (PU spider) / up to +120 °C (Hytrel spider)" },
    ],
    benefits: [
      "Elastomer spider acts as a mechanical fuse — fails safely under extreme overload to protect pump shafts",
      "Dampens motor torsional vibration, preventing premature mechanical seal face shattering",
      "Fail-safe design allows hubs to interlock and continue driving even if rubber spider wears out",
      "100% maintenance-free operation requiring zero grease or lubrication",
    ],
    applications: ["Chemical", "Food", "Pharma", "Breweries"],
  },
  "Spacer Coupling": {
    tagline: "Flexible spacer coupling designed for back-pull-out pump maintenance without moving motor.",
    description:
      "Specialized flexible coupling featuring an engineered center spacer drop-out assembly. Specifically designed for back-pull-out centrifugal pumps, allowing the pump rotating assembly to be removed without moving the heavy drive motor.",
    specs: [
      { label: "Design", value: "Two outer hubs + removable center spacer assembly + dual elastomeric elements" },
      { label: "Spacer lengths", value: "Standard ISO/ANSI DBSE (Distance Between Shaft Ends) 100mm, 140mm, 180mm" },
      { label: "Hub & Spacer mat.", value: "High-strength Cast Iron / Ductile Iron / Carbon Steel / SS316" },
      { label: "Element material", value: "High-grade Polyurethane (PU) or Nitrile rubber split cushions" },
      { label: "Torque capacity", value: "Up to 4,500 Nm continuous torque" },
      { label: "Balancing", value: "Precision dynamically balanced for 3000/3600 RPM high-speed pump operation" },
      { label: "Compliance", value: "Meets API 610 / ISO 2858 maintenance spacing requirements" },
    ],
    benefits: [
      "Enables complete pump mechanical seal and bearing replacement in under 1 hour without touching motor alignment",
      "Eliminates the need for realigning heavy 50+ HP electric motors after pump overhauls",
      "Dual flexible elements provide double the angular and parallel misalignment compensation of standard couplings",
      "Split cushion elements can be inspected and replaced radially without disturbing hubs or shafts",
    ],
    applications: ["Chemical", "Oil & Gas", "Food", "Dye Manufacturing"],
  },

  // ==========================================
  // 9. NOZZLES (3 items)
  // ==========================================
  "Boron Carbide Nozzle": {
    tagline: "Engineered ceramic nozzle (B4C) ranking second only to diamond in hardness.",
    description:
      "Ultra-hard Boron Carbide (B4C) abrasive blasting and spray nozzles. Exhibits hardness ranking second only to diamond, outlasting tungsten carbide by 5× to 10× when handling aggressive abrasives like aluminum oxide, silicon carbide, and garnet.",
    specs: [
      { label: "Material", value: "100% Hot Isostatically Pressed Boron Carbide (B4C) ceramic" },
      { label: "Hardness", value: "3000 to 3500 Knoop / > 35 GPa Vickers hardness (extreme wear resistance)" },
      { label: "Orifice diameter", value: "3.0 mm to 12.5 mm precision venturi or straight bore profiles" },
      { label: "Jacket material", value: "Shock-absorbing polyurethane or anodized aluminum protective outer jacket" },
      { label: "Thread connection", value: "3/4 inch / 1-1/4 inch coarse NPSM or fine thread contractor threads" },
      { label: "Density", value: "2.48 g/cm³ (lightweight ergonomic design reduces operator hand fatigue)" },
      { label: "Expected life", value: "750 to 1500 continuous hours blasting aggressive aluminum oxide grit" },
    ],
    benefits: [
      "Lowest cost per blasting hour when handling ultra-hard abrasive blasting media",
      "Maintains constant orifice diameter over hundreds of hours, ensuring uniform spray velocity and pattern",
      "Lightweight ceramic construction is 60% lighter than tungsten carbide, reducing operator fatigue",
      "Ideal for industrial sandblasting, shot-peening, and high-pressure abrasive slurry atomization",
    ],
    applications: ["Plastics", "Chemical", "Oil & Gas"],
  },
  "Silicone Carbide Nozzle": {
    tagline: "Alpha silicon carbide (SiC) spray and blast nozzles offering high thermal shock resistance.",
    description:
      "Sintered Alpha Silicon Carbide (SiC) spray and slurry nozzles. Combines extreme hardness with exceptional thermal shock resistance and chemical inertness, making it the premier choice for flue gas desulfurization (FGD) and chemical spray scrubbers.",
    specs: [
      { label: "Material grade", value: "Sintered Alpha Silicon Carbide (SSiC) or Reaction Bonded SiC (RBSiC)" },
      { label: "Spray patterns", value: "Hollow cone, full cone, spiral (non-clogging), and flat fan atomizing" },
      { label: "Orifice sizes", value: "3.2 mm to 50 mm large free-passage non-clogging geometries" },
      { label: "Connection", value: "BSP/NPT male/female threads, flanged connections, or quick-release clamp" },
      { label: "Max Temperature", value: "Up to 1350 °C continuous operating temperature in oxidizing atmospheres" },
      { label: "Chemical property", value: "100% inert to hot acids, alkalis, and corrosive scrubbing liquors" },
      { label: "Hardness", value: "2500 Vickers hardness — excellent resistance to abrasive slurry wear" },
    ],
    benefits: [
      "Spiral non-clogging design allows passing of large solid particulates in recirculating scrubber slurries",
      "Survives instantaneous thermal shocks from 1000 °C furnace gases down to cold water spray",
      "Outlasts stainless steel spray nozzles by 20× in erosive limestone slurry desulfurization towers",
      "Precision atomization droplet sizing optimizes chemical gas absorption and dust suppression",
    ],
    applications: ["Chemical", "Dye Manufacturing", "Oil & Gas"],
  },
  "Tungsten Carbide Nozzle": {
    tagline: "High-density sintered tungsten carbide (WC-Co) nozzles engineered for high impact.",
    description:
      "Rugged sintered Tungsten Carbide (WC with Cobalt binder) spray and sandblasting nozzles. Offers the optimal balance of high hardness and extreme mechanical impact toughness, preventing accidental breakage on rugged construction sites.",
    specs: [
      { label: "Material grade", value: "Sintered Tungsten Carbide (6% to 10% Cobalt binder matrix)" },
      { label: "Hardness & Density", value: "1500–1600 HV Vickers hardness / 14.5 g/cm³ high density" },
      { label: "Orifice profiles", value: "Long venturi (for maximum particle velocity), short venturi, straight bore" },
      { label: "Size range", value: "2.5 mm to 15.0 mm orifice bore diameter" },
      { label: "Outer jacket", value: "Rugged steel, brass, or polyurethane impact-resistant jacket" },
      { label: "Operating pressure", value: "Up to 700 bar (10,000 PSI) for high-pressure water jetting and cleaning" },
    ],
    benefits: [
      "Superior fracture toughness survives accidental dropping and rough handling on heavy industrial sites",
      "Long venturi internal profile accelerates abrasive particles by 40%, increasing cleaning production rate",
      "Highly versatile across steel grit, chilled iron shot, glass beads, and mineral slags",
      "Precision machined threads and entry tapers ensure seamless mating with blast hose couplings",
    ],
    applications: ["Oil & Gas", "Chemical", "Plastics"],
  },

  // ==========================================
  // 10. VALVES (3 items)
  // ==========================================
  "Flange End Ball Valve": {
    tagline: "Two-piece and three-piece flanged ball valves in SS316/WCB with PTFE/RPTFE seats.",
    description:
      "Heavy-duty industrial flanged ball valve designed for reliable quarter-turn isolation on chemical, steam, and utility pipelines. Features a full-bore floating ball design with blowout-proof stem and ISO 5211 actuator mounting pad.",
    specs: [
      { label: "Construction", value: "2-piece split body or 3-piece bolted body, full bore / reduced bore" },
      { label: "Body metallurgy", value: "ASTM A351 CF8M (SS316) / CF3M (SS316L) / A216 WCB Carbon Steel" },
      { label: "Ball & Stem", value: "Precision machined solid SS316 mirror-polished ball and blowout-proof stem" },
      { label: "Seat & Seals", value: "Virgin PTFE / Reinforced PTFE (RPTFE) / Carbon-filled PTFE / PEEK" },
      { label: "Flange standard", value: "ASME B16.5 Class 150 / 300 RF, DIN EN 1092-1 PN16 / PN40" },
      { label: "Size range", value: "1/2 inch to 8 inch (DN15 to DN200)" },
      { label: "Actuation pad", value: "Integrated ISO 5211 top mounting pad for pneumatic / electric actuators" },
    ],
    benefits: [
      "Full-bore design provides zero flow restriction and minimum pressure drop across the valve",
      "ISO 5211 direct mount pad allows instant bolt-on automation without custom mounting brackets",
      "Anti-static spring device and API 607 fire-safe design options available for hazardous hydrocarbon lines",
      "Adjustable V-ring stem packing spring washers maintain leak-tight seal during thermal cycling",
    ],
    applications: ["Chemical", "Pharma", "Food", "Oil & Gas"],
  },
  "Ball Valve": {
    tagline: "Screwed end (BSP/NPT) and socket weld stainless steel ball valves for rapid shut-off.",
    description:
      "Compact 1-piece, 2-piece, and 3-piece threaded ball valves constructed from investment cast SS316 or brass. Provides rapid quarter-turn isolation for process utilities, compressed air, water, and auxiliary sampling lines.",
    specs: [
      { label: "Construction", value: "1-piece (reduced bore), 2-piece (full bore), 3-piece (in-line serviceable)" },
      { label: "End connections", value: "BSP / NPT female threads, Socket Weld (SW), or Butt Weld (BW)" },
      { label: "Material grades", value: "CF8M (SS316) stainless steel or forged nickel-plated brass" },
      { label: "Seat material", value: "PTFE / RPTFE (Glass reinforced) seats and thrust washers" },
      { label: "Pressure rating", value: "1000 WOG (68 bar cold working pressure) / PN63 rating" },
      { label: "Size range", value: "1/4 inch to 4 inch (DN8 to DN100)" },
      { label: "Handle", value: "Heavy-duty SS304 lever handle with vinyl grip and lockable latch device" },
    ],
    benefits: [
      "3-piece body design allows center section removal for seat replacement without unthreading pipework",
      "1000 WOG high-pressure rating handles demanding steam, hydraulic, and process gas lines",
      "Lockable lever handle prevents unauthorized or accidental valve operation in critical plant zones",
      "Investment cast stainless steel bodies prevent porosity and exterior washdown corrosion",
    ],
    applications: ["Chemical", "Food", "Beverages", "Breweries"],
  },
  "Gate Valve": {
    tagline: "Rising stem and non-rising stem wedge gate valves in SS316/WCB for full-flow isolation.",
    description:
      "Heavy-duty industrial wedge gate valve designed for full-flow isolation and infrequent shut-off duty. Features a solid or flexible wedge that retracts completely out of the flow path, providing zero resistance to viscous fluids.",
    specs: [
      { label: "Design", value: "OS&Y (Outside Screw & Yoke) rising stem or Non-rising stem, bolted bonnet" },
      { label: "Wedge type", value: "Solid wedge or flexible wedge with precision guided seating faces" },
      { label: "Body metallurgy", value: "ASTM A351 CF8M (SS316) / ASTM A216 WCB Cast Steel / Cast Iron" },
      { label: "Seat & Trim", value: "API 600 Trim 8 (SS310) / Trim 10 (SS316) / Stellite hard-faced seats" },
      { label: "Connections", value: "ASME B16.5 Class 150/300 flanged, BSP/NPT screwed, or Socket Weld" },
      { label: "Size range", value: "1/2 inch to 24 inch (DN15 to DN600)" },
      { label: "Packing", value: "Graphite or PTFE braided stem packing with back-seat bushing" },
    ],
    benefits: [
      "Straight-through unobstructed flow passage allows passing of pipeline cleaning pigs and scrapers",
      "Stellite hard-faced seating trim prevents galling and wire-drawing erosion under high differential pressures",
      "OS&Y rising stem provides visual indication of valve open/closed position from a distance",
      "Back-seat design allows stem packing repacking while the valve is in service under full line pressure",
    ],
    applications: ["Oil & Gas", "Chemical", "Food"],
  },

  // ==========================================
  // 11. SPRINGS (9 items)
  // ==========================================
  "Compression Spring": {
    tagline: "Open-wound helical compression springs precision coiled from SS316 or Inconel wire.",
    description:
      "Precision open-wound helical springs engineered to resist compressive forces applied axially. Coiled on high-speed CNC spring formers using premium spring-temper alloy wire, with squared and ground ends for uniform load transfer.",
    specs: [
      { label: "Wire diameter", value: "0.2 mm to 16.0 mm round or rectangular spring wire stock" },
      { label: "Material grades", value: "SS304 / SS316 / PH 17-7 / Inconel 600 / Inconel 718 / Hastelloy-C / Music Wire" },
      { label: "End configuration", value: "Closed and ground ends (standard), closed not ground, or open coiled" },
      { label: "Load tolerances", value: "Precision coiled to DIN 2095 Grade 1 / Grade 2 spring load tolerances" },
      { label: "Surface treatment", value: "Shot-peened for fatigue life, passivated, or electro-polished" },
      { label: "Temperature range", value: "-200 °C to +300 °C (SS316) / up to +550 °C (Inconel X-750)" },
    ],
    benefits: [
      "Inconel 718 and Hastelloy-C grades maintain spring rate and resist relaxation in boiling acids",
      "Precision ground flat ends ensure perpendicularity and prevent side-buckling in mechanical seal pusher assemblies",
      "Shot-peening treatment induces compressive surface stress, increasing cyclic fatigue life by 300%",
      "Custom spring rate (N/mm) matching available for valve relief and pressure regulator calibration",
    ],
    applications: ["Chemical", "Pharma", "Oil & Gas", "Plastics"],
  },
  "Torsion Spring": {
    tagline: "Helical springs designed to store and release angular torque with custom leg geometries.",
    description:
      "Precision helical torsion springs designed to exert or resist rotational torque when angular deflection is applied to the legs. Wound single or double-bodied with custom straight, hooked, or looped leg terminations.",
    specs: [
      { label: "Coiling direction", value: "Right-hand wound, left-hand wound, or double torsion (dual body)" },
      { label: "Leg configurations", value: "Straight offset, hinge ends, short hook, loop ends, custom 3D bends" },
      { label: "Wire diameter", value: "0.3 mm to 10.0 mm spring wire diameter" },
      { label: "Material grades", value: "Stainless Steel AISI 302 / 316 / Phosphor Bronze / Carbon Spring Steel" },
      { label: "Torque capacity", value: "Custom engineered to exact angular torque (N·mm per degree of rotation)" },
      { label: "Mandrel clearance", value: "Engineered with generous ID clearance to prevent binding on support shafts" },
    ],
    benefits: [
      "Provides reliable return torque for industrial valve handles, check valve clappers, and actuator levers",
      "CNC wire forming enables intricate leg bends that hook directly into mating machinery without secondary fasteners",
      "Phosphor bronze and SS316 grades offer non-magnetic and corrosion-resistant performance",
      "100% load tested at specified angular deflection to verify torque consistency across production batches",
    ],
    applications: ["Food", "Chemical", "Plastics"],
  },
  "Disc / Belleville Spring": {
    tagline: "Conical spring washers (Belleville washers) stacked for high loads in tight spaces.",
    description:
      "Precision conically shaped spring washers (Belleville washers) manufactured to DIN 2093. Designed to be loaded axially, providing exceptionally high spring force within a fraction of the axial space required by helical springs.",
    specs: [
      { label: "Standard", value: "DIN 2093 / EN 16983 dimensional and quality specifications" },
      { label: "Material grades", value: "50CrV4 Spring Steel / SS301 / SS316 / Inconel 718 / 17-7 PH Stainless" },
      { label: "Size range", value: "Outer diameter 6 mm to 250 mm / Thickness 0.2 mm to 14.0 mm" },
      { label: "Stacking arrangements", value: "Parallel stack (for maximum load), Series stack (for maximum deflection)" },
      { label: "Load capacity", value: "Delivers from 100 N up to 500,000+ N compressive load per stack" },
      { label: "Fatigue life", value: "Designed for dynamic fatigue life exceeding 2 million deflection cycles" },
    ],
    benefits: [
      "Generates immense clamping force in ultra-compact axial cavities where standard coil springs cannot fit",
      "Modular stacking allows plant engineers to infinitely tune spring load and travel by altering washer arrangement",
      "Maintains constant gasket bolt tension on high-temperature chemical reactor flanges during thermal cycling",
      "Prevents valve stem packing leaks by providing continuous live-load compensation as packing wears",
    ],
    applications: ["Oil & Gas", "Chemical", "Pharma"],
  },
  "Heavy Duty Kelly Spring": {
    tagline: "Extra-heavy wire diameter coil springs engineered for vibrating screens and crushers.",
    description:
      "Rugged, large-diameter hot-wound and cold-wound compression springs (Kelly springs). Engineered to isolate heavy mechanical shock and vibration in mining screens, shale shakers, forging hammers, and industrial suspension hoppers.",
    specs: [
      { label: "Wire diameter", value: "10.0 mm to 50.0 mm heavy alloy spring steel bar stock" },
      { label: "Material grade", value: "5160 / 52100 / 50CrV4 / Silico-Manganese Alloy Spring Steel" },
      { label: "Coiling method", value: "Hot-wound on precision mandrels followed by oil quenching and tempering" },
      { label: "Load capacity", value: "Engineered for dynamic compressive shock loads exceeding 20 tonnes per spring" },
      { label: "Ends finish", value: "Precision ground flat and square (70% to 80% contact area) for stable seating" },
      { label: "Protective coating", value: "Heavy-duty epoxy powder coating or zinc phosphate corrosion protection" },
    ],
    benefits: [
      "Absorbs massive dynamic shock loads without coil bottoming or permanent set deformation",
      "Isolates destructive 3D vibration from vibrating screens, protecting surrounding plant civil foundations",
      "Hot-wound metallurgy ensures uniform grain structure across ultra-thick spring bar diameters",
      "Custom color-coded powder coating allows quick visual load-rating identification in maintenance stores",
    ],
    applications: ["Oil & Gas", "Plastics", "Chemical"],
  },
  "Extension Spring": {
    tagline: "Close-wound helical springs with machine loops or crossover hooks for tensile loads.",
    description:
      "Precision close-wound helical springs designed to absorb and store energy by resisting tensile pulling forces. Manufactured with initial tension and custom end loops, hooks, or swivel eyes for secure mechanical attachment.",
    specs: [
      { label: "End configurations", value: "Machine half/full loops, crossover center hooks, extended hooks, swivel eyes" },
      { label: "Wire diameter", value: "0.3 mm to 12.0 mm spring wire diameter" },
      { label: "Material grades", value: "SS304 / SS316 / Carbon Spring Steel / Music Wire / Inconel 600" },
      { label: "Initial tension", value: "Custom wound with controlled initial tension to hold mechanisms firmly closed" },
      { label: "Stress relief", value: "Oven baked post-coiling to relieve forming stresses and stabilize hook strength" },
      { label: "Load rating", value: "Engineered to exact pull-force at specified extended length" },
    ],
    benefits: [
      "Initial tension feature holds doors, lever arms, and belt tensioners firmly in return position without slack",
      "Crossover center hook geometry ensures load pull vector passes directly through the central spring axis",
      "Stainless steel SS316 construction prevents rusting and breakage in wet food processing washdown zones",
      "Custom swivel hook loops prevent spring twisting and premature hook fatigue in articulated mechanisms",
    ],
    applications: ["Food", "Plastics", "Chemical"],
  },
  "Auger Conveyor Spring": {
    tagline: "Continuous helical spiral wire forms used as flexible screw conveyor flights.",
    description:
      "Heavy-duty centerless helical spiral springs used as the rotating driving element in flexible screw conveyors and dosing augers. Conveys bulk powders, granules, and flakes through curved tubes without a central shaft.",
    specs: [
      { label: "Wire profile", value: "Rectangular flat wire, square wire, or round heavy wire cross-section" },
      { label: "Material grade", value: "High-tensile Spring Steel or hygienic SS304 / SS316 stainless steel" },
      { label: "Outer diameter", value: "38 mm to 250 mm outer diameter matching standard conveyor tubes" },
      { label: "Pitch accuracy", value: "Precision uniform pitch coiled across continuous lengths up to 15 meters" },
      { label: "Surface finish", value: "Mirror polished SS316 finish for pharmaceutical and food powder dosing" },
      { label: "Rotation", value: "Left-hand or right-hand helix matching conveyor drive motor rotation" },
    ],
    benefits: [
      "Shaftless centerless design prevents bridging and clogging when conveying sticky or fibrous bulk powders",
      "Flexible spiral geometry allows conveying powder around 90-degree curves and vertical plant elevations",
      "All-SS316 polished models comply with stringent hygienic standards for milk powder and flour transport",
      "High torsional fatigue strength resists twisting and distortion under heavy bulk material start-up loads",
    ],
    applications: ["Food", "Pharma", "Plastics", "Chemical"],
  },
  "Conical / Taper Spring": {
    tagline: "Cone-shaped compression springs that telescopically compress into their own height.",
    description:
      "Engineered cone-shaped compression springs where the coil diameter gradually decreases from base to top. Allows the coils to telescope inside each other when compressed, achieving a solid height equal to a single wire diameter.",
    specs: [
      { label: "Geometry", value: "Conical tapered profile (constant or variable pitch coiling)" },
      { label: "Solid height", value: "Telescopic nesting allows ultra-low solid height (approx. 1× to 2× wire dia)" },
      { label: "Spring rate", value: "Non-linear progressive spring rate (stiffens as larger coils bottom out)" },
      { label: "Material grades", value: "SS304 / SS316 / Music Wire / Phosphor Bronze / 17-7 PH Stainless" },
      { label: "Stability", value: "Natural lateral stability prevents buckling even at high slenderness ratios" },
      { label: "Wire diameter", value: "0.4 mm to 8.0 mm wire stock" },
    ],
    benefits: [
      "Telescopic coil nesting saves up to 70% axial space in low-profile battery contacts and push-button valves",
      "Progressive spring rate provides soft initial cushioning followed by high resistance against overload bottoming",
      "Broad base diameter provides inherent self-centering stability without requiring internal guide rods",
      "Natural resonance damping prevents spring surging in high-speed reciprocating valve mechanisms",
    ],
    applications: ["Pharma", "Food", "Chemical"],
  },
  "Volute Spring": {
    tagline: "Heavy-duty compression spring made from coiled flat steel strip for natural damping.",
    description:
      "Robust compression spring constructed from a V-shaped or flat steel strip wound in the form of a conical scroll (volute). As the spring compresses, the sliding friction between adjacent strip coils provides powerful natural vibration damping.",
    specs: [
      { label: "Material profile", value: "High-carbon flat spring steel strip or AISI 301 stainless steel strip" },
      { label: "Construction", value: "Conical scroll winding with overlapping telescoping coils" },
      { label: "Damping property", value: "High inter-coil sliding friction absorbs up to 50% of impact energy" },
      { label: "Load capacity", value: "Exceptionally high radial and axial load capacity in tight vertical spaces" },
      { label: "Stroke travel", value: "Telescoping flat coils allow short solid height under maximum compression" },
      { label: "Applications", value: "Heavy pruners, stamping presses, buffer stops, and heavy industrial latches" },
    ],
    benefits: [
      "Built-in frictional damping stops repetitive bouncing and oscillation in heavy impact machinery",
      "Flat strip construction provides up to 5× higher load capacity than wire springs of equivalent volume",
      "Telescoping action prevents coil over-stressing during severe accidental mechanical overload",
      "Robust strip geometry resists tangling and distortion in heavy maintenance environments",
    ],
    applications: ["Plastics", "Oil & Gas", "Chemical"],
  },
  "Wire Forms Spring": {
    tagline: "Custom 2D and 3D wire-formed clips, retention brackets, pins, and custom geometries.",
    description:
      "Bespoke 2D and 3D precision wire forms manufactured on multi-axis CNC wire bending machines. Includes R-clips, retaining pins, linkage rods, spring brackets, and custom wire geometries produced from client CAD models.",
    specs: [
      { label: "Manufacturing", value: "7-axis and 10-axis CNC wire forming and bending automation" },
      { label: "Wire diameter", value: "0.5 mm to 12.0 mm wire diameters" },
      { label: "Material grades", value: "SS304 / SS316 / Hard Drawn Spring Steel / Brass / Monel / Inconel" },
      { label: "Geometric features", value: "Multiple 3D bends, loops, flattened sections, threading, and chamfered ends" },
      { label: "Tolerances", value: "Precision bend angles (±0.5°) and linear dimensions to ISO 2768-m" },
      { label: "Prototypes", value: "No expensive stamp tooling required — rapid prototype delivery from DXF/STEP files" },
    ],
    benefits: [
      "Replaces complex multi-piece welded brackets with a single, high-strength continuous wire component",
      "CNC automation ensures 100% geometric repeatability across runs of 100 to 100,000 pieces",
      "Spring-temper SS316 wire forms provide quick-release snap-action retention for hygienic pipe covers",
      "Smooth deburred wire ends protect operators and prevent scratching of mating stainless components",
    ],
    applications: ["Food", "Pharma", "Chemical", "Plastics"],
  },

  // ==========================================
  // 12. MOTORS & GEARBOXES (2 items)
  // ==========================================
  "Motor": {
    image: "/images/motor.jpg",
    tagline: "Industrial IE2/IE3 high-efficiency three-phase AC induction motors.",
    description:
      "A motor is a device that converts electrical energy into mechanical energy, resulting in motion. Motors are fundamental components in a wide range of applications, from everyday appliances to industrial machinery. Engineered for continuous S1 duty in chemical plants, pump stations, and utility lines.",
    specs: [
      { label: "Efficiency class", value: "IE2 / IE3 premium energy efficiency per IEC 60034-30" },
      { label: "Power rating", value: "0.25 kW up to 315 kW three-phase induction" },
      { label: "Speed / Poles", value: "2, 4, 6, and 8 pole (3000, 1500, 1000, 750 RPM at 50 Hz)" },
      { label: "Mounting", value: "B3 foot mount, B5 flange, B14 face, or B35 combined foot/flange" },
      { label: "Enclosure", value: "IP55 / IP56 cast iron or aluminum casing with TEFC cooling" },
      { label: "Insulation", value: "Class F insulation with Class B temperature rise (155 °C)" },
    ],
    benefits: [
      "High energy efficiency significantly reduces plant electrical power consumption and carbon footprint",
      "Robust cast iron enclosure withstands harsh chemical, dust, and washdown environments",
      "Precision dynamically balanced rotors ensure ultra-low vibration and extended bearing lifetime",
      "Inverter-grade insulation system enables direct operation with Variable Frequency Drives (VFD)",
    ],
    applications: ["Chemical", "Food", "Pharma", "Oil & Gas"],
  },
  "Gearboxes": {
    image: "/images/gearboxes.jpg",
    tagline: "Heavy-duty helical worm and right-angle speed reducer gearboxes.",
    description:
      "Gearboxes, also known as transmissions or gear reducers, are mechanical devices that transmit power from a rotating source (like an engine or motor) to another component, often changing the torque and speed in the process. Designed for high torque density and quiet running in agitators, conveyors, and process pumps.",
    specs: [
      { label: "Gear type", value: "Right-angle helical worm, inline helical, or bevel helical reducer" },
      { label: "Reduction ratio", value: "5:1 up to 100:1 single stage (up to 5000:1 multi-stage)" },
      { label: "Output torque", value: "Up to 15,000 Nm rated continuous torque capacity" },
      { label: "Input interface", value: "IEC standard B5 / B14 motor adapter flange or solid input shaft" },
      { label: "Housing", value: "Heavy-duty cast iron or aluminum alloy with navy blue industrial epoxy coat" },
      { label: "Lubrication", value: "Synthetic or mineral gear oil bath with sight glass and brass breather" },
    ],
    benefits: [
      "Multiplies motor torque while reducing rotational speed for precision agitator and conveyor drives",
      "Precision ground helical gears ensure ultra-quiet operation (< 65 dB) and high mechanical efficiency",
      "Modular IEC flange design allows instant coupling to standard industrial AC induction motors",
      "Heavy-duty roller bearings support high radial and axial overhung shaft loads without deflection",
    ],
    applications: ["Chemical", "Food", "Pharma", "Breweries"],
  },

  // ==========================================
  // 13. OTHER PRODUCTS (3 items)
  // ==========================================
  "Nylatron Rod": {
    tagline: "Cast and extruded polyamide (PA6 / PA66) rods filled with MoS2 for low friction.",
    description:
      "High-performance engineering thermoplastic stock shapes. Nylatron (Molybdenum Disulphide MoS2-filled Nylon) provides self-lubricating properties, exceptionally low coefficient of friction, and high mechanical wear strength for machining bushes and gears.",
    specs: [
      { label: "Material grade", value: "PA6 / PA66 Cast Polyamide modified with MoS2 (Nylatron GSM equiv)" },
      { label: "Diameter range", value: "Round rod stock from 10 mm up to 300 mm diameter (plates & tubes available)" },
      { label: "Length", value: "1000 mm / 3000 mm standard lengths or precision cut discs/blanks" },
      { label: "Tensile strength", value: "85 MPa high mechanical strength and rigidity" },
      { label: "Friction coeff.", value: "0.15 to 0.20 self-lubricating dry running friction against steel" },
      { label: "Max Temperature", value: "-30 °C to +105 °C continuous (+150 °C short term peak)" },
      { label: "Machinability", value: "Excellent chip control on standard lathes without coolant absorption" },
    ],
    benefits: [
      "Self-lubricating MoS2 filler allows gears and bearings to run silently without grease or oil lubrication",
      "Outwears phosphor bronze bushings by 5× while weighing only 1/7th as much as brass",
      "High impact and fatigue strength absorbs shock loads in bottling line star-wheels and scraper blades",
      "Will not gall or score mating stainless steel shafts during dry start-up periods",
    ],
    applications: ["Food", "Beverages", "Plastics", "Chemical"],
  },
  "Non-Sparking Tools": {
    tagline: "Safety hand tools (wrenches, hammers, pliers) forged from Al-Bronze or Be-Cu.",
    description:
      "Certified non-sparking, non-magnetic, and corrosion-resistant safety hand tools. Forged from Beryllium-Copper (Be-Cu) or Aluminium-Bronze (Al-Br) alloys for safe maintenance work in ATEX Zone 0, 1, and 2 explosive atmospheres.",
    specs: [
      { label: "Alloy grades", value: "Beryllium-Copper (Be-Cu - 35-40 HRC) / Aluminium-Bronze (Al-Br - 25-30 HRC)" },
      { label: "Tool range", value: "Open-end wrenches, box spanners, pipe wrenches, hammers, pliers, scrapers, sockets" },
      { label: "Safety standard", value: "Certified non-sparking to ATEX / IECEx / DIN standards for Zone 0/1/2/20/21/22" },
      { label: "Magnetic property", value: "100% non-magnetic (Be-Cu grade) — safe for MRI rooms and magnetic separators" },
      { label: "Corrosion resistance", value: "Total resistance to rust, saltwater, acids, and atmospheric corrosion" },
      { label: "Construction", value: "Drop forged and precision heat treated for maximum torque and lifetime durability" },
    ],
    benefits: [
      "Eliminates fatal frictional ignition sparks when tightening flanges in petrochemical refineries and grain silos",
      "Beryllium-Copper tensile strength (1250 MPa) matches alloy steel tools without risk of sparking",
      "Non-magnetic properties prevent tools from snapping onto powerful magnetic drums in food processing",
      "Supplied in individual modular kits or comprehensive site maintenance toolboxes",
    ],
    applications: ["Oil & Gas", "Chemical", "Pharma", "Food"],
  },
  "Pressure Gauge": {
    tagline: "Industrial Bourdon tube pressure gauges with stainless steel case, dry or liquid filled.",
    description:
      "Precision industrial pressure and vacuum gauges featuring a robust SS304 stainless steel bayonet case and Bourdon tube sensing element. Available dry or glycerine/silicone oil filled to dampen severe pump pulsation and vibration.",
    specs: [
      { label: "Dial sizes", value: "63 mm (2.5 in), 100 mm (4 in), and 150 mm (6 in) readable dials" },
      { label: "Pressure ranges", value: "Full vacuum (-1 to 0 bar), compound, and positive pressure up to 1000 bar" },
      { label: "Wetted parts", value: "Brass / SS316L Bourdon tube and process connection socket" },
      { label: "Case & Bezel", value: "SS304 stainless steel weatherproof IP65 bayonet case with safety glass" },
      { label: "Liquid filling", value: "Optional 99.7% Glycerine (standard) or Silicone oil (for low/high temps)" },
      { label: "Accuracy class", value: "Class 1.0 (±1% of full scale) to EN 837-1 industrial standard" },
      { label: "Process connection", value: "1/4 inch, 3/8 inch, or 1/2 inch BSP / NPT bottom or back mount" },
    ],
    benefits: [
      "Glycerine liquid filling absorbs severe pump discharge pulsation, eliminating needle flutter and gear wear",
      "All-SS316 wetted parts and chemical diaphragm seal options handle corrosive acids and slurry media",
      "Safety blowout disc on case back protects operators in the event of extreme over-pressure Bourdon tube rupture",
      "Crisp high-contrast dual scale (bar / PSI) dials ensure effortless visual readings from plant walkways",
    ],
    applications: ["Chemical", "Pharma", "Food", "Oil & Gas"],
  },
};
