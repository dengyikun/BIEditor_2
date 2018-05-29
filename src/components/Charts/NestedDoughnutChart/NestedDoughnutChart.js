import React from 'react';
import EChart from '../EChart/EChart'
import {TOOL} from '../../../utils'

const NestedDoughnutChart = ({item, onEvent}) => {

  const getOption = data => {
    const {name, valueList} = item
    const dataList = data.data.data
    const legendData = Array.from(valueList, value => value.displayName)
    const series = Array.from(valueList, (value, index) => ({
      name: value.displayName,
      type: 'pie',
      radius: [
        index === 0 ? 0 : 70 / valueList.length * index + 10 / valueList.length + '%',
        70 / valueList.length * ( index + 1 ) + '%'
      ],
      itemStyle : index === valueList.length - 1 ? undefined : {
          normal : {
            label : {
              position : 'inner'
            },
            labelLine : {
              show : false
            }
          }
        },
      center: ['50%', '60%'],
      data: Array.from(dataList, data => data[value.name])
    }))
    const option = TOOL.deepCopy(item.option)
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

export default NestedDoughnutChart;
