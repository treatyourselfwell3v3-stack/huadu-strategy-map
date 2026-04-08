const { addPost } = require('../../utils/storage');

Page({
  data: {
    form: {
      offer: '',
      need: '',
      time: '',
      city: ''
    }
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onSubmit() {
    const offer = this.data.form.offer.trim();
    const need = this.data.form.need.trim();
    const time = this.data.form.time.trim();
    const city = this.data.form.city.trim();

    if (!offer || !need) {
      wx.showToast({ title: '请至少填写可提供与想交换技能', icon: 'none' });
      return;
    }

    addPost({
      offer,
      need,
      time,
      location: city
    });

    wx.showToast({ title: '发布成功', icon: 'success' });
    this.setData({
      form: { offer: '', need: '', time: '', city: '' }
    });

    setTimeout(() => {
      wx.switchTab({ url: '/pages/home/home' });
    }, 500);
  }
});
