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

export const INVALID_EMAIL = () => 'Please specify a valid email';

export const TOO_MANY_REQUESTS = () =>
    'You are making too many requests. Slow down!';

export const CODE_MISMATCH = () =>
    'The code you entered does not match the code we sent you.';

export const EXPIRED_CODE = () => 'The code you entered has expired.';

export const NOT_CONFIRMED = () => 'User has not confirmed their email.';

export const UNKNOWN = () => `An unknown error occurred.`;
