// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oAddress: null,
    addressStr: '',
    cart: [],
    allChecked: true,
    totalNum: 0,
    totalPrice: 0,
  },

  handleGetAddresss() {
    // 确认用户是否授权过
    let self = this;
    wx.getSetting({
      success: res => {
        const scope = res.authSetting['scope.address'];
        if (scope || scope === undefined) {
          wx.chooseAddress({
            success: function (res) {
              // 将获取信息res保存
              const addressStr = res.provinceName + res.cityName + res.countyName + res.detailInfo;
              const address = {
                oAddress: res,
                addressStr,
              }
              self.setData({ ...address });
              wx.setStorageSync('address', address);
            }
          });
        } else {
          wx.openSetting({
            success: res => {
              if (res.authSetting['scope.address']) {
                wx.chooseAddress({
                  success: function (res) {
                    // 将获取信息res保存
                    const addressStr = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                    const address = {
                      oAddress: res,
                      addressStr,
                    }
                    self.setData({ ...address });
                    wx.setStorageSync('address', address);
                  }
                });
              }
            }
          });
        }
      }
    });
  },

  // 选择/取消选择商品
  handleChange(event) {
    let goods_id = event.currentTarget.dataset.id;

    // 获取购物车数据
    let { cart } = this.data;
    // 改变指定商品的状态
    cart.forEach((c, i) => {
      if (c.goods_id === goods_id) {
        cart[i].checked = !c.checked;
      }
    });
    // 更新状态
    this.updateState(cart);
  },

  // 全选, 全不选
  handleAllChecked() {
    // 获取购物车数据
    let { cart, allChecked } = this.data;
    // 全选取反
    allChecked = !allChecked;
    // 更改每个商品的选中状态
    cart.forEach((c, i) => {
      cart[i].checked = allChecked;
    });

    // 更新状态, 页面刷新
    this.updateState(cart);
  },

  // 选中状态改变, 更新数据
  updateState(cart) {
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;

    allChecked = cart.length ? true : false;
    // 计算totalPrice、totalNum
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    });
    wx.setStorageSync('cart', cart);
  },

  // 点击 商品的数量增加或减少
  handleitemNum(event) {
    let { id, operational } = event.currentTarget.dataset;

    let { cart } = this.data;
    // 改变指定商品的的索引
    let index = cart.findIndex(c => c.goods_id === id);

    if (operational === -1 && cart[index].num === 1) {
      wx.showModal({
        title: '操作确认',
        content: '确认要删除该商品吗???',
        confirmColor: '#3CC51F', //确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.updateState(cart);
          } 
        }
      });
    } else {
      // 更改数量num 当前数量+1或-1
      cart[index].num += operational;
      this.updateState(cart);
    }
    
  },

  //点击 支付按钮
  handlePay() {
    if (!this.data.addressStr) {
      wx.showToast({
        title: '请添加收货地址', 
      });
      return
    }
    wx.navigateTo({ url: '/pages/pay/pay' });
  },

  // 手动输入数量
  handleNumConfirm(event) {
    let { cart } = this.data;
    let id = event.currentTarget.dataset.id;
    let value = Number(event.detail.value);
    // 为空时, 数量置为1
    if (value === 0) {
      value = 1;
    }

    // 改变指定商品的的索引
    let cartItem = cart.find(c => c.goods_id === id);
    // 更改数量num
    cartItem.num = value;

    this.updateState(cart);
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

    // 更新组件状态
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