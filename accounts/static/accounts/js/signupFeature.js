const signupFeature = {
  body: document.querySelector('body'),
  inputElems: [...document.querySelectorAll('input')],
  alertModal: document.getElementById("signup-alert-modal"),
  passwordInputElems: [...document.querySelectorAll('input[type=password]')],

  // 회원가입 form 제출 시 이벤트 핸들링
  handleSignup(e) {
    e.preventDefault();
  
    const passwords = this.getPasswords();
    const isValidPassword = this.validatePassword(passwords);
    
    if (isValidPassword) {
      e.target.submit();
    } else {
      this.handleSignupFail();
    }
  },

  getPasswords() {
    return this.passwordInputElems.map(input => input.value);
  },

  resetPassword() {
    this.passwordInputElems.forEach(input => input.value = '');
  },

  // 1. 비밀번호가 일치하는지 비교하고,
  // 2. 주어진 조건을 통과하는지 확인한다.
  validatePassword([pw1, pw2]) {
    if (pw1 !== pw2) {
      return false;
    }
    
    // 알파벳 대소문자 또는 숫자로 시작하고 끝나며 3자 이상인지 검사한다.
    const regExp = /^[A-Za-z0-9]{3,}$/;
    
    return regExp.test(pw1);
  },

  handleSignupFail() {
    this.resetPassword();
    this.showAlertModal();  
    this.setGrayBackGroundColor();
    this.disableInput();
  },

  handleModalCloseBtnClick() {
    this.hideAlertModal();
    this.removeGrayBackGroundColor();
    this.activateInput();
    document.querySelector('input[name=password1]').focus();
  },

  // 입력 오류 Mdodal 핸들링
  showAlertModal() {
    this.alertModal.classList.add('show');
  },

  hideAlertModal() {
    this.alertModal.classList.remove('show');
  },

  // 회색 배경색깔 핸들링
  setGrayBackGroundColor() {
    this.body.classList.add('gray');
  },

  removeGrayBackGroundColor() {
    this.body.classList.remove('gray');
  },

  // 인풋 요소 활성화 여부 핸들링
  disableInput() {
    this.inputElems.forEach(input => input.disabled = true);
  },

  activateInput() {
    this.inputElems.forEach(input => input.disabled = false);
  },
}

export { signupFeature } 