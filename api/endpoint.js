
// export const BASE_URL = "https://fixxyworker.herokuapp.com";
export const BASE_URL = "http://192.168.1.44:8080"


export const LOGIN_ENDPOINT = `${BASE_URL}/login`;
export const DEVICEID_ENDPOINT = `${BASE_URL}/api/users/device-id/`;
export const ACCEPT_ORDER_ENDPOINT = `${BASE_URL}/api/orders`;
export const USER_ENDPOINT = `${BASE_URL}/api/users`;
export const USER_GET_PROFILE_ENDPOINT = `${BASE_URL}/api/users/jwt`;
export const FEEDBACK_ENDPOINT = `${BASE_URL}/api`
export const POST_NOTIFICATION_ENDPOINT = 'https://expo.io/--/api/v2/push/send'


export const NOTIFICATION_TYPE_REQEST = 'NOTIFICATION_REQUEST_ORDER'

export const NOTIFICATION_TYPE_ACCEPT = 'NOTIFICATION_ACCEPT_ORDER'

export const NOTIFICATION_TYPE_COMPELETE = 'NOTIFICATION_COMPLETE_ORDER'

export const NOTIFICATION_TYPE_CANCEL = 'NOTIFICATION_CANCEL_ORDER'

    