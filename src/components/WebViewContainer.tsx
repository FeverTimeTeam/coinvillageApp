import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';

const WebViewContainer = () => {
  return (
    <WebView
      source={{uri: 'https://coinvillage.netlify.app/'}}
      style={{marginTop: 0}}
    />
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default WebViewContainer;
