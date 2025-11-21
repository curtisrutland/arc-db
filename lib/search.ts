// Helper function to get nested property values
export function getNestedValue(obj: any, path: string): any {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value === null || value === undefined) return null;
    value = value[key];
  }

  return value;
}

// Generic search filter function
export function filterItems<T>(
  items: T[],
  searchTerm: string,
  searchKeys: (keyof T | string)[]
): T[] {
  if (!searchTerm.trim()) {
    return items;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  return items.filter((item) => {
    return searchKeys.some((key) => {
      const value = getNestedValue(item, key as string);
      if (value === null || value === undefined) return false;

      // Handle different value types
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearchTerm);
      }
      if (typeof value === "number") {
        return value.toString().includes(lowerSearchTerm);
      }
      if (Array.isArray(value)) {
        return value.some((v) =>
          String(v).toLowerCase().includes(lowerSearchTerm)
        );
      }
      // Handle objects with 'en' property (LocalizedString)
      if (typeof value === "object" && value !== null && "en" in value) {
        return String(value.en).toLowerCase().includes(lowerSearchTerm);
      }

      return false;
    });
  });
}
