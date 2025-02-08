import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import moment from 'moment';
import connectionrequest from './NetInfo';
import {
  getInstagramDetailRequest,
  getYoutubeDetailRequest,
} from '../../redux/reducers/ProfileReducer';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert from './Toast';
import {async} from '../../Screens/main/Message/ChatService';
async function Youtube(id, dispatch) {
  try {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      }).then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn().then(userInfo => {
            console.log('userInfo detail', userInfo);
            GoogleSignin.clearCachedAccessToken();
            GoogleSignin.getTokens().then(accessToken => {
              console.log('accessToken', accessToken?.accessToken);
              console.log(userInfo.serverAuthCode);
              refreshToken(userInfo, id, dispatch, userInfo.serverAuthCode);
            });
          });
        }
      });
    } catch (error) {
      console.log('Access Token:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    // Use result.accessToken to make requests to YouTube Data API
  } catch (error) {
    console.error('Authentication Error:', error);
  }
}

async function refreshToken(userInfo, id, dispatch, serverAuthCode) {
  try {
    if (serverAuthCode) {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          code: serverAuthCode,
          client_id:
            '1080046167832-4v11nceg06604c7r4finghua7ptqi04k.apps.googleusercontent.com',
          client_secret: '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',
          grant_type: 'authorization_code',
        }).toString(),
      });
      const tokens = await response.json();
      setTimeout(() => {
        youtubeChanel(
          serverAuthCode,
          tokens,
          tokens?.access_token,
          id,
          dispatch,
        );
      }, 1000);
      console.log('Tokens from backend:', tokens); // Contains access_token and refresh_token
    }
  } catch (error) {}
}

async function getrefreshToken(id, data, result, dispatch, serverAuthCode) {
  try {
    console.log('79 =>>>>>', serverAuthCode);
    if (serverAuthCode) {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          client_id:
            '1080046167832-4v11nceg06604c7r4finghua7ptqi04k.apps.googleusercontent.com',
          client_secret: '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',
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(result)['refresh_token'],
        }).toString(),
      });

      const tokens = await response.json();
      console.log('tokens', tokens);
      setTimeout(() => {
        updateYoutubeDetails(
          tokens,
          tokens?.access_token,
          data,
          id,
          serverAuthCode,
          JSON.parse(result)['refresh_token'],
          dispatch,
        );
      }, 1000);
      console.log('Tokens from backend:', tokens); // Contains access_token and refresh_token
    }
  } catch (error) {}
}

async function youtubeChanel(code, userInfo, token, id, dispatch) {
  try {
    var obj =
      'access_token=' +
      token +
      '&' +
      'part=' +
      'snippet,statistics' +
      '&' +
      'mine=' +
      'true';
    console.log(obj);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    axios
      .get(`https://www.googleapis.com/youtube/v3/channels?${obj}`, {
        headers: header,
      })
      .then(res => {
        console.log(res.data);
        youtubReport(code, res.data, userInfo, token, id, dispatch);
      });
  } catch (error) {}
}

async function youtubReport(code, channel, userInfo, token, id, dispatch) {
  try {
    var obj =
      'access_token=' +
      token +
      '&part' +
      'snippet,statistics' +
      '&mine=' +
      'true' +
      '&ids=' +
      'channel==MINE' +
      '&metrics=' +
      'averageViewPercentage,estimatedMinutesWatched,annotationClickThroughRate' +
      '&startDate=' +
      '2000-01-01' +
      '&endDate=' +
      moment().add(2, 'days').format('YYYY-MM-DD');
    console.log('reports', obj);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    axios
      .get(`https://youtubeanalytics.googleapis.com/v2/reports?${obj}`, {
        header: header,
      })
      .then(res => {
        console.log(res.data);

        addYoutubeDetails(
          code,
          channel,
          userInfo,
          token,
          res.data,
          id,
          dispatch,
        );
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('No account found');
      });
  } catch (error) {
    console.log(error);
  }
}

