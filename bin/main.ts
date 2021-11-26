#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BucketStack } from '../lib/BucketStack';
import { BucketPolicyStack } from '../lib/BucketPolicyStack'

const app = new cdk.App();

const GLOBALS = {
    bucket: 'exampleClient',
    arns:['arn:aws:iam::437467121379:group/developer'],
    snowflake:'arn:aws:iam::437467121379:group/developer1',
    lambda:'arn:aws:lambda:ap-southeast-2:437467121379:function:portfoliowebsite'
};

const bucketStack = new BucketStack(app, 'BucketStack', {
    ...GLOBALS
}); 

const bucketPolicy = new BucketPolicyStack(app, 'BucketPolicyStack',{
    ...GLOBALS
});


