
const baseUrl = 'https://api.zbztb.cn/api/public/v1';

// 同时发起多个请求, 标识
let flag = 0;

export function request(opts) {
  // 发起请求, 标识 flag++
  flag++;
  return new Promise((resolve, reject) => {
    // 发起请求, 显示加载中的提示
    wx.showLoading({ title: '加载中' });
    wx.request({
      ...opts,
      url: baseUrl + opts.url,
      success: function(res) {
        resolve(res.data.message);
      },
      fail: function(res) {
        reject(res)
      },
      complete() {
        // 请求完成后 flag--
        flag--;
        // 全部请求完成, 即 flag===0, 关闭加载中的提示
        !flag && wx.hideLoading();
      }
    });
  })
}