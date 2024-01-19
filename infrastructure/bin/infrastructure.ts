#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { IdentityStack } from '../lib/identity-stack';

const app = new App();

new IdentityStack(app, 'sweep-identity-stack');

app.synth();
