const STORAGE_KEY = 'skill_exchange_posts';
const { skillPosts } = require('./mock');

function getPosts() {
  const posts = wx.getStorageSync(STORAGE_KEY);
  if (Array.isArray(posts) && posts.length) {
    return posts;
  }
  wx.setStorageSync(STORAGE_KEY, skillPosts);
  return skillPosts;
}

function savePosts(posts) {
  wx.setStorageSync(STORAGE_KEY, posts);
}

function addPost(post) {
  const posts = getPosts();
  const newPost = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...post
  };
  const next = [newPost, ...posts];
  savePosts(next);
  return newPost;
}

module.exports = {
  getPosts,
  savePosts,
  addPost
};
