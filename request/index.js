import { request } from '../utils/util.js';

// 主页轮播图数据
export const getCarouselList = function () {
  return request({ url: '/home/swiperdata' });
}

// 主页导航数据
export const getNavList = function () {
  return request({ url: '/home/catitems' });
}

// 主页楼层数据
export const getFlooList = function () {
  return request({ url: '/home/floordata' });
}


// 分类页面数据
export const getCateList = function () {
  return request({ url: '/categories' });
}

// 搜索
export const getSearchList = function (params) {
  let { query, pagenum } = params;
  query = query || '';
  pagenum = pagenum || 1;
  let urlParams = `?query=${query}&pagenum=${pagenum}`;
  return request({ url: `/goods/search${urlParams}` });
}

// 商品详情
export const getGoodsDetail = function (goodsId) {
  return request({url: `/goods/detail?goods_id=${goodsId}`});
}

// 获取token
export const getUserToken = function (opts) {
  return request({ url: '/users/wxlogin', data: {...opts}, method: 'post' });
}

// 搜索建议
export const getSearch = function (query) {
  return request({url: `/goods/qsearch?query=${query}`});
}