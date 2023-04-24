import { Injectable } from '@nestjs/common';

import ImagesRepository from './images.repository';
import { uploadImageDto } from './dtos/images.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  getImagesByUserId(userId: string) {
    return this.imagesRepository.getByUserId(userId);
  }

  async uploadImage({
    original_url,
    original_key,
    resized_50_url,
    resized_50_key,
    resized_25_url,
    resized_25_key,
    userId,
  }: uploadImageDto) {
    await this.imagesRepository.create({
      image_100: original_url,
      image_100_key: original_key,
      image_50: resized_50_url,
      image_50_key: resized_50_key,
      image_25: resized_25_url,
      image_25_key: resized_25_key,
      userId,
    });

    return { message: 'Ok' };
  }

  deleteImageById(userId: string, imageId: string) {
    return this.imagesRepository.delete(userId, imageId);
  }
}
