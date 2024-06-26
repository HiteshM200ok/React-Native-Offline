import RNNetInfo, {
  NetInfoStateType,
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import {EventRegister} from 'react-native-event-listeners';
import {EventRegisterKeys} from '../Utils/Utils';

export interface INetInfo {
  isWifiEnabled: () => boolean;
  isNetworkConnected: () => boolean;
  subscribeNetInfoService: () => void;
  unsubscribeNetInfoService: () => void;
}

const singletonEnforcer = Symbol();

class NetInfoService {
  static ref: NetInfoService;
  private details: any = null;
  private isInternetReachable: boolean | null = false;
  private type: NetInfoStateType | null = null;
  private isConnected: boolean = false;
  private netInfoState: NetInfoState | null = null;
  private subscribedList: NetInfoSubscription[] = [];

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot create NetInfoService singleton instance');
    }
  }

  static get instance() {
    if (!this.ref) {
      this.ref = new NetInfoService(singletonEnforcer);
    }
    return this.ref;
  }
  subscribeNetInfoService() {
    if (this.subscribedList[0]) {
      return;
    }
    let subscribed = RNNetInfo.addEventListener((state: NetInfoState) => {
      const {details, isConnected, isInternetReachable, type} = state;
      this.details = details;
      this.isInternetReachable = isInternetReachable;
      this.isConnected = isConnected === true;
      this.type = type;
      this.netInfoState = state;
      EventRegister.emit(EventRegisterKeys.onOfflineDocument, state);
    });
    this.subscribedList.push(subscribed);
  }
  unsubscribeNetInfoService() {
    // Unsubscribe
    this.subscribedList.forEach((unsubscribed: NetInfoSubscription) =>
      unsubscribed(),
    );
  }
  isWifiEnabled() {
    return this.isConnected && this.type === 'wifi';
  }
  isNetworkConnected() {
    return this.isConnected;
  }
  getNetworkType() {
    return this.type;
  }
  getNetInfoState() {
    return this.netInfoState;
  }
}

export const NetInfo: INetInfo = NetInfoService.instance;
