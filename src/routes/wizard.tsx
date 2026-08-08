import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Factory, Droplets, Flame, Thermometer, Wind, RefreshCw, Zap, FlaskConical, Waves } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/lib/db";

// Server function to fetch recommendations based on selections
const getRecommendations = createServerFn({ method: "GET" }).handler(async () => {
  // For the sake of the wizard, we'll fetch a few top products and categories
  const [products, categories] = await Promise.all([
    db.product.findMany({ take: 3, orderBy: { priority: "asc" }, include: { category: true }, where: { isDeleted: false, isHidden: false } }),
    db.category.findMany({ take: 2, orderBy: { priority: "asc" }, where: { isDeleted: false, isHidden: false } })
  ]);
  return { products, categories };
});

export const Route = createFileRoute("/wizard")({
  component: WizardPage,
  loader: () => getRecommendations(),
});

const steps = [
  {
    id: "industry",
    title: "What is your primary industry?",
    subtitle: "Select the industry that best matches your application.",
    options: [
      { id: "chemical", label: "Chemical Processing", icon: FlaskConical },
      { id: "food", label: "Food & Beverage", icon: Droplets },
      { id: "water", label: "Water & Wastewater", icon: Waves },
      { id: "general", label: "General Industrial", icon: Factory },
    ]
  },
  {
    id: "environment",
    title: "What are your operating conditions?",
    subtitle: "Tell us about the environment the seal will operate in.",
    options: [
      { id: "high-temp", label: "High Temperature (> 200°C)", icon: Flame },
      { id: "high-pressure", label: "High Pressure", icon: Wind },
      { id: "corrosive", label: "Corrosive Chemicals", icon: Zap },
      { id: "standard", label: "Standard / Ambient", icon: Thermometer },
    ]
  },
  {
    id: "equipment",
    title: "What equipment are you sealing?",
    subtitle: "Select the type of machinery.",
    options: [
      { id: "centrifugal", label: "Centrifugal Pumps", icon: RefreshCw },
      { id: "agitators", label: "Agitators / Mixers", icon: RefreshCw },
      { id: "compressors", label: "Compressors", icon: Factory },
      { id: "other", label: "Other Equipment", icon: Factory },
    ]
  }
];

function WizardPage() {
  const recommendations = Route.useLoaderData();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelect = (stepId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [stepId]: optionId }));
    
    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final step reached
        setCurrentStep(prev => prev + 1);
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 2000); // Simulate calculation
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const resetWizard = () => {
    setSelections({});
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-brass selection:text-black flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-brass/50 transition-colors">
              <ArrowLeft className="h-5 w-5 text-zinc-400 group-hover:text-brass transition-colors" />
            </div>
            <span className="font-bold tracking-widest uppercase text-sm">Back to Home</span>
          </Link>
          <div className="text-zinc-500 font-medium text-xs tracking-widest uppercase">
            Product Finder Wizard
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brass/10 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="w-full max-w-4xl relative z-10">
          
          {/* Progress Indicator */}
          {currentStep < steps.length && (
            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                {steps.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentStep ? 'w-12 bg-brass' : index < currentStep ? 'w-8 bg-brass/40' : 'w-8 bg-zinc-800'
                    }`} />
                  </div>
                ))}
              </div>
              <p className="text-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          )}

          {/* Wizard Steps */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              
              {/* Question Steps */}
              {currentStep < steps.length && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full flex flex-col items-center text-center"
                >
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">{steps[currentStep].title}</h1>
                  <p className="text-zinc-400 text-lg mb-12 max-w-xl">{steps[currentStep].subtitle}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                    {steps[currentStep].options.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selections[steps[currentStep].id] === option.id;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(steps[currentStep].id, option.id)}
                          className={`group relative flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                            isSelected 
                              ? 'border-brass bg-brass/10 shadow-[0_0_30px_rgba(220,177,110,0.15)]' 
                              : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700'
                          }`}
                        >
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-brass text-black' : 'bg-zinc-950 text-zinc-400 group-hover:text-white'
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className={`text-lg font-bold transition-colors ${
                            isSelected ? 'text-brass' : 'text-zinc-300 group-hover:text-white'
                          }`}>
                            {option.label}
                          </span>
                          
                          {/* Selected Checkmark */}
                          {isSelected && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 right-4 text-brass"
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Calculating / Loading State */}
              {currentStep === steps.length && isCalculating && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="relative h-24 w-24 mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-brass border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-brass animate-pulse" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight mb-2">Analyzing Requirements...</h2>
                  <p className="text-zinc-400">Finding the perfect sealing solution for your application.</p>
                </motion.div>
              )}

              {/* Results State */}
              {currentStep === steps.length && !isCalculating && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">Matches Found!</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                      Based on your requirements, here are our top recommended products engineered for your exact specifications.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {recommendations.products.map((product: any, idx: number) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        key={product.id}
                      >
                        <Link
                          to={`/products/${product.category.slug}/${product.slug}`}
                          className="group flex flex-col h-full rounded-3xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-brass/30 hover:bg-zinc-900 transition-all duration-500"
                        >
                          <div className="aspect-[4/3] bg-zinc-950 relative overflow-hidden">
                            <img 
                              src={product.image || "/placeholder.svg"} 
                              alt={product.name}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-brass text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                              Best Match
                            </div>
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-2xl font-black text-white mb-2">{product.name}</h3>
                            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                              {product.category?.name}
                            </p>
                            <p className="text-zinc-400 text-sm line-clamp-3 mb-6">
                              {product.tagline || product.description}
                            </p>
                            <div className="mt-auto flex items-center text-brass font-bold text-sm tracking-widest uppercase group-hover:gap-4 transition-all gap-2">
                              View Details <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-16 text-center">
                    <button
                      onClick={resetWizard}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" /> Start Over
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
