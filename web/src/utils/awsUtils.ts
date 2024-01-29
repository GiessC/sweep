export const isAWSError = (
    error: unknown,
    expectedErrorName: string,
): boolean => {
    return error instanceof Error && error.name === expectedErrorName;
};
