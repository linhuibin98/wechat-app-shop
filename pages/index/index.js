import { getCarouselList, getNavList, getFlooList } from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime.js';

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    carouselList: [],
    // 导航数据
    navList: [],
    // 楼层
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取轮播图数据
    let carouselList = await getCarouselList();
    // 导航数据
    let navList = await getNavList();
    // 楼层数据
    let floorList = await getFlooList();
    this.setData({
      carouselList,
      navList,
      floorList
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