#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkCfns3NotificationConfigurationStack } from '../lib/cdk-cfns3-notification_configuration-stack';

const app = new cdk.App();
new CdkCfns3NotificationConfigurationStack(app, 'CdkCfns3NotificationConfigurationStack');
