// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    },
    // 商品数据集合
    goodsList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前tab为active态的索引
    currentCateIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCate(event) {
      let index = event.currentTarget.dataset.index;
      // 若点击当前所在项, 则什么都不做
      if (this.data.currentCateIndex === index) {
        return
      }
      this.setData({
        currentCateIndex: index,
      });
      this.triggerEvent('changeTab', index)
    },
  },
  lifetimes: {
    
  }
})
