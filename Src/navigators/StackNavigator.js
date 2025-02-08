import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Introduction from '../Screens/auth/Welcome';
import MobileNo from '../Screens/auth/Get Started';
import Otp from '../Screens/auth/Otp';
import SocialLogin from '../Screens/auth/SocialLogin';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/auth/Login';
import SignupName from '../Screens/auth/Signup Name';
import SignupAge from '../Screens/auth/Signup Age';
import SignupEmail from '../Screens/auth/Signup Email';
import Location from '../Screens/auth/Location';
import Language from '../Screens/auth/Language';
import Identity from '../Screens/auth/Identity';
import ContentNiche from '../Screens/auth/Content Niche';
import SocialAccounts from '../Screens/auth/Social Accounts';
import TabNavigator from '../navigators/TabNavigator';
import ContentLabEdit from '../Screens/main/Profile settings/Content Lab Edit';
import PaidInvite from '../Screens/main/Collaboration/invite/Paid Invite';
import Paid from '../Screens/main/Collaboration/offer/Paid';
import BarterInvite from '../Screens/main/Collaboration/invite/Barter Invite';
import Counteroffer from '../Screens/main/Collaboration/offer/Counter Offer';
import ContentLaboffer from '../Screens/main/Collaboration/offer/Content lab offer';
import BarterInviteDiscount from '../Screens/main/Collaboration/invite/Barter Invite Discount';
import EditProfile from '../Screens/main/Profile settings/Edit Profile';
import Withdraw from '../Screens/main/Profile settings/Withdraw';
import Profile from '../Screens/main/Profile settings/Profile';
import Withdraw1 from '../Screens/main/Withdraw1';
import PrivacyPolicy from '../Screens/main/Profile settings/Privacy Policy';
import Account from '../Screens/main/Profile settings/Account';
import Terms from '../Screens/main/Profile settings/Terms';
import ContactUs from '../Screens/main/Profile settings/Contact Us';
import ContactUsSend from '../Screens/main/Profile settings/Contact Us Send';
import PushNotifications from '../Screens/main/Profile settings/Push Notifications';
import Notifications from '../Screens/main/Profile settings/Notifications';
import Active from '../Screens/main/Collaboration/active/Active';
import Location2 from '../Screens/auth/Location2';
import Deliverable from '../Screens/main/Collaboration/active/Deliverable In Progress';
import DeliverableApproved from '../Screens/main/Collaboration/active/Deliverable Approved';
import DeliverableInProgress from '../Screens/main/Collaboration/active/Deliverable In Progress';
import DeliverableLive from '../Screens/main/Collaboration/active/Deliverable Live';
import DeliverablePayment from '../Screens/main/Collaboration/Deliverable Payment';
import IdVerification from '../Screens/main/Profile settings/Id Verification';
import IdVerification2 from '../Screens/main/Profile settings/Id Verification2';
import IdVerification3 from '../Screens/main/Profile settings/Id Verification3';
import Commercial from '../Screens/main/Profile settings/Commercial';
import PaymentAddPan from '../Screens/main/Profile settings/Payment Add Pan';
import PaymentBankDetails from '../Screens/main/Profile settings/Payment Bank Details';
import PaymentEdit from '../Screens/main/Profile settings/Payment Edit';
import ActiveContent from '../Screens/main/Collaboration/Active Content';
import DeliverableApprovedContent from '../Screens/main/Collaboration/Deliverable Approved Content';
import DeliverablePaymentContent from '../Screens/main/Collaboration/Deliverable Payment Content';
import DeliverableInProgressContent from '../Screens/main/Collaboration/Deliverable In Progress Content';
import Address from '../Screens/main/Profile settings/Address';
import Explore from '../Screens/main/Barter/Explore';
import Requested from '../Screens/main/Barter/Requested';
import GetStarted from '../Screens/auth/Get Started';
import SpotlightInsta from '../Screens/main/Profile settings/Spotlight Insta';
import SpotlightYoutube from '../Screens/main/Profile settings/Spotlight Youtube';
import {useSelector} from 'react-redux';
import BarterOffer from '../Screens/main/Collaboration/offer/Barter offer invite';
import ContentLabCounteroffer from '../Screens/main/Collaboration/offer/Content lab counteroffer';
import Chat from '../Screens/main/Message/Chat';
import OfferScreen from '../Screens/main/Collaboration/offer/Offer Terms';
import BarterInviteOffer from '../Screens/main/Collaboration/offer/Barter Invite Offer';
import ContactUsPayment from '../Screens/main/Profile settings/Contact Us Payment';
import Messages from '../Screens/main/Message/Messages';
import NotificationHandler from './NotificationComponent';
import OtpEmailVerify from '../Screens/auth/OtpEmailVerify';
import OtpEmailVerifyEdit from '../Screens/main/Profile settings/OtpEmailVerifyEdit';
import Content from '../Screens/main/Collaboration/active/InstaContent';
import ContentPer from '../Screens/main/Collaboration/active/InstaContentPermission';
import YoutubeContent from '../Screens/main/Collaboration/active/YoutubeContent';
import YoutubeContentPer from '../Screens/main/Collaboration/active/YouutbeContentPermission';
import Payment from '../Screens/main/Profile settings/Payment';
import GstAdd from '../Screens/main/Profile settings/Gst';
import InstaContent from '../Screens/main/Profile settings/InstaContent';
import YoutubeContentShorts from '../Screens/main/Profile settings/YoutubeContent';

