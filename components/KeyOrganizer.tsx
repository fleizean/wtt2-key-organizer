'use client';

import { useState, useCallback } from 'react';
import KeyInput from './KeyInput';
import { KeyData, countWikiKeys, generateFullKey } from '../utils/keyValidator';

export default function KeyOrganizer() {
  const [keys, setKeys] = useState<KeyData[]>(
    Array(8).fill(null).map(() => ({ key: '', wiki: 0 }))
  );

  const handleKeyChange = useCallback((index: number, value: KeyData) => {
    setKeys(prev => {
      const newKeys = [...prev];
      newKeys[index] = value;
      return newKeys;
    });
  }, []);

  const wikiCounts = countWikiKeys(keys);
  const fullKey = generateFullKey(keys);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="max-w-5xl mx-auto p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            WTTG2 Key Organizer
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded"></div>
        </div>

        {/* Combined key section */}
        <div className="mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Combined Master Key</h2>
            <textarea
              value={fullKey}
              readOnly
              className="w-full h-32 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg border-2 border-gray-300 resize-none focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Your master key will appear here when all keys are validated..."
            />
          </div>
        </div>

        {/* Wiki stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map((wiki) => (
            <div key={wiki} className="bg-white rounded-lg shadow-md p-6 text-center border-2 border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-gray-700 mb-2">
                Wiki {wiki}
              </div>
              <div className={`text-3xl font-bold ${
                wikiCounts[wiki.toString()] > 3 ? 'text-red-600' : 'text-blue-600'
              }`}>
                {wikiCounts[wiki.toString()]}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                keys {wikiCounts[wiki.toString()] > 3 && '(OVER LIMIT)'}
              </div>
            </div>
          ))}
        </div>

        {/* Key inputs */}
        <div className="bg-white rounded-lg shadow-md p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Key Configuration</h2>
          <div className="space-y-6">
            {keys.map((key, index) => (
              <KeyInput
                key={index}
                keynum={index + 1}
                value={key}
                onChange={(value) => handleKeyChange(index, value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}