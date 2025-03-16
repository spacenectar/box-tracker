/**
 * Takes a value from a form event and searches the specified node of your data and sets the specified state to the new value
 * @param event the form event that is being captured for the filtering
 * @param node the node within the objects that you are filtering on (e.g. 'name' would look for s['name'])
 * @param data the data array we are looking in
 * @returns An array of data with only the filtered items
 */
const filterItemsByInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  node: string,
  data: unknown[]
): unknown[] => {
  const target = event.target as HTMLInputElement;
  const regex = new RegExp(target.value, 'gi');
  // Similarly, any needs to be used here too as we don't know what the user is filtering
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.filter((s: any) => s[node].match(regex));
};

export default filterItemsByInput;
