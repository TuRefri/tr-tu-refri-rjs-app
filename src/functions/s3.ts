import { uploadData } from 'aws-amplify/storage';

const resizeImage = (file: File, maxWidth: number, maxHeight: number, quality: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Mantener la proporción
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (maxHeight / width) * height;
            width = maxWidth;
          } else {
            width = (maxWidth / height) * width;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              reject(new Error("Blob generation failed"));
            }
          },
          file.type,
          quality // Nivel de calidad (0 a 1)
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (file: File, path: string) => {
  try {
    // Reducir la calidad de la imagen antes de subirla
    const resizedFile = await resizeImage(file, 800, 800, 0.3); // Máximo 800x800px, calidad 70%

    const result = await uploadData({
      path: () => path,
      data: resizedFile,
      options: {
        onProgress: ({ transferredBytes, totalBytes }) => {
          if (totalBytes) {
            console.log(
              `Upload progress ${
                Math.round((transferredBytes / totalBytes) * 100)
              } %`
            );
          }
        },
      },
    }).result;

    console.log("Path from Response: ", result);
  } catch (error) {
    console.log("Error: ", error);
  }
};
