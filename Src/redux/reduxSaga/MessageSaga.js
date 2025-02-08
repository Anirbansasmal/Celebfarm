import { put, call, takeLatest, select, take, } from 'redux-saga/effects';
import { Linking } from 'react-native';
import {
    CREATE_CHAT_TOKEN_REQUEST,
    CREATE_CHAT_TOKEN_SUCCESS,
    CREATE_CHAT_TOKEN_FAILURE,
    SEND_CHAT_REQUEST,
    SEND_CHAT_SUCESSS,
    SEND_CHAT_FAILURE,
    GET_CHAT_LIST_REQUEST,
    GET_CHAT_LIST_SUCCESS,
    GET_CHAT_LIST_FAILURE,
    SEARCH_CHAT_REQUEST,
    SEARCH_CHAT_SUCESSS,
    SEARCH_CHAT_FAILURE,
    LOAD_CHAT_REQUEST,
    LOAD_CHAT_SUCCESS,
    LOAD_CHAT_FAILURE,
    GET_REQ_LIST_REQUEST,
    GET_REQ_LIST_SUCCESS,
    GET_REQ_LIST_FAILURE,
    ACCEPT_CHAT_REQUEST,
    ACCEPT_CHAT_SUCESSS,
    ACCEPT_CHAT_FAILURE,
    DECLINE_CHAT_REQUEST,
    DECLINE_CHAT_SUCESSS,
    DECLINE_CHAT_FAILURE,
    GET_ATTATCHMENT_REQUEST,
    GET_ATTATCHMENT_SUCESSS,
    GET_ATTATCHMENT_FAILURE,

    CREATE_VIDEO_TOKEN_REQUEST,
    CREATE_VIDEO_TOKEN_SUCCESS,
    CREATE_VIDEO_TOKEN_FAILURE,
} from '../redux/action/ActionTypes';
import { postApi, getApi, getApiWithParamNew } from '../utils/helpers/ApiRequest';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import _ from 'lodash';
import { eventChannel } from 'redux-saga';
import Toast from '../utils/helpers/Toast';
import storage from '@react-native-firebase/storage';


const messages = state => state.MessageReducer;
const getItems = state => state.TokenReducer;

const FIREBASE_REF_MESSAGES = database().ref('chat');
export function* createChatToken(action) {
    const items = yield select(getItems);

    console.log({ 'tokn is': items.token });
    try {
        const Header = {
            Accept: 'application/json',
            contenttype: 'application/json',
            accesstoken: items.token,
        };

        const response = yield call(
            postApi,
            'api/chat-create',
            action.payload,
            Header,
        );
        console.log('response', response)
        {
            response.status == 200
                ? yield put({ type: CREATE_CHAT_TOKEN_SUCCESS, data: response.data })
                : yield put({ type: CREATE_CHAT_TOKEN_FAILURE, data: response.data });
        }
    } catch (error) {
        yield put({ type: CREATE_CHAT_TOKEN_FAILURE, error: error });
    }
}

export function* sendChatAction(action) {
    console.log(action.payload)
    try {
        const metaData = { contentType: action?.payload?.chatAttachment };
        console.log('chatAttachment', action?.payload?.chatBody?.chatAttachment)
        if (action?.payload?.chatBody?.chatAttachment) {
            FIREBASE_REF_MESSAGES.child(action.payload.chatToken).push(action.payload.chatBody)
        } else {
            FIREBASE_REF_MESSAGES.child(action.payload.chatToken).push(
                action.payload.chatBody,
            );
        }

        yield put({ type: SEND_CHAT_SUCESSS, data: 'Message sent successfully' });
    } catch (error) {
        yield put({ type: SEND_CHAT_FAILURE, error: error });
    }
}

