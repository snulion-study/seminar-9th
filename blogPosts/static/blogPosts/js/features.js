// 중복으로 사용되는 features
const commonFeature = {
	getViewedPosts() {
		return JSON.parse(localStorage.getItem('viewedPosts')) || [];
	},
};

// 검색 기능과 관련된 features
const searchFeature = {
	handleSearch(inputVal) {
		const { value: searchKeyword } = document.getElementById('search-bar');
		const posts = this.getAllPosts();
		const unMatchedPosts = this.getUnMatchedPosts(
			posts,
			inputVal ?? searchKeyword
		);

		this.handleReset();
		this.handlePostHidden(unMatchedPosts, true);
	},

	handleEnterPress(e) {
		if (e.key === 'Enter') {
			this.handleSearch(e.target.value);
		}
	},

	handleReset() {
		const posts = this.getAllPosts();
		this.handlePostHidden(posts, false);
	},

	getAllPosts() {
		const postElements = [...document.querySelectorAll('.index-post-title')];

		const posts = postElements.map((post) => {
			const [
				{ textContent: titleTextNode },
				{ textContent: likeCountTextNode },
			] = [post.firstElementChild.firstElementChild, post.lastElementChild];

			return {
				post,
				title: titleTextNode.trim(),
				likeCount: +likeCountTextNode.trim().split(/\s/)[0],
			};
		});

		return posts;
	},

	getUnMatchedPosts(posts, searchKeyword) {
		return posts.filter(({ title }) => !title.includes(searchKeyword));
	},

	handlePostHidden(posts, isHidden) {
		posts.forEach(({ post }) => post.classList.toggle('hide', isHidden));
	},
};

// Footer와 관련된 features
const footerFeature = {
	setYear() {
		const year = new Date().getFullYear();
		document.querySelector('.copyright').textContent = `SNU LIKELION ${year}`;
	},
};

// Post와 관련된 features
const postFeature = {
	saveHistory() {
		const viewedPosts = commonFeature.getViewedPosts();

		const {
			dataset: { postId },
			textContent: postTitle,
		} = document.getElementById('post-title');

		const isDuplicated = viewedPosts.some(
			({ postId: savedPostId }) => savedPostId === postId
		);

		if (!isDuplicated) {
			localStorage.setItem(
				'viewedPosts',
				JSON.stringify([{ postId, postTitle }, ...viewedPosts])
			);
		}
	},

	removeHistory() {
		localStorage.remove('viewedPosts');
	},
};

// Log-out과 관련된 features
const logOutFeature = {
	handleLogOutBtnClick(e) {
		e.preventDefault();
		this.showLogOutModal();
	},

	handleModalLogOutBtnClick() {
		const redirectUrl = this.getRedirectUrl();
		this.moveToUrl(redirectUrl);
		postFeature.removeHistory();
	},

	handleModalCancelBtnClick() {
		this.hideLogOutModal();
	},

	getRedirectUrl() {
		return document.getElementById('log-out').getAttribute('href');
	},

	moveToUrl(redirectUrl) {
		window.location.href = redirectUrl;
	},

	showLogOutModal() {
		document.getElementById('log-out-modal').classList.add('show');
		this.lockScroll();

		const viewedPosts = commonFeature.getViewedPosts();
		this.setViewedPostCount(viewedPosts);
		this.showViewedPostTitle(viewedPosts);
	},

	hideLogOutModal() {
		document.getElementById('log-out-modal').classList.remove('show');
		this.unlockScroll();
	},

	lockScroll() {
		document.querySelector('body').classList.add('hidden');
		document.querySelector('html').classList.add('hidden');
	},

	unlockScroll() {
		document.querySelector('body').classList.remove('hidden');
		document.querySelector('html').classList.remove('hidden');
	},

	setViewedPostCount({ length }) {
		document.querySelector(
			'#log-out-modal > .modal-header > .viewed-post-count'
		).textContent = length;
	},

	showViewedPostTitle(viewedPosts) {
		const fragment = document.createDocumentFragment();

		viewedPosts.forEach(({ postTitle }) => {
			fragment.appendChild(
				this.makeElement(['li', 'class', 'viewed-post', postTitle])
			);
		});

		const modalContent = document.querySelector(
			'#log-out-modal > .modal-content'
		);
		modalContent.appendChild(fragment);
	},

	makeElement([tagName, attribute, value, textContent]) {
		const element = document.createElement(tagName || 'li');
		element.setAttribute(attribute || 'class', value || '');
		element.textContent = textContent || '';

		return element;
	},
};

export { searchFeature, footerFeature, postFeature, logOutFeature };