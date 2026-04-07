const { skillPosts } = require('../../utils/mock');

Page({
  data: {
    keyword: '',
    result: skillPosts
  },

  onInput(e) {
    const keyword = e.detail.value.trim();
    const result = skillPosts.filter((item) =>
      item.offer.includes(keyword) || item.need.includes(keyword)
    );

    this.setData({ keyword, result });
  }
});
