import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkCfns3NotificationConfigurationStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here

        const handler = new lambda.Function(this, 'MyFunc', {
            code: lambda.Code.fromInline('boom'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
        });

        /*
        const s3Bucket = new s3.CfnBucket(this, "S3Bucket", {
          websiteConfiguration: {
            indexDocument: "index.html",
            errorDocument: "index.html",
          },
        });
        */
        
        
        const s3Bucket2 = new s3.CfnBucket(this, "S3Bucket2", {
            notificationConfiguration: { lambdaConfigurations: [{ event: 's3:ObjectCreated:*', function: handler.functionArn }] },
        });
        
        const lambdaPermission = new lambda.CfnPermission(this, "LambdaPermission", {
            action: 'lambda:InvokeFunction',
            principal: 's3.amazonaws.com',
            sourceArn: s3Bucket2.attrArn,
            functionName: handler.functionArn,
        });
        

        //const bucket1 = new s3.Bucket(this, 'MyFirstBucket');
        
        


    }
}
