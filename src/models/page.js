import pageService from '../services/page'
import {TOOL} from '../utils'

export default {
  namespace: 'page',
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
    paramSetModalVisible: false, // 页面参数设置模态窗显示
    paramList: [], // 页面参数
    refreshInterval: 0, // 刷新时间间隔（秒），数值为 0 时不刷新
    pageWidth: 1200, // 页面宽度
    pageHeight: 800, // 页面高度
    autoResize: false, // 自适应
    style: {
      backgroundColor: '#ffffff',
      border: 'none',
    }, // 页面样式
  },
  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },
    setItem(state, {payload}) {
      let list = TOOL.deepCopy(state.list)
      let item = list.find((item, index) => {
        if (item.id === payload.id) {
          list[index] = TOOL.deepCopy({...item, ...payload, refreshAt: new Date()})
          return true
        } else return false
      })
      if (!item) {
        list.push({...payload})
      }
      return {...state, list};
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
    * getPage({payload}, {call, put}) {
      const {data} = yield call(pageService.getPage, payload);
      yield put({
        type: 'set', payload: data.data
      })
    },
    * savePage({callback}, {call, select}) {
      const {
        list,
        pageWidth,
        pageHeight,
        autoResize,
        style,
        paramList,
        refreshInterval,
      } = yield select(state => state.page);
      const {data} = yield call(pageService.patchPage, {pageId: TOOL.getParams('pageId'), data: {
          list,
          pageWidth,
          pageHeight,
          autoResize,
          style,
          paramList,
          refreshInterval,
        }});
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
