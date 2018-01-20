export default {
  namespace: 'items',
  state: {
    list: [],
    activeId: null,
    drag: {
      id: null,
      parentId: null,
      x: 0,
      y: 0,
    },
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
    changeDrag(state, {payload}) {
      return {...state, drag: {...state.drag, ...payload}};
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
                {id: '1', parentId: '', y: 20, x: 20, width: 100, height: 100, background: '#'+(~~(Math.random()*(1<<24))).toString(16)},
                {id: '2', parentId: '', y: 180, x: 20, width: 300, height: 300, background: '#'+(~~(Math.random()*(1<<24))).toString(16)},
                {id: '3', parentId: '2', y: 20, x: 20, width: 200, height: 200, background: '#'+(~~(Math.random()*(1<<24))).toString(16)},
                {id: '4', parentId: '1', y: 20, x: 20, width: 50, height: 50, background: '#'+(~~(Math.random()*(1<<24))).toString(16)},
              ]
            }
          });
        }
      });
    },
  },
};
