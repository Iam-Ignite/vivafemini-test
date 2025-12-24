'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@/components/ui';
import { healthReportService } from '@/services/api';
import { HistoricalEntry } from '@/types';

interface HistoricalData {
  data: HistoricalEntry[];
  total: number;
  page: number;
  totalPages: number;
}

export function HistoricalDataTable() {
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await healthReportService.getHistorical(currentPage, 10);
        setHistoricalData(response.data);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleDownloadPDF = () => {
    alert('PDF download feature coming soon!');
  };

  if (!historicalData) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Historical Cycle Data</h2>
          <button className="text-sm text-gray-500 flex items-center gap-1 mt-1 hover:text-gray-700">
            Oct 2025
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDownloadPDF}
          className="flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Top Symptom</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total Symptoms</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Note</th>
              <th className="py-3 px-4 w-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {historicalData.data.map((entry, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="text-sm font-medium text-gray-900">{entry.date}</div>
                  <div className="text-xs text-gray-400">{entry.time}</div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{entry.topSymptom}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{entry.totalSymptoms}/10</td>
                <td className="py-4 px-4 text-sm text-gray-500">{entry.note || '-'}</td>
                <td className="py-4 px-4">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {historicalData.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="py-2 px-4 text-sm text-gray-600">
            Page {currentPage} of {historicalData.totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === historicalData.totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  );
}
