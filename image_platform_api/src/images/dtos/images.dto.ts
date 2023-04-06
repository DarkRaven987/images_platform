export class createImageDto {
  name: string;
  file: Buffer;
}

export class uploadImageDto {
  file: any;
  userId: string;
}

export class createFileInfoRowDto {
  image_100: string;
  image_100_key: string;
  image_50: string;
  image_50_key: string;
  image_25: string;
  image_25_key: string;
  userId: string;
}
