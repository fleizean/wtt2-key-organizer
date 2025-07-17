export interface KeyData {
  key: string;
  wiki: number;
}

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
  key: string;
  message: string;
}

export function validateKey(inputText: string): ValidationResult {
  if (inputText === '') {
    return {
      isValid: false,
      error: null,
      key: '',
      message: 'Awaiting input.'
    };
  }

  // 12 haneli hex key arama
  const re = /(?:\s|^)([\da-f]{12})(?![\w\d])/g;
  const results = inputText.match(re);

  if (results === null) {
    // 9-11 haneli eksik key arama
    const re2 = /(?:\s|^)([\da-f]{9,11})(?![\w\d])/g;
    const results2 = inputText.match(re2);
    
    if (results2 === null) {
      return {
        isValid: false,
        error: 'danger',
        key: '',
        message: 'No keys found in text.'
      };
    } else if (results2.length === 1) {
      const len = 12 - results2[0].trim().length;
      return {
        isValid: false,
        error: 'danger',
        key: '',
        message: `Missing ${len} character(s) in Key.`
      };
    } else {
      const sortedResults = results2.sort((a, b) => b.trim().length - a.trim().length);
      const len = 12 - sortedResults[0].trim().length;
      return {
        isValid: false,
        error: 'danger',
        key: '',
        message: `Missing at least ${len} character(s) in Key.`
      };
    }
  } else if (results.length === 1) {
    const key = results[0].trim();
    return {
      isValid: true,
      error: null,
      key: key,
      message: key
    };
  } else {
    return {
      isValid: false,
      error: 'danger',
      key: '',
      message: 'More than 1 key found in text.'
    };
  }
}

export function countWikiKeys(keys: KeyData[]): { [key: string]: number } {
  const counts: { [key: string]: number } = { '1': 0, '2': 0, '3': 0 };
  
  keys.forEach(keyData => {
    if (keyData.wiki > 0) {
      counts[keyData.wiki.toString()] = (counts[keyData.wiki.toString()] || 0) + 1;
    }
  });
  
  return counts;
}

export function generateFullKey(keys: KeyData[]): string {
  if (keys.every(k => k.key.length === 12 && k.wiki > 0)) {
    return keys.map(k => k.key).join('');
  }
  return '';
}