export function* getChatListAction(action) {
    try {
        const items = yield select(getItems);

        const Header = {
            Accept: 'application/json',
            contenttype: 'application/json',
            accesstoken: items.token,
        };

        const response = yield call(
            getApi,
            'api/chat-user-list',
            Header,
        );

        if (response.data.code == 200) {
            yield put({ type: GET_CHAT_LIST_SUCCESS, data: response.data });
            // Toast(response.data.message);
        } else {
            yield put({ type: GET_CHAT_LIST_FAILURE, error: response.data });
        }
    } catch (error) {
        yield put({ type: GET_CHAT_LIST_FAILURE, error: error });
    }
}

export function* getReqListAction() {
    try {
        const items = yield select(getItems);
        const Header = {
            Accept: 'application/json',
            contenttype: 'application/json',
            authorization: items.token,
        };

        const response = yield call(getApi, 'get-chat-request-details', Header);

        yield put({ type: GET_REQ_LIST_SUCCESS, data: response.data });
    } catch (error) {
        yield put({ type: GET_REQ_LIST_FAILURE, error: error });
    }
}

export function* searchChatAction(action) {
    try {
        const items = yield select(messages);

        const response = yield call(
            filterfunction,
            items.chatListCopy,
            action.keyword,
        );

        yield put({ type: SEARCH_CHAT_SUCESSS, data: response });
    } catch (error) {
        yield put({ type: SEARCH_CHAT_FAILURE, error: error });
    }
}

function filterfunction(data, keyword) {
    return new Promise(function (resolve, reject) {
        let filterdData = _.filter(data, item => {
            return getItems.user == 'provider'
                ? item.customerDetails.full_name
                    .toLowerCase()
                    .indexOf(
                        keyword.toLowerCase() === '' ? ' ' : keyword.toLowerCase().trim(),
                    ) != -1
                : item.providerDetails.full_name
                    .toLowerCase()
                    .indexOf(
                        keyword.toLowerCase() === '' ? ' ' : keyword.toLowerCase().trim(),
                    ) != -1;
        });
        if (data != null) {
            resolve(filterdData);
        } else reject([]);
    });
}

