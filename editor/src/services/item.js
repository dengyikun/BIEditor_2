import request from '../utils/request';

export default {
  getChartData: (sourceId, sql, conditionList) => {
    return request.post(`/api/data`, {
      sourceId,
      sql,
      conditionList
    });
  },
}
