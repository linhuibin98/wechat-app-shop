import { getSearch } from '../../request/index';
import regeneratorRuntime from '../../libs/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: []
  },

  async getSearchResult(e) {
    if (e.detail === '') return;
    // 防抖
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      let goodsList = await getSearch(e.detail);

      this.setData({
        goodsList
      });
    }, 1000);
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