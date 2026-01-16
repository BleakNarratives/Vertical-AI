export interface FrameworkDetails {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  techStack: string[];
}

export interface FrameworkComparison {
  industry: string;
  framework1: FrameworkDetails;
  framework2: FrameworkDetails;
}

export interface SimulationResult {
  industry: string;
  framework: string;
  path: string; // e.g., "Logical Path to Success", "Potential Path to Failure"
  likelihood: number; // Percentage, 0-100
  outcomeSummary: string;
}

export enum SixHatHat {
  WHITE = 'White Hat',
  RED = 'Red Hat',
  BLACK = 'Black Hat',
  YELLOW = 'Yellow Hat',
  GREEN = 'Green Hat',
  BLUE = 'Blue Hat',
}

export interface SixHatExerciseResult {
  hat: SixHatHat;
  focus: string;
  summary: string;
}

export interface SaaSArchitecture {
  overview: string;
  dataIngestion: {
    components: string[];
    technologies: string[];
  };
  processingLayer: {
    components: string[];
    technologies: string[];
  };
  aiMlDeployment: {
    components: string[];
    technologies: string[];
  };
  apiGateways: {
    components: string[];
    technologies: string[];
  };
  userInterface: {
    components: string[];
    technologies: string[];
  };
  dataStorage: {
    strategy: string;
    technologies: string[];
  };
  cloudProviderFocus: string;
  scalabilityResilienceCost: string;
}

export interface ScriptOutline {
  name: string;
  description: string;
  keyFunctions: string[];
  inputOutput: string;
  dependencies: string[];
  potentialOptimizations: string[];
}

// New interfaces for Brand Comparison and Focus Group Simulation
export interface FocusGroupParticipant {
  name: string;
  persona: string; // e.g., "Rural small business owner", "Urban tech professional"
  location: string; // e.g., "Topeka, KS (Rural)", "Kansas City, MO (Urban)"
}

export interface FocusGroupDialogueEntry {
  timestamp: string; // ISO string or similar
  participantName: string;
  dialogue: string;
  brandReactedTo?: 'Vertical AI' | 'Vert'; // Which brand they are talking about
}

export interface BrandFeedbackSummary {
  brandName: string;
  overallSentiment: string; // e.g., "Highly positive", "Mixed", "Negative"
  keyPositivePoints: string[];
  keyNegativePoints: string[];
  recommendations: string[];
}

export interface BrandComparisonSimulation {
  participants: FocusGroupParticipant[];
  dialogueLog: FocusGroupDialogueEntry[];
  verticalAIAnalysis: BrandFeedbackSummary;
  vertAnalysis: BrandFeedbackSummary;
  overallBrandingRecommendation: string;
}


/**
 * The expected structure of the JSON response from the Gemini API.
 */
export interface BusinessAnalysisOutput {
  architecturalScaffolding: string;
  codeSequencing: string;
  techStackSelection: string;
  frameworkComparisons: FrameworkComparison[];
  simulationResults: SimulationResult[];
  sixHatExercise: SixHatExerciseResult[];
  markdownOutline: string;
  executiveSummary: string;
  saasArchitecture: SaaSArchitecture;
  processMiningScriptOutline: ScriptOutline;
  predictiveAnalyticsProcessScriptOutline: ScriptOutline;
  predictiveAnalyticsMarketScriptOutline: ScriptOutline;
  verticalAILayoutDescription: string; // Now holds the refined, blended UI description
  brandComparisonSimulation: BrandComparisonSimulation; // New field for combined simulation
}

// Interface for AI Studio environment functions
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}