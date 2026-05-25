import React from 'react';
import { StepProps, StepLayout, VoiceTextArea, SliderWidget, ChipSelector } from './stepLayout';

// ==========================================
// LEVEL 6: EMBODIED MANIFESTATION
// ==========================================
export const Step19_Coherence = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 6: Embodied Manifestation" 
    stepNum={19} 
    title="State-Behavior Coherence" 
    theme="indigo"
    description="Synchronize thoughts, bodily standards, speech habits, and scheduling. Minimize conflicting signals."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-indigo-850 dark:text-indigo-300 mb-3 uppercase tracking-wider">Internal & External Coherence</h4>
    <SliderWidget 
      value={data.coherence} 
      onChange={(v) => updateData('coherence', v)} 
      label="Coherence Alignment Score" 
      color="indigo" 
    />
  </StepLayout>
);

export const Step20_Persistence = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 6: Embodied Manifestation" 
    stepNum={20} 
    title="Persistence Through Delay" 
    theme="indigo"
    description="Remain loyal to the vision target during the delayed re-organization of physical variables."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-indigo-850 dark:text-indigo-300 mb-3 uppercase tracking-wider">Delay Affirmation Statement</h4>
    <VoiceTextArea 
      value={data.persistence || ""} 
      onChange={(v) => updateData('persistence', v)} 
      placeholder="Even when the physical environment lags in response, I remain committed because..." 
    />
  </StepLayout>
);

export const Step21_Receiving = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 6: Embodied Manifestation" 
    stepNum={21} 
    title="Receiving Capacity" 
    theme="indigo"
    description="Hold, protect, and accept opportunities when they materialize, refusing subconscious comfort with struggle."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-indigo-850 dark:text-indigo-300 mb-3 uppercase tracking-wider">Holding Capacity Weight</h4>
    <SliderWidget 
      value={data.receiving} 
      onChange={(v) => updateData('receiving', v)} 
      label="Acceptance Comfort Scale" 
      color="indigo" 
    />
  </StepLayout>
);

// ==========================================
// LEVEL 7: META-MANIFESTING
// ==========================================
export const Step22_Pattern = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 7: Meta-Manifesting" 
    stepNum={22} 
    title="Pattern Recognition" 
    theme="purple"
    description="Decode historic events of success or failure. Pinpoint your unique, repeating materialization patterns."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-purple-800 dark:text-purple-300 mb-3 uppercase tracking-wider">Historical Manifestation Pattern Analysis</h4>
    <VoiceTextArea 
      value={data.patternRecognition || ""} 
      onChange={(v) => updateData('patternRecognition', v)} 
      placeholder="Historically, my wishes are consolidated into reality most fluidly whenever I..." 
      rows={4}
    />
  </StepLayout>
);

export const Step23_CrossDomain = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 7: Meta-Manifesting" 
    stepNum={23} 
    title="Cross-Domain Manifesting" 
    theme="purple"
    description="Translate established manifestation standards into auxiliary life verticals."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-purple-800 dark:text-purple-300 mb-1 uppercase tracking-wider">Target Domain Expansion</h4>
    <ChipSelector 
      options={["Wealth/Finance", "Romantic Relationships", "Physical Health", "Career/Business", "Learning/Skill", "Identity/Character", "Family", "Spirituality"]}
      selected={data.nextDomains || []} 
      onChange={(v) => updateData('nextDomains', v)} 
      customOptions={data.customNextDomains || []}
      onAddCustomOption={(opt) => updateData('customNextDomains', [...(data.customNextDomains || []), opt])}
      color="purple"
    />
  </StepLayout>
);

export const Step24_Uncertainty = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 7: Meta-Manifesting" 
    stepNum={24} 
    title="Manifesting Under Uncertainty" 
    theme="purple"
    description="Retain directional alignment even when external metrics are extremely volatile."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-purple-800 dark:text-purple-300 mb-3 uppercase tracking-wider">Uncertainty Tolerance Weight</h4>
    <SliderWidget 
      value={data.uncertainty} 
      onChange={(v) => updateData('uncertainty', v)} 
      label="Chaos Stability Score" 
      color="purple" 
    />
  </StepLayout>
);

export const Step25_Reliability = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 7: Meta-Manifesting" 
    stepNum={25} 
    title="Manifestation Reliability" 
    theme="purple"
    description="Establish intention-to-reality conversion as a baseline mechanical script."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-purple-800 dark:text-purple-300 mb-3 uppercase tracking-wider">Baseline Predictability Score</h4>
    <SliderWidget 
      value={data.reliability} 
      onChange={(v) => updateData('reliability', v)} 
      label="Engine Predictability Scale" 
      color="purple" 
    />
  </StepLayout>
);

export const Step26_Evolution = ({ data, updateData, name, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 7: Meta-Manifesting" 
    stepNum={26} 
    title="Manifestation Evolution" 
    theme="purple"
    description={`Recalibrate objectives, standards, and standard profiles. Guide your next infinite climb, ${name}.`}
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-purple-800 dark:text-purple-300 mb-3 uppercase tracking-wider">Helical Upward Transition</h4>
    <VoiceTextArea 
      value={data.evolution || ""} 
      onChange={(v) => updateData('evolution', v)} 
      placeholder="Moving forward, my next standard baseline of creative growth will look like..." 
      rows={4}
    />
  </StepLayout>
);
