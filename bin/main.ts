#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BucketStack } from '../lib/BucketStack';
import { BucketPolicyStack } from '../lib/BucketPolicyStack'

const app = new cdk.App();

const GLOBALS = {
    bucket: 'exampleClient',
    arns:['ARN1'],
    snowflake:'ARN1',
    lambda:'ARN1'
};

const bucketStack = new BucketStack(app, 'BucketStack', {
    ...GLOBALS
}); 

const bucketPolicy = new BucketPolicyStack(app, 'BucketPolicyStack',{
    ...GLOBALS
});