const Stack = createStackNavigator();

export default function StackNavigatior() {
  const AuthReducer = useSelector(state => state.AuthReducer);
  console.log(
    'TOKEN',
    AuthReducer?.token == null,
    AuthReducer?.profile === false || AuthReducer?.social === false,
  );

  const AuthScreens =
    AuthReducer?.token === null
      ? // ||
        // AuthReducer?.profile === false ||
        // AuthReducer?.profile === null ||
        // AuthReducer?.social === false ||
        // AuthReducer?.social === null
        {
          Introduction: Introduction,
          Login: Login,
          Otp: Otp,
          SignupName: SignupName,
          SignupAge: SignupAge,
          SignupEmail: SignupEmail,
          OtpEmailVerify: OtpEmailVerify,
        }
      : // AuthReducer?.signup == false || null &&
      AuthReducer?.signup === false
      ? {
          // SignupAge: SignupAge,
          // SignupEmail: SignupEmail,
          // SignupName: SignupName,
          // MobileNo: MobileNo,
          // SocialLogin: SocialLogin,
          GetStarted: GetStarted,
          Location: Location,
          Language: Language,
          Identity: Identity,
          ContentLaboffer: ContentLaboffer,
          ContentNiche: ContentNiche,
          Location2: Location2,
          Home: TabNavigator,
          Counteroffer: Counteroffer,
          BarterInvite: BarterInvite,
          BarterInviteOffer: BarterInviteOffer,
          EditProfileContentLab: ContentLabEdit,
          Paid: Paid,
          PaidInvite: PaidInvite,
          Explore: Explore,
          Requested: Requested,
          BarterInviteDiscount: BarterInviteDiscount,
          EditProfile: EditProfile,
          Withdraw: Withdraw,
          Profile: Profile,
          Withdraw1: Withdraw1,
          PrivacyPolicy: PrivacyPolicy,
          Account: Account,
          Terms: Terms,
          ContactUs: ContactUs,
          ContactUsSend: ContactUsSend,
          ContactUsPayment: ContactUsPayment,
          PushNotifications: PushNotifications,
          Notifications: Notifications,
          Active: Active,
          OtpEmailVerifyEdit: OtpEmailVerifyEdit,
          Deliverable: Deliverable,
          DeliverableApproved: DeliverableApproved,
          DeliverableInProgress: DeliverableInProgress,
          DeliverableLive: DeliverableLive,
          DeliverablePayment: DeliverablePayment,
          Content: Content,
          IdVerification: IdVerification,
          IdVerification2: IdVerification2,
          IdVerification3: IdVerification3,
          Commercial: Commercial,
          PaymentAddPan: PaymentAddPan,
          PaymentBankDetails: PaymentBankDetails,
          PaymentEdit: PaymentEdit,
          BarterOffer: BarterOffer,
          ContentLabCounteroffer: ContentLabCounteroffer,
          ActiveContent: ActiveContent,
          DeliverableInProgressContent: DeliverableInProgressContent,
          DeliverableApprovedContent: DeliverableApprovedContent,
          DeliverablePaymentContent: DeliverablePaymentContent,
          Address: Address,
          GstAdd: GstAdd,
          Payment: Payment,
          SpotlightInsta: SpotlightInsta,
          SpotlightYoutube: SpotlightYoutube,
          Messages: Messages,
          Chat: Chat,
          OfferScreen: OfferScreen,
        }
      : AuthReducer?.social === false
      ? {
        // GetStarted: GetStarted,
        // Location: Location,
        // Language: Language,
        // Identity: Identity,
        // ContentLaboffer: ContentLaboffer,
        // ContentNiche: ContentNiche,
        // Location2: Location2,
          SocialAccounts: SocialAccounts,
          Home: TabNavigator,
          Counteroffer: Counteroffer,
          BarterInvite: BarterInvite,
          EditProfileContentLab: ContentLabEdit,
          Paid: Paid,
          PaidInvite: PaidInvite,
          Explore: Explore,
          Requested: Requested,
          BarterInviteDiscount: BarterInviteDiscount,
          BarterOffer: BarterOffer,
          BarterInviteOffer: BarterInviteOffer,
          EditProfile: EditProfile,
          Withdraw: Withdraw,
          Profile: Profile,
          OtpEmailVerifyEdit: OtpEmailVerifyEdit,
          Withdraw1: Withdraw1,
          PrivacyPolicy: PrivacyPolicy,
          Account: Account,
          Terms: Terms,
          ContactUs: ContactUs,
          ContactUsSend: ContactUsSend,
          PushNotifications: PushNotifications,
          Notifications: Notifications,
          Active: Active,
          Deliverable: Deliverable,
          DeliverableApproved: DeliverableApproved,
          DeliverableInProgress: DeliverableInProgress,
          DeliverableLive: DeliverableLive,
          Payment: Payment,
          DeliverablePayment: DeliverablePayment,
          IdVerification: IdVerification,
          IdVerification2: IdVerification2,
          IdVerification3: IdVerification3,
          Commercial: Commercial,
          Content: Content,
          ContentPer: ContentPer,
          YoutubeContent: YoutubeContent,
          YoutubeContentPer: YoutubeContentPer,
          PaymentAddPan: PaymentAddPan,
          PaymentBankDetails: PaymentBankDetails,
          ContentLabCounteroffer: ContentLabCounteroffer,
          PaymentEdit: PaymentEdit,
          ContactUsPayment: ContactUsPayment,
          ContentLaboffer: ContentLaboffer,
          Messages: Messages,
          ActiveContent: ActiveContent,
          DeliverableInProgressContent: DeliverableInProgressContent,
          DeliverableApprovedContent: DeliverableApprovedContent,
          DeliverablePaymentContent: DeliverablePaymentContent,
          Address: Address,
          GstAdd: GstAdd,
          SpotlightInsta: SpotlightInsta,
          SpotlightYoutube: SpotlightYoutube,
          Chat: Chat,
          OfferScreen: OfferScreen,
          InstaContent: InstaContent,
          YoutubeContentShorts: YoutubeContentShorts,
        }
      : {
          Home: TabNavigator,
          Counteroffer: Counteroffer,
          BarterInvite: BarterInvite,
          EditProfileContentLab: ContentLabEdit,
          Paid: Paid,
          PaidInvite: PaidInvite,
          Explore: Explore,
          Requested: Requested,
          BarterInviteDiscount: BarterInviteDiscount,
          BarterOffer: BarterOffer,
          BarterInviteOffer: BarterInviteOffer,
          EditProfile: EditProfile,
          Withdraw: Withdraw,
          Profile: Profile,
          OtpEmailVerifyEdit: OtpEmailVerifyEdit,
          Withdraw1: Withdraw1,
          PrivacyPolicy: PrivacyPolicy,
          Account: Account,
          Terms: Terms,
          ContactUs: ContactUs,
          ContactUsSend: ContactUsSend,
          PushNotifications: PushNotifications,
          Notifications: Notifications,
          Active: Active,
          Deliverable: Deliverable,
          DeliverableApproved: DeliverableApproved,
          DeliverableInProgress: DeliverableInProgress,
          DeliverableLive: DeliverableLive,
          Payment: Payment,
          DeliverablePayment: DeliverablePayment,
          IdVerification: IdVerification,
          IdVerification2: IdVerification2,
          IdVerification3: IdVerification3,
          Commercial: Commercial,
          Content: Content,
          ContentPer: ContentPer,
          YoutubeContent: YoutubeContent,
          YoutubeContentPer: YoutubeContentPer,
          PaymentAddPan: PaymentAddPan,
          PaymentBankDetails: PaymentBankDetails,
          ContentLabCounteroffer: ContentLabCounteroffer,
          PaymentEdit: PaymentEdit,
          ContactUsPayment: ContactUsPayment,
          ContentLaboffer: ContentLaboffer,
          Messages: Messages,
          ActiveContent: ActiveContent,
          DeliverableInProgressContent: DeliverableInProgressContent,
          DeliverableApprovedContent: DeliverableApprovedContent,
          DeliverablePaymentContent: DeliverablePaymentContent,
          Address: Address,
          GstAdd: GstAdd,
          SpotlightInsta: SpotlightInsta,
          SpotlightYoutube: SpotlightYoutube,
          InstaContent: InstaContent,
          YoutubeContentShorts: YoutubeContentShorts,
          Chat: Chat,
          OfferScreen: OfferScreen,
        };
  return (
    <NavigationContainer>
      <NotificationHandler />
      <Stack.Navigator headerMode={'none'} initialRouteName="Introduction">
        {Object.entries({...AuthScreens}).map(([name, Component]) => (
          <Stack.Screen name={name} component={Component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
