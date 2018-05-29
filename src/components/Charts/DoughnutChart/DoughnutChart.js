import React from 'react';
import EChart from '../EChart/EChart'

const DoughnutChart = ({item, onEvent}) => {

  const getOption = data => {
    const {name, valueList} = item
    const dataList = data.data.data
    const legendData = Array.from(valueList, value => value.displayName)
    const series = Array.from(valueList, value => ({
      name: value.displayName,
      type:'pie',
      radius : ['40%','70%'],
      center: ['50%', '60%'],
      data: Array.from(dataList, data => data[value.name])
    }))
    const option = JSON.parse(JSON.stringify(item.option))
    option.title.text = option.title.text || name
    option.legend.data = option.legend.data || legendData
    option.series = option.series || series
    return option
  }

  const onChartEvent = (e, params) => {
    onEvent(e, params)
  }

  return <EChart item={item} getOption={getOption} onEvent={onChartEvent}/>
}

export default DoughnutChart;
