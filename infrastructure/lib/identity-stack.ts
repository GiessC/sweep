import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import {
    AccountRecovery,
    AdvancedSecurityMode,
    Mfa,
    UserPool,
    UserPoolOperation,
} from 'aws-cdk-lib/aws-cognito';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { handler } from './triggers/PostConfirmationTriggerCognito';

export class IdentityStack extends Stack {
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
                preferredUsername: true,
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
                preferredUsername: {
                    required: true,
                    mutable: true,
                },
            },
        });

        userPool.addTrigger(
            UserPoolOperation.POST_CONFIRMATION,
            new Function(this, 'postConfirmationFn', {
                runtime: Runtime.NODEJS_LATEST,
                handler: 'index.handler',
                code: Code.fromInline(handler.toString()),
            }),
        );
    }
}
