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
import { PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path = require('path');

export class CognitoStack extends Stack {
    private readonly userPool: UserPool;
    private readonly usersTableArn: string;
    postConfirmationHandler: NodejsFunction;

    constructor(
        scope: Construct,
        id: string,
        usersTableArn: string,
        props?: StackProps,
    ) {
        super(scope, id, props);
        this.usersTableArn = usersTableArn;

        this.userPool = this.setupUserPool();
        this.addUserPoolClient();

        this.addPostConfirmationTrigger(
            `${id}-post-confirmation-trigger-fn`.toLowerCase(),
        );
        this.addPreTokenGenerationTrigger(
            `${id}-pre-token-generation-trigger-fn`.toLowerCase(),
        );
    }

    private setupUserPool(): UserPool {
        return new UserPool(this, 'sweep-user-pool', {
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
    }

    private addUserPoolClient(): void {
        const client = new UserPoolClient(this, 'sweep-user-pool-client', {
            userPool: this.userPool,
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
        client.node.addDependency(this.userPool);
    }

    private addPostConfirmationTrigger(id: string): void {
        const lambdaRole = new Role(this, 'post-confirmation-lambda-role', {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });
        const dynamoPolicy = new PolicyStatement({
            actions: ['dynamodb:PutItem'],
            resources: [this.usersTableArn],
        });
        lambdaRole.addManagedPolicy({
            managedPolicyArn:
                'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        });
        lambdaRole.addToPolicy(dynamoPolicy);
        this.postConfirmationHandler = new NodejsFunction(this, id, {
            functionName: 'post-confirmation-trigger-fn',
            entry: path.resolve(
                __dirname,
                'lambda/PostConfirmationTriggerCognito.ts',
            ),
            handler: 'handler',
            runtime: Runtime.NODEJS_LATEST,
            role: lambdaRole,
        });

        this.userPool.addTrigger(
            UserPoolOperation.POST_CONFIRMATION,
            this.postConfirmationHandler,
        );
    }

    private addPreTokenGenerationTrigger(id: string): void {
        const lambdaRole = new Role(this, 'pre-token-generation-lambda-role', {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });
        const dynamoPolicy = new PolicyStatement({
            actions: ['dynamodb:GetItem'],
            resources: [this.usersTableArn],
        });
        lambdaRole.addManagedPolicy({
            managedPolicyArn:
                'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        });
        lambdaRole.addToPolicy(dynamoPolicy);
        const preTokenGenerationHandler = new NodejsFunction(this, id, {
            functionName: 'pre-token-generation-trigger-fn',
            entry: path.resolve(
                __dirname,
                'lambda/PreTokenGenerationTriggerCognito.ts',
            ),
            handler: 'handler',
            runtime: Runtime.NODEJS_LATEST,
            role: lambdaRole,
        });

        this.userPool.addTrigger(
            UserPoolOperation.PRE_TOKEN_GENERATION,
            preTokenGenerationHandler,
        );
    }
}
