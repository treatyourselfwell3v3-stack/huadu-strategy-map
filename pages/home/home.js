const { skillPosts } = require('../../utils/mock');

Page({
  data: {
    posts: []
  },

  onLoad() {
    this.setData({
      posts: skillPosts
    });
  }
});
