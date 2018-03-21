import request from '../utils/request';

export default {
  getChartData: (sourceId, sql, conditionList) => {
    return request.post(`/api/data`, {
      sourceId,
      sql,
      conditionList
    });
  },
  getPage: (pageId) => {
    return request.get(`/api/pages/${pageId}/content`);
  },
  patchPage: ({pageId, data}) => {
    return request.patch(`/api/pages/${pageId}/content`, data);
  },
}
