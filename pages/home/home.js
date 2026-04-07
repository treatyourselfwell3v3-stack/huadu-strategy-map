const { getPosts } = require('../../utils/storage');

Page({
  data: {
    posts: []
  },

  onLoad() {
    this.loadPosts();
  },

  onShow() {
    this.loadPosts();
  },

  onPullDownRefresh() {
    this.loadPosts();
    wx.stopPullDownRefresh();
  },

  loadPosts() {
    this.setData({ posts: getPosts() });
  }
});
