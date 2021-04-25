// id 어트리뷰트가 있는 요소 노드를 취득하는 경우에는 getElementById 메서드를 사용하고
// 그 외의 경우에는 querySelector, querySelectorAll 메서드를 사용하는 것을 권장한다.
const signupForm = document.getElementById('signup-form');
const modalCloseButton = document.querySelector('.modal-header > .close-button');

// 이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들만을 바인딩할 수 있다.
signupForm.onsubmit = (e) => handleSignup(e);

// addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있다.
modalCloseButton.addEventListener('click', () => handleShowingAlertModal(false));
modalCloseButton.addEventListener('click', () => handleGreyBackgroundColor(false));
modalCloseButton.addEventListener('click', () => handleDisabledInput(false));

// 회원가입 form이 제출되는 이벤트에 바인딩되는 함수
const handleSignup = ( e ) => {
  e.preventDefault();

  const passwordValues = [...document.querySelectorAll('input[type=password]')].map(input => input.value);
  const [ firstPassword, secondPassword ] = passwordValues;
  const isValidPassword = validatePassword(firstPassword, secondPassword);

  if (isValidPassword) {
    e.target.submit();
  }
  else {
    resetPassword();
    handleShowingAlertModal(true);
    handleGreyBackgroundColor(true);
    handleDisabledInput(true);
  }
}

// 1. 비밀번호가 일치하는지 비교하고,
// 2. 주어진 조건을 통과하는지 확인한다.
const validatePassword = (pw1, pw2) => {
  if (pw1 !== pw2) {
    return false;
  }
  
  // 알파벳 대소문자 또는 숫자로 시작하고 끝나며 3자 이상인지 검사한다.
  const regExp = /^[A-Za-z0-9]{3,}$/;
  
  return regExp.test(pw1);
}

// 비밀번호란의 value 값을 모두 ''로 초기화한다.
const resetPassword = () => {
  const passwordInputs = [...document.querySelectorAll('input[type=password]')];
  passwordInputs.forEach(input => input.value = '');
}

// 입력 오류 Modal을 핸들링한다.
const handleShowingAlertModal = (isModalShown) => {
  const alertModal = document.getElementById('signup-alert-modal');
  alertModal.classList.toggle('show', isModalShown);
}

// 회색 배경색깔을 핸들링한다.
const handleGreyBackgroundColor = (isShown) => {
  const body = document.querySelector('body');
  body.classList.toggle('grey', isShown);
}

// 인풋값 비활성화 여부를 핸들링한다.
const handleDisabledInput = (disabled) => {
  const inputArr = [...document.querySelectorAll('input')];
  inputArr.forEach(input => input.disabled = disabled);
} 




