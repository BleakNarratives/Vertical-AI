import React from 'react';
import { AIStudio } from '../types';

interface ApiKeyPromptProps {
  onApiKeySelected: () => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onApiKeySelected }) => {
  const handleSelectKey = async () => {
    // Cast window.aistudio to AIStudio to ensure type safety.
    const aistudio = (window as any).aistudio as AIStudio;
    if (typeof aistudio !== 'undefined' && typeof aistudio.openSelectKey === 'function') {
      try {
        await aistudio.openSelectKey();
        onApiKeySelected(); // Assume success and proceed
      } catch (error) {
        console.error("Error opening API key selection dialog:", error);
        alert("Failed to open API key selection. Please ensure you are in a valid environment.");
      }
    } else {
      alert("API Key selection utility not available. Please ensure you are running this application in the Google AI Studio environment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">API Key Required</h2>
        <p className="text-gray-600 mb-6">
          To generate advanced AI business strategies, a valid Google Cloud API key is required.
          Please select an API key from a paid GCP project.
        </p>
        <button
          onClick={handleSelectKey}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Select Your API Key
        </button>
        <p className="mt-6 text-sm text-gray-500">
          Learn more about billing: {' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            ai.google.dev/gemini-api/docs/billing
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyPrompt;