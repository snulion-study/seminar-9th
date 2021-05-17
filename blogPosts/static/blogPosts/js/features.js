export const footerFeature = {
	copyrightTag: document.getElementById('copyright-text'),

	setYear() {
		const thisYear = new Date().getFullYear();
		this.copyrightTag.textContent = `SNU LIKELION © ${thisYear}`;
	},
};

export const searchFeature = {
	doSearch(inputVal) {
		const searchKeyword =
			inputVal ?? document.getElementById('search-bar').value;
		const posts = this.getAllPosts();
		const unMatchedPosts = this.getUnMatchedPosts(posts, searchKeyword);

		this.reset(posts);
		this.hidePosts(unMatchedPosts);
	},

	getAllPosts() {
		const posts = [
			...document.querySelectorAll(
				'.demo-card-square.mdl-card.mdl-shadow--2dp'
			),
		];

		return posts.map((post) => ({
			post,
			postTitle: post.firstElementChild.nextElementSibling.textContent.trim(),
		}));
	},

	getUnMatchedPosts(posts, searchKeyword) {
		return posts.filter(({ postTitle }) => !postTitle.includes(searchKeyword));
	},

	hidePosts(posts) {
		return posts.forEach(({ post }) => post.classList.add('hide'));
	},

	showPosts(posts) {
		return posts.forEach(({ post }) => post.classList.remove('hide'));
	},

	reset(posts) {
		this.showPosts(posts || this.getAllPosts());
	},

	handleEnterPress(e) {
		if (e.key === 'Enter') {
			this.doSearch(e.target.value);
		}
	},
};

export const postFeature = {
	saveHistory() {
		const viewedPosts = this.getHistory();

		const {
			dataset: { postId },
			textContent: postTitle,
		} = document.getElementById('post-title');

		if (!this.checkIsDuplicate(viewedPosts, postId)) {
			localStorage.setItem(
				'viewedPosts',
				JSON.stringify([{ postId, postTitle }, ...viewedPosts])
			);
		}
	},

	getHistory() {
		return JSON.parse(localStorage.getItem('viewedPosts')) || [];
	},

	checkIsDuplicate(viewedPosts, newPostId) {
		return viewedPosts.some(
			({ postId: savedPostId }) => savedPostId === newPostId
		);
	},

	removeHistory() {
		localStorage.removeItem('viewedPosts');
	},
};

export const logoutFeature = {
	logoutModal: document.getElementById('log-out-modal'),

	handleLogoutBtnClick(e) {
		e.preventDefault();
		this.showLogoutModal();
		this.lockScroll();

		const viewedPosts = postFeature.getHistory();
		const modalContent = document.querySelector(
			'#log-out-modal > .modal-content'
		);
		const hasLogoutModalOpened =
			modalContent.children.length === viewedPosts.length;

		if (!hasLogoutModalOpened) {
			this.setViewedPostCount(viewedPosts);
			this.showViewedPostTitle(viewedPosts);
		}
	},

	handleModalCancelBtnClick() {
		this.hideLogoutModal();
		this.unlockScroll();
	},

	hideLogoutModal() {
		this.logoutModal.classList.remove('show');
	},

	showLogoutModal() {
		this.logoutModal.classList.add('show');
	},

	setViewedPostCount(viewedPosts) {
		document.querySelector(
			'#log-out-modal > .modal-header > .viewed-post-count'
		).textContent = viewedPosts.length;
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

	handleModalLogoutBtnClick() {
		const redirectUrl = this.getRedirectUrl();
		this.moveToUrl(redirectUrl);
		postFeature.removeHistory();
	},

	getRedirectUrl() {
		return document.getElementById('logout').getAttribute('href');
	},

	moveToUrl(redirectUrl) {
		window.location.href = redirectUrl;
	},

	lockScroll() {
		document
			.querySelector('.mdl-layout__content')
			.style.setProperty('overflow', 'hidden');
	},

	unlockScroll() {
		document
			.querySelector('.mdl-layout__content')
			.style.setProperty('overflow', 'auto');
	},
};
