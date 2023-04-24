import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { ImagesService } from './images.service';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import { UploadImageSchema } from './dtos/images.joi';

@UseGuards(AccessTokenGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('')
  async getImages(@Req() req) {
    return this.imagesService.getImagesByUserId(req.user.id);
  }

  @Post('upload')
  @UsePipes(new JoiValidationPipe(UploadImageSchema))
  async uploadImage(@Body() body, @Req() req) {
    return this.imagesService.uploadImage({ ...body, userId: req.user.id });
  }

  @Delete(':id')
  async deleteImageById(@Param('id') id: string, @Req() req) {
    return this.imagesService.deleteImageById(req.user.id, id);
  }
}
