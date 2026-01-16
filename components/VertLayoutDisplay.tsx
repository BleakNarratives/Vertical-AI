import React from 'react';

interface VertLayoutDisplayProps {
  description: string;
}

const VertLayoutDisplay: React.FC<VertLayoutDisplayProps> = ({ description }) => {
  return (
    <div className="border border-green-300 rounded-lg shadow-xl bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden">
      <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md rounded-b-lg">
        <h2 className="text-3xl font-light tracking-wide">Vert Vibes</h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-light italic">Hey there, Innovator!</span>
          <button className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-md">Insight Hub</button>
          <button className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-md">Community</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-green-700 text-green-100 p-4 space-y-4 shadow-inner">
          <div className="py-2 px-3 hover:bg-green-800 rounded-lg cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span>The Big Picture</span>
          </div>
          <div className="py-2 px-3 bg-green-800 text-yellow-100 rounded-lg cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <span>Flow Alchemy</span>
          </div>
          <div className="py-2 px-3 hover:bg-green-800 rounded-lg cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span>Future Whispers</span>
          </div>
          <div className="py-2 px-3 hover:bg-green-800 rounded-lg cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Growth Seeds</span>
          </div>
        </aside>
        <main className="flex-1 p-6 bg-yellow-50 text-gray-800">
          <h3 className="text-2xl font-light text-green-800 mb-4">Your Flow Garden</h3>
          <p className="text-gray-700 mb-6 font-serif leading-relaxed">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md border-b-4 border-green-400">
              <h4 className="text-xl font-semibold text-green-700 mb-2">Health Metrics</h4>
              <p className="text-gray-600">Total Adventures: <span className="font-bold text-green-600">~1.2K</span></p>
              <p className="text-gray-600">Zen Flow Time: <span className="font-bold text-blue-600">2 days average</span></p>
              <p className="text-gray-600">Sticky Spots: <span className="font-bold text-red-600">Few & Far Between</span></p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border-b-4 border-green-400">
              <h4 className="text-xl font-semibold text-green-700 mb-2">Journey Visualization</h4>
              <div className="bg-yellow-100 h-24 flex items-center justify-center text-green-700 rounded-md border border-yellow-300 italic">
                <span className="text-sm">Organic Flow Journey Map Placeholder</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border-b-4 border-green-400">
              <h4 className="text-xl font-semibold text-green-700 mb-2">Intuitive Foresight</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Order #12345: Might need a friendly nudge (70% likely)</li>
                <li>Team 'Sunbeam': Could use more kombucha next sprint</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VertLayoutDisplay;