async function addYoutubeDetails(
  code,
  channel,
  userInfo,
  token,
  report,
  id,
  dispatch,
) {
  try {
    console.log('---------------->>>>>>>>>>>>>>', channel);
    console.log('---------------->>>>>>>>>>>>>> avg', userInfo);
    console.log('---------------->>>>>>>>>>>>>>', report);
    let objtoken = {
      access_token: token,
      scope: userInfo?.scopes,
      token_type: 'Bearer',
      id_token: userInfo?.idToken,
      refresh_token: userInfo?.refresh_token,
      expires_in: userInfo?.expires_in,
      servicecode: code,
    };
    var obj = {
      ID: 0,
      Tokens: JSON.stringify(objtoken),
      Channel: channel?.items[0]['snippet']['customUrl'],
      Subscriber: channel?.items[0]['statistics']['subscriberCount'],
      Views: channel?.items[0]['statistics']['viewCount'],
      AvgView: channel?.items[0]['statistics']['subscriberCount'],
      AvgViewGain: report['rows'][0][0].toString(),
      AvgWatchTime: report['rows'][0][1].toString(),
      WatchTimeGain: report['rows'][0][1].toString(),
      ImpressionCTR: report['rows'][0][2].toString(),
      ImageURl: channel?.items[0]['snippet']['thumbnails']['default']['url'],
      CreatorID: id,
    };
    console.log('---------------->>>>>>>>>>>>>>', obj);
    connectionrequest()
      .then(res => {
        dispatch(getYoutubeDetailRequest(obj));
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {}
}

async function updateYoutubeDetails(
  userInfo,
  channel,
  data,
  id,
  servicecode,
  refresh_token,
  dispatch,
) {
  try {
    console.log('---------------->>>>>>>>>>>>>>', channel);
    console.log('---------------->>>>>>>>>>>>>> avg', userInfo);
    console.log('---------------->>>>>>>>>>>>>>', data);
    let objtoken = {
      access_token: channel,
      scope: userInfo?.scope,
      token_type: 'Bearer',
      id_token: userInfo?.id_token,
      refresh_token: refresh_token,
      expires_in: userInfo?.expires_in,
      servicecode: servicecode,
    };
    console.log('google token', objtoken);
    var obj = {
      Id: data?.id,
      Tokens: JSON.stringify(objtoken),
      Channel: data?.channel,
      Subscriber: data?.subscriber,
      Views: data?.views,
      AvgView: data?.avgView,
      AvgViewGain: data?.avgViewGain,
      AvgWatchTime: data?.avgViewGain,
      WatchTimeGain: data?.avgWatchTime,
      ImpressionCTR: data?.impressionCTR,
      ImageURl: data?.imageURl,
      CreatorID: id,
    };
    console.log('---------------->>>>>>>>>>>>>>', obj);
    connectionrequest()
      .then(res => {
        dispatch(getYoutubeDetailRequest(obj));
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {}
}

async function addInstaDetails(updInfo, fbdata, longtoken, id, dispatch) {
  try {
    console.log('---------------->>>>>>>>>>>>>>', longtoken);
    console.log('---------------->>>>>>>>>>>>>>', fbdata);
    console.log('---------------->>>>>>>>>>>>>>', id);
    var obj = {
      token: longtoken,
      creatorID: id,
      isNewUser: true,
      username: fbdata?.username,
      profileImg: fbdata?.['profile_picture_url'],
      IGID: fbdata?.id,
    };
    console.log('---------------->>>>>>>>>>>>>>', obj);
    connectionrequest()
      .then(res => {
        dispatch(getInstagramDetailRequest(obj));
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {}
}

async function addGetRefToken(id, infonew, data, dispatch) {
  try {
    var obj = data;
    console.log(data);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    axios
      .get(
        `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=1126124512266280&client_secret=f649bc3a9d4abc4d266a9f67f0088ae6&fb_exchange_token=${data}`,
        {
          headers: header,
        },
      )
      .then(res => {
        console.log('322', res.data);
        getInstaPageDetails(res?.data?.access_token, id, dispatch);
      });
  } catch (error) {}
}

async function getInstapageidDetails(pageres, longtoken, id, dispatch) {
  try {
    console.log(pageres);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    axios
      .get(
        `https://graph.facebook.com/v21.0/${pageres?.data?.[0]['id']}?fields=instagram_business_account&access_token=${pageres?.data[0]['access_token']}`,
        {
          headers: header,
        },
      )
      .then(res => {
        console.log('res', res.data);
        getInstaidDetails(res.data, pageres, id, longtoken, dispatch);
      });
  } catch (error) {}
}

async function getInstaPageDetails(data, id, dispatch) {
  try {
    var obj = data;
    console.log(data);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    axios
      .get(
        `https://graph.facebook.com/v21.0/me/accounts?access_token=${data}`,
        {
          headers: header,
        },
      )
      .then(res => {
        console.log('226', res.data);
        getInstapageidDetails(res?.data, data, id, dispatch);
      });
  } catch (error) {}
}

async function getInstaidDetails(infonew, pages, id, longtoken, dispatch) {
  try {
    console.log(pages?.data[0]?.['access_token']);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    console.log('239', infonew);
    if (infonew?.['instagram_business_account']) {
    } else {
    }
    axios
      .get(
        `https://graph.facebook.com/v21.0/${infonew?.['instagram_business_account']['id']}?fields=username,profile_picture_url&access_token=${pages?.data[0]?.['access_token']}`,
        {
          headers: header,
        },
      )
      .then(res => {
        console.log(res.data);
        addInstaDetails(infonew, res.data, longtoken, id, dispatch);
      });
  } catch (error) {}
}

async function getInstaDetails(id, longtoken) {
  try {
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    console.log('239', ``);
    return axios
      .get(
        `https://graph.facebook.com/v21.0/${id}?fields=username,profile_picture_url&access_token=${longtoken}`,
        {
          headers: header,
        },
      )
      .then(res => {
        console.log(res.data?.profile_picture_url);
        return res.data?.profile_picture_url;
      });
  } catch (error) {}
}

async function getInstaFeedDetails(data, id, longtoken, timstamp) {
  try {
    var obj = data;
    console.log('420=>>', data);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    const nowDate = new Date(); // Current date and time
    const sevenDaysBack = new Date(nowDate);
    sevenDaysBack.setDate(nowDate.getDate() - timstamp); // Subtract 7 days
    var date = Math.floor(sevenDaysBack.getTime() / 1000);
    console.log(date);
    let url = '';
    url =
      data.toLowerCase() == 'post'
        ? `https://graph.facebook.com/v21.0/${id}/media?fields=id,caption,media_type,media_url,like_count,comments_count,timestamp&access_token=${longtoken}&since=${date}&limit=All`
        : data.toLowerCase() == 'reel'
        ? `https://graph.facebook.com/v21.0/${id}/media?access_token=${longtoken}&since=${date}&limit=All&fields=id,caption,media_type,media_url,like_count,comments_count,timestamp`
        : data === 'stories'
        ? `https://graph.facebook.com/v21.0/${id}/stories?access_token=${longtoken}&since=${moment(
            nowDate,
          ).format(
            'DD-MM-YYYY',
          )}&fields=id,caption,media_type,media_url,timestamp`
        : `https://graph.facebook.com/v21.0/${id}/media?access_token=${longtoken}&since=${date}&limit=All&fields=id,caption,media_type,media_url,like_count,comments_count,timestamp`;

    console.log(url);
    return axios
      .get(url, {
        headers: header,
      })
      .then(res => {
        return res;
        // console.log(res.data);
      });
  } catch (error) {}
}

async function getInstaImageDetails(id, longtoken) {
  try {
    console.log('id', id);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    console.log(
      `https://graph.facebook.com/v21.0/17884805994152982?fields=like_count,comments_count,media_url,caption&access_token=EAAQANEuGyCgBO3HgFo0z3sUOQnrgNgfjl1SNspKWe42ZAtqwz7q8gjKItvvwz9njAZBfnx61m36LkploITIi7XSarJeRcroRVS6FmnRKcskBeBecWSOhWZBOiXZA3h8g6srgA7RxWwvZC6gDnaEjiDabWpXD1lHSEiDYNxBEKv6yplUtRZCR6mVa3r`,
    );
    return axios
      .get(
        `https://graph.facebook.com/v21.0/${id}?fields=like_count,comments_count,media_url,caption&access_token=${longtoken}`,
        {
          headers: header,
        },
      )
      .then(res => {
        return res;
        // console.log(res.data);
      });
  } catch (error) {}
}

async function getYoutubeDetails(videoId, access_token) {
  try {
    console.log('nbfmsdbfm>>>>>>>>>>>>>', videoId);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    console.log(header);
    console.log(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}`,
    );
    return axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}'
        }`,
        {
          headers: header,
        },
      )
      .then(res => {
        console.log('nkjgvj', res.data);
        return res;
      });
  } catch (error) {}
}

async function getYoutubeFeedDetails(data, access_token) {
  try {
    var obj = data;
    console.log(data);
    const header = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    const now = new Date(); // Current date and time
    const sevenDaysBack = new Date(now);
    sevenDaysBack.setDate(now.getDate() - 7); // Subtract 7 days
    var date = Math.floor(sevenDaysBack.getTime() / 1000);
    console.log('accesstoken', data.toLowerCase());
    console.log(
      `https://www.googleapis.com/youtube/v3/search?access_token=${access_token}&part=snippet&forMine=true&type=video&q=${
        data.toLowerCase() == 'video' ? '' : ''
      }`,
    );
    return axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?access_token=${access_token}&part=snippet&forMine=true&type=video&q=${
          data.toLowerCase() == 'video' ? '' : data.toLowerCase()
        }'
        }`,
        {
          headers: header,
        },
      )
      .then(res => {
        return res;
        // console.log(res.data);
      });
  } catch (error) {}
}

export {
  Youtube,
  youtubeChanel,
  youtubReport,
  addYoutubeDetails,
  addGetRefToken,
  getInstaFeedDetails,
  getYoutubeFeedDetails,
  getrefreshToken,
  getInstaImageDetails,
  getYoutubeDetails,
  getInstaDetails,
};
