import React, { useState, useEffect, useRef, useCallback } from 'react';

// ==========================================
// TYPES
// ==========================================
export interface StepProps {
  data: Record<string, any>;
  updateData: (key: string, value: any) => void;
  name: string;
  onOpenReasoning: (step: number) => void;
  onOpenBestPractice: (step: number) => void;
  onOpenTools: (step: number) => void;
}

// ==========================================
// SPEECH RECOGNITION INTERFACES FOR TYPE SAFETY
// ==========================================
interface SpeechRecognitionResultList {
  [index: number]: {
    [index: number]: {
      transcript: string;
    };
  };
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

// ==========================================
// UNIVERSAL SVG ICONS 
// ==========================================
export const Icons = {
  Menu: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  X: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Mic: ({ className = "w-5 h-5", active = false }: { className?: string; active?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className} ${active ? 'text-red-500 animate-pulse' : ''}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  Moon: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  ),
  Sun: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  Folder: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  FolderPlus: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.14l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  Pin: ({ className = "w-4 h-4", filled = false }: { className?: string; filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  Plus: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Brain: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Home: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Eye: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Muscle: ({ className = "w-5 h-5" }: { className?: string }) => (
    <span className={`inline-flex items-center justify-center leading-none select-none grayscale hover:grayscale-0 transition-all ${className}`} style={{ fontSize: '1.2em' }}>💪</span>
  ),
  Tool: ({ className = "w-5 h-5" }: { className?: string }) => (
    <span className={`inline-flex items-center justify-center leading-none select-none grayscale hover:grayscale-0 transition-all ${className}`} style={{ fontSize: '1.2em' }}>🛠️</span>
  ),
  ArrowDown: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
  ),
};

// ==========================================
// SPEECH RECOGNITION HOOK
// ==========================================
export const useSpeechRecognition = (onResult: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          if (onResult) onResult(transcript);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, [onResult]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return { isListening, toggleListening, supported: !!recognitionRef.current };
};

// ==========================================
// CUSTOM FORM WIDGETS
// ==========================================
export const VoiceTextArea = ({ 
  value, 
  onChange, 
  placeholder, 
  className = "", 
  rows = 3 
}: { 
  value: string; 
  onChange: (v: string) => void; 
  placeholder: string; 
  className?: string; 
  rows?: number; 
}) => {
  const handleDictation = useCallback((transcript: string) => {
    onChange((value ? value + " " : "") + transcript);
  }, [value, onChange]);

  const { isListening, toggleListening, supported } = useSpeechRecognition(handleDictation);

  return (
    <div className="relative group">
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full p-4 pr-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-750 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all shadow-sm focus:border-blue-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${className}`}
      />
      {supported && (
        <button
          onClick={toggleListening}
          title="Dictate with Voice"
          type="button"
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-650'
          }`}
        >
          <Icons.Mic active={isListening} />
        </button>
      )}
    </div>
  );
};

export const SliderWidget = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10, 
  label, 
  color = "blue" 
}: { 
  value?: number; 
  onChange: (v: number) => void; 
  min?: number; 
  max?: number; 
  label: string; 
  color?: string; 
}) => {
  const colors: Record<string, string> = {
    blue: "accent-blue-500", green: "accent-green-500", red: "accent-red-500", 
    yellow: "accent-amber-500", orange: "accent-orange-500", teal: "accent-teal-500",
    indigo: "accent-indigo-500", purple: "accent-purple-500"
  };
  return (
    <div className="w-full flex flex-col gap-2 my-4 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-750 shadow-sm">
      <div className="flex justify-between items-center text-sm font-semibold text-gray-800 dark:text-gray-200">
        <span>{label}</span>
        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">{value || min}/10</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value || min} 
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 mt-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 ${colors[color] || 'accent-blue-500'}`}
      />
      <div className="flex justify-between text-xs text-gray-400 font-medium">
        <span>Low / Initial</span>
        <span>High / Absolute</span>
      </div>
    </div>
  );
};

export const ChipSelector = ({ 
  options, 
  selected, 
  onChange, 
  color = "blue",
  customOptions = [],
  onAddCustomOption
}: { 
  options: string[]; 
  selected?: string[]; 
  onChange: (v: string[]) => void; 
  color?: string;
  customOptions?: string[];
  onAddCustomOption?: (v: string) => void;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const bgColors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    green: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    yellow: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    purple: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  };
  
  const toggleSelection = (opt: string) => {
    const isSelected = selected?.includes(opt);
    if (isSelected) {
      onChange(selected.filter(item => item !== opt));
    } else {
      onChange([...(selected || []), opt]);
    }
  };

  const handleAdd = () => {
    const cleaned = inputValue.trim().replace(/\s+/g, ' ');
    if (!cleaned) return;

    const allChips = [...options, ...customOptions];
    const isDuplicate = allChips.some(chip => chip.toLowerCase() === cleaned.toLowerCase());

    if (isDuplicate) {
      const found = allChips.find(chip => chip.toLowerCase() === cleaned.toLowerCase()) || cleaned;
      if (!selected?.includes(found)) {
        onChange([...(selected || []), found]);
      }
    } else {
      if (onAddCustomOption) {
        onAddCustomOption(cleaned);
      }
      onChange([...(selected || []), cleaned]);
    }

    setInputValue("");
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setInputValue("");
    }
  };

  const allDisplayed = [...options, ...customOptions];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {allDisplayed.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggleSelection(opt)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 shadow-sm cursor-pointer
            ${selected?.includes(opt) 
              ? bgColors[color] || bgColors.blue
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-850 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-750'
            }`}
        >
          {opt}
        </button>
      ))}

      {isAdding ? (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-650 bg-white dark:bg-gray-800 shadow-sm">
          <input
            type="text"
            className="outline-none bg-transparent text-sm w-32 font-medium text-gray-800 dark:text-gray-200 p-0.5 border-none focus:ring-0"
            value={inputValue}
            placeholder="Custom chip..."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            type="button"
            onClick={handleAdd}
            title="Add Check"
            className="p-1 rounded-full text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => { setIsAdding(false); setInputValue(""); }}
            title="Cancel"
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="px-3 py-2 rounded-full border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30 text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-400 hover:bg-gray-100/50 transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          + Add Custom
        </button>
      )}
    </div>
  );
};

