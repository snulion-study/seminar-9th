const signupForm = document.getElementById('signup-form');
signupForm.onsubmit = (e) => handleSignupFormSubmitted(e);

const handleSignupFormSubmitted = (e) => {
	e.preventDefault();
	username = getUsername();
	passwords = getPasswords();

	console.log(
		`사용자 이름 : ${username}, 비밀번호: ${passwords[0]}, 비밀번호 확인: ${passwords[1]}`
	);
	if (validateUsername(username) && validatePassword(passwords)) {
		console.log('Valid signup form!');
		handleSignupSuccess();
	} else {
		console.log('Invalid signup form!');
		handleSignupFail();
	}
};

const getUsername = () => {
	return document.querySelector('input[name=username]').value;
};

const validateUsername = (username) => {
	return username !== '';
};

const getPasswords = () => {
	return [...document.querySelectorAll('input[type=password]')].map(
		(input) => input.value
	);
};

const compareIsSamePassword = ([pw1, pw2]) => {
	return pw1 === pw2;
};

const validatePassword = (passwords) => {
	return (
		compareIsSamePassword(passwords) && checkIsValidFormatPassword(passwords)
	);
};

const checkIsValidFormatPassword = ([pw]) => {
	const regExp = /^[A-Za-z0-9]{3,}$/;

	return regExp.test(pw);
};

const handleSignupSuccess = () => {
	signupForm.submit();
};

const handleSignupFail = () => {
	showSignupErrorModal();
	setGrayBackGroundColor();
	disableInputTags();
};

const signupErrorModal = document.getElementById('signup-error-modal');
const showSignupErrorModal = () => {
	signupErrorModal.classList.add('show');
};

const modalCloseBtn = document.querySelector('.modal-header > .close-button');
modalCloseBtn.onclick = () => handleModalCloseBtnClick();

const handleModalCloseBtnClick = () => {
	hideSignupErrorModal();
	resetGrayBackGroundColor();
	enableInputTags();
};

const hideSignupErrorModal = () => {
	signupErrorModal.classList.remove('show');
};

const bodyTag = document.querySelector('body');

const setGrayBackGroundColor = () => {
	bodyTag.classList.add('gray');
};

const resetGrayBackGroundColor = () => {
	bodyTag.classList.remove('gray');
};

const inputTags = [...document.querySelectorAll('input')];

const disableInputTags = () => {
	inputTags.forEach((inputTag) => (inputTag.disabled = true));
};

const enableInputTags = () => {
	inputTags.forEach((inputTags) => (inputTags.disabled = false));
};
