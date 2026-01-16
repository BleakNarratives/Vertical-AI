import React, { useState, useEffect, useCallback } from 'react';
import { performBusinessAnalysis } from './services/geminiService';
import { BusinessAnalysisOutput, AIStudio } from './types'; // Import AIStudio
import LoadingSpinner from './components/LoadingSpinner';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import AnalysisSection from './components/AnalysisSection';
import VerticalAILayoutDisplay from './components/VerticalAILayoutDisplay'; // New import
import VertLayoutDisplay from './components/VertLayoutDisplay';             // New import

// Removed the conflicting local declaration of AIStudio and declare global block.
// AIStudio is now imported from types.ts.
// The global declaration for 'aistudio' on 'Window' is implicitly handled by TypeScript
// when `AIStudio` is imported and `window.aistudio` is cast.

type BrandView = 'analysis' | 'verticalAI' | 'vert';

const App: React.FC = () => {
  const [analysisOutput, setAnalysisOutput] = useState<BusinessAnalysisOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const [currentBrandView, setCurrentBrandView] = useState<BrandView>('analysis'); // New state for brand view

  const checkApiKey = useCallback(async () => {
    // Cast window.aistudio to AIStudio to ensure type safety.
    if (typeof window.aistudio !== 'undefined' && typeof (window.aistudio as AIStudio).hasSelectedApiKey === 'function') {
      const selected = await (window.aistudio as AIStudio).hasSelectedApiKey();
      setApiKeySelected(selected);
    } else {
      // If not in AI Studio environment, assume API_KEY is set via environment variable
      // or provide a fallback for local development. For this challenge, we strictly follow AI Studio context.
      setError("AI Studio environment not detected. Please ensure you are running in AI Studio.");
    }
  }, []);

  useEffect(() => {
    checkApiKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAnalysisOutput(null);
    setCurrentBrandView('analysis'); // Reset view to analysis when generating new content

    // This is the original prompt from the user, which will be fed to Gemini for analysis generation.
    const userRequestPrompt = `
      By using tools like celonis and disco we can create a smart python script for process identification, identification of areas where improvement is needed, and creating architectures intended to solve known and unknown weak areas in business models and workflows in commercial/industrial businesses large and small, which can map out real world cost cutting strategies, increase productivity, minimize hurdles, bottlenecks, and blockers, and pinpoint viables, profitable strategies, and lucrative alternatives for business in areas they could stand to benefit by improving. Top dollar, bottom dollar - the only thing that matters to these stuffed suits is dollars

      Implementation of chat bots and ai integration in tasks ranging from customer service to data entry and invoice processing to payroll and scheduling, and even robotics and hardware integrations. ML models could analyze vast amounts of data in real time and leverage predictive analytics to make moves before the competition. This would blow out AI wrappers out of the water, or so I would suspect.

      This initial script could be just one part of a whole series of scripts, agents, and automations that cover ethical considerations and safety standards, create training programs to educate employees on working with AI, and even handle hr aspects insuring a harmonious workplace between AI and human employees.

      Done correctly and adhered to, there's no way these packages wouldn't provide business much needed optimization, streamlined automation, and show a ROI for chairmen and shareholders almost immediately. Offered as SaaS packages, this could gain serious traction by as soon as Q2 2026.

      What are the most optimal ways to scaffold their architectures? To sequence the related code snippets? To select their tech stacks?

      Create and compare/contrast at least two different frameworks for 3 different areas of commerce and industry please, then run sims showing likelihoods for each of the pairs, following the most logical paths to success or failure. Run a quick 6 hat exercise on the winning concepts for further understanding. Create an outline of the paths and their outcomes in markdown, and generate an executive summary for this thought experiment as well please!

      Additionally, propose a high-level Software-as-a-Service (SaaS) architecture for the process optimization and AI platform, considering scalability, resilience, cost-effectiveness, key components (data ingestion, processing, AI/ML deployment, API gateways, UI, data storage), and relevant Google Cloud Platform (GCP) technologies.

      Finally, provide structured outlines for three Python scripts: a core process mining engine, a module for predictive analytics in process data, and a module for predictive analytics in market swings and consumer pain points.

      Furthermore, design two conceptual UI layouts for brand comparison ("Vertical AI" vs "Vert"). For "Vertical AI", describe a corporate, button-up, sky-is-the-limit UI feel. For "Vert", describe a more relaxed, "Birkenstock-wearing hipster" UI feel. Run a simulated focus group in Kansas (rural and urban participants) comparing these two branding concepts, including a timestamped dialogue log and a summary of feedback for each brand, plus an overall recommendation.

      We don't aim to demonstrate how AI can increase performance and decrease overhead. We aim to make these executives wonder how they ever got along without them!!

      Cheers! We're off to the races now!
    `;

    try {
      const result = await performBusinessAnalysis(userRequestPrompt);
      setAnalysisOutput(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        if (err.message.includes("API Key might be invalid")) {
          setApiKeySelected(false); // Prompt for re-selection
        }
      } else {
        setError('An unknown error occurred during analysis.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  if (!apiKeySelected && !error) { // Only show API key prompt if not selected and no environment error
    return <ApiKeyPrompt onApiKeySelected={() => setApiKeySelected(true)} />;
  }

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message="Analyzing business models, comparing frameworks, running simulations, and crafting strategic insights..." />;
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }

    if (!analysisOutput) {
      return (
        <div className="text-center p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Generate Your AI Strategy?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Click the button below to initiate a comprehensive analysis based on your business needs.
          </p>
          <button
            onClick={handleGenerateAnalysis}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            Generate AI Business Strategy
          </button>
        </div>
      );
    }

    // Render the specific brand layout or the analysis sections
    if (currentBrandView === 'verticalAI' && analysisOutput.verticalAILayoutDescription) {
      return <VerticalAILayoutDisplay description={analysisOutput.verticalAILayoutDescription} />;
    } else if (currentBrandView === 'vert' && analysisOutput.vertLayoutDescription) {
      return <VertLayoutDisplay description={analysisOutput.vertLayoutDescription} />;
    } else {
      return (
        <div className="space-y-12">
          <AnalysisSection title="Executive Summary" content={analysisOutput?.executiveSummary} type="text" />
          <AnalysisSection title="High-Level SaaS Architecture" content={analysisOutput?.saasArchitecture} type="saasArchitecture" />
          <AnalysisSection title="Architectural Scaffolding" content={analysisOutput?.architecturalScaffolding} type="text" />
          <AnalysisSection title="Code Sequencing" content={analysisOutput?.codeSequencing} type="text" />
          <AnalysisSection title="Tech Stack Selection" content={analysisOutput?.techStackSelection} type="text" />
          <AnalysisSection title="Framework Comparisons" content={analysisOutput?.frameworkComparisons} type="frameworks" />
          <AnalysisSection title="Simulation Results" content={analysisOutput?.simulationResults} type="simulations" />
          <AnalysisSection title="Six Hat Exercise" content={analysisOutput?.sixHatExercise} type="sixHats" />
          <AnalysisSection title="Brand Concept: Vertical AI Layout Description" content={analysisOutput?.verticalAILayoutDescription} type="text" />
          <AnalysisSection title="Brand Concept: Vert Layout Description" content={analysisOutput?.vertLayoutDescription} type="text" />
          <AnalysisSection title="Brand Comparison Focus Group Simulation" content={analysisOutput?.brandComparisonSimulation} type="brandComparison" />
          <AnalysisSection title="Core Process Mining Engine Outline" content={analysisOutput?.processMiningScriptOutline} type="scriptOutline" />
          <AnalysisSection title="Predictive Analytics (Process) Script Outline" content={analysisOutput?.predictiveAnalyticsProcessScriptOutline} type="scriptOutline" />
          <AnalysisSection title="Predictive Analytics (Market & Consumer) Script Outline" content={analysisOutput?.predictiveAnalyticsMarketScriptOutline} type="scriptOutline" />
          <AnalysisSection title="Strategic Paths & Outcomes (Outline)" content={analysisOutput?.markdownOutline} type="markdown" />
        </div>
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10 pt-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          AI Business <span className="text-blue-600">Strategy Generator</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Unlocking unparalleled insights and strategic roadmaps for AI integration to revolutionize your business.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        {analysisOutput && (
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setCurrentBrandView('analysis')}
              className={`py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-200 ${
                currentBrandView === 'analysis' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Full Analysis
            </button>
            <button
              onClick={() => setCurrentBrandView('verticalAI')}
              className={`py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-200 ${
                currentBrandView === 'verticalAI' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              "Vertical AI" Layout (Draft)
            </button>
            <button
              onClick={() => setCurrentBrandView('vert')}
              className={`py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-200 ${
                currentBrandView === 'vert' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              "Vert" Layout (Draft)
            </button>
          </div>
        )}
        {renderContent()}
      </main>

      <footer className="text-center mt-12 py-6 text-gray-500 text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} AI Business Strategy Generator. All rights reserved.
      </footer>
    </div>
  );
};

export default App;