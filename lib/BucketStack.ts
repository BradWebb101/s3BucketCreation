import * as cdk from '@aws-cdk/core';
import { Bucket, BucketEncryption, BucketPolicy } from '@aws-cdk/aws-s3'

export class BucketStack extends cdk.Stack {
  bucket: Bucket;

  constructor(scope: cdk.Construct, id: string, props?: any) {
    super(scope, id, props);

    const { name } = props.name;
    
    this.bucket = new Bucket(this, name , {
      encryption: BucketEncryption.S3_MANAGED
    })

  }
}

