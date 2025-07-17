'use client';

import { useState } from 'react';
import KeyInput from './KeyInput';
import { KeyData, countWikiKeys, generateFullKey } from '../utils/keyValidator';

export default function KeyOrganizer() {
  const [keys, setKeys] = useState<KeyData[]>(
    Array(8).fill(null).map(() => ({ key: '', wiki: 0 }))
  );

  const handleKeyChange = (index: number, value: KeyData) => {
    const newKeys = [...keys];
    newKeys[index] = value;
    setKeys(newKeys);
  };

  const wikiCounts = countWikiKeys(keys);
  const fullKey = generateFullKey(keys);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to the Game II key organizer
      </h1>
      
      <div className="mb-8">
        <textarea
          value={fullKey}
          readOnly
          className="w-full h-32 p-4 border border-gray-300 rounded-md bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none placeholder-gray-400"
          placeholder="Combined key will appear here when all keys are valid..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <p className={`text-lg font-semibold ${
            wikiCounts['1'] > 3 ? 'text-red-600' : 'text-gray-700'
          }`}>
            Wiki 1 keys: {wikiCounts['1']}
          </p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-semibold ${
            wikiCounts['2'] > 3 ? 'text-red-600' : 'text-gray-700'
          }`}>
            Wiki 2 keys: {wikiCounts['2']}
          </p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-semibold ${
            wikiCounts['3'] > 3 ? 'text-red-600' : 'text-gray-700'
          }`}>
            Wiki 3 keys: {wikiCounts['3']}
          </p>
        </div>
      </div>

      <section className="space-y-4">
        {keys.map((key, index) => (
          <KeyInput
            key={index}
            keynum={index + 1}
            value={key}
            onChange={(value) => handleKeyChange(index, value)}
          />
        ))}
      </section>
    </div>
  );
}