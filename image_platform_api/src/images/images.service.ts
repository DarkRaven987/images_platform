import { Injectable, Logger } from '@nestjs/common';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import ImagesRepository from './images.repository';
import { uploadImageDto } from './dtos/images.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  getImagesByUserId(userId: string) {
    return this.imagesRepository.getByUserId(userId);
  }

  getImageById(imageId: string) {
    return this.imagesRepository.getById(imageId);
  }

  async uploadImage({ file, userId }: uploadImageDto) {
    const originalFile = sharp(file.buffer);
    const metadata = await originalFile.metadata();

    const resized50 = await originalFile
      .resize(Math.round(metadata.width / 2), Math.round(metadata.height / 2))
      .toBuffer();
    const resized25 = await originalFile
      .resize(Math.round(metadata.width / 4), Math.round(metadata.height / 4))
      .toBuffer();

    const newImageId = uuid();

    const fullSize = await this.imagesRepository.saveFileToBucket({
      name: `${newImageId}-100-${file.originalname}`,
      file: file.buffer,
    });
    const halfSize = await this.imagesRepository.saveFileToBucket({
      name: `${newImageId}-50-${file.originalname}`,
      file: resized50,
    });
    const quarterSize = await this.imagesRepository.saveFileToBucket({
      name: `${newImageId}-25-${file.originalname}`,
      file: resized25,
    });

    await this.imagesRepository.create({
      image_100: fullSize?.Location,
      image_100_key: fullSize?.Key,
      image_50: halfSize?.Location,
      image_50_key: halfSize?.Key,
      image_25: quarterSize?.Location,
      image_25_key: quarterSize?.Key,
      userId,
    });

    return { message: 'Ok' };
  }

  deleteImageById(imageId: string) {
    return this.imagesRepository.delete(imageId);
  }
}
