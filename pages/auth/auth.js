import { getUserToken } from '../../request/index';
import { login } from '../../utils/asyncWx';
import regeneratorRuntime from '../../libs/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 获取token
  async handleGetUserInfo(event) {
    // 1. 获取用户信息
    let { encryptedData, rawData, iv, signature } = event.detail;
    // 2. 获取小程序登陆成功后的code
    let { code } = await login();
    // 3. 获取token
    let opts = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    // 非企业账号, 白名单账号, 获取不到
    // let res = await getUserToken(opts);
    // 模拟数据
    wx.navigateBack({
      delta: 1,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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