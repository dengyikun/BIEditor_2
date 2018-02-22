import request from '../utils/request';

export function getChartData(sourceId, sql, conditionList) {
  return request(`/api/data`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sourceId,
      sql,
      conditionList
    }),
  });
}
