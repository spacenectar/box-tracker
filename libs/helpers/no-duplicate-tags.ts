// Helper function to avoid duplicating providesTags declarations
const noDuplicateTags = <R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) => {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id } as const))
      ]
    : [{ type: tagType, id: 'LIST' }];
};

export default noDuplicateTags;
