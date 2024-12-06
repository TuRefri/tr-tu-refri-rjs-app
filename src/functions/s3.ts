import { uploadData } from 'aws-amplify/storage';

export const uploadImage = (file: File, path : string) =>{
    try {
        const result = uploadData({
          path: ({identityId}) => `protected/${identityId}/${path}/${file.name}`,
          // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
          data: file,
          options: {
            onProgress: ({ transferredBytes, totalBytes }) => {
              if (totalBytes) {
                console.log(
                  `Upload progress ${
                    Math.round((transferredBytes / totalBytes) * 100)
                  } %`
                );
              }
            }
          }
        }).result;
        console.log('Path from Response: ', result);
      } catch (error) {
        console.log('Error : ', error);
      }
}