import React, {useRef} from 'react';
import WebView from 'react-native-webview';

const SignUpScreen = () => {
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
      source={{uri: 'https://coinvillage.netlify.app/signup'}}
      style={{marginTop: 0}}
      onLoadProgress={onLoadProgress}
    />
  );
};

export default SignUpScreen;
