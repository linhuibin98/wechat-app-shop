import { getGoodsDetail } from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保存商品的详情
    goodsDetail: {},
    isCollect: false,
  },

  // 点击轮播图事件, 预览图片
  handlePreviewImg(event) {
    wx.previewImage({
      current: event.currentTarget.dataset.url,
      urls: this.data.pics
    })
  },
  // 点击 加入购物车
  handleAddCart() {
    // 第一次添加购物车时,cart不存在,则置为空数组
    let cart = wx.getStorageSync('cart') || [];
    // 获取该商品信息
    let { goods_id, pics, goods_name, goods_price } = this.data;

    // 判断该商品是否已经在购物车里, 若是, num+1
    // exist 商品是否已经在购物车的 标识符
    let exist = true;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].goods_id === goods_id) {
        cart[i].num += 1;
        exist = false; // 标识符取反
        break;
      }
    }
    // 不在购物车中, 添加到购物车数组中
    exist && cart.push({
      goods_id,
      pic: pics[0],
      goods_name,
      goods_price,
      num: 1, // 数量默认为1
      checked: true, // 商品默认是选中的
    });

    // 重新保存 
    wx.setStorageSync('cart', cart);
    wx.showToast({ // 弹窗提示,添加成功
      title: '添加成功',
    });
  },

  // 点击收藏
  handleCollect() {
    // 收藏取反
    let { goods_id, isCollect, pics, goods_price, goods_name } = this.data;
    isCollect = !isCollect;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(c => c.goods_id === goods_id);
    index < 0 ? collect.push({ goods_id, pic: pics[0], goods_name, goods_price }) : collect.splice(index, 1);

    // 更新状态
    this.setData({
      isCollect
    });
    wx.setStorageSync('collect', collect);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 根据goods_id请求得到商品的详细信息
    let goodsDetail = await getGoodsDetail(options.goods_id);
    let goods_id = options.goods_id;
    // 过滤出需要的数据
    this.setData({
      goods_id,
      goods_price: goodsDetail.goods_price,
      goods_name: goodsDetail.goods_name,
      // 部分iphone手机不支持webp格式的图片
      goods_introduce: goodsDetail.goods_introduce.replace(/\.webp/g, '.jpg'),
      pics: goodsDetail.pics.map(item => item.pics_mid_url),
    });

    // 获取收藏信息
    let collect = wx.getStorageSync('collect') || [];
    // 该商品有没有收藏
    let index = collect.findIndex(c => c.goods_id === goods_id);

    index >= 0 && this.setData({ isCollect: true });
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