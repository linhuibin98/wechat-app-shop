// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oAddress: null,
    addressStr: '',
    cart: [],
    totalNum: 0,
    totalPrice: 0,
  },
  // 选中状态改变, 更新数据
  updateState(cart) {
    let totalPrice = 0;
    let totalNum = 0;
    // 计算totalPrice、totalNum
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;

    });
    this.setData({
      cart,
      totalNum,
      totalPrice
    });
  },

  //点击 支付按钮
  handlePay() {
    wx.showModal({
      title: '确认支付',
      confirmColor: '#3CC51F',
      success: res => {
        if (res.confirm) { // 用户点击确定
          // 购物车中删除已经支付的商品
          let cart = wx.getStorageSync('cart');
          cart = cart.filter(c => !c.checked);
          wx.setStorageSync('cart', cart);
          wx.navigateBack();
        } 
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储的地址
    let address = wx.getStorageSync('address') || {};
    this.setData({
      ...address,
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取本地存储的购物车列表
    let cart = wx.getStorageSync('cart') || [];

    cart = cart.filter(c => c.checked);
    this.updateState(cart);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})