export class uploadImageDto {
  original_url: string;
  original_key: string;
  resized_50_url: string;
  resized_50_key: string;
  resized_25_url: string;
  resized_25_key: string;
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
