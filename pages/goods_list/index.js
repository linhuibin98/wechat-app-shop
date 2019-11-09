import { getSearchList } from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索结果数据
    goodsList: [],
    // tab
    tabList: ['综合', '销量', '分类'],
    // 默认请求页
    pagenum: 1,
    // 存储搜索内容
    query: ''
  },

  changeTab(event) {
    // this.setData({
    //   currentCateIndex: event.currentTarget.dataset.index,
    // })
    console.log(event.detail);
  },

  async getGoods(query, pagenum) {
    let res = await getSearchList({ query, pagenum });
    // 第一次请求时, 保存,请求参数,和该请求结果的total
    if (pagenum === 1) {
      this.setData({
        query: query || '',
        allPagenum: Math.ceil(res.total / 20)
      })
    }
    this.setData({
      goodsList: this.data.goodsList.concat(res.goods),
      pagenum: pagenum + 1,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods(options.query, this.data.pagenum);
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
  onPullDownRefresh: async function () {
    let { pagenum, query, allPagenum } = this.data;

    if (pagenum > allPagenum) {
      wx.showToast({ title: '没有更多了~~' });
      return;
    }
    
    let res = await getSearchList({ query, pagenum });
    // 请求新数据后, 直接替换已有数据
    this.setData({
      goodsList: res.goods,
      pagenum: pagenum + 1,
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    // 上拉加载更多数据
    // 根据数据携带的总页数标识,和当前已经加载的页数, 比较判断数据是否有更多
    // 1. 没有下一页数据, 弹框提示, 有请求追加到已有的数组后面, pagenum++
    let { pagenum, query, allPagenum } = this.data;

    if (pagenum > allPagenum) {
      wx.showToast({ title: '没有更多了~~' });
      return;
    }

    this.getGoods(query, pagenum);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})