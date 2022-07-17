export function userAuth() {
  const validSessionData = sessionStorage.getItem("userSessionData");

  if (validSessionData != null) {
    const nameLen = getUserSession().name.length;
  }

  if (validSessionData == null) {
    return false;
  } else if (getUserSession().name.length == 0) {
    return false;
  } else {
    return true;
  }
}

import { AES, enc } from "crypto-js";

export function setUserSession(userlogged) {
  const privatekey = "MYKESY4DDAEMHO";

  let obj = userlogged;

  //console.log("SetCalled");
  const userSessionData = AES.encrypt(JSON.stringify(obj), privatekey);
  sessionStorage.setItem("userSessionData", userSessionData.toString());
}

export function getUserSession() {
  const privatekey = "MYKESY4DDAEMHO";
  const userSessionData = AES.decrypt(
    sessionStorage.getItem("userSessionData"),
    privatekey
  );
  const userSessionObj = userSessionData.toString(enc.Utf8);

  return JSON.parse(userSessionObj);
}
