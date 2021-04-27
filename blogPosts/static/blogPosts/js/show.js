(() => {
  const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts')) || [];
  const { dataset: { postId: curPostId }, textContent: curPostTitle } = document.getElementById('post-title');
  const isDuplicated = viewedPosts.some(({ postId }) => postId === curPostId);

  if (!isDuplicated) {
    localStorage.setItem('viewedPosts', JSON.stringify([...viewedPosts, { curPostId, curPostTitle }]));
  }
})();
