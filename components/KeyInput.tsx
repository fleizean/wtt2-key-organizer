'use client';

import { useState, useEffect } from 'react';
import { KeyData, validateKey } from '../utils/keyValidator';

interface KeyInputProps {
  keynum: number;
  value: KeyData;
  onChange: (value: KeyData) => void;
}

export default function KeyInput({ keynum, value, onChange }: KeyInputProps) {
  const [inputText, setInputText] = useState('');
  const [radioButton, setRadioButton] = useState('');
  const [validation, setValidation] = useState({
    isValid: false,
    error: null as string | null,
    key: '',
    message: 'Awaiting input.'
  });

  useEffect(() => {
    const result = validateKey(inputText);
    setValidation(result);
    
    const newValue: KeyData = {
      key: result.key,
      wiki: Number(radioButton) || 0
    };
    
    onChange(newValue);
  }, [inputText, radioButton]);

  const getErrorStyle = () => {
    if (validation.error === null) return 'border-gray-300 focus:border-blue-500';
    return validation.error === 'danger' ? 'border-red-500 focus:border-red-600' : 'border-green-500 focus:border-green-600';
  };

  const getMessageStyle = () => {
    if (validation.error === null) return 'text-gray-500';
    return validation.error === 'danger' ? 'text-red-600' : 'text-green-600';
  };

  const getDisplayMessage = () => {
    if (validation.isValid && validation.key) {
      return validation.key;
    }
    return validation.message;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex items-center space-x-6">
        {/* Key label */}
        <div className="flex items-center space-x-3 min-w-[120px]">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
            {keynum}
          </div>
          <label className="text-gray-700 font-medium text-lg">
            Key {keynum}
          </label>
        </div>
        
        <div className="flex-1">
          {/* Input and radio buttons */}
          <div className="flex items-center space-x-4 mb-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter key ${keynum}...`}
              className={`flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-colors bg-white text-gray-900 placeholder-gray-500 ${getErrorStyle()}`}
            />
            
            {/* Radio buttons */}
            <div className="flex space-x-2">
              {[1, 2, 3].map((num) => (
                <label key={num} className="cursor-pointer">
                  <input
                    type="radio"
                    name={`radio-${keynum}`}
                    value={num.toString()}
                    checked={radioButton === num.toString()}
                    onChange={(e) => setRadioButton(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-10 rounded-lg flex items-center justify-center text-lg font-bold border-2 transition-colors ${
                    radioButton === num.toString() 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  }`}>
                    {num}
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Status message */}
          <div className={`text-sm font-medium ${getMessageStyle()}`}>
            {getDisplayMessage()}
          </div>
        </div>
      </div>
    </div>
  );
}