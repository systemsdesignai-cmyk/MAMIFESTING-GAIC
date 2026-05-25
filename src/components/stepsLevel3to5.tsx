import React from 'react';
import { StepProps, StepLayout, VoiceTextArea, SliderWidget, ChipSelector } from './stepLayout';

// ==========================================
// LEVEL 3: ATTENTION & EMOTIONAL PRIMING
// ==========================================
export const Step10_Attention = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 3: Attention & Emotion" 
    stepNum={10} 
    title="Attention Direction" 
    theme="yellow"
    description="Concentrate focus deliberately on the desired target state, preventing standard life noise from hijacking it."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-amber-850 dark:text-amber-300 mb-3 uppercase tracking-wider">Refocusing Stamina</h4>
    <SliderWidget 
      value={data.attention} 
      onChange={(v) => updateData('attention', v)} 
      label="Attention Hold Score" 
      color="yellow" 
    />
  </StepLayout>
);

export const Step11_Emotion = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 3: Attention & Emotion" 
    stepNum={11} 
    title="Emotional Encoding" 
    theme="yellow"
    description="Imbue the cognitive target with an elevated emotional baseline to tell the brain it is highly safe and critical."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-amber-850 dark:text-amber-300 mb-1 uppercase tracking-wider">State Priming Tones</h4>
    <ChipSelector 
      options={["Excitement", "Deep Peace", "Gratitude", "Fierce Drive", "Quiet Confidence", "Expansiveness", "Bliss", "Certainty"]}
      selected={data.emotion || []} 
      onChange={(v) => updateData('emotion', v)} 
      customOptions={data.customEmotion || []}
      onAddCustomOption={(opt) => updateData('customEmotion', [...(data.customEmotion || []), opt])}
      color="yellow"
    />
  </StepLayout>
);

export const Step12_Reticular = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 3: Attention & Emotion" 
    stepNum={12} 
    title="Reticular Activation" 
    theme="yellow"
    description="Calibrate the neurological filters (RAS) to pick out subtle indicators, contacts, and possibilities related to your theme."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-amber-850 dark:text-amber-300 mb-3 uppercase tracking-wider">Opportunistic Filter Calibration</h4>
    <VoiceTextArea 
      value={data.reticular || ""} 
      onChange={(v) => updateData('reticular', v)} 
      placeholder="What signals or structural patterns will my eyes keep scanning for?" 
    />
  </StepLayout>
);

// ==========================================
// LEVEL 4: ACTION TRANSLATION
// ==========================================
export const Step13_Pathways = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 4: Action Translation" 
    stepNum={13} 
    title="Pathway Identification" 
    theme="orange"
    description="Generate realistic lanes and causal bridges crossing from present location to the specified outcome."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-orange-800 dark:text-orange-300 mb-3 uppercase tracking-wider">Candidate Pathways</h4>
    <VoiceTextArea 
      value={data.pathways || ""} 
      onChange={(v) => updateData('pathways', v)} 
      placeholder="Route A, Route B, and alternative opportunities mapping..." 
      rows={4}
    />
  </StepLayout>
);

export const Step14_Behavior = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 4: Action Translation" 
    stepNum={14} 
    title="Behavioral Alignment" 
    theme="orange"
    description="Adopt active physical behaviors that represent an immediate material vote for your future state."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-orange-800 dark:text-orange-300 mb-3 uppercase tracking-wider">Consistent Aligned Habit</h4>
    <VoiceTextArea 
      value={data.behavior || ""} 
      onChange={(v) => updateData('behavior', v)} 
      placeholder="A physical task or routine that directly matches my vision self..." 
    />
  </StepLayout>
);

export const Step15_Opportunity = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 4: Action Translation" 
    stepNum={15} 
    title="Opportunity Response" 
    theme="orange"
    description="Ensure rapid, unhesitating response when relevant scenarios or open doors arise."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-orange-800 dark:text-orange-300 mb-3 uppercase tracking-wider">Courage Response Setup</h4>
    <VoiceTextArea 
      value={data.opportunityResponse || ""} 
      onChange={(v) => updateData('opportunityResponse', v)} 
      placeholder="How will I override hesitation or anxiety when the match door swings open?" 
    />
  </StepLayout>
);

// ==========================================
// LEVEL 5: CONSISTENCY & REALITY TESTING
// ==========================================
export const Step16_Practice = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 5: Consistency & Reality" 
    stepNum={16} 
    title="Repeated Practice" 
    theme="teal"
    description="Show up across time. Consistency compiles random trials into a permanent baseline structure."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-teal-850 dark:text-teal-300 mb-3 uppercase tracking-wider">Friction Resilience</h4>
    <SliderWidget 
      value={data.practice} 
      onChange={(v) => updateData('practice', v)} 
      label="Consistency Index" 
      color="teal" 
    />
  </StepLayout>
);

export const Step17_Feedback = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 5: Consistency & Reality" 
    stepNum={17} 
    title="Feedback Reading" 
    theme="teal"
    description="Treat reality indicators as helpful gauges. Separate objective data from subjective disappointment."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-teal-850 dark:text-teal-300 mb-3 uppercase tracking-wider">Current Reality Indicators</h4>
    <VoiceTextArea 
      value={data.workingFeedback || ""} 
      onChange={(v) => updateData('workingFeedback', v)} 
      placeholder="What objective responses has reality returned to my aligned actions?" 
    />
  </StepLayout>
);

export const Step18_Adjustment = ({ data, updateData, onOpenReasoning, onOpenBestPractice, onOpenTools }: StepProps) => (
  <StepLayout 
    levelName="Level 5: Consistency & Reality" 
    stepNum={18} 
    title="Strategy Adjustment" 
    theme="teal"
    description="Reposition your tactics while remaining strictly committed to the core vision outcome."
    onOpenReasoning={onOpenReasoning} 
    onOpenBestPractice={onOpenBestPractice} 
    onOpenTools={onOpenTools}
  >
    <h4 className="font-bold text-sm text-teal-850 dark:text-teal-300 mb-3 uppercase tracking-wider">Strategic Modification Planning</h4>
    <VoiceTextArea 
      value={data.adjustment || ""} 
      onChange={(v) => updateData('adjustment', v)} 
      placeholder="What adjustment is my feedback recommending I implement?" 
    />
  </StepLayout>
);
