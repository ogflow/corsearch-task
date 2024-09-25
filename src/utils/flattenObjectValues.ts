export default function flattenObjectValues(obj: Object): string {
  const values: string[] = [];

  const flatten = (currentObj: Record<string, any>) => {
    Object.values(currentObj).forEach((value) => {
      if (typeof value === 'object' && value != null) {
        flatten(value);
      } else if (typeof value === 'string') {
        values.push(value);
      }
    });
  };

  flatten(obj);
  return values.join(' ');
}
