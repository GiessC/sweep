export const REQUIRED = (friendlyName: string) =>
    `${friendlyName} is required.`;
export const LENGTH = (friendlyName: string, min: number, max: number) =>
    `${friendlyName} must be between ${min} and ${max} characters.`;
export const TYPE = (friendlyName: string, expectedType: string) =>
    `Expected ${expectedType} for ${friendlyName}.`;
export const ONE_OF = (friendlyNames: string[]) =>
    `Must specify one of: ${friendlyNames.join(', ')}.`;
