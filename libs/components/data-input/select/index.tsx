import React, { useState, useEffect } from 'react';
import { changeCase } from '@helpers';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from '@typeDefs/component-statuses';
import { InputOption } from '@typeDefs/input-option';
import { InputValue } from '@typeDefs/input-value';

/* Prop Types */
export interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  /**
   * The name of the input
   */
  name: string;
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
  /**
   * The options to render if value is not set, the label will be the value
   */
  options: InputOption[];
  /**
   * The selected value(s) of the input when the component loads
   */
  value?: InputValue;
}



/**
 * The input select component is used to select a single option from a list of options.
 * It is a drop-in replacement for the native select element.
 */
export const Select: React.FC<Props> = ({
  id,
  name,
  status,
  className,
  options,
  placeholder,
  multiple,
  value,
  onChange,
  ...props
}: Props) => {
  const [selectOptions, setSelectOptions] = useState<InputOption[]>(options);
  const [selectedValues, setSelectedValues] = useState<
    string | number | string[] | number[] | readonly string[] | undefined
  >(value);

  useEffect(() => {
    setSelectOptions(options);
  }, [options]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!multiple) {
      setSelectedValues(event.target.value);
      onChange?.(event);
    } else {
      const selected = Array.from(event.target.selectedOptions).map(
        (option) => option.value
      );

      setSelectedValues(selected);
      // Create a fake event object to pass to the onChange handler which uses
      // multiselect as the target and the values of the selected options
      // as the value.
      const fakeEventOptions = {
        name,
        value: selected,
        type: 'multiselect'
      };
      const fakeEvent = {
        target: fakeEventOptions,
        currentTarget: fakeEventOptions
      };
      onChange?.(fakeEvent as unknown as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <div
      className={[
        multiple
          ? styles['multi-select-container']
          : styles['input-select-container'],
        styles[`status-${status || 'default'}`]
      ].filter(Boolean).join(' ')}
    >
      <select
        name={name}
        id={id || changeCase(name, 'kebab')}
        data-testid={id || changeCase(name, 'kebab')}
        className={[
          styles['input-select'],
          styles[`status-${status || 'default'}`],
          className
        ].filter(Boolean).join(' ')}
        multiple={multiple}
        onChange={handleChange}
        // @ts-ignore - This is fine, the value prop can be an array if multiple is true
        defaultValue={selectedValues}
        {...props}
      >
        {placeholder && !multiple && <option value="">{placeholder}</option>}
        {selectOptions.map((option) => {
          const val = option.value || option.label;

          return (
            <option key={val} value={val}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
