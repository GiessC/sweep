import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import {
    AccountRecovery,
    AdvancedSecurityMode,
    Mfa,
    UserPool,
    UserPoolClient,
    UserPoolClientIdentityProvider,
    UserPoolOperation,
} from 'aws-cdk-lib/aws-cognito';
import { Code, Function, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { handler } from './triggers/PostConfirmationTriggerCognito/PostConfirmationTriggerCognito';
import path = require('path');

export class CognitoStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const userPool = new UserPool(this, 'sweep-user-pool', {
            userPoolName: 'sweep-user-pool',
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            advancedSecurityMode: AdvancedSecurityMode.OFF,
            customAttributes: {},
            deviceTracking: {
                challengeRequiredOnNewDevice: true,
                deviceOnlyRememberedOnUserPrompt: true,
            },
            mfa: Mfa.OPTIONAL,
            mfaSecondFactor: {
                otp: true,
                sms: false,
            },
            passwordPolicy: {
                minLength: 8,
                requireDigits: true,
                requireLowercase: true,
                requireSymbols: true,
                requireUppercase: true,
                tempPasswordValidity: Duration.days(7),
            },
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
                phone: false,
                username: true,
            },
            signInCaseSensitive: true,
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true,
                },
            },
            removalPolicy: RemovalPolicy.DESTROY,
        });

        const client = new UserPoolClient(this, 'sweep-user-pool-client', {
            userPool,
            accessTokenValidity: Duration.minutes(15),
            refreshTokenValidity: Duration.hours(12),
            idTokenValidity: Duration.minutes(15),
            authFlows: {
                userSrp: true,
            },
            userPoolClientName: 'sweep-user-pool-client',
            supportedIdentityProviders: [
                UserPoolClientIdentityProvider.COGNITO,
            ],
        });
        client.node.addDependency(userPool);

        userPool.addClient('sweep-user-pool-client');

        userPool.addTrigger(
            UserPoolOperation.POST_CONFIRMATION,
            new Function(this, 'sweep-post-confirmation-fn', {
                functionName: 'sweep-post-confirmation-fn',
                handler: 'index.handler',
                tracing: Tracing.ACTIVE,
                runtime: Runtime.NODEJS_LATEST,
                code: Code.fromAsset(
                    path.resolve(
                        __dirname,
                        './triggers/PostConfirmationTriggerCognito',
                    ),
                ),
            }),
        );
    }
}
