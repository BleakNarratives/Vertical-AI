import React from 'react';
import { FrameworkComparison, SimulationResult, SixHatExerciseResult, SixHatHat, SaaSArchitecture, ScriptOutline, BrandComparisonSimulation } from '../types';
import { marked } from 'marked'; // For rendering markdown safely
import ReactMarkdown from 'react-markdown'; // For rendering markdown safely

interface AnalysisSectionProps {
  title: string;
  content?: string | string[] | FrameworkComparison[] | SimulationResult[] | SixHatExerciseResult[] | SaaSArchitecture | ScriptOutline | BrandComparisonSimulation;
  type: 'text' | 'markdown' | 'list' | 'frameworks' | 'simulations' | 'sixHats' | 'saasArchitecture' | 'scriptOutline' | 'brandComparison';
}

const hatColors: Record<SixHatHat, string> = {
  'White Hat': 'bg-white text-gray-800 border border-gray-300',
  'Red Hat': 'bg-red-500 text-white',
  'Black Hat': 'bg-gray-800 text-white',
  'Yellow Hat': 'bg-yellow-400 text-gray-800',
  'Green Hat': 'bg-green-500 text-white',
  'Blue Hat': 'bg-blue-500 text-white',
};

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, content, type }) => {
  const renderContent = () => {
    if (!content) return <p className="text-gray-500">No content available.</p>;

    switch (type) {
      case 'text':
        return <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{content as string}</p>;
      case 'markdown':
        // Ensure markdown is parsed safely
        return <div className="prose max-w-none"><ReactMarkdown>{content as string}</ReactMarkdown></div>;
      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {(content as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case 'frameworks':
        return (
          <div className="space-y-8">
            {(content as FrameworkComparison[]).map((comparison, compIndex) => (
              <div key={compIndex} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{comparison.industry} Industry</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[comparison.framework1, comparison.framework2].map((framework, fwIndex) => (
                    <div key={fwIndex} className="bg-white p-5 rounded-lg shadow-md border border-blue-100">
                      <h4 className="text-lg font-bold text-blue-700 mb-2">{framework.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{framework.description}</p>
                      <div className="mb-3">
                        <p className="font-medium text-green-600">Pros:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {framework.pros.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                      <div className="mb-3">
                        <p className="font-medium text-red-600">Cons:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {framework.cons.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-purple-600">Tech Stack:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {framework.techStack.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'simulations':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Industry</th>
                  <th className="py-3 px-4 text-left">Framework</th>
                  <th className="py-3 px-4 text-left">Path</th>
                  <th className="py-3 px-4 text-left">Likelihood</th>
                  <th className="py-3 px-4 text-left">Outcome Summary</th>
                </tr>
              </thead>
              <tbody>
                {(content as SimulationResult[]).map((sim, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 text-gray-700">{sim.industry}</td>
                    <td className="py-3 px-4 text-gray-700">{sim.framework}</td>
                    <td className="py-3 px-4 text-gray-700">{sim.path}</td>
                    <td className="py-3 px-4 text-gray-700">
                      <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold ${sim.likelihood >= 70 ? 'bg-green-100 text-green-800' : sim.likelihood >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {sim.likelihood}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{sim.outcomeSummary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'sixHats':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content as SixHatExerciseResult[]).map((hat, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md ${hatColors[hat.hat]} flex flex-col justify-between`}>
                <div>
                  <h4 className="text-xl font-bold mb-2">{hat.hat}</h4>
                  <p className="text-sm font-semibold mb-2 opacity-90">Focus: {hat.focus}</p>
                  <p className="text-base leading-relaxed opacity-95">{hat.summary}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'saasArchitecture':
        const arch = content as SaaSArchitecture;
        return (
          <div className="space-y-6 text-gray-700">
            <p className="whitespace-pre-wrap leading-relaxed">{arch.overview}</p>
            <p><strong className="text-blue-700">Cloud Provider Focus:</strong> {arch.cloudProviderFocus}</p>
            <p className="whitespace-pre-wrap leading-relaxed"><strong className="text-blue-700">Scalability, Resilience & Cost-effectiveness:</strong> {arch.scalabilityResilienceCost}</p>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Key Components:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-purple-600">Data Ingestion:</p>
                <ul className="list-disc list-inside text-sm">
                  {arch.dataIngestion.components.map((c, i) => <li key={i}>{c}</li>)}
                  <li className="font-semibold mt-1">Technologies: {arch.dataIngestion.technologies.join(', ')}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-purple-600">Processing Layer:</p>
                <ul className="list-disc list-inside text-sm">
                  {arch.processingLayer.components.map((c, i) => <li key={i}>{c}</li>)}
                  <li className="font-semibold mt-1">Technologies: {arch.processingLayer.technologies.join(', ')}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-purple-600">AI/ML Model Deployment:</p>
                <ul className="list-disc list-inside text-sm">
                  {arch.aiMlDeployment.components.map((c, i) => <li key={i}>{c}</li>)}
                  <li className="font-semibold mt-1">Technologies: {arch.aiMlDeployment.technologies.join(', ')}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-purple-600">API Gateways:</p>
                <ul className="list-disc list-inside text-sm">
                  {arch.apiGateways.components.map((c, i) => <li key={i}>{c}</li>)}
                  <li className="font-semibold mt-1">Technologies: {arch.apiGateways.technologies.join(', ')}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-purple-600">User Interface:</p>
                <ul className="list-disc list-inside text-sm">
                  {arch.userInterface.components.map((c, i) => <li key={i}>{c}</li>)}
                  <li className="font-semibold mt-1">Technologies: {arch.userInterface.technologies.join(', ')}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-purple-600">Data Storage:</p>
                <p className="text-sm">Strategy: {arch.dataStorage.strategy}</p>
                <ul className="list-disc list-inside text-sm">
                  <li className="font-semibold mt-1">Technologies: {arch.dataStorage.technologies.join(', ')}</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'scriptOutline':
        const script = content as ScriptOutline;
        return (
          <div className="space-y-4 text-gray-700">
            <h4 className="text-xl font-bold text-gray-800">{script.name}</h4>
            <p className="whitespace-pre-wrap leading-relaxed">{script.description}</p>
            <div>
              <p className="font-medium text-blue-600">Key Functions:</p>
              <ul className="list-disc list-inside text-sm">
                {script.keyFunctions.map((func, i) => <li key={i}>{func}</li>)}
              </ul>
            </div>
            <p><strong className="text-blue-600">Input/Output:</strong> {script.inputOutput}</p>
            <div>
              <p className="font-medium text-blue-600">Dependencies:</p>
              <ul className="list-disc list-inside text-sm">
                {script.dependencies.map((dep, i) => <li key={i}>{dep}</li>)}
              </ul>
            </div>
            {script.potentialOptimizations && script.potentialOptimizations.length > 0 && (
              <div>
                <p className="font-medium text-blue-600">Potential Optimizations:</p>
                <ul className="list-disc list-inside text-sm">
                  {script.potentialOptimizations.map((opt, i) => <li key={i}>{opt}</li>)}
                </ul>
              </div>
            )}
          </div>
        );
      case 'brandComparison':
        const brandSim = content as BrandComparisonSimulation;
        return (
          <div className="space-y-8 text-gray-700">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Focus Group Participants:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brandSim.participants.map((p, i) => (
                  <div key={i} className="bg-gray-100 p-4 rounded-md border border-gray-200">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm italic">{p.persona}</p>
                    <p className="text-xs text-gray-500">{p.location}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Simulated Dialogue Log:</h4>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 max-h-96 overflow-y-auto">
                {brandSim.dialogueLog.map((entry, i) => (
                  <p key={i} className="mb-2 text-sm">
                    <span className="text-gray-500 text-xs mr-2">{entry.timestamp}</span>
                    <strong className={entry.brandReactedTo === 'Vertical AI' ? 'text-blue-700' : entry.brandReactedTo === 'Vert' ? 'text-green-700' : 'text-gray-800'}>
                      {entry.participantName}:
                    </strong>{' '}
                    <ReactMarkdown>{entry.dialogue}</ReactMarkdown>
                  </p>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[brandSim.verticalAIAnalysis, brandSim.vertAnalysis].map((analysis, i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow-md border border-blue-100">
                  <h4 className={`text-lg font-bold mb-2 ${analysis.brandName === 'Vertical AI' ? 'text-blue-700' : 'text-green-700'}`}>{analysis.brandName} Feedback Summary</h4>
                  <p className="text-sm mb-2"><strong className="font-medium">Overall Sentiment:</strong> {analysis.overallSentiment}</p>
                  <div className="mb-2">
                    <p className="font-medium text-green-600">Key Positive Points:</p>
                    <ul className="list-disc list-inside text-sm">
                      {analysis.keyPositivePoints.map((p, idx) => <li key={idx}>{p}</li>)}
                    </ul>
                  </div>
                  <div className="mb-2">
                    <p className="font-medium text-red-600">Key Negative Points:</p>
                    <ul className="list-disc list-inside text-sm">
                      {analysis.keyNegativePoints.map((n, idx) => <li key={idx}>{n}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-purple-600">Recommendations:</p>
                    <ul className="list-disc list-inside text-sm">
                      {analysis.recommendations.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-5 rounded-lg shadow-md border border-blue-200">
              <h4 className="text-xl font-bold text-blue-800 mb-2">Overall Branding Recommendation:</h4>
              <p className="whitespace-pre-wrap leading-relaxed">{brandSim.overallBrandingRecommendation}</p>
            </div>
          </div>
        );
      default:
        return <p className="text-gray-500">Unsupported content type.</p>;
    }
  };

  return (
    <section className="mb-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-3">{title}</h2>
      {renderContent()}
    </section>
  );
};

export default AnalysisSection;