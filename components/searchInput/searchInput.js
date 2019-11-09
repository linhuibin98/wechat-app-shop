Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSearch: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput (e) {
      let value = e.detail.value;
      this.triggerEvent('getSearchResult', value);
    },
  }
})
