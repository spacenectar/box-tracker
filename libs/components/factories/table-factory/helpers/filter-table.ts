export const filterTable = (
  data: unknown[][],
  filterTerm: string,
  filterColumn: number
) => {
  return data.filter((row) => {
    // @ts-ignore - We genuinely don't know what the values could be
    const rowValue = row[filterColumn].toString();
    // Check if the row value includes the filter term
    return rowValue.toLowerCase().includes(filterTerm.toLowerCase());
  });
};