export function* loadChatAction(action) {
    console.log(action.page)
    try {
        const channel = eventChannel(emiter => {
            const listener = FIREBASE_REF_MESSAGES.child(action.payload.chatToken)
                .startAt(0)
                .limitToLast(action.payload.page * 9)
                .orderByChild('createdAt')
                // .limitToFirst()
                .on(
                    'value',
                    dataSnapshot => {
                        var items = [];
                        dataSnapshot.forEach(async (child) => {
                            console.log('child ', child.val());
                            // if (child.val().chatAttachment?.length == 0) {
                            items.push({
                                // chatAttachment: child.val().chatAttachment,
                                 ...child.val(),
                                // createdAt: child.val()?.createdAt,
                                // message: child.val()?.message,
                                // read: child.val()?.read,
                                // sender_id: child.val()?.sender_id,
                                // receiver_id: child.val().receiver_id,
                                // type: child.val()?.type,
                                key: child.key,
                            })
                            if (action.payload.userId == child.val().receiver_id) {
                                child.child('read').ref.set(true);
                            }
                        });

                        var chatResponse = {
                            data: items,
                        };

                        emiter(chatResponse || {});
                    },
                );

            return () => {
                FIREBASE_REF_MESSAGES.child(action.payload.chatToken).off();
            };
        });


        if (action.payload.isMount) {
            while (true) {
                const chatResponse = yield take(channel);
                console.log('channel', chatResponse.data.length)
                yield put({
                    type: LOAD_CHAT_SUCCESS,
                    data: chatResponse,
                    chatToken: action.payload.chatToken,
                });
            }
        } else {
            var chatResponse = {
                data: [],
            };
            console.log('channel', chatResponse.data.length)
            yield put({
                type: LOAD_CHAT_SUCCESS,
                data: chatResponse,
                chatToken: action.payload.chatToken,
            });
            channel.close();
        }
    } catch (error) {
        yield put({ type: LOAD_CHAT_FAILURE, error: error });
    }
}
export function* loadChatAttchmentAction(action) {

    const FIREBASE_REF_MESSAGES = database().ref('chat');
    try {
        const channel = eventChannel(emiter => {
            const listener = FIREBASE_REF_MESSAGES.child(action.payload.chatToken)
                // .limitToFirst(6)
                .startAt(0)
                .orderByChild('createdAt')
                // .limitToFirst()
                .on(
                    'value',
                    dataSnapshot => {
                        var items1 = [];
                        dataSnapshot.forEach(async (child) => {
                            console.log('child ', child.val());
                            if (child.val().chatAttachment?.length == 0) {

                            } else {
                                //     var imageChat = attachment(child.val()?.chatAttachment);
                                //     imageChat?.then((val) => {
                                items1.push({
                                    // ...child.val(),
                                    chatAttachment: child.val().chatAttachment,
                                    createdAt: child.val()?.createdAt,
                                    message: child.val()?.message,
                                    read: child.val()?.read,
                                    senderID: child.val()?.senderID,
                                    // type: child.val()?.type,
                                    key: child.key,
                                })
                                //         });
                                console.log('item chat_token 316', items1.length)
                                //     }
                                if (action.payload.userId == child.val().receiver_id) {
                                    child.child('read').ref.set(true);
                                }
                            }
                        });
                        var chatResponse = {
                            data: items1,
                        };
                        emiter(chatResponse || {});
                    },
                );
            return () => {
                FIREBASE_REF_MESSAGES.child(action.payload.chatToken).off();
            };
        });


        if (action.payload.isMount) {
            while (true) {
                const chatResponse = yield take(channel);
                // console.log('channel', chatResponse.data.length)
                yield put({
                    type: GET_ATTATCHMENT_SUCESSS,
                    data: chatResponse,
                    chatToken: action.payload.chatToken,
                });
            }
        } else {
            var chatResponse = {
                data: [],
            };
            // console.log('channel', chatResponse.data.length)
            yield put({
                type: GET_ATTATCHMENT_SUCESSS,
                data: chatResponse,
                chatToken: action.payload.chat_token,
            });
            channel.close();
        }
    } catch (error) {
        yield put({ type: LOAD_CHAT_FAILURE, error: error });
    }
}
async function images(val) {
    // console.log('attatc type', val[0]['filetype']);
    var imageVal = [];
    for (let i = 0; i < val.length; i++) {
        // console.log('filetype', val[i]['filetype'])


        if (val[i]?.['filetype'] == 'image/jpeg' || val[i]?.['filetype'] == 'image/jpg') {
            await storage().ref('/' + val[i]['filename'])
                .getDownloadURL().then((val) => {
                    // resolve(val);
                    // console.log('val', val)
                    imageVal.push({
                        name: val,
                        type: 'image/jpg'
                    })
                    // arr.push(val)
                }).catch((e) => {
                    console.log('err', e)
                });
        } else {
            await storage().ref('/' + val[i]['filename'])
                .getDownloadURL().then((val) => {
                    // resolve(val);
                    // console.log('val', val)
                    imageVal.push({
                        name: val,
                        type: 'application/pdf'
                    })
                    // arr.push(val)
                }).catch((e) => {
                    console.log('err', e)
                });
        }
    }
    // console.log('image Val', imageVal)
    return imageVal;
}
function getPromise(val) {
    var imageVal = [];
    return new Promise(function (resolve, reject) {
        setTimeout(async function () {
            await storage().ref('/' + val[0]['filename'])
                ?.getDownloadURL().then((val) => {
                    // resolve(val);
                    // console.log('val', val)
                    imageVal.push({
                        name: val,
                        type: 'image/jpg'
                    })
                    // arr.push(val)
                }).catch((e) => {
                    console.log('err', e)
                });
            resolve(imageVal);
        }, 100)
    })
}

function getResult(val) {
    getPromise(val)
        .then(function (response) {
            console.log(response)
            return response;
        })
}

