import request from '../utils/request';

export default {
  getList: (pageId) => {
    return request.get(`/api/pages/${pageId}/sources?page=0&per_page=1000`);
  },
  getTableList: (sourceId) => {
    return request.get(`/api/sources/${sourceId}/tables?page=0&per_page=1000`);
  },
}
