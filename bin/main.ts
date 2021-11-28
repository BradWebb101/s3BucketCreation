#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BucketStack } from '../lib/BucketStack';
import { SQSStack } from '../lib/SQSStack'

const app = new cdk.App();

const GLOBALS = {
    bucketName: 'bradstestcdkbucket',
    arns:['ARN1'],
    snowflake:'ARN1',
    lambdaARN:'ARN1',
    sqsQueName:'SQSQueName',
    snsTopicName:'SNSTopicName'
};

const bucketStack = new BucketStack(app, 'BucketStack', {
    ...GLOBALS
}); 

const sqsstack = new SQSStack(app, 'SQSStack',{
    ...GLOBALS
});





