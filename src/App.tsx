import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, Brain as LucideBrain } from 'lucide-react';

// Shared types
import { Folder, Session } from './types';

// Static Data Content Map
import { 
  stepTitles, 
  stepReasoning, 
  stepBestPractices, 
  stepTools 
} from './data';

// Custom design elements & Visual layout
import { Icons, ProgressiveRenderer } from './components/stepLayout';
import { DefinitionTool } from './components/DefinitionTool';

// Modular Step Components
import { 
  Step0_Intro, 
  Step1_Desire, 
  Step2_Possibility, 
  Step3_Agency, 
  Step4_Outcome, 
  Step5_Sensory, 
  Step6_Meaning, 
  Step7_BeliefDetection, 
  Step8_BeliefRevision, 
  Step9_Identity 
} from './components/stepsLevel0to2';

import { 
  Step10_Attention, 
  Step11_Emotion, 
  Step12_Reticular, 
  Step13_Pathways, 
  Step14_Behavior, 
  Step15_Opportunity, 
  Step16_Practice, 
  Step17_Feedback, 
  Step18_Adjustment 
} from './components/stepsLevel3to5';

import { 
  Step19_Coherence, 
  Step20_Persistence, 
  Step21_Receiving, 
  Step22_Pattern, 
  Step23_CrossDomain, 
  Step24_Uncertainty, 
  Step25_Reliability, 
  Step26_Evolution 
} from './components/stepsLevel6to7';

// Steps Array Mapping
const STEPS = [
  Step0_Intro, 
  Step1_Desire, Step2_Possibility, Step3_Agency,
  Step4_Outcome, Step5_Sensory, Step6_Meaning,
  Step7_BeliefDetection, Step8_BeliefRevision, Step9_Identity,
  Step10_Attention, Step11_Emotion, Step12_Reticular,
  Step13_Pathways, Step14_Behavior, Step15_Opportunity,
  Step16_Practice, Step17_Feedback, Step18_Adjustment,
  Step19_Coherence, Step20_Persistence, Step21_Receiving,
  Step22_Pattern, Step23_CrossDomain, Step24_Uncertainty, Step25_Reliability, Step26_Evolution
];

