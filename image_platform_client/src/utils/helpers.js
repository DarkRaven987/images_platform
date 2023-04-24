export const extensionDictionary = {
  jpg: 'JPEG',
  jpeg: 'JPEG',
  png: 'PNG',
};

export const renameFile = (file, newName) => {
  const blob = new Blob([file], { type: file.type });
  return new File([blob], newName, { type: file.type });
};

export const createFileWithName = (blob, fileName) => {
  return new File([blob], fileName);
};
