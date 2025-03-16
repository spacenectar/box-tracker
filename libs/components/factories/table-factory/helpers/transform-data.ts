export const transformData = (data: unknown[]) => {
  const rows = data.map((row) => {
    // Give each row a unique ID
    const rowId = Math.random().toString(36).substring(7);
    // @ts-ignore - We genuinely don't know what the values could be
    const rowValues = Object.values(row);
    return [`id-${rowId}`, ...rowValues];
  });
  // @ts-ignore - We genuinely don't know what the values could be
  const columns = ['row-id', ...Object.keys(data[0])];
  return { rows, columns };
};
