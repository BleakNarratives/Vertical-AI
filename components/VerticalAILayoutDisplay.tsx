import React from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown for dynamic description

interface VerticalAILayoutDisplayProps {
  description: string;
}

const VerticalAILayoutDisplay: React.FC<VerticalAILayoutDisplayProps> = ({ description }) => {
  return (
    <div className="border border-blue-300 rounded-xl shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      {/* Top Navigation Bar: Professional with dynamic elements */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 flex justify-between items-center shadow-lg">
        <h2 className="text-3xl font-extrabold tracking-tight">Vertical AI <span className="text-blue-200">Insights</span></h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-light italic hidden sm:inline">Welcome, Power User!</span>
          <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">Dashboard</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">AI Agents</button>
          <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hidden lg:inline">Settings</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar: Clean, actionable, with subtle modern icons */}
        <aside className="w-full lg:w-72 bg-gray-900 text-gray-200 p-6 space-y-5 shadow-inner">
          <div className="py-3 px-4 hover:bg-gray-700 rounded-lg cursor-pointer flex items-center space-x-3 transition-colors duration-200">
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span className="font-medium text-lg">Overview</span>
          </div>
          <div className="py-3 px-4 bg-blue-600 text-white rounded-lg cursor-pointer flex items-center space-x-3 transition-colors duration-200">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <span className="font-medium text-lg">Process Flow Studio</span>
          </div>
          <div className="py-3 px-4 hover:bg-gray-700 rounded-lg cursor-pointer flex items-center space-x-3 transition-colors duration-200">
            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span className="font-medium text-lg">Predictive Horizons</span>
          </div>
          <div className="py-3 px-4 hover:bg-gray-700 rounded-lg cursor-pointer flex items-center space-x-3 transition-colors duration-200">
            <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg>
            <span className="font-medium text-lg">AI Automation Hub</span>
          </div>
          <div className="py-3 px-4 hover:bg-gray-700 rounded-lg cursor-pointer flex items-center space-x-3 transition-colors duration-200">
            <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span className="font-medium text-lg">Code & Integrations</span>
          </div>
        </aside>

        {/* Main Content Area: Dynamic, data-rich, with engaging prompts */}
        <main className="flex-1 p-8 bg-gray-100 min-h-[600px] flex flex-col">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-300 pb-3">
            Dashboard: Strategic Command
          </h3>
          
          {/* AI-generated dynamic description */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 mb-8 flex-grow">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              <strong className="text-blue-700">Your AI Co-Pilot Says:</strong>
            </p>
            <div className="prose max-w-none text-gray-800">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* KPI Card with a slight modern twist */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">📈</span> Critical KPIs
              </h4>
              <p className="text-gray-700 text-base mb-2">Total Process Cycles: <span className="font-extrabold text-blue-600 text-xl">1,245 <span className="text-sm font-normal"> (+12% MoM)</span></span></p>
              <p className="text-gray-700 text-base mb-2">Avg. Cycle Time: <span className="font-extrabold text-green-600 text-xl">2.3 days <span className="text-sm font-normal"> (-5% WoW)</span></span></p>
              <p className="text-gray-700 text-base">Key Bottlenecks: <span className="font-extrabold text-red-600 text-xl">3 Critical <span className="text-sm font-normal"> (Review Required)</span></span></p>
              <button className="mt-4 bg-blue-100 text-blue-800 text-sm font-semibold py-2 px-4 rounded-full hover:bg-blue-200 transition-colors duration-200">
                Dive Deeper &rarr;
              </button>
            </div>

            {/* Real-time Process Map with interactive hint */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-indigo-500 hover:shadow-2xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3">🌐</span> Live Process Flow
              </h4>
              <div className="bg-gray-200 h-32 flex flex-col items-center justify-center text-gray-500 rounded-md border border-dashed border-gray-400 text-center relative overflow-hidden">
                <span className="text-lg font-medium animate-pulse">Dynamic Process Map Loading...</span>
                <p className="text-xs mt-1 text-gray-400">Click to interact with bottlenecks!</p>
                {/* Subtle, energetic visual elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-200/20 to-transparent animate-shimmer"></div>
              </div>
              <button className="mt-4 bg-indigo-100 text-indigo-800 text-sm font-semibold py-2 px-4 rounded-full hover:bg-indigo-200 transition-colors duration-200">
                Optimize Flow &rarr;
              </button>
            </div>

            {/* Predictive Alerts with a bit more punch */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-500 hover:shadow-2xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-100 text-red-600 rounded-full p-2 mr-3">🚨</span> Predictive Alerts
              </h4>
              <ul className="text-base text-gray-700 list-disc list-inside space-y-2">
                <li><strong className="text-red-700">URGENT:</strong> Order #12345 (SLA Breach Risk <span className="font-bold text-red-600">90%</span>) - <span className="text-xs text-gray-500 italic">Auto-intervention suggested</span></li>
                <li><strong className="text-yellow-700">WARNING:</strong> Resource 'Alpha' - High Utilization (<span className="font-bold text-yellow-600">85%</span> next 24h) - <span className="text-xs text-gray-500 italic">Re-allocation recommended</span></li>
                <li><strong className="text-green-700">OPPORTUNITY:</strong> Market Trend 'Gamma' - <span className="font-bold text-green-600">Impending Surge</span> - <span className="text-xs text-gray-500 italic">Activate campaign 'Ignite'</span></li>
              </ul>
              <button className="mt-4 bg-red-100 text-red-800 text-sm font-semibold py-2 px-4 rounded-full hover:bg-red-200 transition-colors duration-200">
                Action Now &rarr;
              </button>
            </div>
          </div>
          
          {/* Interactive "Pro-Tip" or "Cocky Quip" section */}
          <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-r-lg shadow-md italic mt-8 animate-fade-in-up">
            <p className="font-semibold mb-1">💡 Quick Quip from Your AI Agent:</p>
            <p className="text-sm">"Still wondering about ROI? We're busy making it happen. You just focus on those golf swings." 😉</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VerticalAILayoutDisplay;