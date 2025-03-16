import { convertNumbersToWords } from './convert-numbers-to-words';
import { normalizeCase } from './normalise-case';
import { convertSymbolsToWords } from './convert-symbols-to-words';

export const changeCase = (input: string, type: string) => {
  const str = input;

  const firstPass = convertSymbolsToWords(str);
  const secondPass = convertNumbersToWords(firstPass);
  const normalisedStr = normalizeCase(secondPass);

  const wordArray = normalisedStr.split(' ');

  switch (type) {
    case 'snake':
      return wordArray.join('_').toLowerCase();
    case 'kebab':
      return wordArray.join('-').toLowerCase();
    case 'pascal':
      return wordArray
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
    case 'camel':
      return wordArray
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toLowerCase() + word.slice(1);
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
    case 'sentence':
    default:
      return wordArray
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word.charAt(0).toLowerCase() + word.slice(1);
        })
        .join(' ');
  }
};

export default changeCase;
