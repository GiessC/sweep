const envConfig = {
    API: {
        URL: process.env.NEXT_PUBLIC_API_URL,
    },
    Cognito: {
        USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
        CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    },
};

export default envConfig;
