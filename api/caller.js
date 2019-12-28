import {AsyncStorage} from 'react-native';
import {POST_NOTIFICATION_ENDPOINT} from './endpoint';
import {async} from 'q';
// import Base64 from "./base64"
export const GET = async (endpoint, params = {}, headers = {}) => {
  const token = await AsyncStorage.getItem ('jwt');
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = token;
  return fetch (endpoint, {
    method: 'GET',
    headers: headers,
  }).then (res => res.json ());
};

export const POST = async (endpoint, params = {}, headers = {}, body = {}) => {
  const token = await AsyncStorage.getItem ('jwt');
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = token;
  return fetch (endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify (body),
  }).then (res => res.json ());
};

export const POST_NOBODY = async (endpoint, params = {}, headers = {}, body = {}) => {
  headers["Content-Type"] = "application/json";
  const token = await AsyncStorage.getItem("jwt");
  headers["Authorization"] = token;
  return fetch(endpoint, {
     method: "POST",
     headers: headers,
     body: JSON.stringify(body)
  });
};


export const POSTLOGIN = async (
  endpoint,
  params = {},
  headers = {},
  body = {}
) => {
  headers['Content-Type'] = 'application/json';
  return fetch (endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify (body),
  });
};

export const PUT = async (endpoint, params = {}, headers = {}, body = {}) => {
  const token = await AsyncStorage.getItem ('jwt');
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = token;
  return fetch (endpoint, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify (body),
  });
};

export const DELETE = (endpoint, params = {}, headers = {}) => {
  return fetch (endpoint, {
    method: 'DELETE',
    headers: headers,
  });
};

export const POST_NOTIFICATION = (
  body = {},
  deviceId
) => {
  var notificationParam = {
    deviceId: deviceId,
    title: 'FixxySystem App Notificaiton',
    subtitle: 'User notifcation',
    body: 'You have a new notifcation',
    data: body,
    catogery: 'notification',
  };
  return fetch (POST_NOTIFICATION_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify (body),
  }).then (res => res.json ());
};

// export const UPLOAD = async data => {
//    const form = new FormData();
//    form.append("UPLOADCARE_PUB_KEY", "c707f3320aac10d335b9");
//    let options = {
//       headers: {
//          "Content-Type": "multipart/form-data"
//       },
//       method: "POST",
//       body: form
//    };
//    generateBlob(`${data}`)
//    //   options.body.append("file", );
// //    const request = new XMLHttpRequest();
// //    request.open("POST", "https://upload.uploadcare.com/base");
// //    request.send(form);
// // return request;
//       const res = await fetch("https://upload.uploadcare.com/base", options);
//        return await res.json();
// };
