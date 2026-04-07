Page({
  data: {
    user: {},
    tags: ['沟通力', '设计思维', '时间管理']
  },

  onLoad() {
    const app = getApp();
    this.setData({
      user: app.globalData.user
    });
  }
});
