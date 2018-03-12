import itemService from '../services/item'

export default {
  namespace: 'item',
  state: {
    list: [],
    activeItem: {},
    hoverItem: {},
    dragItem: {},
    dataSetModalVisible: false,
  },
  reducers: {
    setItem(state, {payload}) {
      let newList = state.list.slice()
      let item = newList.find((item, index) => {
        if (item.id === payload.id) {
          newList[index] = {...item, ...payload}
          return true
        } else return false
      })
      if (!item) {
        newList.push({...payload})
      }
      return {...state, list: newList};
    },
    setList(state, {payload}) {
      return {...state, list: payload};
    },
    setActiveItem(state, {payload}) {
      return {...state, activeItem: payload};
    },
    setHoverItem(state, {payload}) {
      return {...state, hoverItem: payload};
    },
    setDragItem(state, {payload}) {
      return {...state, dragItem: payload};
    },
    setDataSetModalVisible(state, {payload}) {
      return {...state, dataSetModalVisible: payload};
    },
  },
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/') {
          dispatch({
            type: 'setList',
            payload: []
          });
        }
      });
    },
  },
};
