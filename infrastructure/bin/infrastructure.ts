#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { DynamoStack } from '../lib/dynamo-stack';
import { CognitoStack } from '../lib/cognito-stack';

const app = new App();

new CognitoStack(app, 'sweep-cognito-stack');
new DynamoStack(app, 'sweep-dynamo-stack');

app.synth();
