import React, {useRef} from 'react';
import WebView from 'react-native-webview';

const SignUpWebViewScreen = () => {
  let webViewRef = useRef();

  const handleSetRef = _ref => {
    console.log(_ref);
    webViewRef = _ref;
  };

  const onMessage = e => {
    console.log(e.nativeEvent.data);
    const event = JSON.parse(e.nativeEvent.data);
    console.log('onMessage', event);
    if (event.method === 'click') {
      console.log('이벤트 발생');
    }
  };

  const handleOnMessage = ({nativeEvent: {data}}) => {
    // data에 웹뷰에서 보낸 값이 들어옵니다.
    console.log(data);
  };

  const onLoadProgress = ({nativeEvent}) => {
    if (nativeEvent.progress === 1) {
      if (webViewRef.current) {
        webViewRef.postMessage(JSON.stringify({changeText: 'World'}), '*');
      }
    }
  };

  const handleEndLoading = e => {
    // console.log('handleEndLoading');
    /** rn에서 웹뷰로 정보를 보내는 메소드 */
    webViewRef.postMessage('로딩 완료시 webview로 정보를 보내는 곳');
  };

  return (
    <WebView
      onLoadEnd={handleEndLoading}
      onMessage={onMessage}
      onLoadProgress={onLoadProgress}
      ref={handleSetRef}
      // source={{uri: 'https://coinvillage.netlify.app/signup'}}
      source={{uri: 'http://localhost:3000/signup'}}
      // style={{marginTop: 0}}
    />
  );
};

export default SignUpWebViewScreen;
