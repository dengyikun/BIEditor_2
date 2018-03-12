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
  },
  effects: {
    *getList({payload}, {call, put}) {
      const {data} = yield call(sourceService.getList, payload);
      yield put({type: 'setList', payload: data.data.dataList})
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
