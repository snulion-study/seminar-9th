import { searchFeature } from './features.js';

(() => {
	document.getElementById('search-btn').onclick = () => {
		searchFeature.doSearch();
	};
	document.getElementById('reset-btn').onclick = () => {
		searchFeature.reset();
	};
	document.getElementById('search-bar').onkeypress = (e) => {
		searchFeature.handleEnterPress(e);
	};
})();
