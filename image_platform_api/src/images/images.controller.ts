import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { ImagesService } from './images.service';

@UseGuards(AccessTokenGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('')
  async getImages(@Req() req) {
    return this.imagesService.getImagesByUserId(req.user.id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Req() req, @UploadedFile() file) {
    return this.imagesService.uploadImage({ file, userId: req.user.id });
  }

  @Delete(':id')
  async deleteImageById(@Param('id') id: string, @Req() req) {
    return this.imagesService.deleteImageById(req.user.id, id);
  }
}
