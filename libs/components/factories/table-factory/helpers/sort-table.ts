export const sortTable = (
  data: unknown[][],
  sortColumn: number,
  sortDirection: string
) => {
  // Sort the rows
  return data.sort((a, b) => {
    const rowA = a[sortColumn];
    const rowB = b[sortColumn];
    // @ts-ignore - We genuinely don't know what the values could be
    if (rowA < rowB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    // @ts-ignore - We genuinely don't know what the values could be
    if (rowA > rowB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
