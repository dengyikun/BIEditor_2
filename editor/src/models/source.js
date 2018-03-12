import sourceService from '../services/source'

export default {
  namespace: 'source',
  state: {
    list: [],
  },
  reducers: {
    setList(state, {payload}) {
      return {...state, list: payload};
    },
    setTableList(state, {payload}) {
      let list = [...state.list]
      list[list.findIndex(item => item.sourceId === payload.sourceId)].tableList = payload.tableList
      return {...state, list};
    },
  },
  effects: {
    *getList({payload}, {call, put}) {
      const {data} = yield call(sourceService.getList, payload);
      yield put({type: 'setList', payload: data.data.dataList})
    },
    *getTableList({payload}, {call, put}) {
      const {data} = yield call(sourceService.getTableList, payload);
      yield put({type: 'setTableList', payload: { tableList: data.data, sourceId: payload}})
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/') {
          dispatch({
            type: 'getList',
            payload: '3b03699332d648ecbb96adb3a8f06e0f'
          });
        }
      });
    },
  },
};
