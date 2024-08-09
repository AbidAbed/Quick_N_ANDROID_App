import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {BASE_BACKEND_URL} from '@env';

function useUpload({isAvatar}) {
  async function uploadFile({
    pathToFileToUpload,
    token,
    isAdmin,
    fileName,
    fileId,
    mimeType,
  }) {
    const tokenObject = isAdmin
      ? {admin_header: `admin ${token}`}
      : {token_header: `Bearer ${token}`};
    try {
      // UPLOAD THE FILE
      // console.log({
      //   pathToFileToUpload,
      //   token,
      //   isAdmin,
      //   fileName,
      //   fileId,
      //   mimeType,
      // });

      // console.log(mimeType);
      console.log(pathToFileToUpload);
      const response = await ReactNativeBlobUtil.fetch(
        'POST',
        `https://ee3d-41-45-192-105.ngrok-free.app/uploadAudio${
          isAvatar ? '/profilePic' : ''
        }`,
        {
          'Content-Type': 'multipart/form-data',
          // ...tokenObject,
        },
        [
          // {
          //   name: 'fileId',
          //   data: fileId,
          // },
          {
            name: 'file',
            filename: fileName,
            data: ReactNativeBlobUtil.wrap(
              Platform.OS === 'ios'
                ? pathToFileToUpload.replace('file://', '')
                : pathToFileToUpload,
            ),
            type: mimeType,
          },
        ],
      );

      console.log(response);
      // console.log(response, mimeType);
      return response;
    } catch (err) {
      console.log(err, pathToFileToUpload);
    }
  }

  async function createFileObject({token, isAdmin, fileName}) {
    try {
      const tokenObject = isAdmin
        ? {admin_header: `admin ${token}`}
        : {token_header: `Bearer ${token}`};

      const response = await ReactNativeBlobUtil.fetch(
        'POST',
        `${BASE_BACKEND_URL}/message/createFileObj`,
        {
          'Content-Type': 'application/json',
          ...tokenObject,
        },
        JSON.stringify({filename: fileName}),
      );

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  return [createFileObject, uploadFile];
}

export default useUpload;
