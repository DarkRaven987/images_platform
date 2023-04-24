import { v4 as uuid } from 'uuid';
import ReactImageFileResizer from 'react-image-file-resizer';

import { handleUploadToS3 } from '../../../../utils/aws';
import {
  createFileWithName,
  extensionDictionary,
  renameFile,
} from '../../../../utils/helpers';

export const sendFilesToS3 = async (file, image) => {
  const img = new Image();
  img.src = image;

  const newImageId = uuid();
  const fileExtension = file.name.split('.').splice(-1, 1);

  const originalFile = renameFile(file, `${newImageId}-100-${file.name}`);

  const [resized50, resized25] = await Promise.all([
    new Promise((res) => {
      ReactImageFileResizer.imageFileResizer(
        file,
        Math.round(img.width * 0.5),
        Math.round(img.height / 2),
        extensionDictionary[fileExtension], // Output image type (JPEG, PNG, or WEBP)
        100,
        0,
        (blob) => {
          res(createFileWithName(blob, `${newImageId}-50-${file.name}`));
        },
        'blob',
      );
    }),
    new Promise((res) => {
      ReactImageFileResizer.imageFileResizer(
        file,
        Math.round(img.width * 0.25),
        Math.round(img.height * 0.25),
        extensionDictionary[fileExtension],
        100,
        0,
        (blob) => {
          res(createFileWithName(blob, `${newImageId}-25-${file.name}`));
        },
        'blob',
      );
    }),
  ]);

  const results = await Promise.all([
    handleUploadToS3(originalFile),
    handleUploadToS3(resized50),
    handleUploadToS3(resized25),
  ]);

  return results;
};
