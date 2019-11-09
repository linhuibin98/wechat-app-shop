import { getCateList } from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边菜单,当前选择的索引,
    currentIndex: 0,
    // 全部数据
    cateList: [],
    // 右边显示的数据
    contentList: [],
    // 右边内容滚动条距离顶部的距离
    scrollTopDistance: 0,
  },

  handleMenuTab(e) {
    
    const index = e.currentTarget.dataset.index;

    this.setData({
      contentList: this.data.cateList[index].children, // 更新右边内容
      currentIndex: index, // 切换菜单选择
      scrollTopDistance: 0, // 右边内容滚动条距离顶部距离重新置0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await getCateList();
    this.setData({
      cateList: res,
      contentList: res[0].children
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