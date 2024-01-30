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
import type { TableV2 } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path = require('path');

export class CognitoStack extends Stack {
    readonly postConfirmationHandler: NodejsFunction;

    constructor(
        scope: Construct,
        id: string,
        usersTable: TableV2,
        props?: StackProps,
    ) {
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
            userVerification: {
                emailSubject:
                    'Verify your email for your brand new Sweep account!',
                emailBody:
                    'The verification code for your Sweep account is {####}',
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

        this.postConfirmationHandler = new NodejsFunction(
            this,
            'post-confirmation-trigger-fn',
            {
                entry: path.resolve(
                    __dirname,
                    'lambda/PostConfirmationTriggerCognito.ts',
                ),
                handler: 'handler',
                runtime: Runtime.NODEJS_LATEST,
            },
        );
        usersTable.grantReadWriteData(this.postConfirmationHandler);
        userPool.addTrigger(
            UserPoolOperation.POST_CONFIRMATION,
            this.postConfirmationHandler,
        );
    }
}
