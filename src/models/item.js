import itemService from '../services/item'
import {TOOL} from '../utils'

export default {
  namespace: 'item',
  state: {
    list: [],
    activeItemId: '',
    hoverItemId: '',
    dragItem: {},
    dataSetModalVisible: false,
    chartSetModalVisible: false,
    eventSetModalVisible: false,
    refreshInterval: 0,
    refreshAt: new Date(),
    pageWidth: 0,
    pageHeight: 0,
  },
  reducers: {
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
  },
  effects: {
    *getPage({payload}, {call, put}) {
      const {data} = yield call(itemService.getPage, payload);
      yield put({type: 'setList', payload: data.data.list || []})
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
