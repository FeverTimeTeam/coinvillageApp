1. [코빌 서비스 소개](#_코빌_서비스_소개)
2. [기술 소개](#기술_소개)

# 코빌 서비스 소개
<img src="https://user-images.githubusercontent.com/87538540/190533767-bc4b0940-81dd-4520-9eb0-4652ae7f4555.png" />
<img src="https://user-images.githubusercontent.com/87538540/190533813-0fec501f-3491-42ac-8b57-9094141985c1.png" />
<img src="https://user-images.githubusercontent.com/87538540/190533984-73c1743f-e4cc-4c10-8ba0-b858ba854d80.png" />
<img src="https://user-images.githubusercontent.com/87538540/190534010-d1e6fbb9-6eff-4969-8430-3584e0bbd1d0.png" />
<img src="https://user-images.githubusercontent.com/87538540/190534041-c5c8c439-8904-49bc-b950-4d29b8cfe36a.png" />
<img src="https://user-images.githubusercontent.com/87538540/190534150-d59add41-8f30-419d-9025-70b5549d344f.png" />
<img src="https://user-images.githubusercontent.com/87538540/190541772-2511d0bc-e1e5-4875-8dee-6f94e514c022.png" />
<img src="https://user-images.githubusercontent.com/87538540/190541787-74147924-5a46-44b6-ac83-6f431baf703f.png" />
<img src="https://user-images.githubusercontent.com/87538540/190541803-c71ff8be-bb6a-4d8d-8a66-7ddf6a6481be.png" />
<img src="https://user-images.githubusercontent.com/87538540/190542247-21ab38db-08b2-473f-9e82-9a054d6f37fc.png" />
<img src="https://user-images.githubusercontent.com/87538540/190542257-80ec0a83-c262-45a6-bfa2-f60aac5dff89.png" />
<img src="https://user-images.githubusercontent.com/87538540/190542267-7b8d689f-9950-48cb-af87-fb41e1c8d164.png" />
<img src="https://user-images.githubusercontent.com/87538540/190542273-bcb7e3be-a11e-4491-973e-a6be3972368b.png" />
<img src="https://user-images.githubusercontent.com/87538540/190542277-6459eb05-8e5b-44e6-a2f2-36137541587f.png" />

- 코빌 웹 사이트 바로가기
https://coinvillage.netlify.app/aboutCoinvillage

# 기술 소개
## React Native를 사용하여 cross flatform으로 안드로이드, ios 동시 개발
- styles
	- HTML의 class처럼 사용가능한 StyleSheet을 사용
		코드를 깔끔하게 유지 가능, 적용된 스타일의 이유를 명확히 알 수 있고 코드 수정도 용이해짐
- 상태 관리
	- recoil 사용
		- redux에 비해 recoil은 이해하고 사용하기 쉬운 라이브러리이다.
		- atom -> selector를 거쳐 컴포넌트까지 전달되는 하나의 data-flow를 가지고 있다.
			- atom: 작은 단위로 컴포넌트들이 구독할 수 있는 단위
			- selector: 동기적/비동기적으로 상태를 변환
- typescript 사용
	- 컴파일 언어, 정적 타입 언어인 typescript를 사용해서 동적 타입의 인터프리터 언어인 javascript의 한계를 극복하고 코드 작성 단계에서 타입을 체크해 오류를 미리 확인할 수 있었다. 그리고 typescript는 미리 타입을 결정하여 실행 속도가 빠르다는 장점을 가지고 있다.

	
