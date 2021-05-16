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
