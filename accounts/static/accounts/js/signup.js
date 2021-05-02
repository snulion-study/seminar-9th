import { signupFeature } from './signupFeature.js';

// id 어트리뷰트가 있는 요소 노드를 취득하는 경우에는 getElementById 메서드를 사용하고
// 그 외의 경우에는 querySelector, querySelectorAll 메서드를 사용하는 것을 권장한다.
const signupForm = document.getElementById('signup-form');
const modalCloseButton = document.querySelector(
	'.modal-header > .close-button'
);

// 이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들만을 바인딩할 수 있다.
signupForm.onsubmit = (e) => signupFeature.handleSignup(e);
modalCloseButton.onclick = () => signupFeature.handleModalCloseBtnClick();
