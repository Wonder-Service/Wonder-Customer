
// export const BASE_URL = "http://10.1.149.86:8080";
export const BASE_URL = "https://prmproject-200708163028.azurewebsites.net"


export const LOGIN_ENDPOINT = `${BASE_URL}/login`;
export const DEVICEID_ENDPOINT = `${BASE_URL}/api/users/device-id/`;
export const ACCEPT_ORDER_ENDPOINT = `${BASE_URL}/api/orders`;
export const CANCEL_ORDER_ENDPOINT = `${BASE_URL}/api/order-cancel`;
export const CUSTOMER_ORDER_ENDPOINT = `${BASE_URL}/api/orders/jwt`;
export const USER_ENDPOINT = `${BASE_URL}/api/users`;
export const FEEDBACK_ENDPOINT = `${BASE_URL}/api/`;
export const USER_GET_PROFILE_ENDPOINT = `${BASE_URL}/api/users/jwt`;
export const POST_NOTIFICATION_ENDPOINT = 'https://expo.io/--/api/v2/push/send'
export const USER_CREATE_ENDPOINT = `${BASE_URL}/api/users/create`;

export const NOTIFICATION_TYPE_REQEST = 'NOTIFICATION_REQUEST_ORDER'

export const NOTIFICATION_TYPE_ACCEPT = 'NOTIFICATION_ACCEPT_ORDER'

export const NOTIFICATION_TYPE_COMPELETE = 'NOTIFICATION_COMPLETE_ORDER'

export const NOTIFICATION_TYPE_CANCEL = 'NOTIFICATION_CANCEL_ORDER'


