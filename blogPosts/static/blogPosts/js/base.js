import { footerFeature, logOutFeature } from './features.js';

// Footer의 연도 설정
(() => {
	footerFeature.setYear();
})();

// 로그아웃 버튼 클릭 시 이벤트 핸들링
(() => {
	const logOutBtn = document.getElementById('log-out');
	if (logOutBtn) {
		logOutBtn.onclick = (e) => logOutFeature.handleLogOutBtnClick(e);
	}
})();

// 로그아웃 Modal 내의 버튼 클릭 시 이벤트 핸들링
(() => {
	const modalLogOutBtn = document.querySelector(
		'#log-out-modal > .modal-footer > .confirm'
	);
	const modalCancelBtn = document.querySelector(
		'#log-out-modal > .modal-footer > .cancel'
	);
	if (modalLogOutBtn && modalCancelBtn) {
		modalLogOutBtn.onclick = () => logOutFeature.handleModalLogOutBtnClick();
		modalCancelBtn.onclick = () => logOutFeature.handleModalCancelBtnClick();
	}
})();
