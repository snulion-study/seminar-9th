(() => {
  const searchBtn = document.getElementById('search-btn');
  const searchBar = document.getElementById('search-bar');
  const resetBtn = document.getElementById('reset-btn');

  searchBtn.onclick = () => feature.search();
  searchBar.onkeypress = (e) => feature.handleEnterPress(e);
  resetBtn.onclick = () => feature.reset();
})();

const feature = {
  search(inputVal) {
    const { value: searchKeyword } = document.getElementById('search-bar');
  
    const posts = this.getAllPosts();
    const unMatchedPosts = this.getUnMatchedPosts(posts, inputVal ?? searchKeyword);

    this.reset();
    this.handlePostHidden(unMatchedPosts, true);
  },

  handleEnterPress(e) {
    if (e.key === 'Enter') {
      this.search(e.target.value);
    }
  },
  
  reset() {
    const posts = this.getAllPosts();
    this.handlePostHidden(posts, false);
  },

  getAllPosts() {
    const postElements = [...document.querySelectorAll('.index-post-title')];

    const posts = postElements.map(post => {
      const [
        { textContent: titleTextNode }, 
        { textContent: likeCountTextNode }
      ] = [post.firstElementChild.firstElementChild, post.lastElementChild];

      return {
        post, 
        title: titleTextNode.trim(), 
        likeCount: +likeCountTextNode.trim().split(/\s/)[0]
      };
    });

    return posts;
  },

  getUnMatchedPosts(posts, searchKeyword) {
    return posts.filter(({ title }) => !title.includes(searchKeyword));
  },

  handlePostHidden(posts, isHidden) {
    posts.forEach(({ post }) => post.classList.toggle('hide', isHidden));
  }
}