// ==========================================
// PROGRESSIVE RENDERER
// ==========================================
export const ProgressiveRenderer = ({ content }: { content: string }) => {
  if (!content || content.includes("has not been added yet")) {
    return <div className="text-center text-lg italic text-gray-400 py-10">{content}</div>;
  }

  const normalized = content.replace(/\\n/g, '\n');
  const statements = normalized.split(/\n+/).map(s => s.trim()).filter(s => s.length > 0);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-6 py-4">
      {statements.map((statement, idx) => (
        <React.Fragment key={idx}>
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-750 shadow-sm text-center transform transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50">
            <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 font-medium tracking-wide">
              {statement}
            </p>
          </div>
          
          {idx < statements.length - 1 && (
            <div className="flex justify-center items-center py-1 text-blue-300 dark:text-blue-800/60 animate-pulse">
              <Icons.ArrowDown className="w-6 h-6" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ==========================================
// THEME COLORS FOR LAYOUT WRAPPERS
// ==========================================
export const THEMES: Record<string, { text: string; bg: string; border: string; label: string }> = {
  blue: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/50 dark:bg-blue-900/10", border: "border-blue-200/60 dark:border-blue-900/30", label: "text-blue-800 dark:text-blue-300" },
  green: { text: "text-green-600 dark:text-green-400", bg: "bg-green-50/50 dark:bg-green-900/10", border: "border-green-200/60 dark:border-green-900/30", label: "text-green-800 dark:text-green-300" },
  red: { text: "text-red-500 dark:text-red-400", bg: "bg-red-50/50 dark:bg-red-900/10", border: "border-red-200/60 dark:border-red-900/30", label: "text-red-800 dark:text-red-300" },
  yellow: { text: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50/50 dark:bg-amber-900/10", border: "border-amber-200/60 dark:border-amber-900/30", label: "text-amber-800 dark:text-amber-300" },
  orange: { text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50/50 dark:bg-orange-900/10", border: "border-orange-200/60 dark:border-orange-900/30", label: "text-orange-800 dark:text-orange-300" },
  teal: { text: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50/50 dark:bg-teal-900/10", border: "border-teal-200/60 dark:border-teal-900/30", label: "text-teal-800 dark:text-teal-300" },
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50/50 dark:bg-indigo-900/10", border: "border-indigo-200/60 dark:border-indigo-900/30", label: "text-indigo-800 dark:text-indigo-300" },
  purple: { text: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50/50 dark:bg-purple-900/10", border: "border-purple-200/60 dark:border-purple-900/30", label: "text-purple-800 dark:text-purple-300" },
};

// ==========================================
// CORE STEP LAYOUT WRAPPER COMPONENT
// ==========================================
export const StepLayout = ({ 
  levelName, 
  stepNum, 
  title, 
  description, 
  children, 
  theme = "blue", 
  onOpenReasoning, 
  onOpenBestPractice, 
  onOpenTools 
}: {
  levelName: string;
  stepNum: number;
  title: string;
  description: string;
  children: React.ReactNode;
  theme?: string;
  onOpenReasoning: (step: number) => void;
  onOpenBestPractice: (step: number) => void;
  onOpenTools: (step: number) => void;
}) => {
  const t = THEMES[theme] || THEMES.blue;
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in py-8 relative">
      <div className="space-y-3 text-center">
        <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 ${t.text}`}>
          <span>{levelName} • Step {stepNum}</span>
          <div className="flex items-center gap-1 border-l border-current pl-3 opacity-95">
            {onOpenReasoning && (
              <button 
                onClick={() => onOpenReasoning(stepNum)} 
                type="button"
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer text-gray-400 hover:text-blue-500" 
                title="View Step Reasoning"
              >
                <Icons.Eye className="w-4 h-4" />
              </button>
            )}
            {onOpenBestPractice && (
              <button 
                onClick={() => onOpenBestPractice(stepNum)} 
                type="button"
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer text-gray-400 hover:text-green-500" 
                title="View Best Practices"
              >
                <Icons.Muscle className="w-4 h-4" />
              </button>
            )}
            {onOpenTools && (
              <button 
                onClick={() => onOpenTools(stepNum)} 
                type="button"
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer text-gray-400 hover:text-amber-500" 
                title="View Tools & Resources"
              >
                <Icons.Tool className="w-4 h-4" />
              </button>
            )}
          </div>
        </h2>
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      <div className={`rounded-2xl p-6 md:p-8 border ${t.bg} ${t.border}`}>
        {children}
      </div>
    </div>
  );
};
