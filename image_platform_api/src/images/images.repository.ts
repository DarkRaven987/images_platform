import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { createFileInfoRowDto } from './dtos/images.dto';
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
        PK: userId,
        SK: `${this.imagePrefix}${newImageId}`,
        image_id: `${this.imagePrefix}${newImageId}`,
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

  async getByUserId(userId: string) {
    try {
      const result = await this.db
        .query({
          TableName: this.tableName,
          KeyConditionExpression: 'PK = :pk',
          FilterExpression: 'begins_with(image_id, :image_id)',
          ExpressionAttributeValues: {
            ':image_id': 'IMG#',
            ':pk': userId,
          },
        })
        .promise();
      return result.Items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(userId: string, imageId: string) {
    try {
      const result = await this.db
        .delete({
          TableName: this.tableName,
          Key: {
            PK: userId,
            SK: imageId,
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
