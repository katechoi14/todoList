export const checkApiKey = (key ?: string | string[]): boolean =>  {
    return key === "my-secret-key";
};