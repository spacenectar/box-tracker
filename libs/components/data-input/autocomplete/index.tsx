import React, { useState, useEffect } from 'react';
import { changeCase } from '@helpers';

// REFACTOR: This component was written in a rush and needs to be refactored and properly documented

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import components */
import { Text } from '../../data-input/text';

/* Prop Types */
import { InputValue } from '@typeDefs/input-value';

/* Import helpers */
import fakeEvent from '@helpers/fake-event';

/** Import custom types */
import InputComponent from '@typeDefs/input-component';

interface Props extends InputComponent {
  /**
   * A list of options to pass to the autocomplete
   */
  options: string[];
}

/**
 * The `Autocomplete` component is a wrapper around the input-text component that provides autocomplete functionality.
 */
export const Autocomplete: React.FC<Props> = ({
  options,
  className,
  onChange,
  status,
  value = '',
  name,
  id,
  ...props
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const updateSelections = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.length) {
      setSelectedOption('');
      setSuggestions([]);
      return handleSelect('');
    }
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSelectedOption(value);
    if (!filteredOptions.length) {
      return handleSelect(value);
    }
    return setSuggestions(filteredOptions);
  };

  const handleSelect = (suggestion: InputValue) => {
    const cleanSuggestion = suggestion?.toString().trim();
    setSelectedOption(suggestion || '');
    setSuggestions([]);
    onChange && onChange(fakeEvent(cleanSuggestion));
  };

  const navigateSuggestions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (!['ArrowDown', 'ArrowUp', 'Tab'].includes(key)) return;
    if (!suggestions.length) return;
    const index = suggestions.indexOf(selectedOption.toString());
    if (key === 'ArrowDown' || (!e.shiftKey && key === 'Tab')) {
      e.preventDefault();
      if (index === suggestions.length - 1) {
        return setSelectedOption(suggestions[0]);
      }
      return setSelectedOption(suggestions[index + 1]);
    }
    if (key === 'ArrowUp' || (e.shiftKey && key === 'Tab')) {
      e.preventDefault();
      if (index === 0) {
        return setSelectedOption(suggestions[suggestions.length - 1]);
      }
      return setSelectedOption(suggestions[index - 1]);
    }
  };

  const handleEnterKey = () => {
    if (!suggestions || (suggestions.length === 0 && selectedOption)) {
      return onChange && onChange(fakeEvent(selectedOption));
    }
    return handleSelect(selectedOption);
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div className={[styles['input-autocomplete'], className || ''].filter(Boolean).join(' ')}>
      <Text
        id={id || changeCase(name, 'kebab')}
        data-testid={id || changeCase(name, 'kebab')}
        name={name}
        // Disable browsers own autocomplete
        autoComplete="off"
        status={status}
        value={selectedOption}
        onChange={updateSelections}
        onKeyDown={(e) => {
          e.key === 'Enter' && handleEnterKey();
          e.key === 'Space' && handleSelect(selectedOption);
          e.key === 'Escape' && setSuggestions([]);
          navigateSuggestions(e);
        }}
        {...props}
      />
      {suggestions.length > 0 && (
        <ul className={styles['suggestions']}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className={[
                styles['suggestion'],
                selectedOption === suggestion ? styles['selected'] : ''
              ].filter(Boolean).join(' ')}
              onClick={() => handleSelect(suggestion)}
              onMouseOver={() => setSelectedOption(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
Autocomplete.displayName = 'Autocomplete';
export default Autocomplete;