// ==========================================
// FOLDER VISUAL COLOR SCHEMES
// ==========================================
const FOLDER_COLORS: Record<string, { text: string; bg: string; border: string; dot: string; titleText: string; lightBg: string }> = {
  gray: { text: "text-gray-500 dark:text-gray-400", bg: "bg-gray-50/70 dark:bg-gray-900/40", border: "border-gray-250 dark:border-gray-800/80", dot: "bg-gray-400 dark:bg-gray-500", titleText: "text-gray-700 dark:text-gray-300", lightBg: "bg-gray-100/55 dark:bg-gray-800/40" },
  blue: { text: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50/40 dark:bg-blue-950/15", border: "border-blue-200/50 dark:border-blue-900/30", dot: "bg-blue-500", titleText: "text-blue-700 dark:text-blue-300", lightBg: "bg-blue-100/40 dark:bg-blue-900/20" },
  green: { text: "text-green-500 dark:text-green-400", bg: "bg-green-50/40 dark:bg-green-950/15", border: "border-green-200/50 dark:border-green-900/30", dot: "bg-green-500", titleText: "text-green-700 dark:text-green-300", lightBg: "bg-green-100/40 dark:bg-green-900/20" },
  yellow: { text: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50/40 dark:bg-amber-950/15", border: "border-amber-200/50 dark:border-amber-900/30", dot: "bg-amber-500", titleText: "text-amber-700 dark:text-amber-300", lightBg: "bg-amber-100/45 dark:bg-amber-900/20" },
  red: { text: "text-red-500 dark:text-red-400", bg: "bg-red-50/40 dark:bg-red-950/15", border: "border-red-200/50 dark:border-red-900/30", dot: "bg-red-500", titleText: "text-red-700 dark:text-red-350", lightBg: "bg-red-100/40 dark:bg-red-900/20" },
  purple: { text: "text-purple-500 dark:text-purple-400", bg: "bg-purple-50/40 dark:bg-purple-950/15", border: "border-purple-200/50 dark:border-purple-900/30", dot: "bg-purple-500", titleText: "text-purple-700 dark:text-purple-300", lightBg: "bg-purple-100/40 dark:bg-purple-900/20" },
  pink: { text: "text-pink-500 dark:text-pink-400", bg: "bg-pink-50/40 dark:bg-pink-950/15", border: "border-pink-200/50 dark:border-pink-900/30", dot: "bg-pink-500", titleText: "text-pink-700 dark:text-pink-300", lightBg: "bg-pink-100/40 dark:bg-pink-900/20" }
};

// ==========================================
// HOME VIEW COMPONENT
// ==========================================
const HomePage = ({ onNavigate }: { onNavigate: (screen: 'definition' | 'workflow') => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-12 animate-fade-in bg-white dark:bg-[#0B0F19] text-center select-none relative">
    {/* Clean cosmic lights */}
    <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden z-0 opacity-40 pointer-events-none">
      <div className="absolute top-[10%] left-[20%] w-[35%] h-[35%] bg-blue-500/10 rounded-full blur-[100px] dark:opacity-30"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] bg-indigo-500/10 rounded-full blur-[140px] dark:opacity-30"></div>
    </div>

    <div className="max-w-3xl w-full space-y-10 relative z-10 my-auto">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 py-1 font-display">
          The Anatomy of Manifesting
        </h1>
        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed font-sans mt-2">
            Manifesting is the intentional ability to convert desired inner vision into physical outer reality through clarity, cognitive alignment, trained priority filter systems, and physical participation. Not wishes. Not shortcuts.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 italic uppercase tracking-widest font-mono">
            Step by step, construct the blueprint.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
        <button
          onClick={() => onNavigate('definition')}
          type="button"
          className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-sm tracking-wide text-indigo-700 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-indigo-200/50 dark:border-indigo-900/40 hover:border-indigo-450 dark:hover:border-indigo-800 transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
        >
          EXPLORE DEFINITION
        </button>
        <button
          onClick={() => onNavigate('workflow')}
          type="button"
          className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] hover:-translate-y-0.5 cursor-pointer"
        >
          PROCESS LADDER
        </button>
      </div>
    </div>
  </div>
);

// ==========================================
// MAIN SCREEN CONTROLLER
// ==========================================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'definition' | 'workflow'>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  
  // Independent Info Modal State
  const [activeReasoningStep, setActiveReasoningStep] = useState<number | null>(null); 
  const [activeBestPracticeStep, setActiveBestPracticeStep] = useState<number | null>(null); 
  const [activeToolsStep, setActiveToolsStep] = useState<number | null>(null); 

  const [folders, setFolders] = useState<Folder[]>([]); 
  const [sessions, setSessions] = useState<Session[]>([]); 
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // --- INITIALIZATION ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('manifest-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      document.documentElement.classList.add('dark');
    }

    const savedFolders = JSON.parse(localStorage.getItem('manifest-folders') || '[]');
    const savedSessions = JSON.parse(localStorage.getItem('manifest-sessions') || '[]');
    
    // Set Default Folders if empty
    let finalFolders = savedFolders;
    if (savedFolders.length === 0) {
      finalFolders = [
        { id: 'f-default', name: 'Primary Goals', description: 'Core life visions', order: 0 },
        { id: 'f-secondary', name: 'Aspirational Domains', description: 'Long term horizons', order: 1 }
      ];
      setFolders(finalFolders);
    } else {
      setFolders(savedFolders);
    }

    // Set Sessions
    if (savedSessions.length > 0) {
      setSessions(savedSessions);
      setCurrentSessionId(savedSessions[0].id);
    } else {
      const defaultId = `s-${Date.now()}`;
      const defaultSession: Session = {
        id: defaultId,
        folderId: 'f-default',
        name: 'Vibrant Venture',
        isPinned: false,
        currentStep: 0,
        data: { name: '' }
      };
      setSessions([defaultSession]);
      setCurrentSessionId(defaultId);
    }
  }, []);

  // --- SAVE PORTAL DATA TO LOCAL STORAGE ---
  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem('manifest-folders', JSON.stringify(folders));
    }
    if (sessions.length > 0) {
      localStorage.setItem('manifest-sessions', JSON.stringify(sessions));
    }
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('manifest-theme', theme);
  }, [folders, sessions, theme]);

  // --- COMPUTED PROFILE ACTIVE STATES ---
  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === currentSessionId) || sessions[0];
  }, [sessions, currentSessionId]);

  const activeStep = activeSession?.currentStep || 0;
  const ActiveStepComponent = STEPS[activeStep];

  // --- POPUP DATA RESOLVER ---
  const activeModalStep = activeReasoningStep || activeBestPracticeStep || activeToolsStep;
  
  const modalData = useMemo(() => {
    if (activeReasoningStep) {
      return {
        stepNum: activeReasoningStep,
        title: stepReasoning[activeReasoningStep]?.title || `Step ${activeReasoningStep}`,
        content: stepReasoning[activeReasoningStep]?.content || "",
        label: "Reasoning Blueprint", 
        Icon: Icons.Eye,
        colors: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
        gradient: "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
      };
    }
    if (activeBestPracticeStep) {
      return {
        stepNum: activeBestPracticeStep,
        title: stepBestPractices[activeBestPracticeStep]?.title || `Step ${activeBestPracticeStep}`,
        content: stepBestPractices[activeBestPracticeStep]?.content || "",
        label: "Best Practice Guidelines", 
        Icon: Icons.Muscle,
        colors: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
        gradient: "from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400"
      };
    }
    if (activeToolsStep) {
      return {
        stepNum: activeToolsStep,
        title: stepTools[activeToolsStep]?.title || `Step ${activeToolsStep}`,
        content: stepTools[activeToolsStep]?.content || "",
        label: "Interactive Tool / Method", 
        Icon: Icons.Tool,
        colors: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30",
        gradient: "from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400"
      };
    }
    return null;
  }, [activeReasoningStep, activeBestPracticeStep, activeToolsStep]);

  const closeAllModals = () => {
    setActiveReasoningStep(null);
    setActiveBestPracticeStep(null);
    setActiveToolsStep(null);
  };

  const handleReturnHome = () => {
    closeAllModals();
    setCurrentScreen('home');
  };

  // --- ACTIONS ---
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const createNewSession = (folderId: string | null = null) => {
    const newId = `s-${Date.now()}`;
    const newSession: Session = {
      id: newId, 
      folderId: folderId || folders[0]?.id || null, 
      name: `Vision Plan ${sessions.length + 1}`,
      isPinned: false, 
      currentStep: 0, 
      data: { name: activeSession?.data?.name || '' } 
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setLeftOpen(false);
  };

  const createFolder = () => {
    const newId = `f-${Date.now()}`;
    const newFolder: Folder = {
      id: newId, 
      name: 'Vision Domain', 
      description: 'Domain specificity description', 
      order: folders.length 
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const updateFolder = (id: string, updates: Partial<Folder>) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };
  
  const deleteFolder = (id: string) => {
    if (folders.length <= 1) return; // Prevent deleting everything
    setFolders(prev => prev.filter(f => f.id !== id));
    const successorId = folders.find(f => f.id !== id)?.id || null;
    setSessions(prev => prev.map(s => s.folderId === id ? { ...s, folderId: successorId } : s));
  };

  const updateActiveSessionData = useCallback((key: string, value: any) => {
    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, data: { ...s.data, [key]: value } } : s));
  }, [currentSessionId]);

  const setStepIdx = (step: number) => {
    if (step >= 0 && step < STEPS.length) {
      setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, currentStep: step } : s));
      document.getElementById('workflow-scroll-pane')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const togglePin = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s));
  };

  const deleteSession = (id: string) => {
    if (sessions.length <= 1) return; // Prevent total purge
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      setCurrentSessionId(remaining[0]?.id || null);
    }
  };

  const renameSession = (id: string, newName: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, name: newName } : s));
  };

  const moveFolderUp = (id: string) => {
    setFolders(prev => {
      const idx = prev.findIndex(f => f.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(idx - 1, 0, item);
      return copy.map((f, i) => ({ ...f, order: i }));
    });
  };

  const moveFolderDown = (id: string) => {
    setFolders(prev => {
      const idx = prev.findIndex(f => f.id === id);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(idx + 1, 0, item);
      return copy.map((f, i) => ({ ...f, order: i }));
    });
  };

  const moveSessionUp = (id: string, folderId: string | null) => {
    setSessions(prev => {
      const folderSessions = prev.filter(s => s.folderId === folderId);
      const sessionIdx = folderSessions.findIndex(s => s.id === id);
      if (sessionIdx <= 0) return prev;
      const sessionToMove = folderSessions[sessionIdx];
      const sessionTarget = folderSessions[sessionIdx - 1];
      const originalIdxMove = prev.findIndex(s => s.id === sessionToMove.id);
      const originalIdxTarget = prev.findIndex(s => s.id === sessionTarget.id);
      const copy = [...prev];
      const temp = copy[originalIdxMove];
      copy[originalIdxMove] = copy[originalIdxTarget];
      copy[originalIdxTarget] = temp;
      return copy;
    });
  };

  const moveSessionDown = (id: string, folderId: string | null) => {
    setSessions(prev => {
      const folderSessions = prev.filter(s => s.folderId === folderId);
      const sessionIdx = folderSessions.findIndex(s => s.id === id);
      if (sessionIdx === -1 || sessionIdx >= folderSessions.length - 1) return prev;
      const sessionToMove = folderSessions[sessionIdx];
      const sessionTarget = folderSessions[sessionIdx + 1];
      const originalIdxMove = prev.findIndex(s => s.id === sessionToMove.id);
      const originalIdxTarget = prev.findIndex(s => s.id === sessionTarget.id);
      const copy = [...prev];
      const temp = copy[originalIdxMove];
      copy[originalIdxMove] = copy[originalIdxTarget];
      copy[originalIdxTarget] = temp;
      return copy;
    });
  };

  // --- RE-USABLE DRAG AND DROP PORTALS ---
  const handleDragStartSession = (e: React.DragEvent, sessionId: string) => {
    e.dataTransfer.setData('sessionId', sessionId);
  };
  
  const handleDragStartFolder = (e: React.DragEvent, folderId: string) => {
    e.dataTransfer.setData('folderId', folderId);
  };

  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  const handleDropOnFolder = (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    const sessionId = e.dataTransfer.getData('sessionId');
    const folderId = e.dataTransfer.getData('folderId');

    if (sessionId) {
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, folderId: targetFolderId } : s));
    } else if (folderId && folderId !== targetFolderId) {
      setFolders(prev => {
        const draggedIdx = prev.findIndex(f => f.id === folderId);
        const targetIdx = prev.findIndex(f => f.id === targetFolderId);
        const newFolders = [...prev];
        const [dragged] = newFolders.splice(draggedIdx, 1);
        newFolders.splice(targetIdx, 0, dragged);
        return newFolders.map((f, i) => ({ ...f, order: i }));
      });
    }
  };

  const handleDropOnSession = (e: React.DragEvent, targetSessionId: string, folderId: string) => {
    e.preventDefault();
    const draggedSessionId = e.dataTransfer.getData('sessionId');
    if (draggedSessionId && draggedSessionId !== targetSessionId) {
      setSessions(prev => {
        const copy = [...prev];
        const draggedIdx = copy.findIndex(s => s.id === draggedSessionId);
        const targetIdx = copy.findIndex(s => s.id === targetSessionId);
        if (draggedIdx === -1 || targetIdx === -1) return prev;
        
        const [draggedItem] = copy.splice(draggedIdx, 1);
        draggedItem.folderId = folderId;
        copy.splice(targetIdx, 0, draggedItem);
        return copy;
      });
    }
  };

  // Prevent loading breaks
  if (!activeSession) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-gray-500 font-mono">
        Loading manifesting workspace...
      </div>
    );
  }

  const nameVal = activeSession.data.name || 'the alignment user';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#0f1115] text-gray-900 dark:text-gray-105 font-sans transition-colors duration-300 relative selection:bg-blue-500/10">
      
      {/* GLOBAL HUD BAR */}
      {(currentScreen === 'home' || currentScreen === 'definition') && (
        <div className="absolute top-0 w-full p-4 flex justify-between items-center z-50">
          {currentScreen === 'definition' ? (
            <button 
              onClick={handleReturnHome} 
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-750 transition-all shadow-sm cursor-pointer"
            >
              <Icons.Home className="w-4 h-4" /> BACK TO PORTAL
            </button>
          ) : <div />}
          <button 
            type="button"
            onClick={toggleTheme} 
            className="p-2.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white bg-white/60 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 rounded-xl shadow-sm backdrop-blur-sm transition-all border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            {theme === 'dark' ? <Icons.Sun className="w-4 h-4" /> : <Icons.Moon className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* CORE SCREENS ROUTING */}
      {currentScreen === 'home' && (
        <div className="flex-1 overflow-y-auto">
          <HomePage onNavigate={setCurrentScreen} />
        </div>
      )}
      
      {currentScreen === 'definition' && (
        <div className="flex-1 relative overflow-hidden">
          <DefinitionTool />
        </div>
      )}

      {currentScreen === 'workflow' && (
        <>
          {/* ================= LEFT SESSIONS FILE DRAWER ================= */}
          {leftOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" 
              onClick={() => setLeftOpen(false)} 
            />
          )}
          
          <aside className={`fixed md:relative z-45 h-full bg-white dark:bg-[#12141c] flex flex-col transition-all duration-300 shrink-0 ${
            leftOpen 
              ? 'w-[22rem] translate-x-0 border-r border-gray-200 dark:border-gray-800/80 shadow-md md:shadow-none' 
              : 'w-0 -translate-x-full md:translate-x-0 overflow-hidden border-r-0 pointer-events-none opacity-0'
          }`}>
            <div className="p-4 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/30">
              <h2 className="font-bold text-sm tracking-widest uppercase text-gray-800 dark:text-white flex items-center gap-2 font-display">
                <LucideBrain className="text-blue-500 w-5 h-5 shrink-0 animate-pulse" />
                Manifestations
              </h2>
              <div className="flex items-center gap-1.5 shrink-0">
                <button 
                  onClick={createFolder} 
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 cursor-pointer" 
                  title="Add Folder"
                >
                  <Icons.FolderPlus className="w-4 h-4" />
                </button>

                {/* Dual Capsule Close Switcher */}
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700/85">
                  <button 
                    onClick={() => setLeftOpen(false)} 
                    className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded text-gray-500 cursor-pointer" 
                    title="Minimize panel"
                  >
                    <Icons.Menu className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button 
                    onClick={() => setLeftOpen(false)} 
                    className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded text-gray-500 cursor-pointer" 
                    title="Close panel (X)"
                  >
                    <Icons.X className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <button 
                onClick={() => createNewSession(null)} 
                type="button"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow flex justify-center items-center gap-2 transition-all cursor-pointer"
              >
                <Icons.Plus className="w-4 h-4" /> New Vision
              </button>

              <div className="space-y-4">
                {[...folders].sort((a,b) => a.order - b.order).map(folder => {
                  const col = FOLDER_COLORS[folder.color || 'gray'] || FOLDER_COLORS.gray;
                  const isEditing = editingFolderId === folder.id;
                  return (
                    <div 
                      key={folder.id} 
                      className={`space-y-3 rounded-xl p-3 border transition-all relative ${col.bg} ${col.border}`}
                      draggable 
                      onDragStart={(e) => handleDragStartFolder(e, folder.id)} 
                      onDragOver={allowDrop} 
                      onDrop={(e) => handleDropOnFolder(e, folder.id)}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          <span className={`${col.text}`}>
                            <Icons.Folder className="w-4 h-4 shrink-0" />
                          </span>
                          <div className="truncate">
                            <h4 className="font-bold text-xs text-gray-800 dark:text-gray-200 truncate leading-tight">{folder.name}</h4>
                            {folder.description && (
                              <p className="text-[9px] text-gray-500 dark:text-gray-400 truncate tracking-tight py-0.5">{folder.description}</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Quick Folder Controls */}
                        <div className="flex items-center gap-1 shrink-0 bg-white/65 dark:bg-gray-950/60 rounded-md p-1 border border-gray-100 dark:border-gray-800/40">
                          <button
                            onClick={() => createNewSession(folder.id)}
                            type="button"
                            className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-850 rounded text-gray-500 dark:text-gray-400 cursor-pointer"
                            title="Add Session to Folder"
                          >
                            <Icons.Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingFolderId(isEditing ? null : folder.id)}
                            type="button"
                            className={`p-0.5 hover:bg-gray-200 dark:hover:bg-gray-850 rounded cursor-pointer ${isEditing ? 'text-blue-500' : 'text-gray-400'}`}
                            title="Edit folder details"
                          >
                            <span className="text-[10px] leading-none select-none">⚙️</span>
                          </button>
                          <button
                            onClick={() => moveFolderUp(folder.id)}
                            type="button"
                            className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-850 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer text-[9px] leading-none"
                            title="Order Up"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveFolderDown(folder.id)}
                            type="button"
                            className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-850 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer text-[9px] leading-none"
                            title="Order Down"
                          >
                            ▼
                          </button>
                          <button
                            onClick={() => deleteFolder(folder.id)}
                            type="button"
                            className="p-0.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded text-red-400 hover:text-red-650 cursor-pointer"
                            title="Delete Folder"
                          >
                            <Icons.Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Inline Folder Settings Form */}
                      {isEditing && (
                        <div className="p-2.5 rounded-lg bg-white/95 dark:bg-gray-950 border border-gray-150 dark:border-gray-800 space-y-2 text-[11px] shadow-sm">
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-gray-400 dark:text-gray-500 mb-0.5">Edit Name</label>
                            <input 
                              type="text"
                              value={folder.name}
                              onChange={(e) => updateFolder(folder.id, { name: e.target.value })}
                              className="w-full text-xs font-semibold px-2 py-1.5 rounded bg-gray-50 dark:bg-gray-850 border border-gray-180 dark:border-gray-800 outline-none text-gray-800 dark:text-gray-100 focus:border-blue-500"
                              placeholder="Folder Name"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-gray-400 dark:text-gray-500 mb-0.5">Edit Description</label>
                            <input 
                              type="text"
                              value={folder.description}
                              onChange={(e) => updateFolder(folder.id, { description: e.target.value })}
                              className="w-full text-xs px-2 py-1.5 rounded bg-gray-50 dark:bg-gray-850 border border-gray-180 dark:border-gray-800 outline-none text-gray-650 dark:text-gray-300 focus:border-blue-500"
                              placeholder="Folder category specificity..."
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-gray-400 dark:text-gray-500 mb-0.5">Color Code</label>
                            <div className="flex gap-1.5 mt-1">
                              {Object.keys(FOLDER_COLORS).map((cKey) => {
                                const cObj = FOLDER_COLORS[cKey];
                                return (
                                  <button
                                    key={cKey}
                                    type="button"
                                    onClick={() => updateFolder(folder.id, { color: cKey })}
                                    className={`w-3.5 h-3.5 rounded-full ${cObj.dot} cursor-pointer transition-all ${
                                      (folder.color || 'gray') === cKey 
                                        ? 'ring-2 ring-offset-1 ring-blue-500 dark:ring-offset-gray-900 scale-125' 
                                        : 'hover:scale-110'
                                    }`}
                                    title={cKey}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => setEditingFolderId(null)}
                              className="px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-[9px] font-extrabold text-white cursor-pointer uppercase tracking-wider"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Sessions (Chats List) */}
                      <div className="space-y-1.5 pl-0.5 mt-1">
                        {sessions.filter(s => s.folderId === folder.id).sort((a,b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).map(session => (
                          <div 
                            key={session.id} 
                            draggable 
                            onDragStart={(e) => handleDragStartSession(e, session.id)} 
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDropOnSession(e, session.id, folder.id)}
                            className={`group flex flex-col p-2.5 rounded-lg border transition-all cursor-pointer ${
                              currentSessionId === session.id 
                                ? 'bg-white dark:bg-gray-900 border-blue-400/55 dark:border-blue-900/50 shadow-sm' 
                                : 'bg-white/45 dark:bg-gray-900/10 border-transparent hover:bg-white dark:hover:bg-gray-900 hover:border-gray-200/50 dark:hover:border-gray-800'
                            }`} 
                            onClick={() => { setCurrentSessionId(session.id); }}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex-grow min-w-0">
                                <input 
                                  value={session.name || ''} 
                                  onChange={(e) => renameSession(session.id, e.target.value)} 
                                  onClick={(e) => e.stopPropagation()} 
                                  className={`w-full bg-transparent border-none p-0 outline-none truncate font-bold text-xs ${
                                    currentSessionId === session.id 
                                      ? 'text-blue-600 dark:text-blue-400' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`} 
                                />
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                {/* Order Arrows */}
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); moveSessionUp(session.id, folder.id); }}
                                  className="p-0.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-[9px] cursor-pointer"
                                  title="Order Session Up"
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); moveSessionDown(session.id, folder.id); }}
                                  className="p-0.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-[9px] cursor-pointer"
                                  title="Order Session Down"
                                >
                                  ▼
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); togglePin(session.id); }} 
                                  type="button"
                                  className={`p-1 ${session.isPinned ? 'text-amber-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'} cursor-pointer`}
                                >
                                  <Icons.Pin filled={session.isPinned} className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }} 
                                  type="button"
                                  className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                                >
                                  <Icons.Trash className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Info Row: Progress Metric + Folder Sorter Dropdown */}
                            <div className="flex items-center justify-between mt-1 text-[9px] text-gray-400 font-mono">
                              <span>Progress: {session.currentStep}/26</span>
                              <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-0.5">
                                <span className="text-[8px] uppercase font-bold text-gray-400">MOVE:</span>
                                <select
                                  value={session.folderId || ''}
                                  onChange={(e) => {
                                    const nextFid = e.target.value;
                                    setSessions(prev => prev.map(s => s.id === session.id ? { ...s, folderId: nextFid } : s));
                                  }}
                                  className="bg-transparent border-none text-[8px] outline-none text-gray-600 dark:text-gray-400 font-bold focus:ring-0 cursor-pointer max-w-[5.5rem] truncate"
                                >
                                  {folders.map(f => (
                                    <option key={f.id} value={f.id} className="dark:bg-gray-900 dark:text-gray-300">{f.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                        {sessions.filter(s => s.folderId === folder.id).length === 0 && (
                          <div className="text-[10px] text-gray-400 italic pl-1 py-1">Empty domain...</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ================= CENTRE ACTIVE WORKSPACE ================= */}
          <main className="flex-1 flex flex-col relative overflow-hidden bg-gray-50 dark:bg-[#0f1115]">
            <header className="flex justify-between items-center p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-30">
              <div className="flex items-center gap-1">
                {!leftOpen && (
                  <button 
                    onClick={() => setLeftOpen(true)} 
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer flex items-center gap-1.5 transition-all text-xs font-bold uppercase tracking-wider"
                    title="Open Manifestations Sidebar"
                  >
                    <Icons.Menu className="w-5 h-5 animate-pulse" />
                    <span className="hidden sm:inline">Manifestations</span>
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2 md:pl-2">
                <button 
                  onClick={handleReturnHome} 
                  type="button"
                  className="flex items-center justify-center gap-2 p-2 px-3.5 text-blue-700 dark:text-blue-400 bg-blue-50/70 hover:bg-blue-100 dark:bg-blue-900/15 dark:hover:bg-blue-900/30 rounded-xl transition-colors font-extrabold shadow-sm cursor-pointer"
                  title="Return to Splash Portal"
                >
                  <Icons.Home className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider hidden sm:block">HOME</span>
                </button>
              </div>

              {/* Progress Index bar */}
              <div className="flex-1 max-w-md mx-6 hidden lg:block">
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-1">
                  <span>ONBOARDING</span>
                  <span>EVOLUTION ({activeStep}/26)</span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button 
                  onClick={toggleTheme} 
                  type="button"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                >
                  {theme === 'dark' ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                </button>
                {!rightOpen && (
                  <button 
                    onClick={() => setRightOpen(true)} 
                    type="button"
                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    title="Open Working Memory"
                  >
                    <Icons.Menu className="w-5 h-5 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider hidden lg:block">Working Memory</span>
                  </button>
                )}
              </div>
            </header>

            {/* Core Step scrolling area */}
            <div id="workflow-scroll-pane" className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth hidden-scrollbar">
               <ActiveStepComponent 
                 data={activeSession.data} 
                 updateData={updateActiveSessionData} 
                 name={nameVal} 
                 onOpenReasoning={setActiveReasoningStep} 
                 onOpenBestPractice={setActiveBestPracticeStep}
                 onOpenTools={setActiveToolsStep}
                />
               <div className="h-32" /> 
            </div>

            {/* Bottom transition actions bar */}
            <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#12141c]/90 backdrop-blur-md border-t border-gray-150 dark:border-gray-800 flex justify-between items-center z-30 shadow-lg">
              <button 
                onClick={() => setStepIdx(activeStep - 1)} 
                disabled={activeStep === 0} 
                type="button"
                className="px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/80 disabled:opacity-20 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                Back
              </button>
              <div className="text-xs font-bold text-gray-400 font-mono">Step {activeStep} of {STEPS.length - 1}</div>
              <button 
                onClick={() => setStepIdx(activeStep + 1)} 
                disabled={activeStep === STEPS.length - 1} 
                type="button"
                className="px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 disabled:opacity-20 transition-all cursor-pointer"
              >
                {activeStep === STEPS.length - 2 ? "Finish Ladder" : "Continue"}
              </button>
            </footer>
          </main>

          {/* ================= RIGHT WORKING MEMORY SIDEBAR ================= */}
          {rightOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" 
              onClick={() => setRightOpen(false)} 
            />
          )}
          
          <aside className={`fixed right-0 md:relative z-45 h-full bg-white dark:bg-[#12141c] flex flex-col transition-all duration-300 shrink-0 ${
            rightOpen 
              ? 'w-[22rem] lg:w-[24rem] translate-x-0 border-l border-gray-200 dark:border-gray-800/80 shadow-md lg:shadow-none' 
              : 'w-0 translate-x-full md:translate-x-0 overflow-hidden border-l-0 pointer-events-none opacity-0'
          }`}>
            <div className="p-4 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/30">
              <h2 className="font-bold text-sm tracking-widest uppercase text-gray-800 dark:text-white flex items-center gap-2 font-display">
                Profile Archive
              </h2>
              
              {/* Twin Capsule Close Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700/85">
                <button 
                  onClick={() => setRightOpen(false)} 
                  className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded text-gray-500 cursor-pointer" 
                  title="Minimize working memory"
                >
                  <Icons.Menu className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                </button>
                <button 
                  onClick={() => setRightOpen(false)} 
                  className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded text-gray-500 cursor-pointer" 
                  title="Close working memory"
                >
                  <Icons.X className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Psychological Profile Insights</p>
              
              {!activeSession.data.desire && !activeSession.data.outcome && (
                <p className="text-xs text-gray-400 italic">Progress through the steps to assemble your live blueprint results.</p>
              )}

              {/* Core Desire Framework */}
              {(activeSession.data.desire || activeSession.data.outcome) && (
                <div className="p-4 bg-green-50/50 dark:bg-green-900/10 rounded-xl border border-green-250/35 dark:border-green-900/30 space-y-2">
                  <h5 className="text-[10px] text-green-600 dark:text-green-300 font-bold uppercase tracking-wider">Vision Targets</h5>
                  {activeSession.data.desire && (
                    <div className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed border-b border-green-200/40 dark:border-green-900/40 pb-2">
                      <span className="font-bold text-green-700 dark:text-green-500 font-mono">DESIRE:</span> {activeSession.data.desire}
                    </div>
                  )}
                  {activeSession.data.outcome && (
                    <div className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
                      <span className="font-bold text-green-700 dark:text-green-500 font-mono">OUTCOME:</span> {activeSession.data.outcome}
                    </div>
                  )}
                </div>
              )}

              {/* Core Values / States / Traits */}
              {(activeSession.data.values?.length > 0 || activeSession.data.identity?.length > 0 || activeSession.data.emotion?.length > 0) && (
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-250/35 dark:border-blue-900/30">
                  <h5 className="text-[10px] text-blue-600 dark:text-blue-300 font-bold uppercase tracking-wider mb-2">Internal Framework</h5>
                  <div className="flex flex-wrap gap-1">
                    {activeSession.data.values?.map((v: string) => <span key={v} className="text-[10px] font-bold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-md">{v}</span>)}
                    {activeSession.data.emotion?.map((e: string) => <span key={e} className="text-[10px] font-bold px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-md">{e}</span>)}
                    {activeSession.data.identity?.map((i: string) => <span key={i} className="text-[10px] font-bold px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-md">{i}</span>)}
                  </div>
                </div>
              )}

              {/* Blocks, assumptions, restrictions */}
              {activeSession.data.limitingBeliefs && (
                <div className="p-4 bg-red-50/50 dark:bg-red-900/10 rounded-xl border border-red-250/35 dark:border-red-900/30 space-y-2">
                  <h5 className="text-[10px] text-red-600 dark:text-red-300 font-bold uppercase tracking-wider">Limiting Reconstructions</h5>
                  <p className="text-xs text-gray-500 line-through opacity-70 mb-1">{activeSession.data.limitingBeliefs}</p>
                  {activeSession.data.revisedBeliefs && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold leading-relaxed">
                      ↳ {activeSession.data.revisedBeliefs}
                    </p>
                  )}
                </div>
              )}

              {/* Actions, Habits, pathways */}
              {(activeSession.data.behavior || activeSession.data.reticular || activeSession.data.adjustment) && (
                <div className="p-4 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl border border-orange-250/35 dark:border-orange-900/30 space-y-2">
                  <h5 className="text-[10px] text-orange-600 dark:text-orange-300 font-bold uppercase tracking-wider">Action Tactics</h5>
                  {activeSession.data.behavior && (
                    <div className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed border-b border-orange-200/40 dark:border-orange-900/40 pb-2">
                      <span className="font-bold text-orange-700 dark:text-orange-500 font-mono font-bold">HABIT:</span> {activeSession.data.behavior}
                    </div>
                  )}
                  {activeSession.data.reticular && (
                    <div className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed border-b border-orange-200/40 dark:border-orange-900/40 pb-2">
                      <span className="font-bold text-orange-700 dark:text-orange-500 font-mono font-bold">SCAN:</span> {activeSession.data.reticular}
                    </div>
                  )}
                  {activeSession.data.adjustment && (
                    <div className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
                      <span className="font-bold text-orange-700 dark:text-orange-500 font-mono font-bold">ADJUST:</span> {activeSession.data.adjustment}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </>
      )}

      {/* ================= UNIVERSAL MODAL FOR DATA DETAILS ================= */}
      {activeModalStep && modalData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" 
          onClick={closeAllModals}
        >
          <div 
            className="bg-gray-50 dark:bg-[#10121b] rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800" 
            onClick={e => e.stopPropagation()}
          >
            {/* Pop Header */}
            <div className="p-5 md:p-6 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-[#161822]">
              <h3 className="font-extrabold text-lg md:text-xl text-gray-900 dark:text-white flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg ${modalData.colors}`}>
                  <modalData.Icon className="w-5 h-5" />
                </div>
                Step {modalData.stepNum}: {modalData.label}
              </h3>
              <button 
                onClick={closeAllModals} 
                type="button"
                className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-500 cursor-pointer transition-colors"
                title="Dismiss"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Pop Content */}
            <div className="p-5 md:p-10 overflow-y-auto flex-1 text-gray-700 dark:text-gray-300 scroll-smooth">
              <h4 className={`text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r ${modalData.gradient} mb-8 tracking-tight font-display`}>
                {modalData.title}
              </h4>
              
              <ProgressiveRenderer content={modalData.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
