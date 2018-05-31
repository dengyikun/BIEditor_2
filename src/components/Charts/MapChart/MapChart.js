import React from 'react';
import EChart from '../EChart/EChart'
import {TOOL} from '../../../utils'

const MapChart = ({item, onEvent}) => {

  const getOption = data => {
    const {name, dimensionList, valueList} = item
    const dataList = data.data.data
    const legendData = Array.from(valueList, value => value.displayName)
    let max = 0
    let min = 0
    const series = Array.from(valueList, value => ({
        name: value.displayName,
        type: 'map',
        mapType: 'china',
        roam: false,//是否开启鼠标缩放和平移漫游
        itemStyle:{//地图区域的多边形 图形样式
          normal:{//是图形在默认状态下的样式
            label:{
              show:true,//是否显示标签
              textStyle: {
                color: "rgb(249, 249, 249)"
              }
            }
          },
          emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
            label:{show:true}
          }
        },
        data: Array.from(dataList, data => {
          max = max < data[value.name] ? data[value.name] : max
          min = min > data[value.name] ? data[value.name] : min
          return ({
            name : data[dimensionList[0].name],
            value : data[value.name]
          })
        })
    }))
    const option = TOOL.deepCopy(item.option)
    option.title.text = option.title.text || name
    option.legend.data = option.legend.data || legendData
    option.series = option.series || series
    option.visualMap.max = max
    option.visualMap.min = min
    return option
  }

  const onChartEvent = (e, params) => {
    onEvent(e, params)
  }

  return <EChart item={item} getOption={getOption} onEvent={onChartEvent}/>
}

export default MapChart;
