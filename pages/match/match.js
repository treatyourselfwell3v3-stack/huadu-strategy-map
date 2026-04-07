const { getPosts } = require('../../utils/storage');

Page({
  data: {
    keyword: '',
    result: [],
    total: 0
  },

  onLoad() {
    this.refreshResult('');
  },

  onShow() {
    this.refreshResult(this.data.keyword);
  },

  onInput(e) {
    const keyword = e.detail.value.trim();
    this.setData({ keyword });
    this.refreshResult(keyword);
  },

  refreshResult(keyword) {
    const posts = getPosts();
    const normalized = keyword.toLowerCase();
    const result = posts.filter((item) => {
      if (!normalized) return true;
      return (
        item.offer.toLowerCase().includes(normalized) ||
        item.need.toLowerCase().includes(normalized)
      );
    });

    this.setData({
      result,
      total: result.length
    });
  }
});
