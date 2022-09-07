import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';

const WebViewContainer = () => {
  return (
    <WebView
      source={{uri: 'https://phenomenal-dasik-bd2db1.netlify.app/'}}
      style={{marginTop: 0}}
    />
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default WebViewContainer;
