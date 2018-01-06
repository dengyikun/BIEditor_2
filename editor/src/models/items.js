export default {
  namespace: 'items',
  state: {
    list: [],
    isResizing: false,
    activeId: null,
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    update(state, {payload}) {
      let newList = state.list.slice()
      newList.find((item, index) => {
        if (item.id === payload.id) {
          newList[index] = {...item, ...payload}
          return true
        }
      })
      return {...state, list: newList};
    },
    changeResize(state, {payload}) {
      return {...state, isResizing: payload};
    },
    changeActiveId(state, {payload}) {
      return {...state, activeId: payload};
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
              list: [
                {id: '1', parentId: '', top: 20, left: 20, width: 100, height: 100},
                {id: '2', parentId: '', top: 180, left: 20, width: 300, height: 300},
                {id: '3', parentId: '2', top: 20, left: 20, width: 200, height: 200},
                {id: '4', parentId: '1', top: 20, left: 20, width: 50, height: 50},
              ]
            }
          });
        }
      });
    },
  },
};
