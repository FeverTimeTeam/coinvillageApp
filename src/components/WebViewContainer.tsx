import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';

const WebViewContainer = () => {
  let webViewRef = useRef();

  const handleSetRef = _ref => {
    webViewRef = _ref;
  };

  const onMessage = e => {
    const event = JSON.parse(e.nativeEvent.data);
    console.log('onMessage', event);
    if (event.method == 'click') {
      console.log('이벤트 발생');
    }
  };

  const onLoadProgress = ({nativeEvent}) => {
    if (nativeEvent.progress === 1) {
      if (webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({changeText: 'World'}),
          '*',
        );
      }
    }
  };
  return (
    <WebView
      webviewRef={webViewRef}
      source={{uri: 'https://coinvillage.netlify.app/'}}
      style={{marginTop: 0}}
      onLoadProgress={onLoadProgress}
    />
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default WebViewContainer;
