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
    this.setData({
      [`form.${field}`]: e.detail.value
    });
  },

  onSubmit() {
    const { offer, need } = this.data.form;
    if (!offer || !need) {
      wx.showToast({ title: '请至少填写可提供与想交换技能', icon: 'none' });
      return;
    }

    wx.showToast({ title: '发布成功（演示）', icon: 'success' });
    this.setData({
      form: { offer: '', need: '', time: '', city: '' }
    });
  }
});
