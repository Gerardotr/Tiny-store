import sharp from 'sharp';

export const helperImg = (filePath: string, fileName: string, size = 300) => {
  return sharp(filePath).resize(size).toFile(`./src/optimize/${fileName}`);
};
