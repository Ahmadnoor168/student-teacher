"use client"
import { useState } from 'react';
import { format } from 'date-fns';

export default function DateRangeSelector({ onDateRangeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('This Week');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const predefinedRanges = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'Custom Range'
  ];

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range !== 'Custom Range') {
      setIsOpen(false);
      // Here you would calculate the actual date range based on selection
      onDateRangeChange && onDateRangeChange({
        start: new Date(), // Replace with actual calculated date
        end: new Date(),   // Replace with actual calculated date
        label: range
      });
    }
  };

  const handleCustomRangeSubmit = () => {
    if (customStartDate && customEndDate) {
      setIsOpen(false);
      onDateRangeChange && onDateRangeChange({
        start: new Date(customStartDate),
        end: new Date(customEndDate),
        label: `${format(new Date(customStartDate), 'MMM d, yyyy')} - ${format(new Date(customEndDate), 'MMM d, yyyy')}`
      });
    }
  };

  return (
    <div className="relative">
      {/* Date Range Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-gray-300 rounded-lg hover:bg-[#2A2A2A] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{selectedRange}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 bg-[#1A1A1A] rounded-lg shadow-lg border border-gray-800">
          {/* Predefined Ranges */}
          <div className="p-2">
            {predefinedRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleRangeSelect(range)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                  selectedRange === range
                    ? 'bg-[#1CD3C6] text-black'
                    : 'text-gray-300 hover:bg-[#2A2A2A]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Custom Range Inputs */}
          {selectedRange === 'Custom Range' && (
            <div className="p-4 border-t border-gray-800">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full bg-[#2A2A2A] text-gray-300 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#1CD3C6]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full bg-[#2A2A2A] text-gray-300 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#1CD3C6]"
                  />
                </div>
                <button
                  onClick={handleCustomRangeSubmit}
                  className="w-full bg-[#1CD3C6] text-black py-2 rounded-lg hover:bg-[#1AC3B6] transition-colors"
                >
                  Apply Range
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 