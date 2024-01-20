#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { IdentityStack } from '../lib/identity-stack';
import { DynamoStack } from '../lib/dynamo-stack';

const app = new App();

new IdentityStack(app, 'sweep-identity-stack');
new DynamoStack(app, 'sweep-dynamo-stack');

app.synth();
