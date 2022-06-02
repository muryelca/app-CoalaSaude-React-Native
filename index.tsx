import React, {createRef, FunctionComponent} from 'react';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {WebViewMessage} from 'react-native-webview/lib/WebViewTypes';
import {NativeSyntheticEvent} from 'react-native';

const CHECK_COOKIE: string = `
  ReactNativeWebView.postMessage("Cookie: " + document.cookie);
  true;
`;

const onNavigationStateChange = (navigationState: WebViewNavigation) => {
  if (webViewRef.current) {
    webViewRef.current.injectJavaScript(CHECK_COOKIE);
  }
};

const onMessage = (event: NativeSyntheticEvent<WebViewMessage>) => {
  const {data} = event.nativeEvent;

  if (data.includes('Cookie:')) {
  }
};

let webViewRef = createRef<WebView>();
const LoginWebView: FunctionComponent = () => (
  <WebView
    ref={webViewRef}
    source={{uri: 'http://besafefrontend.herokuapp.com/'}}
    onNavigationStateChange={onNavigationStateChange}
    onMessage={onMessage}
  />
);
