#!/usr/bin/env node
import { App, Fn } from 'aws-cdk-lib';
import 'source-map-support/register';
import { CognitoStack } from '../lib/cognito-stack';
import { DynamoStack } from '../lib/dynamo-stack';

const app = new App();

const dynamoStack = new DynamoStack(app, 'sweep-dynamo-stack');
const cognitoStack = new CognitoStack(
    app,
    'sweep-cognito-stack',
    Fn.importValue('UsersTableArn'),
);
cognitoStack.postConfirmationHandler.node.addDependency(dynamoStack.usersTable);

app.synth();
