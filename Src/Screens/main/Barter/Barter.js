import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {ScrollView} from 'react-native-gesture-handler';
import Icons from '../../../themes/icons';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import MyStatusBar from '../../../utils/MyStatusBar';
import {
  getBarterFilterRequest,
  getBarterRequest,
} from '../../../redux/reducers/HomeUserReducer';
import connectionrequest from '../../../utils/helpers/NetInfo';
import ButtonLinear from '../../../Components/Button Linear';
import Loader from '../../../utils/helpers/Loader';
import BaterCommon from '../../../Components/BarterCommon';
import EmptyComponent from '../../../Components/EmptyComponent';
import showErrorAlert from '../../../utils/helpers/Toast';
import HeaderData from '../../../Components/HeaderData';
import LinearGradient from 'react-native-linear-gradient';
import {logoutRequest} from '../../../redux/reducers/AuthReducer';
// import Preload from '../../../Components/Preload';
import ImageProfile from '../../../Components/ImageProfile';
import Fallback from '../../auth/Fallback';
var status = '';
var filter = [];

function Barter(props) {
  const dispatch = useDispatch();
  const [isSelected, setSelected] = useState('Active');
  const [isShow, setShow] = useState(false);
  const [isShowMod, setShowMod] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingReq, setLoadingReq] = useState(false);
  const [isSelectTyp, setSelectTyp] = useState('');
  var arr1 = [];
  var arr2 = [];
  const [isFilter, setFilter] = useState('2');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const BarterReducer = useSelector(state => state.BarterReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const UserReducer = useSelector(state => state.UserReducer);
  const [pageNo, setPageno] = useState(1);
  const [pageNoR, setPagenoR] = useState(1);

  const [pageSize, setPageSize] = useState(1000);
  const [isInd, setInd] = useState('1');
  const [isBrand, setBrand] = useState('');
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataBrandFilter, setDataBrandFilter] = useState([]);
  var dataBrand = new Map();
  const [dataReq, setDataReq] = useState();
  const render = ({item, index}) => {
    return (
      <BaterCommon
        onPress={() => {
          props.navigation.navigate('Explore', {id: item?.campaignID});
        }}
        barter={index % 2 == 0 ? {...style.barter} : {...style.barter1}}
        backColor={Colors.bcolor}
        imageBackStyle={style.imageBackStyle}
        barteProductTitle={item?.barteProductTitle}
        borderWidth={normalize(1)}
        brandImageUrl={item?.brandImageUrl}
        discount={item?.discount}
        barterDiscount={style?.barterDiscount}
        barterProductTitle={item?.barterProductTitle}
        totalDeliverables={item?.totalDeliverables}
        barterTextStyle={style.barterTextStyle}
        brandName={item?.brandName}
        fromDate={item?.fromDate}
        toDate={item?.toDate}
        imageViewStyle={style.barterImageViewStyle}
        offer={item?.offer}
        offerStyle={style.offerStyle}
        offerTextStyle={style.offerTextStyle}
        key={index}
        platformType={item?.platformType}
        productImageUrl={item?.productImageUrl}
        subContainer={style.subContainer}
        todateStyle={style.todateStyle}
        brandStyle={style.brandStyle}
        discountStyle={style.discountStyle}
        discountTextStyle={style.discountTextStyle}
        profileCollabration={style.profileCollabration}
      />
    );
  };
  async function filterExplore() {
    try {
      var barterTypeCheck = '',
        brand = '',
        industry = '';
      console.log('gkldjgk', filter);
      filter?.map((item, index) => {
        if (item?.ftypesl == 'brand' && item?.isSelect == true) {
          brand =
            brand == '' ? item?.industryName : brand + ',' + item?.industryName;
        } else if (item?.ftypesl === 'Ind' && item?.isSelect == true) {
          industry +=
            industry == ''
              ? item?.industryName
              : ',' + item?.industryName?.toString();
        }
      });
      setLoading(true);
      console.log('industry 119', industry);
      var tab = isSelected == 'Active' ? 'Explore' : 'Requested';
      console.log('industry 121', tab);
      var obj =
        'creatorID=' +
        AuthReducer?.creatorID +
        '&' +
        'tabType=' +
        tab +
        '&' +
        'pageNo=' +
        1 +
        '&' +
        'pageSize=' +
        10 +
        '&' +
        'barterType=' +
        barterTypeCheck +
        '&' +
        'brand=' +
        brand +
        '&' +
        'industry=' +
        encodeURIComponent(industry);
      console.log('industry 142', obj);
      connectionrequest()
        .then(() => {
          dispatch(getBarterRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  const renderFilter = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: normalize(1),
          borderColor: Colors.borderColor,
          paddingHorizontal: normalize(7),
          paddingVertical: normalize(3),
          backgroundColor: item?.isSelect == true ? Colors.white : '#0000',
          marginStart: normalize(3),
          alignItems: 'center',
          borderRadius: normalize(9),
          justifyContent: 'center',
          marginTop: normalize(9),
          flexWrap: 'wrap',
        }}
        activeOpacity={0.7} //BarterOffer
        onPress={() => {
          var temdata = [...dataFilter];
          temdata[index].isSelect = !temdata[index]?.isSelect;
          setDataFilter([...temdata]);
          console.log(dataFilter);
          console.log('data Brand', dataBrand);
          filter.map((item, index) => {
            if (
              item?.industryName == temdata[index]?.industryName &&
              temdata[index]?.isSelect == true &&
              item?.ftypesl == 'Ind'
            ) {
              filter.map((item, index1) => {
                if (item?.industryName == temdata[index]?.industryName) {
                  filter[index1] = temdata[index];
                }
              });
            } else {
              filter.map((item, index1) => {
                if (item?.industryName == temdata[index]?.industryName) {
                  filter[index1] = temdata[index];
                }
              });
            }
          });
          console.log('275', filter);
        }}>
        <Text
          style={{
            color: item?.isSelect == true ? Colors.black : Colors.white,
            fontSize: normalize(10),
            marginStart: normalize(3),
            fontFamily: Fonts.Inter_Medium,
            textAlign: 'center',
          }}>
          {item?.industryName}
          {/* Politics */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderFilterBrand = ({item, index}) => {
    console.log('fjhsjdbfmsdbfms');
    return (
      <TouchableOpacity
        style={{
          borderWidth: normalize(1),
          borderColor: Colors.borderColor,
          paddingHorizontal: normalize(7),
          paddingVertical: normalize(3),
          backgroundColor: item?.isSelect == true ? Colors.white : '#0000',
          marginStart: normalize(3),
          alignItems: 'center',
          borderRadius: normalize(9),
          justifyContent: 'center',
          marginTop: normalize(9),
          flexWrap: 'wrap',
        }}
        activeOpacity={0.7} //BarterOffer
        onPress={() => {
          const temdata = [...dataBrandFilter];
          temdata[index].isSelect = !temdata[index]?.isSelect;
          setDataBrandFilter([...temdata]);
          console.log(dataBrandFilter);
          console.log('data Brand', dataBrand);
          // filter.push(temdata[index]);
          filter.map((item, index) => {
            if (
              item?.industryName == temdata[index]?.industryName &&
              // item.isSelect == true &&
              temdata[index]?.isSelect == true &&
              item?.ftypesl == 'brand'
            ) {
              filter.map((item, index1) => {
                if (item?.industryName == temdata[index]?.industryName) {
                  filter[index1] = temdata[index];
                }
              });
            } else {
              filter.map((item, index1) => {
                if (item?.industryName == temdata[index]?.industryName) {
                  filter[index1] = temdata[index];
                }
              });
            }
          });
          console.log('275', filter);
        }}>
        <Text
          style={{
            color: item?.isSelect == true ? Colors.black : Colors.white,
            fontSize: normalize(10),
            marginStart: normalize(3),
            fontFamily: Fonts.Inter_Medium,
            textAlign: 'center',
          }}>
          {item?.industryName}
          {/* Politics */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderFilterBrandLoad = () => {
    console.log('fjhsjdbfmsdbfms');
    return (
      <TouchableOpacity
        style={props.barter}
        onPress={() => {}}
        activeOpacity={0.9}>
        <ImageBackground
          source={null}
          style={style?.imageBackStyle}
          imageStyle={{
            borderRadius: normalize(4),
          }}
          resizeMode="contain"></ImageBackground>
        <View style={props?.imageViewStyle}>
          <ImageProfile
            alignItems={'center'}
            height={normalize(18)}
            width={normalize(18)}
            borderRadius={normalize(4)}
            backgroundColor={Colors.white}
            brandImageUrl={null}
            imgheight={normalize(16)}
            imgwidth={normalize(16)}
            justifyContent={'center'}
          />
          <Text style={style?.brandStyle}></Text>
        </View>
        <Text style={style.barterTextStyle}></Text>

        <View style={style.subContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={Icons.document_upload}
              style={style.profileCollabration}
              resizeMode="contain"
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(10),
                fontFamily: Fonts.Inter_Medium,
              }}></Text>
          </View>

          <Image
            source={null}
            style={{height: normalize(12), width: normalize(12)}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderReq = ({item, index}) => {
    return (
      <BaterCommon
        barter={style.barter}
        backColor={Colors.bcolor}
        imageBackStyle={style.imageBackStyle}
        barteProductTitle={item?.barteProductTitle}
        borderWidth={normalize(1)}
        brandImageUrl={item?.brandImageUrl}
        discount={item?.discount}
        barterDiscount={style?.barterDiscount}
        barterProductTitle={item?.barterProductTitle}
        totalDeliverables={item?.totalDeliverables}
        barterTextStyle={style.barterTextStyle}
        brandName={item?.brandName}
        fromDate={item?.fromDate}
        toDate={item?.toDate}
        imageViewStyle={style.barterImageViewStyle}
        offer={item?.offer}
        offerStyle={style.offerStyle}
        offerTextStyle={style.offerTextStyle}
        key={index}
        status={item?.status}
        campaignDate={item?.lastUpdateDate}
        platformType={item?.platformType}
        productImageUrl={item?.productImageUrl}
        subContainer={style.subContainer}
        todateStyle={style.todateStyle}
        brandStyle={style.brandStyle}
        discountStyle={style.discountStyle}
        discountTextStyle={style.discountTextStyle}
        profileCollabration={style.profileCollabration}
      />
    );
  };
  function dateText(date) {
    return (
      <Text
        style={{
          color: Colors.white,
          fontSize: normalize(12),
          fontFamily: Fonts.Inter_Bold,
        }}>
        {date}
      </Text>
    );
  }
  async function requested(bartertype) {
    try {
      var obj =
        'creatorID=' +
        AuthReducer?.creatorID +
        '&' +
        'tabType=' +
        'Requested' +
        '&' +
        'pageNo=' +
        1 +
        '&' +
        'pageSize=' +
        pageSize;
      console.log(obj);
      connectionrequest()
        .then(() => {
          dispatch(getBarterRequest(obj));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    } catch (error) {}
  }
  async function explore(bartertype) {
    setDataReq([]);
    setData([]);
    if (isLoading || !hasMore) return;
    console.log('isLoading ++ !hasMore', isLoading || !hasMore);
    setLoading(true);
    try {
      var obj =
        'creatorID=' +
        AuthReducer?.creatorID +
        '&' +
        'tabType=' +
        'Explore' +
        '&' +
        'pageNo=' +
        1 +
        '&' +
        'pageSize=' +
        pageSize;
      console.log(obj);
      connectionrequest()
        .then(() => {
          dispatch(getBarterRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function filterBarterIndustries(bartertype) {
    try {
      connectionrequest()
        .then(() => {
          isInd == '1' && dataFilter?.length <= 0
            ? dispatch(getBarterFilterRequest())
            : null;
          setTimeout(() => {
            if (filter.length > 0) {
              console.log('936 ', filter);
              filter.map((item, index) => {
                if (item?.ftypesl == 'Ind') {
                  arr2.push(item);
                }
              });
              setDataFilter([...arr2]);
            }
          }, 500);
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (error) {}
  }
  async function filterBarterBrand(bartertype) {
    try {
      connectionrequest()
        .then(() => {
          dispatch(getBarterFilterRequest());
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (error) {}
  }
  const handleLoadMore = () => {
    if (isFilter == '') {
      if (hasMore && !isLoading) {
        console.log('load more', HomeReducer?.productResponse?.noOfRecords);
        // if (
        //   !isLoading &&
        //   HomeReducer?.productResponse?.noOfRecords >= data.length
        // ) {
        setPageno(prevPage => prevPage + 1); // increase page by 1
        // method for API call
      }
    }
  };

  const handleLoadMoreReq = () => {
    console.log('bfsdmnfbjhafsjhadfs');
    if (
      !isLoadingReq &&
      HomeReducer?.productResponse?.noOfRecords >= dataReq.length &&
      HomeReducer?.productResponse?.noOfRecords >= 10
    ) {
      setPagenoR(pageNoR + 1); // increase page by 1
      requested('Requested'); // method for API call
    }
  };
  function logout() {
    try {
      dispatch(logoutRequest());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    explore('Explore');
  }, [pageNo]);
  useEffect(() => {
    setInd('1');
    setDataFilter([]);
    setDataBrandFilter([]);
    // setPageno(1);
    setLoading(false);
    setHasMore(true);
    setFilter('2');
    arr1 = [];
    arr2 = [];
    filter = [];
    filterBarterIndustries();
  }, []);

  if (status == '' || HomeReducer.status != status) {
    switch (HomeReducer.status) {
      case 'homeCollab/getBarterRequest':
        status = HomeReducer.status;
        console.log('=>>>>>>>');
        setShow(false);
        break;

      case 'homeCollab/getBarterSuccess':
        status = HomeReducer.status;
        console.log(
          'BarterReducer?.Address?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
        );
        if (isSelected == 'Active') {
          setData(prevresult => [
            ...prevresult,
            ...(HomeReducer?.productResponse?.result ?? []),
          ]);
          // setPageno(
          //   HomeReducer?.productResponse?.noOfRecords >= 10 ? pageNo + 1 : 1,
          // );
          setHasMore(HomeReducer?.productResponse?.result?.length > 0);
          if (dataBrandFilter.length <= 0) {
            HomeReducer?.productResponse?.result?.map((item, index) => {
              const newItem = {
                industryName: item?.brandName,
                isSelect: false,
                ftypesl: 'brand',
              };

              // Add to Map only if industryName doesn't already exist
              if (!dataBrand.has(newItem.industryName)) {
                dataBrand.set(newItem.industryName, newItem);
              }
            });
            console.log(
              '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
              Array.from(dataBrand.values()),
            );
            setDataBrandFilter(Array.from(dataBrand.values()));
            // if (filter.length <= 2) {
            Array.from(dataBrand.values())?.map((item, index) => {
              filter.push({
                industryName: item?.industryName,
                isSelect: false,
                ftypesl: 'brand',
              });
            });
          }

          // }
          console.log(dataBrand);
        } else if (isSelected == 'ActiveReq') {
          console.log('ActiveReq', dataReq);
          setDataReq([
            ...dataReq,
            ...(HomeReducer?.productResponse?.result ?? []),
          ]);
          setPagenoR(
            HomeReducer?.productResponse?.noOfRecords >= 10 ? pageNoR + 1 : 1,
          );
          setLoadingReq(
            HomeReducer?.productResponse?.noOfRecords >= 10 ? true : false,
          );
        }
        break;
      case 'homeCollab/getBarterFailure':
        status = HomeReducer.status;
        break;

      case 'homeCollab/getBarterFilterRequest':
        status = HomeReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'homeCollab/getBarterFilterSuccess':
        status = HomeReducer.status;
        console.log(
          'BarterReducer?.master?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          HomeReducer?.barterfilterResponse,
        );
        if (isFilter === '2') {
          if (isInd === '1') {
            // setInd('1');
            dataFilter.length <= 0
              ? setDataFilter(
                  HomeReducer?.barterfilterResponse?.map((item, index) => {
                    return {
                      industryName: item?.industryName,
                      isSelect: false,
                      ftypesl: 'Ind',
                    };
                  }),
                )
              : null;
            // if (filter.length <= 2) {
            dataFilter?.length <= 0
              ? filter.push(
                  ...HomeReducer?.barterfilterResponse?.map((item, index) => {
                    return {
                      industryName: item?.industryName,
                      isSelect: false,
                      ftypesl: 'Ind',
                    };
                  }),
                )
              : null;
            // }
          }
          console.log('filter 601', filter);
        }
        break;

      case 'homeCollab/getFilterRequest':
        status = HomeReducer.status;
        break;

      case 'homeCollab/getFilterSuccess':
        status = HomeReducer.status;
        console.log(
          'BarterReducer?.Address?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
        );
        if (isSelected == 'Active') {
          setData([...HomeReducer?.productResponse]);
        } else if (isSelected == 'ActiveReq') {
          setDataReq([...HomeReducer?.productResponse]);
        }
        break;
      case 'homeCollab/getFilterFailure':
        status = HomeReducer.status;
        break;
    }
  }

  console.log('hello world', Array.from(dataBrand.values()));

  return (
    <>
      <MyStatusBar barStyle={'light-content'} backgroundColor={Colors.black} />
      {HomeReducer?.status == 'homeCollab/getBarterRequest' ? (
        <Fallback />
      ) : (
        <>
          <HeaderData
            title={'Barter'}
            backScreen={() => setShowMod(!isShowMod)}
            notifiPress={() => props?.navigation.navigate('Notifications')}
            profilePress={() => props?.navigation.navigate('Chat')}
          />
          <View style={style.container}>
            <View
              style={{
                marginTop: normalize(12),
                height: normalize(45),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: normalize(10),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[
                      {
                        ...style.btn,
                        backgroundColor:
                          isSelected == 'Active' ? Colors.white : Colors.black,
                        borderColor: Colors.borderColor,
                      },
                    ]}
                    activeOpacity={0.7}
                    onPress={() => {
                      setData([]);
                      // setPagenoR(1);
                      setHasMore(false);
                      // setPageno(1);
                      setLoading(false);
                      setFilter('');
                      setTimeout(() => {
                        explore('Explore'), setSelected('Active');
                      }, 200);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: normalize(7),
                        marginEnd: normalize(7),
                      }}>
                      <Text
                        style={[
                          {
                            ...style.text4,
                            color:
                              isSelected == 'Active'
                                ? Colors.black
                                : Colors.white,
                          },
                        ]}>
                        Explore
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: normalize(12),
                    }}></View>
                  <TouchableOpacity
                    style={[
                      {
                        ...style.btn,
                        backgroundColor:
                          isSelected == 'ActiveReq'
                            ? Colors.white
                            : Colors.black,
                        borderColor: Colors.borderColor,
                      },
                    ]}
                    onPress={() => {
                      setTimeout(() => {
                        setDataReq([]);
                        setData([]);
                        // setPageno(1);
                        setSelected('ActiveReq');
                        requested('Requested');
                      }, 200);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: normalize(7),
                        marginEnd: normalize(7),
                      }}>
                      <Text
                        style={[
                          {
                            ...style.text4,
                            color:
                              isSelected == 'ActiveReq'
                                ? Colors.black
                                : Colors.white,
                          },
                        ]}>
                        Requested
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {isSelected == 'Active' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setShow(true);
                      filterBarterBrand();
                    }}>
                    <Image
                      source={Icons.filter}
                      style={{height: normalize(18), width: normalize(18)}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            {/* <ScrollView showsVerticalScrollIndicator={false} bounces={true}> */}
            <View
              style={{
                marginTop: normalize(4),
                paddingHorizontal: normalize(9),
                height: Dimensions.get('window').height / 1.39,
                // backgroundColor:Colors.red,
              }}>
              <View>
                {isSelected == 'Active' ? (
                  <>
                    {data?.length > 0 ? (
                      <FlatList
                        data={data}
                        renderItem={render}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        style={{width: '100%'}}
                        ItemSeparatorComponent={
                          <View style={{width: normalize(19)}}></View>
                        }
                        ListFooterComponent={
                          isLoading ? (
                            <ActivityIndicator color={Colors.green} />
                          ) : null
                        }
                        contentContainerStyle={{
                          paddingBottom: normalize(40),
                        }}
                        // onEndReached={handleLoadMore}
                      />
                    ) : HomeReducer?.status == 'homeCollab/getBarterRequest' ? (
                      <EmptyComponent
                        height={normalize(190)}
                        imgHeight={normalize(90)}
                        imgWidth={normalize(90)}
                        val={'Coming Soon'}
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                    {dataReq?.length > 0 ? (
                      <FlatList
                        data={dataReq}
                        renderItem={renderReq}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        style={{width: '100%'}}
                        ItemSeparatorComponent={
                          <View style={{width: normalize(19)}}></View>
                        }
                        ListFooterComponent={
                          isLoadingReq ? <ActivityIndicator /> : null
                        }
                        contentContainerStyle={{}}
                        // onEndReached={handleLoadMoreReq}
                        onEndReachedThreshold={0.8}
                      />
                    ) : (
                      <EmptyComponent
                        height={normalize(190)}
                        imgHeight={normalize(90)}
                        imgWidth={normalize(90)}
                        val={'Coming Soon'}
                      />
                    )}
                  </>
                )}
              </View>
              <Modal
                isVisible={isShow}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating={true}
                style={{width: '100%', alignSelf: 'center', margin: 0}}
                // animationInTiming={800}
                animationOutTiming={1000}
                onBackdropPress={() => {
                  setShow(false);
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#ddd',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: '#181818',
                    borderRadius: normalize(17),
                    paddingLeft: normalize(20),
                    paddingBottom: normalize(15),
                    paddingTop: normalize(19),
                    paddingEnd: normalize(20),
                    height: normalize(370),
                  }}>
                  <View
                    style={[
                      {
                        marginTop: normalize(12),
                        // backgroundColor: '#fff',
                        borderRadius: normalize(3),
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: normalize(16),
                        fontFamily: Fonts.Inter_SemiBold,
                        color: Colors.white,
                      }}>
                      Filters
                    </Text>
                    <TouchableOpacity
                      style={[
                        {
                          marginTop: normalize(0),
                          borderRadius: normalize(3),
                          flexDirection: 'row',
                          alignItems: 'center',
                        },
                      ]}
                      onPress={() => {
                        // props.navigation.navigate('Account'),
                        setShow(false);
                        filter.map((item, index) => {
                          filter[index].isSelect = false;
                        });
                        setInd('1');
                        setDataFilter([]);
                        setDataBrandFilter([]);
                        // setPageno(1);
                        setLoading(false);
                        setHasMore(true);
                        setFilter('2');
                        arr1 = [];
                        arr2 = [];
                        filter = [];
                        setTimeout(() => {
                          explore('Explore');
                        }, 200);
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: normalize(10),
                            fontFamily: Fonts.Inter_Medium,
                            color: Colors.white,
                          }}>
                          Clear all
                        </Text>
                        <View
                          style={{
                            height: 1,
                            width: 47,
                            backgroundColor: Colors.white,
                          }}
                        />
                      </View>
                      <Image
                        source={Icons.closefilter}
                        style={{
                          height: normalize(19),
                          width: normalize(19),
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: Colors.grey,
                      marginTop: normalize(9),
                    }}></View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          // justifyContent: 'space-around',
                          height: normalize(100),
                        }}>
                        <TouchableOpacity
                          style={{
                            ...style.filterBtn,
                            backgroundColor:
                              isFilter === '2' ? Colors.white : '#0000',
                            borderColor:
                              isFilter === '2' ? Colors.white : Colors.strok,
                          }}
                          onPress={() => {
                            setFilter('2'), setInd('1');
                            filterBarterIndustries(1);
                          }}
                          activeOpacity={0.6}>
                          <Text
                            style={{
                              ...style.filterText,
                              color:
                                isFilter === '2' ? Colors.black : Colors.white,
                              fontFamily: Fonts.Inter_Medium,
                            }}>
                            Industry
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            ...style.filterBtn,
                            backgroundColor:
                              isFilter === '3' ? Colors.white : '#0000',
                            borderColor:
                              isFilter === '3' ? Colors.white : Colors.strok,
                          }}
                          onPress={() => {
                            setFilter('3');

                            // setTimeout(() => {

                            if (filter.length > 0) {
                              console.log('961 ', filter);
                              filter.map((item, index) => {
                                if (item?.ftypesl == 'brand') {
                                  arr1.push(item);
                                }
                              });
                              setDataBrandFilter([...arr1]);
                            }
                            // }, 500);
                          }}
                          activeOpacity={0.6}>
                          <Text
                            style={{
                              ...style.filterText,
                              color:
                                isFilter === '3' ? Colors.black : Colors.white,
                              fontFamily: Fonts.Inter_Medium,
                            }}>
                            Brand
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          height: normalize(240),
                          width: normalize(1),
                          backgroundColor: Colors.grey,
                          marginTop: normalize(12),
                          marginStart: normalize(10),
                          opacity: 0.5,
                        }}
                      />
                    </View>
                    <View style={{width: '65%', height: normalize(230)}}>
                      {isFilter == '2' ? (
                        <FlatList
                          data={dataFilter}
                          renderItem={renderFilter}
                          keyExtractor={item => item.industryName}
                        />
                      ) : isFilter == '3' ? (
                        <FlatList
                          data={dataBrandFilter}
                          renderItem={renderFilterBrand}
                          keyExtractor={item => item.industryName}
                        />
                      ) : null}
                    </View>
                  </View>

                  <ButtonLinear
                    width={'99%'}
                    height={normalize(27)}
                    alignSelf={'center'}
                    backgroundColor={Colors.btnColor}
                    title={'Apply'}
                    textColor={Colors.black}
                    fontFamily={Fonts.Inter_SemiBold}
                    titlesingle={true}
                    borderRadius={normalize(25)}
                    marginTop={normalize(19)}
                    fontSize={normalize(14)}
                    btnBottom={10}
                    onPress={() => {
                      setData([]);
                      filterExplore();
                    }}
                  />
                </View>
              </Modal>
            </View>
            {/* </ScrollView> */}
          </View>
        </>
      )}
      <Modal
        isVisible={isShowMod}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={1000}
        backdropColor={'#000000'}
        onBackdropPress={() => {
          setShowMod(false), setSelectTyp('');
        }}>
        {/* <ScrollView> */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#181818',
            borderTopLeftRadius: normalize(17),
            borderTopRightRadius: normalize(17),
            maxHeight: normalize(250),
            paddingLeft: normalize(20),
            paddingBottom: normalize(15),
            paddingTop: normalize(19),
            height: normalize(270),
          }}>
          <LinearGradient
            colors={
              isSelectTyp == 'Account'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={[
              {
                borderRadius: normalize(3),
              },
            ]}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                  // backgroundColor: isSelect == 'Account' ? '#C4FD65' : '#0000',
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Account'), setShowMod(false);
                // setocuc;
                setSelectTyp('Account');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelectTyp != 'Account' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Account' ? Colors.white : '#434540',
                }}>
                Account
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={
              isSelectTyp == 'PushNotification'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('PushNotifications'),
                  setShowMod(false);
                setSelectTyp('PushNotification');
              }}>
              <Image
                source={Icons.notificationacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelectTyp != 'PushNotification'
                        ? Colors.white
                        : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color:
                    isSelectTyp != 'PushNotification'
                      ? Colors.white
                      : '#434540',
                }}>
                Push Notification
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <LinearGradient
            colors={
              isSelect == 'Privacy'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: 0,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('PrivacyPolicy'), setShow(false);
                setSelect('Privacy');
              }}>
              <Image
                source={Icons.documentuploadacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Privacy' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Privacy' ? Colors.white : '#434540',
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <LinearGradient
            colors={
              isSelectTyp == 'Terms'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Terms'), setShowMod(false);
                setSelectTyp('Terms');
              }}>
              <Image
                source={Icons.elementacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelectTyp != 'Terms' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelectTyp != 'Terms' ? Colors.white : '#434540',
                }}>
                Terms of Use
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <LinearGradient
            colors={
              isSelect == 'FAQs'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                // props.navigation.navigate('FAQ’s'),
                setShow(false);
                setSelect('FAQs');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor: isSelect != 'FAQs' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'FAQs' ? Colors.white : '#434540',
                }}>
                FAQ’s
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <LinearGradient
            colors={
              isSelectTyp == 'Contact'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('ContactUsSend'), setShowMod(false);
                setSelectTyp('Contact');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelectTyp != 'Contact' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelectTyp != 'Contact' ? Colors.white : '#434540',
                }}>
                Contact Us
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={
              isSelectTyp == 'Logout'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
              marginTop: normalize(29),
            }}>
            <TouchableOpacity
              style={[{...style.modelView, marginTop: normalize(0)}]}
              onPress={() => {
                // props.navigation.navigate('Login');
                logout();
                setSelectTyp('Logout');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelectTyp != 'Logout' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Logout' ? Colors.white : '#434540',
                }}>
                Log out
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* </ScrollView> */}
      </Modal>
      {/* </> */}
      {/* )} */}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  text6: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
  },
  text7: {
    color: Colors.white,
    fontSize: normalize(12),
  },
  imageLeft: {
    height: normalize(18),
    width: normalize(17),
  },
  upimage: {
    height: normalize(18),
    width: normalize(18),
  },
  profile: {
    height: normalize(49),
    width: normalize(49),
  },
  profileCollabration: {
    height: normalize(19),
    width: normalize(19),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(12),
    width: normalize(12),
  },
  filterBtn: {
    borderWidth: normalize(1),
    width: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(9),
    borderRadius: normalize(6),
    paddingVertical: normalize(3),
  },
  filterText: {
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Medium,
    color: Colors.white,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(14),
    opacity: 0.7,
    marginStart: normalize(6),
    alignSelf: 'flex-start',
  },
  btn: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: normalize(4),
    alignItems: 'center',
    paddingHorizontal: normalize(7),
    height: normalize(29),
  },
  imagem: {
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.black,
    marginEnd: normalize(9),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
  barterDiscount: {
    height: normalize(130),
    width: normalize(151),
    justifyContent: 'flex-end',
    padding: normalize(6),
  },
  barterTextStyle: {
    color: Colors.white,
    fontSize: normalize(10),
    // marginStart: normalize(3),
    alignSelf: 'flex-start',
    marginTop: normalize(6),
    fontFamily: Fonts.Inter_Medium,
  },
  brandStyle: {
    color: Colors.white,
    fontSize: normalize(12),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_Medium,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(6),
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '99%',
    position: 'absolute',
    bottom: normalize(10),
    // width: normalize(136),
    // height: normalize(36),
  },
  barterImageViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: normalize(9),
  },
  offerStyle: {
    backgroundColor: Colors.white,
    height: normalize(16),
    alignSelf: 'flex-start',
    marginTop: normalize(9),
    borderRadius: normalize(3),
    paddingHorizontal: normalize(3),
    justifyContent: 'center',
  },
  offerTextStyle: {
    color: Colors.black,
    fontSize: normalize(10),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_SemiBold,
  },
  todateStyle: {
    color: Colors.white,
    fontSize: normalize(10),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Light,
  },
  discountStyle: {
    backgroundColor: Colors.white,
    height: normalize(16),
    alignSelf: 'flex-start',
    marginTop: normalize(9),
    borderRadius: normalize(3),
    paddingHorizontal: normalize(3),
    justifyContent: 'center',
  },
  discountTextStyle: {
    color: Colors.black,
    fontSize: normalize(10),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_SemiBold,
  },
  imageBackStyle: {
    height: normalize(140),
    width: normalize(136),
    justifyContent: 'flex-end',
    padding: normalize(6),
  },
  barter: {
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    backgroundColor: '#181818',
    padding: normalize(5),
    height: normalize(234),
    width: Dimensions.get('window').width / 2.2,
    alignItems: 'center',
    borderRadius: normalize(4),
    marginEnd: normalize(5),
    marginTop: normalize(9),
  },
  barter1: {
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    backgroundColor: '#181818',
    padding: normalize(5),
    height: normalize(234),
    width: Dimensions.get('window').width / 2.2,
    alignItems: 'center',
    borderRadius: normalize(4),
    marginTop: normalize(9),
  },
});
export default Barter;
