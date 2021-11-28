import * as cdk from '@aws-cdk/core';
import { Bucket, BucketEncryption, EventType } from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam';
import { S3EventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as lambda from '@aws-cdk/aws-lambda';

export class BucketStack extends cdk.Stack {
  bucket: Bucket;

  constructor(scope: cdk.Construct, id: string, props?: any) {
    super(scope, id, props);

    //declare vars
    const { bucketName, arns, snowflake, lambdaARN } = props;
    
    // Creating s3 bucket 
    this.bucket = new Bucket(this, 'bucket' , {
      encryption: BucketEncryption.S3_MANAGED,
      versioned: true,
      bucketName: bucketName
    })

    for (let i= 0; i<arns.length; i++) {
      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          resources: [
            this.bucket.bucketArn
          ],
          actions: ["s3:ListBucket"],
          principals: [new iam.ArnPrincipal(arns[i])]
        })
      );

      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          resources: [
            this.bucket.bucketArn,
            this.bucket.arnForObjects("get_items/*")
          ],
          actions: ["s3:GetObject"],
          principals: [new iam.ArnPrincipal(arns[i])]
        })
      );

      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          resources: [
            this.bucket.bucketArn,
            this.bucket.arnForObjects("put_items/*")
          ],
          actions: ["s3:PutObject"],
          principals: [new iam.ArnPrincipal(arns[i])]
        })
      );
      }

      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          resources: [
            this.bucket.bucketArn,
            this.bucket.arnForObjects("get_items/*")
          ],
          actions: ["s3:ListBucket"],
          principals: [new iam.ArnPrincipal(snowflake)]
        })
      );

      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          resources: [
            this.bucket.bucketArn,
            this.bucket.arnForObjects("get_items/*")
          ],
          actions: ["s3:PutObject"],
          principals: [new iam.ArnPrincipal(snowflake)]
        })
      );

      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          resources: [
            this.bucket.bucketArn,
            this.bucket.arnForObjects("put_items/*")
          ],
          actions: ["s3:GetObject"],
          principals: [new iam.ArnPrincipal(snowflake)]
        })
      );
            
      const importedLambdaFromArn = lambda.Function.fromFunctionArn(
        this,
        'clientLambda',
        lambdaARN
      );

      importedLambdaFromArn.addEventSource(new S3EventSource(this.bucket, {
        events: [ EventType.OBJECT_CREATED],
        filters: [ { prefix: 'get_items/' } ],
      }));
      }
    }


//best way to set up a 30 day delete policy (TTL)
