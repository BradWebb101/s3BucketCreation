import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Arn, LegacyStackSynthesizer } from '@aws-cdk/core';

export class BucketPolicyStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: any) {
    super(scope, id, props);

    const { arns } = props.arn;
    const { bucket } = props.bucket;
    const { snowflake } = props.snowflake

    for (let i= 0; i<arns.length; i++) {
    //`addToResourcePolicy` creates a Bucket Policy automatically
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [arns[i]],
        actions: ['s3:ListBucket'],
        resources: [bucket],
      }),
    );

    //access the bucket policy
    bucket.policy?.document.addStatements(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [arns[i]],
        actions: ['s3:GetObject'],
        resources: [`${bucket}/get_items`],
      }),
    );

     //access the bucket policy
     bucket.policy?.document.addStatements(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          principals: [arns[i]],
          actions: ['s3:PutObject'],
          resources: [`${bucket}/put_items`],
        }),
      );
  };

  bucket.policy?.document.addStatements(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [snowflake],
      actions: ['s3:ListBucket'],
      resources: [`${bucket}`],
    })),

    bucket.policy?.document.addStatements(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          principals: [snowflake],
          actions: ['s3:GetOject', 's3:DeleteObject'],
          resources: [`${bucket}/put_items`],
        })),

    bucket.policy?.document.addStatements(
        new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            principals: [snowflake],
            actions: ['s3:PutOject', 's3:DeleteObject'],
            resources: [`${bucket}/get_items`],
        }))
  };
}
