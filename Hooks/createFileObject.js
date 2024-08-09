import ReactNativeBlobUtil from 'react-native-blob-util';
import {BASE_BACKEND_URL} from '@env';
async function createFileObject({token, isAdmin, fileName}) {
  try {
    const response = await ReactNativeBlobUtil.fetch(
      'POST',
      `${BASE_BACKEND_URL}/message/createFileObj`,
      {
        'Content-Type': 'application/json',
        token_header: `Bearer ${token}`,
      },
      JSON.stringify({filename: fileName}),
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}
export default createFileObject;
