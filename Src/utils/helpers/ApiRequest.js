import axios from 'axios';
import constants from './constant';
import constant from './constant';

export async function getApi(url, header) {
  console.log(`${constants.BASE_URL}${url}`);
  return await axios.get(`${constants.BASE_URL}${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      'Authorization': 'Bearer' + ' ' + header.authorization,
    },
    timeout: 1000000
  });
}

export async function getApiWithParam(url, param, header) {
  console.log(`fdfsdsd ${constants.BASE_URL}${url}${param}`);
  return await axios({
    method: 'GET',
    baseURL: constants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
    },
    timeout: 1000000
  });
}

export async function postApi(url, payload, header) {
  console.log(`${constants.BASE_URL}${url}`);
  return await axios.post(`${constants.BASE_URL}${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      Authorization: 'Bearer ' + header.authorization,
    },
    timeout: 1000000
  });
}

export async function postApiAad(url, payload, header) {
  console.log(`${constants.AADHAR_SAND_BOX}${url}`);
  return await axios.post(`${constants.AADHAR_SAND_BOX}${url}`, payload, {
    headers: {
      client_id: header.client_id,
      client_secret: header.client_secret, 
      module_secret: header.module_secret, 
      'Content-Type': header.contenttype,
    },
    timeout: 1000000
  });
}

export async function deleteApi(url, header) {
  console.log(`${constants.BASE_URL}${url}`);

  return await axios.delete(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      'x-access-token': `${header.authorization}`,
    },
    timeout: 1000000
  });
}
//Brand/ProfileImg
export async function imageSign(image, id,token) {
  console.log('------------>>>>>>>>>>>>>-----------', image);
  try {
   var imageObj =
      'id=' +
      id +
      '&' +
      'folderName=' +
      'ContentHub' +
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
export async function imageSignChat(image, id,token) {
  console.log('------------>>>>>>>>>>>>>-----------', image);
  try {
   var imageObj =
      'folderName=' +
      'Brand/ProfileImg' +
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


async function VideoUpload(item) {
  var image = '';
  try {
    await imageSignFile(item, chatId, AuthReducer?.token).then(res => {
      image = res?.data?.result;
      // console.log('164', res?.data?.result);
    });
    return image;
  } catch (error) {}
}