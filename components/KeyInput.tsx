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
  }, [inputText, radioButton, onChange]);

  const getErrorStyle = () => {
    if (validation.error === null) return '';
    return validation.error === 'danger' ? 'border-red-500 focus:border-red-500' : 'border-green-500 focus:border-green-500';
  };

  const getMessageStyle = () => {
    if (validation.error === null) return 'text-gray-500';
    return validation.error === 'danger' ? 'text-red-500' : 'text-green-500';
  };

  const getDisplayMessage = () => {
    if (validation.isValid && validation.key) {
      return validation.key;
    }
    return validation.message;
  };

  return (
    <div className="mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-20 pt-2">
          <label className="block text-sm font-medium text-gray-700">
            Key {keynum}
          </label>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Key ${keynum}`}
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-white placeholder-gray-400 ${getErrorStyle()}`}
            />
            
            <div className="flex space-x-1">
              {[1, 2, 3].map((num) => (
                <label key={num} className="flex items-center">
                  <input
                    type="radio"
                    name={`radio-${keynum}`}
                    value={num.toString()}
                    checked={radioButton === num.toString()}
                    onChange={(e) => setRadioButton(e.target.value)}
                    className="sr-only"
                  />
                  <span className={`px-3 py-1 border rounded cursor-pointer transition-colors ${
                    radioButton === num.toString() 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}>
                    {num}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div className={`mt-1 text-sm ${getMessageStyle()}`}>
            {getDisplayMessage()}
          </div>
        </div>
      </div>
    </div>
  );
}