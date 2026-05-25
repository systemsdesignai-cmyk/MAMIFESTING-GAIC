import React from 'react';
import { StepProps, StepLayout, VoiceTextArea, SliderWidget, ChipSelector, Icons } from './stepLayout';

// ==========================================
// INTRO (STEP 0)
// ==========================================
export const Step0_Intro = ({ data, updateData }: StepProps) => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] max-w-xl mx-auto text-center space-y-6 animate-fade-in p-2">
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-2 shadow-md">
      <Icons.Brain className="w-8 h-8" />
    </div>
    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
      Configure Your Frame
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
      Initialize your manifesting workspace. We will navigate through 26 successive mental layers.
    </p>
    <div className="w-full max-w-sm space-y-3 pt-4">
      <label className="block text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
        Primary Identifier (Your Name)
      </label>
      <input
        type="text" 
        value={data.name || ""} 
        onChange={(e) => updateData('name', e.target.value)}
        placeholder="How should the system address you?"
        className="w-full p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-750 focus:ring-2 focus:ring-blue-500 outline-none text-base text-center font-medium shadow-sm text-gray-800 dark:text-white focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  </div>
);

// ==========================================
// LEVEL 0: DESIRE AWARENESS
// ==========================================
export const Step1_Desire = ({ data, updateData, name, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 0: Desire Awareness" 
    stepNum={1} 
    title="Desire Recognition" 
    theme="blue"
    description={`Distill what you genuinely desire to materialize, ${name}. Avoid filter layers.`}
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-wider">Desire Statement</h4>
    <VoiceTextArea 
      value={data.desire || ""} 
      onChange={(v) => updateData('desire', v)} 
      placeholder="I sincerely desire to create, achieve, or construct..." 
    />
  </StepLayout>
);

export const Step2_Possibility = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 0: Desire Awareness" 
    stepNum={2} 
    title="Possibility Awareness" 
    theme="blue"
    description="Break the assumption that reality is static. Confirm that the current frame is eligible to shift."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-wider">Degree of Possibility</h4>
    <SliderWidget 
      value={data.possibility} 
      onChange={(v) => updateData('possibility', v)} 
      label="Possibility Index" 
      color="blue" 
    />
  </StepLayout>
);

export const Step3_Agency = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 0: Desire Awareness" 
    stepNum={3} 
    title="Agency Recognition" 
    theme="blue"
    description="Recognize yourself as a primary architect. Confirm that your choices carry causal power."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-wider">Causal Agency Confidence</h4>
    <SliderWidget 
      value={data.agency} 
      onChange={(v) => updateData('agency', v)} 
      label="Agency Index" 
      color="blue" 
    />
  </StepLayout>
);

// ==========================================
// LEVEL 1: VISION CLARITY
// ==========================================
export const Step4_Outcome = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 1: Vision Clarity" 
    stepNum={4} 
    title="Outcome Definition" 
    theme="green"
    description="Define the target outcome with concrete parameters. Blur results in cognitive misalignment."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-green-800 dark:text-green-300 mb-3 uppercase tracking-wider">Defined Target Outcome</h4>
    <VoiceTextArea 
      value={data.outcome || ""} 
      onChange={(v) => updateData('outcome', v)} 
      placeholder="The precise, observable parameter of my outcome is..." 
    />
  </StepLayout>
);

export const Step5_Sensory = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 1: Vision Clarity" 
    stepNum={5} 
    title="Sensory Specificity" 
    theme="green"
    description="Simulate the achieved snapshot with fine-grained sensory particulars (visuals, touch, acoustics)."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-green-800 dark:text-green-300 mb-3 uppercase tracking-wider">Sensory Blueprint</h4>
    <VoiceTextArea 
      value={data.sensory || ""} 
      onChange={(v) => updateData('sensory', v)} 
      placeholder="I see..., I feel..., I hear..., when the outcome has stabilized..." 
      rows={4}
    />
  </StepLayout>
);

export const Step6_Meaning = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 1: Vision Clarity" 
    stepNum={6} 
    title="Meaning Connection" 
    theme="green"
    description="Establish core values backing this vision, guaranteeing high stamina when novelty dissipates."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-green-800 dark:text-green-300 mb-1 uppercase tracking-wider">Target Values Anchor</h4>
    <ChipSelector 
      options={["Freedom", "Security", "Impact", "Love", "Growth", "Peace", "Power", "Creativity", "Legacy", "Health", "Connection"]}
      selected={data.values || []} 
      onChange={(v) => updateData('values', v)} 
      customOptions={data.customValues || []}
      onAddCustomOption={(opt) => updateData('customValues', [...(data.customValues || []), opt])}
      color="green"
    />
  </StepLayout>
);

// ==========================================
// LEVEL 2: BELIEF ALIGNMENT
// ==========================================
export const Step7_BeliefDetection = ({ data, updateData, name, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 2: Belief Alignment" 
    stepNum={7} 
    title="Belief Detection" 
    theme="red"
    description={`Audit subconscious arguments arguing that this aim is blockaded or dangerous for you, ${name}.`}
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-red-800 dark:text-red-350 mb-3 uppercase tracking-wider">Subconscious Counter-Arguments</h4>
    <VoiceTextArea 
      value={data.limitingBeliefs || ""} 
      onChange={(v) => updateData('limitingBeliefs', v)} 
      placeholder="What silent voice says: 'I cannot have this because...'?" 
    />
  </StepLayout>
);

export const Step8_BeliefRevision = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 2: Belief Alignment" 
    stepNum={8} 
    title="Limiting Belief Revision" 
    theme="red"
    description="Deconstruct the internal barrier logic. Draft an empowering, factual rule in its place."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-red-800 dark:text-red-350 mb-3 uppercase tracking-wider">Revised Empathetic Thesis</h4>
    <VoiceTextArea 
      value={data.revisedBeliefs || ""} 
      onChange={(v) => updateData('revisedBeliefs', v)} 
      placeholder="Reconstruct the objection: The objective truth is actually..." 
    />
  </StepLayout>
);

export const Step9_Identity = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 2: Belief Alignment" 
    stepNum={9} 
    title="Identity Alignment" 
    theme="red"
    description="Step into the default standards of the persona that stabilizes this outcome easily."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-red-800 dark:text-red-350 mb-1 uppercase tracking-wider">Required Personal Archetypes</h4>
    <ChipSelector 
      options={["Decisive", "Resilient", "Worthy", "Disciplined", "Abundant", "Fearless", "Patient", "Focused", "Magnetic", "Unshakable"]}
      selected={data.identity || []} 
      onChange={(v) => updateData('identity', v)} 
      customOptions={data.customIdentity || []}
      onAddCustomOption={(opt) => updateData('customIdentity', [...(data.customIdentity || []), opt])}
      color="red"
    />
  </StepLayout>
);
