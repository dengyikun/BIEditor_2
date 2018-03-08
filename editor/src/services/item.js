import request from '../utils/request';

export function getChartData(sourceId, sql, conditionList) {
  return request.post(`/api/data`, {
    sourceId,
    sql,
    conditionList
  });
}
