export const REQUIRED = (friendlyName: string) =>
    `${friendlyName} is required.`;

export const MIN_LENGTH = (friendlyName: string, min: number) =>
    `${friendlyName} must be at least ${min} characters.`;

export const MAX_LENGTH = (friendlyName: string, max: number) =>
    `${friendlyName} must be at most ${max} characters.`;

export const TYPE = (friendlyName: string, expectedType: string) =>
    `Expected ${expectedType} for ${friendlyName.toLowerCase()}.`;

export const ONE_OF = (friendlyNames: string[]) =>
    `Must specify one of: ${friendlyNames.join(', ')}.`;

export const NOT_FOUND = (friendlyName: string, searchKey: string) =>
    `No ${friendlyName.toLowerCase()} found with the given ${searchKey}.`;

export const UNKNOWN = () => `An unknown error occurred.`;
