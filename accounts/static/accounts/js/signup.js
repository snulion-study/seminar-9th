const signupForm = document.getElementById('signup-form');
signupForm.onsubmit = (e) => handleSignupFormSubmitted(e);

const handleSignupFormSubmitted = (e) => {
	e.preventDefault();

	if (validateUsername(getUsername()) && validatePassword(getPasswords())) {
		console.log('Valid signup form!');
	} else {
		console.log('Invalid signup form!');
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
	return pw1 !== pw2;
};

const validatePassword = (passwords) => {
	return compareIsSamePassword(passwords);
};

