#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import 'source-map-support/register';
import { CognitoStack } from '../lib/cognito-stack';
import { DynamoStack } from '../lib/dynamo-stack';

const app = new App();

const dynamoStack = new DynamoStack(app, 'sweep-dynamo-stack');
new CognitoStack(app, 'sweep-cognito-stack', dynamoStack.usersTable);

app.synth();
