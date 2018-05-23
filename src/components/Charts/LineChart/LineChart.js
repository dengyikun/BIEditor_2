import React from 'react';
import EChart from '../EChart/EChart'

const LineChart = ({item, onEvent}) => {

  const getOption = data => {
    const {name, dimensionList, valueList} = item
    const dataList = data.data.data
    const legendData = Array.from(valueList, value => value.displayName)
    const xAxis = Array.from(dimensionList, dimension => ({
      show: true,//显示或隐藏X轴
      axisLine: {
        lineStyle: {
          color: '#008ACD'//坐标线颜色
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: 'black',
          fontSize: '14'
        }
      },//设置字体颜色和大小
      splitLine: {show: false},//隐藏或显示网格线
      type: 'category',
      boundaryGap: false,
      data: Array.from(dataList, data => data[dimension.name])
    }))
    const series = Array.from(valueList, value => ({
      name: value.displayName,
      type: 'line',
      // stack: 'stack',//赋相同的任意值，就变成堆积折线图
      itemStyle: {
        normal: {
          color: ''//设置线条的颜色
        }
      },
      data: Array.from(dataList, data => data[value.name])
    }))
    let option = {}
    eval(item.option)
    option.title.text = option.title.text || name
    option.legend.data = option.legend.data || legendData
    option.xAxis = option.xAxis || xAxis
    option.series = option.series || series
    return option
  }

  const onChartEvent = (e, params) => {
    onEvent(e, params)
  }

  return <EChart item={item} getOption={getOption} onEvent={onChartEvent}/>
}

export default LineChart;
