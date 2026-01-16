import React from 'react';

interface VerticalAILayoutDisplayProps {
  description: string;
}

const VerticalAILayoutDisplay: React.FC<VerticalAILayoutDisplayProps> = ({ description }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden">
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-bold">Vertical AI Platform</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome, Executive User</span>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold">Dashboard</button>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold">Reports</button>
        </div>
      </div>
      <div className="flex">
        <aside className="w-64 bg-gray-800 text-gray-200 p-4 space-y-4">
          <div className="py-2 px-3 hover:bg-gray-700 rounded-md cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span>Overview</span>
          </div>
          <div className="py-2 px-3 bg-blue-600 text-white rounded-md cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <span>Process Optimization</span>
          </div>
          <div className="py-2 px-3 hover:bg-gray-700 rounded-md cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span>Predictive Analytics</span>
          </div>
          <div className="py-2 px-3 hover:bg-gray-700 rounded-md cursor-pointer flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Settings</span>
          </div>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h3>
          <p className="text-gray-700 mb-6">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md border border-blue-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">KPIs at a Glance</h4>
              <p className="text-gray-600">Total Cases: <span className="font-bold text-blue-600">1,245</span></p>
              <p className="text-gray-600">Avg Cycle Time: <span className="font-bold text-green-600">2.3 days</span></p>
              <p className="text-gray-600">Bottlenecks: <span className="font-bold text-red-600">3 identified</span></p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border border-blue-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Real-time Process Flow</h4>
              <div className="bg-gray-200 h-24 flex items-center justify-center text-gray-500 rounded-md">
                <span className="text-sm">Dynamic Process Map Placeholder</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border border-blue-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Predictive Alerts</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Order #12345: SLA risk (90% likely)</li>
                <li>Resource R1: High utilization next 24h</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VerticalAILayoutDisplay;