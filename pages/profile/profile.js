const { getPosts } = require('../../utils/storage');

Page({
  data: {
    user: {},
    tags: ['沟通力', '设计思维', '时间管理'],
    stats: {
      totalPosts: 0
    }
  },

  onLoad() {
    const app = getApp();
    this.setData({
      user: app.globalData.user
    });
    this.loadStats();
  },

  onShow() {
    this.loadStats();
  },

  loadStats() {
    const posts = getPosts();
    this.setData({
      stats: {
        totalPosts: posts.length
      }
    });
  }
});
