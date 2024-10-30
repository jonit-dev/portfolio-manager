import React from 'react';
import { PieChart } from 'lucide-react';

function AllocationCharts() {
  return (
    <>
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-purple-500">Current Allocation</h2>
          <PieChart className="h-6 w-6 text-purple-500" />
        </div>
        <div className="aspect-square relative">
          {/* Add chart library integration here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400">Chart placeholder</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-cyan-500">Target Allocation</h2>
          <PieChart className="h-6 w-6 text-cyan-500" />
        </div>
        <div className="aspect-square relative">
          {/* Add chart library integration here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400">Chart placeholder</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllocationCharts;