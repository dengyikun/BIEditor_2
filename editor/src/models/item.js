export default {
  namespace: 'item',
  state: {
    list: [],
    activeItem: {},
    hoverItem: {},
    dragItem: {},
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    update(state, {payload}) {
      let newList = state.list.slice()
      let item = newList.find((item, index) => {
        if (item.id === payload.id) {
          newList[index] = {...item, ...payload}
          return true
        }
      })
      if (!item) {
        newList.push({...payload})
      }
      return {...state, list: newList};
    },
    changeResize(state, {payload}) {
      return {...state, isResizing: payload};
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
  },
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/') {
          dispatch({
            type: 'save',
            payload: {
              list: []
            }
          });
        }
      });
    },
  },
};
