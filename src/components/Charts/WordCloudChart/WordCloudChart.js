import React from 'react';
import EChart from '../EChart/EChart'
import {TOOL} from '../../../utils'

const WordCloudChart = ({item, onEvent}) => {

  const getOption = data => {
    const {name, dimensionList, valueList} = item
    const dataList = data.data.data
    const series = Array.from(valueList, value => ({
      type: 'wordCloud',
      size: ['80%', '80%'],
      textRotation: [0, 45, 90, -45],
      textPadding: 0,
      autoSize: {
        enable: true,
        minSize: 14
      },
      textStyle: {
        normal: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // Color can be a callback function or a color string
          color: () => 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')'
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: Array.from(dataList, data => ({
        name: data[dimensionList[0].name],
        value: data[value.name],
      }))
    }))
    const option = TOOL.deepCopy(item.option)
    option.title.text = option.title.text || name
    option.series = option.series || series
    console.log(series)
    return option
  }

  const onChartEvent = (e, params) => {
    onEvent(e, params)
  }

  return <EChart item={item} getOption={getOption} onEvent={onChartEvent}/>
}

export default WordCloudChart;
