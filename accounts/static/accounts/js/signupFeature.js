export const signupFeature = {
	bodyTag: document.querySelector('body'),
	inputTags: [...document.querySelectorAll('input')],
	signupErrorModal: document.getElementById('signup-error-modal'),

	handleSignupFormSubmitted(e) {
		e.preventDefault();

		if (
			this.validateUsername(this.getUsername()) &&
			this.validatePassword(this.getPasswords())
		) {
			this.handleSignupSuccess(e);
		} else {
			this.handleSignupFail();
		}
	},

	handleSignupSuccess(e) {
		e.target.submit();
	},

	handleSignupFail() {
		this.showSignupErrorModal();
		this.setGrayBackGroundColor();
		this.disableInputTags();
	},

	handleModalCloseBtnClick() {
		this.hideSignupErrorModal();
		this.resetGrayBackGroundColor();
		this.enableInputTags();
	},

	validateUsername(username) {
		return username !== '';
	},

	validatePassword(passwords) {
		return (
			this.compareIsSamePassword(passwords) &&
			this.checkIsValidFormatPassword(passwords)
		);
	},

	getUsername() {
		return document.querySelector('input[name=username]').value;
	},

	getPasswords() {
		return [...document.querySelectorAll('input[type=password]')].map(
			(input) => input.value
		);
	},

	compareIsSamePassword([pw1, pw2]) {
		return pw1 === pw2;
	},

	checkIsValidFormatPassword([pw]) {
		const regExp = /^[A-Za-z0-9]{3,}$/;

		return regExp.test(pw);
	},

	showSignupErrorModal() {
		this.signupErrorModal.classList.add('show');
	},

	hideSignupErrorModal() {
		this.signupErrorModal.classList.remove('show');
	},

	setGrayBackGroundColor() {
		this.bodyTag.classList.add('gray');
	},

	resetGrayBackGroundColor() {
		this.bodyTag.classList.remove('gray');
	},

	disableInputTags() {
		this.inputTags.forEach((inputTag) => (inputTag.disabled = true));
	},

	enableInputTags() {
		this.inputTags.forEach((inputTags) => (inputTags.disabled = false));
	},
};
