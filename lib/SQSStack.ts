import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';

export class SQSStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: any) {
    super(scope, id, props);

    //declare vars
    const { sqsQueName, snsTopicName } = props

    //create queue
    const queue = new sqs.Queue(this, sqsQueName);

    //create sns topic
    const topic = new sns.Topic(this, snsTopicName);

    //subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));

    //What does this do??
    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: topic.topicArn
    });
  }
}
