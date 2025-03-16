import React from 'react';

export interface Props {
  /**
   * The node to filter the items against
   */
  node: string;
  /**
   * The input label (also used as a placeholder)
   */
  label: string;
  /**
   * The items to filter through (should be immutable)
   */
  items: unknown[];
  /**
   * The function to update the item data
   */
  itemUpdater: (arg0: unknown) => void;
}

/* Import helpers */
import filterItemsByInput from './helpers/filter-items-by-input';

import { InputFactory } from 'components/factories/input-factory';

/**
 * The 'Item Filter' component is an input which talkes to a parent state passed as a prop to filter items.
 */
export const ItemFilter: React.FC<Props> = ({
  node,
  label,
  items,
  itemUpdater
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventWithItems = filterItemsByInput(e, node, items);
    itemUpdater(eventWithItems);
  };
  return (
    <InputFactory
      type="autocomplete"
      name="filter-by-name"
      label={label}
      onChange={handleChange}
    />
  );
};

export default ItemFilter;
