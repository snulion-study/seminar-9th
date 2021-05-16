import { footerFeature, logoutFeature } from './features.js';

(() => {
	footerFeature.setYear();
})();

(() => {
	const logoutBtn = document.getElementById('logout');
	logoutBtn.onclick = (e) => logoutFeature.handleLogoutBtnClick(e);
})();

(() => {
	const modalCancelBtn = document.querySelector(
		'#log-out-modal > .modal-footer > .cancel'
	);
	modalCancelBtn.onclick = () => logoutFeature.handleModalCancelBtnClick();

	const modalLogoutBtn = document.querySelector(
		'#log-out-modal > .modal-footer > .confirm'
	);
	modalLogoutBtn.onclick = () => logoutFeature.handleModalLogoutBtnClick();
})();
