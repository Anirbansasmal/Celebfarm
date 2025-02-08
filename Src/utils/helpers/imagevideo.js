// const { imageSignFile } = require("../../Screens/main/Message/ChatService");

async function chatImage(item) {
    var image = '';
    try {
      await videoSignFile(item, chatId, AuthReducer?.token).then(res => {
        image = res?.data?.result;
        // console.log('164', res?.data?.result);
      });
      return image;
    } catch (error) {}
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
      });
      // console.log(res)
    } catch (e) {}
  }
  