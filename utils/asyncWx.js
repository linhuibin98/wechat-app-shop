// wx.xx方法封装成promise

export const login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
} 