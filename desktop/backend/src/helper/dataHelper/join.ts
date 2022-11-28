/**
 * DataJoint function for joining objects
 * @param object object1
 * @param newData object2
 * @returns joined object
 */
export function DataJoint(object: any, newData: any): any {
  return { ...object, ...newData };
}
