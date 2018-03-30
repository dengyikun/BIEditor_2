import itemService from '../services/item'
import {TOOL} from '../utils'

export default {
  namespace: 'item',
  state: {
    list: [], // 控件列表
    activeItemId: '', // 当前活动控件
    hoverItemId: '', // 鼠标指向控件
    dragItem: {}, // 当前拖动控件
    dataSetModalVisible: false, // 数据设置模态窗显示
    chartSetModalVisible: false, // 图表设置模态窗显示
    eventSetModalVisible: false, // 事件设置模态窗显示
    jsSetModalVisible: false, // js 设置模态窗显示
    cssSetModalVisible: false, // css 设置模态窗显示
    refreshInterval: 0, // 刷新时间间隔（秒）
    refreshAt: new Date(), // 上次刷新时间
    pageWidth: 1200, // 页面宽度
    pageHeight: 700, // 页面高度
    autoResize: false, // 自适应
    style: {
      background: '#f2f5f7',
      border: 'none',
    },  // 页面样式
  },
  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },
    setItem(state, {payload}) {
      let newList = JSON.parse(JSON.stringify(state.list))
      let item = newList.find((item, index) => {
        if (item.id === payload.id) {
          newList[index] = JSON.parse(JSON.stringify({...item, ...payload}))
          return true
        } else return false
      })
      if (!item) {
        newList.push({...payload})
      }
      return {...state, list: newList};
    },
    deleteItem(state, {payload}) {
      let newList = state.list.slice()
      let index = newList.findIndex(item => item.id === payload)
      if (index !== -1) {
        newList.splice(index, 1)
      }
      return {...state, list: newList};
    },
    setList(state, {payload}) {
      return {...state, list: payload};
    },
    setActiveItemId(state, {payload}) {
      return {...state, activeItemId: payload};
    },
    setHoverItemId(state, {payload}) {
      return {...state, hoverItemId: payload};
    },
    setDragItem(state, {payload}) {
      return {...state, dragItem: payload};
    },
    setDataSetModalVisible(state, {payload}) {
      return {...state, dataSetModalVisible: payload};
    },
    setChartSetModalVisible(state, {payload}) {
      return {...state, chartSetModalVisible: payload};
    },
    setEventSetModalVisible(state, {payload}) {
      return {...state, eventSetModalVisible: payload};
    },
    setJsSetModalVisible(state, {payload}) {
      return {...state, jsSetModalVisible: payload};
    },
    setCssSetModalVisible(state, {payload}) {
      return {...state, cssSetModalVisible: payload};
    },
    setRefreshInterval(state, {payload}) {
      return {...state, refreshInterval: payload};
    },
    setRefreshAt(state, {payload}) {
      return {...state, refreshAt: payload};
    },
    setPageWidth(state, {payload}) {
      return {...state, pageWidth: payload};
    },
    setPageHeight(state, {payload}) {
      return {...state, pageHeight: payload};
    },
    setAutoResize(state, {payload}) {
      return {...state, autoResize: payload};
    },
    setStyle(state, {payload}) {
      return {...state, style: {...state.style, ...payload}};
    },
  },
  effects: {
    *getPage({payload}, {call, put}) {
      const {data} = yield call(itemService.getPage, payload);
      yield put({type: 'set', payload: {
        list: data.data.list || [],
        pageWidth: data.data.pageWidth || 1200,
        pageHeight: data.data.pageHeight || 700,
        autoResize: data.data.autoResize || false,
      }})
    },
    *savePage({payload, callback}, {call}) {
      const {data} = yield call(itemService.patchPage, {pageId: TOOL.getParams('pageId'), data: payload});
      yield callback && callback(data)
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (TOOL.getParams('pageId')) {
          dispatch({
            type: 'getPage',
            payload: TOOL.getParams('pageId')
          });
        }
      });
    },
  },
};
