import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { createImageDto, createFileInfoRowDto } from './dtos/images.dto';
import { ConfigService } from '@nestjs/config';

AWS.config.update({ region: 'eu-central-1' });

@Injectable()
class ImagesRepository {
  constructor(private configService: ConfigService) {
    this.tableName = this.configService.get('DYNAMO_TABLE');
    this.db = new AWS.DynamoDB.DocumentClient();
  }

  private tableName: string;
  private db: DocumentClient;

  private imagePrefix = 'IMG#';
  private s3 = new AWS.S3();

  async saveFileToBucket({ name, file }: createImageDto) {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get('AWS_IMAGES_BUCKET_NAME'),
          Body: file,
          Key: `images/${name}`,
          ACL: 'public-read',
        })
        .promise();

      return uploadResult;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteFileFromBucket(key: string) {
    try {
      const deleteResult = await this.s3
        .deleteObject({
          Bucket: this.configService.get('AWS_IMAGES_BUCKET_NAME'),
          Key: `images/${key}`,
        })
        .promise();

      return deleteResult;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create({
    image_100,
    image_100_key,
    image_50,
    image_50_key,
    image_25,
    image_25_key,
    userId,
  }: createFileInfoRowDto) {
    try {
      const newImageId = uuid();
      const imageItem = {
        PK: `${this.imagePrefix}${newImageId}`,
        SK: userId,
        image_100,
        image_100_key,
        image_50,
        image_50_key,
        image_25,
        image_25_key,
      };

      const result = await this.db
        .put({
          TableName: this.tableName,
          Item: imageItem,
        })
        .promise();

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db
        .query({
          TableName: this.tableName,
          KeyConditionExpression: 'PK = :pk',
          ExpressionAttributeValues: {
            ':pk': id,
          },
        })
        .promise();

      return result.Items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getByUserId(userId: string) {
    try {
      Logger.log('this.tableName', this.tableName);
      const result = await this.db
        .scan({
          TableName: this.tableName,
          FilterExpression: 'SK = :sk',
          ExpressionAttributeValues: {
            ':sk': `${userId}`,
          },
        })
        .promise();
      return result.Items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(imageId: string) {
    try {
      const result = await this.db
        .delete({
          TableName: this.tableName,
          Key: {
            PK: imageId,
          },
        })
        .promise();

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

export default ImagesRepository;
