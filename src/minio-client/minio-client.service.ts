/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
// import { Stream } from 'stream';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket: string;
  private readonly minioEndpoint: string;
  private readonly minioPort: string;

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('MinioStorageService');
    this.baseBucket = this.configService.get('MINIO_BUCKET', { infer: true });
    this.minioEndpoint = this.configService.get('MINIO_ENDPOINT', {
      infer: true,
    });
    this.minioPort = this.configService.get('MINIO_PORT', {
      infer: true,
    });
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png')) || file.mimetype.includes('jpg')) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    if (!(await this.client.bucketExists(this.baseBucket))) {

      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: '*' },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.baseBucket}/*`],
          },
        ],
      };
      const policyString = JSON.stringify(policy);
      await this.client.makeBucket(this.baseBucket);
      this.client.setBucketPolicy(this.baseBucket, policyString)
    }

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(
      baseBucket,
      fileName,
      fileBuffer,
      //@ts-ignore
      metaData,
      function (err) {
        if (err) {
          console.log(err);
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    return {
      url: `http://${this.minioEndpoint}:${this.minioPort}/${this.baseBucket}/${filename}`,
    };
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err) {
      if (err)
        throw new HttpException(
          'Oops Something wrong happend',
          HttpStatus.BAD_REQUEST,
        );
    });
  }
}
