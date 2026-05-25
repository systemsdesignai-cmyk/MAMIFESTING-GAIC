import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Target, 
  Heart, 
  Activity, 
  CheckCircle, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Zap,
  Repeat,
  Lightbulb,
  Compass,
  MessageCircle,
  Dumbbell
} from 'lucide-react';
import { Icons } from './stepLayout';

const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center text-center max-w-2xl px-6">
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-fuchsia-500 blur-[80px] opacity-25 rounded-full animate-pulse"></div>
      <Sparkles className="w-20 h-20 text-amber-300 relative z-10" />
    </div>
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-amber-200 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
      Manifesting
    </h1>
    <p className="text-lg md:text-2xl text-indigo-100 font-light leading-relaxed mb-8">
      The intentional process of aligning one's <span className="font-semibold text-white">thoughts, emotions, beliefs,</span> and <span className="font-semibold text-white">actions</span> with a desired outcome.
    </p>
    <div className="animate-bounce mt-6 bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20">
      <ArrowRight className="w-5 h-5 text-white" />
    </div>
    <p className="mt-4 text-xs text-indigo-300 uppercase tracking-widest font-mono">Swipe or use arrows to navigate</p>
  </div>
);

const IntentionSlide = () => {
  const [exampleState, setExampleState] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl px-6 gap-8 w-full">
      <div className="flex-1 space-y-6 text-left">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 mb-2">
          <Target className="w-4 h-4 text-amber-300" />
          <span className="font-semibold tracking-wide uppercase text-xs font-mono">Pillar 1</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">Intention</h2>
        <p className="text-base md:text-lg text-indigo-100/95 leading-relaxed">
          Manifesting begins with absolute clarity of direction. An intention is not merely a wish — it is a consciously chosen target.
        </p>
        <div className="p-5 bg-white/5 border-l-4 border-amber-400 rounded-r-xl backdrop-blur-sm">
          <p className="text-lg md:text-xl font-medium text-amber-100 italic">
            "This is the reality I am actively choosing to construct."
          </p>
        </div>
        <p className="text-sm md:text-base text-indigo-200">
          Without intention, desire is diffuse. With direction, the nervous system prioritizes perception, memory, and physical behavior around a real possibility.
        </p>
      </div>

      <div className="flex-1 w-full bg-slate-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl text-left">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Icons.Eye className="w-5 h-5 text-indigo-400" /> Comparative Diagnostics
        </h3>
        <p className="text-xs text-indigo-300 uppercase tracking-wider mb-6 font-mono">Tap a variant to preview focus status</p>
        
        <div className="space-y-4">
          <button 
            type="button"
            onClick={() => setExampleState(1)}
            className={`w-full text-left p-5 rounded-xl transition-all duration-300 cursor-pointer ${
              exampleState === 1 
                ? 'bg-red-500/10 border-red-500/40 shadow-inner' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            } border`}
          >
            <div className="text-xs text-red-300 font-bold mb-1 uppercase tracking-wide">Variant A: The Blurred Wish</div>
            <div className={`text-base font-semibold ${exampleState === 1 ? 'text-white' : 'text-white/40 blur-[1px]'}`}>"I just want to be successful."</div>
          </button>

          <button 
            type="button"
            onClick={() => setExampleState(2)}
            className={`w-full text-left p-5 rounded-xl transition-all duration-300 cursor-pointer ${
              exampleState === 2 
                ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            } border`}
          >
            <div className="text-xs text-emerald-300 font-bold mb-1 uppercase tracking-wide">Variant B: Defined Intention</div>
            <div className={`text-base font-semibold ${exampleState === 2 ? 'text-white' : 'text-white/40 blur-[1px]'}`}>"I want to build a self-sustaining business that creates high value."</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const BeliefSlide = () => {
  const [activeBelief, setActiveBelief] = useState<number | null>(null);
  
  const beliefs = [
    { id: 1, icon: <Lightbulb className="w-5 h-5" />, title: "Confidence Schema", desc: "Controls how boldly you test outer limits." },
    { id: 2, icon: <Repeat className="w-5 h-5" />, title: "Inertia Resilience", desc: "Keeps motivation high when reality lags behind." },
    { id: 3, icon: <Zap className="w-5 h-5" />, title: "Emotional Baseline", desc: "Directly powers physical stamina." },
    { id: 4, icon: <Compass className="w-5 h-5" />, title: "Interpretation Frame", desc: "Translates random failures into directional data." }
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl px-6 w-full text-center">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 mb-6">
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span className="font-semibold tracking-wide uppercase text-xs font-mono">Pillar 2</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Belief Alignment</h2>
      <p className="text-sm md:text-lg text-indigo-100 max-w-2xl leading-relaxed mb-8">
        Belief is the cognitive acceptance of possibility. Physical behavior follows <span className="text-amber-300 font-semibold underline decoration-white/30 underline-offset-4">subjective rules</span> more than objective parameters.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl text-left">
        {beliefs.map((b) => (
          <div 
            key={b.id}
            onMouseEnter={() => setActiveBelief(b.id)}
            onMouseLeave={() => setActiveBelief(null)}
            onClick={() => setActiveBelief(activeBelief === b.id ? null : b.id)}
            className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 overflow-hidden relative
              ${activeBelief === b.id ? 'bg-indigo-950/40 border-indigo-500/40 shadow-md' : 'bg-white/5 border-white/5 hover:bg-white/10'}
            `}
          >
            <div className={`p-3 rounded-xl transition-colors ${activeBelief === b.id ? 'bg-indigo-500 text-white' : 'bg-white/10 text-indigo-300'}`}>
              {b.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-white mb-0.5">{b.title}</h4>
              <p className={`text-xs text-indigo-200 transition-all duration-300 ${activeBelief === b.id ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 translate-y-2 h-0 overflow-hidden'}`}>
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <p className="mt-8 text-xs md:text-sm text-indigo-300 italic max-w-2xl bg-black/20 p-4 rounded-xl border border-white/5">
        "Conscious desires that contradict subconscious rules create biological and focus sabotage."
      </p>
    </div>
  );
};

const EmotionSlide = () => {
  const practices = [
    "Vivid Mental Cinema", "Proactive Gratitude", "Focus Anchoring", "State Rehearsals", "Embodied Worth"
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl px-6 gap-10 w-full text-left">
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200">
          <Heart className="w-4 h-4 text-amber-300" />
          <span className="font-semibold tracking-wide uppercase text-xs font-mono">Pillar 3</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">Emotional Priming</h2>
        <p className="text-base md:text-lg text-indigo-100 leading-relaxed">
          The subconscious records futures that have emotional charge. Emotions act as cognitive reinforcement indicators that write focus pathways.
        </p>
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div className="bg-red-950/20 p-4 rounded-xl border border-red-500/20">
            <span className="block text-red-400 font-bold mb-1">Fear Baseline</span>
            <span className="text-white/70 text-xs">Constricts attention.</span>
          </div>
          <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
            <span className="block text-emerald-400 font-bold mb-1">Aligned State</span>
            <span className="text-white/70 text-xs">Magnifies priority.</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <h3 className="text-xs font-bold text-indigo-300 mb-6 uppercase tracking-widest font-mono">Aesthetic Aligners</h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-md">
          {practices.map((practice, idx) => (
            <div 
              key={idx}
              className="relative cursor-pointer group"
            >
              <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-r from-pink-500/20 to-amber-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-5 py-3 bg-indigo-950/40 border border-indigo-400/20 rounded-full text-xs text-indigo-100 group-hover:text-white transition-all font-semibold hover:-translate-y-0.5">
                {practice}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-indigo-400 max-w-xs">
          Minimize the energetic contrast between what you desire and what you rehearse.
        </p>
      </div>
    </div>
  );
};

const ActionSlide = () => {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

  const toggles = [
    { desire: "Optimal Wellness", action: "Daily physical discipline", iconD: <Heart className="w-6 h-6" />, iconA: <Dumbbell className="w-6 h-6" /> },
    { desire: "Vibrant Alliance", action: "Courageous connection", iconD: <Sparkles className="w-6 h-6" />, iconA: <MessageCircle className="w-6 h-6" /> },
    { desire: "Pioneering Mastery", action: "Aggressive creative tests", iconD: <Target className="w-6 h-6" />, iconA: <Activity className="w-6 h-6" /> }
  ];

  const handleFlip = (idx: number) => {
    setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl px-6 w-full text-center">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 mb-6">
        <Activity className="w-4 h-4 text-amber-300" />
        <span className="font-semibold tracking-wide uppercase text-xs font-mono">Pillar 4</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Embodied Action</h2>
      <p className="text-sm md:text-lg text-indigo-100 max-w-2xl mb-8">
        Desire without action is inert. Real-world change occurs through structural alignment of thought, standard baseline behaviors, and bold opportunity responses.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {toggles.map((item, idx) => (
          <div 
            key={idx}
            className="h-56 w-full cursor-pointer relative group"
            onClick={() => handleFlip(idx)}
            style={{ perspective: '1000px' }}
          >
            <div 
              className="relative w-full h-full duration-700 transition-transform"
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: flipped[idx] ? 'rotateY(180deg)' : 'none' 
              }}
            >
              {/* Front Side */}
              <div 
                className="absolute inset-0 bg-slate-900 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-5 shadow-lg group-hover:border-indigo-400/40"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="p-3 bg-white/5 rounded-full text-indigo-300 mb-3 group-hover:scale-105 transition-transform">
                  {item.iconD}
                </div>
                <h4 className="text-xs text-white/50 uppercase tracking-widest font-mono">Vision Goal</h4>
                <div className="text-base font-bold text-amber-300 mt-1">{item.desire}</div>
                <p className="text-[10px] text-white/30 tracking-widest uppercase mt-4">Tap to view Action</p>
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 bg-emerald-950 border border-emerald-500/30 rounded-2xl flex flex-col items-center justify-center p-5 shadow-lg"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="p-3 bg-white/10 rounded-full text-emerald-350 mb-3">
                  {item.iconA}
                </div>
                <h4 className="text-xs text-emerald-400/60 uppercase tracking-widest font-mono">Aligned Action</h4>
                <div className="text-base font-bold text-emerald-300 text-center mt-1">{item.action}</div>
                <p className="text-[10px] text-emerald-400/50 tracking-widest uppercase mt-4">Tap to spin back</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SummarySlide = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage(prev => (prev < 4 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl px-6 w-full text-center">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 mb-6">
        <CheckCircle className="w-4 h-4 text-amber-300" />
        <span className="font-semibold tracking-wide uppercase text-xs font-mono">Synthesis</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">Structural Formula</h2>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl font-bold mb-10">
        <span className={`transition-all duration-700 ${activeStage >= 0 ? 'text-amber-300 opacity-100' : 'opacity-20'}`}>Intention</span>
        <span className="text-white/30">+</span>
        <span className={`transition-all duration-700 ${activeStage >= 1 ? 'text-indigo-300 opacity-100' : 'opacity-20'}`}>Belief</span>
        <span className="text-white/30">+</span>
        <span className={`transition-all duration-700 ${activeStage >= 2 ? 'text-pink-300 opacity-100' : 'opacity-20'}`}>Emotion</span>
        <span className="text-white/30">+</span>
        <span className={`transition-all duration-700 ${activeStage >= 3 ? 'text-emerald-300 opacity-100' : 'opacity-20'}`}>Action</span>
        <span className="text-white/20">=</span>
        <span className={`transition-all duration-700 font-mono text-xs px-4 py-1.5 border rounded-full ${
          activeStage >= 4 
            ? 'bg-white/10 text-white border-white/25 shadow-md' 
            : 'text-white/20 border-white/5'
        }`}>Reality Shift</span>
      </div>

      <div className={`transition-all duration-700 ${activeStage >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-indigo-950/40 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden">
          <p className="text-base md:text-lg text-white font-medium leading-relaxed max-w-xl mx-auto">
            Manifesting is the <span className="text-amber-300 font-semibold">conscious alignment</span> of perception, neurological filters, and intentional activities: making desired visions physical reality.
          </p>
        </div>
      </div>
    </div>
  );
};

const EtymologySlide = () => (
  <div className="flex flex-col items-center justify-center max-w-4xl px-6 w-full text-center">
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 mb-6">
      <BookOpen className="w-4 h-4 text-amber-300" />
      <span className="font-semibold tracking-wide uppercase text-xs font-mono">Origins</span>
    </div>
    
    <div className="bg-[#101224]/90 p-8 md:p-12 rounded-3xl border border-indigo-500/25 shadow-xl select-none relative w-full max-w-2xl">
      <h3 className="text-4xl md:text-5xl font-extrabold text-amber-100 italic">manifestus</h3>
      <p className="text-indigo-400 text-xs uppercase tracking-widest mt-1 font-semibold font-mono">( Latin Root )</p>
      
      <div className="space-y-4 text-left max-w-lg mx-auto mt-8 text-sm md:text-base leading-relaxed">
        <div className="flex gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></div>
          <p className="text-indigo-150">
            Implies <span className="text-white font-semibold">clear, visible, and observable</span> to standard senses.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
          <p className="text-indigo-150">
            Originally, to "manifest" meant to make something visible that was previously hidden or abstract.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2 shrink-0"></div>
          <p className="text-indigo-150">
            Now describes the psychological bridge connecting <span className="text-white font-semibold underline decoration-indigo-400 underline-offset-4">internal blueprint into physical manifestation</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const DefinitionTool = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    <IntroSlide key="0" />,
    <IntentionSlide key="1" />,
    <BeliefSlide key="2" />,
    <EmotionSlide key="3" />,
    <ActionSlide key="4" />,
    <SummarySlide key="5" />,
    <EtymologySlide key="6" />
  ];

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="absolute inset-0 bg-[#0B0F19] text-white overflow-hidden font-sans select-none flex flex-col items-center justify-center">
      {/* Visual background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-[-10%] w-[35%] h-[35%] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-[-10%] w-[45%] h-[45%] bg-fuchsia-600/10 rounded-full blur-[130px]"></div>
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 md:px-12 py-16">
        <div className="w-full h-full flex items-center justify-center max-h-[80vh] overflow-y-auto hidden-scrollbar">
          {slides[currentSlide]}
        </div>
      </div>

      {/* Control Navigation bars */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center gap-5 z-40 pointer-events-none">
        <div className="flex gap-2.5 pointer-events-auto bg-black/40 p-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx 
                  ? 'w-6 bg-amber-400' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={prevSlide}
        disabled={currentSlide === 0}
        type="button"
        className={`hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/40 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all text-white cursor-pointer ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        type="button"
        className={`hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/40 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all text-white cursor-pointer ${currentSlide === slides.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