async function attachment(val) {
    // console.log('attatc type', val[0]['filetype']);
    var imageVal = Array();
    for (let i = 0; i < val.length; i++) {
        // console.log('filetype', val[i]['filetype'])
        if (val[i]?.['filetype'] == 'image/jpeg' || val[i]?.['filetype'] == 'image/jpg') {
            await storage().ref('/' + val[i]['filename'])
                .getDownloadURL().then((val) => {
                    // resolve(val);
                    // console.log('val', val)
                    imageVal.push({
                        name: val,
                        type: 'image/jpg'
                    })
                    // arr.push(val)
                }).catch((e) => {
                    console.log('err', e)
                });
        } else {
            await storage().ref('/' + val[i]['filename'])
                .getDownloadURL().then((val) => {
                    // resolve(val);
                    // console.log('val', val)
                    imageVal.push({
                        name: val,
                        type: 'application/pdf'
                    })
                    // arr.push(val)
                }).catch((e) => {
                    console.log('err', e)
                });
        }
    }
    // console.log('image Val', imageVal)
    return imageVal;
}
// const images1 = async (val) => {
//     // val.then((valImage) => {
//     console.log(val)
//     // const image = await val.
//     //     .getDownloadURL().catch((e)=>{
//     //         console.log(e)
//     //     });
//     // console.log('val',image)
//     // Linking.openURL(image)
//     // return image
//     // })
// }
// const imagedat = (items) => {
//     return items
// }
export function* acceptReqAction(action) {
    const items = yield select(getItems);

    const Header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        authorization: items.token,
    };
    try {
        let response = yield call(
            postApi,
            'accept-chat-request',
            action.payload,
            Header,
        );

        if (response.data.status == true) {
            yield put({
                type: ACCEPT_CHAT_SUCESSS,
                acceptReq: response.data.data,
            });
        } else {
            yield put({ type: ACCEPT_CHAT_FAILURE, error: response.data });
        }
    } catch (error) {
        yield put({ type: ACCEPT_CHAT_FAILURE, error: error });
    }
}

export function* declineReqAction(action) {
    const items = yield select(getItems);

    const Header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        authorization: items.token,
    };
    try {
        let response = yield call(
            postApi,
            'cancel-chat-request',
            action.payload,
            Header,
        );
        if (response.data.status == true) {
            yield put({
                type: DECLINE_CHAT_SUCESSS,
                declineReq: response.data.data,
            });
        } else {
            yield put({ type: DECLINE_CHAT_FAILURE, error: response.data });
        }
    } catch (error) {
        yield put({ type: DECLINE_CHAT_FAILURE, error: error });
    }
}

export function* createVideoReqAction(action) {
    const items = yield select(getItems);

    const Header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        authorization: items.token,
    };
    try {
        let response = yield call(
            getApi,
            'access_token/neque',
            action.payload,
            Header,
        );
        if (response.data.status == true) {
            yield put({
                type: CREATE_CHAT_TOKEN_SUCCESS,
                videoReq: response.data.data,
            });
        } else {
            yield put({ type: CREATE_CHAT_TOKEN_FAILURE, error: response.data });
        }
    } catch (error) {
        yield put({ type: CREATE_CHAT_TOKEN_FAILURE, error: error });
    }
}

export default {
    source: [
        (function* () {
            yield takeLatest(CREATE_CHAT_TOKEN_REQUEST, createChatToken);
        })(),
        (function* () {
            yield takeLatest(SEND_CHAT_REQUEST, sendChatAction);
        })(),
        (function* () {
            yield takeLatest(GET_CHAT_LIST_REQUEST, getChatListAction);
        })(),
        (function* () {
            yield takeLatest(LOAD_CHAT_REQUEST, loadChatAction);
        })(),
        (function* () {
            yield takeLatest(CREATE_VIDEO_TOKEN_REQUEST, createVideoReqAction);
        })(),
    ],
};
