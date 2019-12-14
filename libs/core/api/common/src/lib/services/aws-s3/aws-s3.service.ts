/// <reference types="aws-sdk" />

import { Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';
import * as mime from 'mime-types';
import { ConfigService } from '../config.service';
import { UtilsService } from '../utils.service';
import { FileUpload } from '../../interfaces/file-upload.interface';

@Injectable()
export class AwsS3Service {
  private readonly _s3: S3;

  constructor(
    public configService: ConfigService
  ) {
    const options: S3.Types.ClientConfiguration = {
      apiVersion: '2012-10-17',
      region: 'us-east-2'
    }
    const awsS3Config = configService.awsS3Config;
    if (awsS3Config.accessKeyId && awsS3Config.secretAccessKey) {
      options.credentials = awsS3Config;
    }

    this._s3 = new S3(options)
  }
  async uploadImage(file: FileUpload) {
    const fileName = UtilsService.fileName(<string>(
      mime.extension(file.mimetype)
    ));
    const key = 'images/' + fileName;
    await this._s3
      .putObject({
        Bucket: this.configService.awsS3Config.bucketName,
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();

    return key;
  }
}
