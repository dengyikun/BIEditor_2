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
    updateItem(state, {payload}) {
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
    changeList(state, {payload}) {
      return {...state, list: payload};
    },
    changeActiveItem(state, {payload}) {
      return {...state, activeItem: payload};
    },
    changeHoverItem(state, {payload}) {
      return {...state, hoverItem: payload};
    },
    changeDragItem(state, {payload}) {
      return {...state, dragItem: payload};
    },
    changeDataSetModalVisible(state, {payload}) {
      return {...state, dataSetModalVisible: payload};
    },
  },
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/') {
          dispatch({
            type: 'changeList',
            payload: []
          });
        }
      });
    },
  },
};
