import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { hashData } from 'src/utils';
import { ConfigService } from '@nestjs/config';

AWS.config.update({ region: 'eu-central-1' });

@Injectable()
class UsersRepository {
  constructor(private configService: ConfigService) {
    this.tableName = this.configService.get('DYNAMO_TABLE');
    this.db = new AWS.DynamoDB.DocumentClient();
  }

  private tableName: string;
  private db: DocumentClient;

  private userPrefix = 'USR#';

  async create({ username, password }: CreateUserDto) {
    try {
      const newUserId = uuid();
      const userItem = {
        PK: `${this.userPrefix}${newUserId}`,
        SK: `${this.userPrefix}${newUserId}`,
        username,
        password: hashData(password),
      };

      const result = await this.db
        .put({
          TableName: this.tableName,
          Item: userItem,
        })
        .promise();

      return { status: 'Ok', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db
        .get({
          TableName: this.tableName,
          Key: { PK: id, SK: id },
        })
        .promise();
      return result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getByUsername(username: string) {
    try {
      const result = await this.db
        .scan({
          TableName: this.tableName,
          FilterExpression: 'username = :username',
          ExpressionAttributeValues: {
            ':username': username,
          },
        })
        .promise();

      return result.Items[0];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ id, username, password }: UpdateUserDto) {
    try {
      if (!username && !password) {
        return { message: 'Nothing to update' };
      }

      let updateExpression = 'set ';
      const expressionAttributeValues: any = {};

      if (username) {
        updateExpression += `username = :username`;
        expressionAttributeValues[':username'] = username;
      }

      if (password) {
        updateExpression += username
          ? `, password = :password`
          : `password = :password`;
        expressionAttributeValues[':password'] = password;
      }

      const result = await this.db
        .update({
          TableName: this.tableName,
          Key: { PK: id, SK: id },
          UpdateExpression: updateExpression,
          ExpressionAttributeValues: expressionAttributeValues,
        })
        .promise();

      return { data: result };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

export default UsersRepository;
