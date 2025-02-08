import axios from 'axios';
import constants from '../../../utils/helpers/constant';
import constant from '../../../utils/helpers/constant';
import {Alert, Platform} from 'react-native';

export async function getApi(url, header) {
  console.log(`${constants.CHAT}${url}`);
  return await axios.get(`${constants.CHAT}${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      Authorization: 'Bearer' + ' ' + header.authorization,
    },
    timeout: 1000000
  });
}

export async function postApi(url, payload, header) {
  console.log(header);
  return await axios.post(`${constants.CHAT}${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      Authorization: 'Bearer ' + ' ' + header.authorization,
    },
    timeout: 1000000
  });
}

const createFormData = file => {
  const data = new FormData();

  data.append('file', file);
  data.append('file_name', file.fileName);
  // data.append('file_type', file.type);

  // data.append("product[name]", 'test')

  console.log('jkfdgs', JSON.stringify(data));
  return data;
};

const createFormDataFile = file => {
  const data = new FormData();

  data.append('file', file);
  data.append('file_name', file.name);

  // data.append("product[name]", 'test')

  console.log('jkfdgs', JSON.stringify(data));
  return data;
};

export const uploadFile = async (header, parameter) => {
  console.log('47', parameter);
  try {
    const response = await postApi(
      '/chat/upload-files',
      createFormData(parameter),
      header,
    );

    return response;
  } catch (error) {
    console.log(error.response);
    // if (error.response.status == 503) {
    // versionUpdateAlert();
    // return error;
    // }

    let errorMsg = '';
    if (error.response.data.errors) {
      for (const key of Object.keys(error.response.data?.errors)) {
        console.log(key, error.response.data?.errors[key]);

        errorMsg = errorMsg + '\n' + error.response.data?.errors[key];
      }

      Alert.alert(errorMsg);
    } else if (error.response.data) {
      Alert.alert(error.response.data?.message);
    }

    return error;
  }
};
export const uploadPdf = async (header, parameter) => {
  console.log('47', parameter);
  try {
    const response = await postApi(
      'UploadToCloud',
      createFormDataFile(parameter),
      header,
    );

    return response;
  } catch (error) {
    console.log(error.response);
    if (error.response.status == 503) {
      // versionUpdateAlert();
      return error;
    }

    let errorMsg = '';
    if (error.response.data.errors) {
      for (const key of Object.keys(error.response.data?.errors)) {
        console.log(key, error.response.data?.errors[key]);

        errorMsg = errorMsg + '\n' + error.response.data?.errors[key];
      }

      Alert.alert(errorMsg);
    } else if (error.response.data) {
      Alert.alert(error.response.data?.message);
    }

    return error;
  }
};

export async function uploadToFileVideo(image, id, token) {
  console.log('------------>>>>>>>>>>>>>-----------', image);
  try {
    var formData=new FormData();
    formData.append('id', id);
    formData.append('folderName', 'Messages/');
    formData.append('image64', null);  // Assuming it's null for now, modify if necessary
    formData.append('imageName', image?.fileName || '');  // Provide fallback for optional chaining
    formData.append('contentType', image?.type || '');    // Provide fallback for optional chaining
    formData.append('bucketName', 'dev_celebfarm');
    formData.append('FormFile', {
      uri: image?.path,            // The local path of the image (for RN, you might need `uri`)
      type: image?.type,           // Mime type of the image
      name: image?.fileName        // Name of the file
    });
    console.log(formData);
    return axios.post(constant.BASE_URL + 'UploadToCloud', formData, {
      headers: {
        Authorization: 'Bearer ' + (await token),
        'Content-Type':'multipart/form-data'
      },
      timeout: 1000000
    });
    // console.log(res)
  } catch (e) {}
}

export async function uploadToVideo(image, id, token) {
  console.log('------------>>>>>>>>>>>>>-----------', image);
  try {
    var formData=new FormData();
    formData.append('id', id);
    formData.append('folderName', 'ContentHub/');
    formData.append('image64', null);  // Assuming it's null for now, modify if necessary
    formData.append('imageName', image?.fileName || '');  // Provide fallback for optional chaining
    formData.append('contentType', image?.type || '');    // Provide fallback for optional chaining
    formData.append('bucketName', 'dev_celebfarm');
    formData.append('FormFile', {
      uri: image?.path,            // The local path of the image (for RN, you might need `uri`)
      type: image?.type,           // Mime type of the image
      name: image?.fileName        // Name of the file
    });
    console.log(formData);
    return axios.post(constant.BASE_URL + 'UploadToCloud', formData, {
      headers: {
        Authorization: 'Bearer ' + (await token),
        'Content-Type':'multipart/form-data'
      },
      timeout: 1000000
    });
    // console.log(res)
  } catch (e) {}
}

export async function imageSignFile(image, id, token) {
  console.log('------------>>>>>>>>>>>>>-----------', image);
  try {
    var imageObj =
      'id=' +
      id +
      '&' +
      'folderName=' +
      `Messages` +
      '&' +
      'imageName=' +
      image +
      '&' +
      'bucketName=' +
      'dev_celebfarm';
    console.log(imageObj);
    return axios.get(constant.BASE_URL + 'SignInImageUrl?' + imageObj, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
      timeout: 1000000
    });
    // console.log(res)
  } catch (e) {}
}

export async function uploadToFile(image, id, token, sender) {
  console.log('------------>>>>>>>>>>>>>-----------', image);
  try {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('folderName', 'Messages/');
    formData.append('image64', null);
    formData.append('imageName', image.name);
    formData.append('contentType','.'+ image?.type.replace('image/', ''));
    formData.append('bucketName', 'dev_celebfarm');
    formData.append('FormFile', {
      uri: image?.path,            // The local path of the image (for RN, you might need `uri`)
      type: image?.type,           // Mime type of the image
      name: image?.name    
    });

    
    console.log(formData);
    return axios.post(constant.BASE_URL + 'UploadToCloud', formData, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
      timeout: 1000000
    });
    // console.log(res)
  } catch (e) {}
}

const getRespectiveName = media => {
  let uri = media.hasOwnProperty('path') ? media.path : media.uri;
  let newName = '';
  if (uri && uri.includes('content:')) {
    // That's mean content Provider name is here
    newName = media.fileName || media.name || '';
  } else {
    let indexOfLastSlash = uri.lastIndexOf('/');
    newName = uri.slice(indexOfLastSlash + 1, uri.length);
  }
  return newName;
};

export const getPreparedImageData = imageMedia => {
  let tempName = getRespectiveName(imageMedia);
  console.log('getPreparedImageData', imageMedia);
  let tempImage = {
    uri: imageMedia.path ? imageMedia.path : imageMedia.uri,
    // name: imageMedia.name,
    fileName: tempName || 'document.pdf',
    name: tempName || 'document.pdf',
    path: imageMedia.path || imageMedia.uri,
    type: imageMedia.mime || imageMedia.type,
    width: imageMedia.width,
    height: imageMedia.height,
    fileSize: imageMedia.size,
    data: imageMedia.data || imageMedia.data,
  };
  return tempImage;
};

export const showError = msg => {
  showMessage({
    message: msg,
    duration: 3000,
    type: 'danger',
  });
};
