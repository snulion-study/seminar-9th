import { searchFeature } from '/static/blogPosts/js/features.js';

// 검색 및 리셋 기능 이벤트 핸들링
(() => {
	document.getElementById('search-btn').onclick = () =>
		searchFeature.handleSearch();
	document.getElementById('search-bar').onkeypress = (e) =>
		searchFeature.handleEnterPress(e);
	document.getElementById('reset-btn').onclick = () =>
		searchFeature.handleReset();
})();
