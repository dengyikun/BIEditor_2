import React, {PropTypes} from 'react';
import {message} from 'antd'
import ECharts from 'echarts'
import {TOOL} from '../../../utils'
import styles from './LineChart.css';
import * as itemService from '../../../services/item';

class LineChart extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      chart: null,
    }
  }//初始化 state

  refresh = () => {
    const {sourceId, sql, conditionList, name, dimensionList, valueList, option} = this.props.item
    itemService.getChartData(sourceId, sql, conditionList)
      .then(data => {
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
          stack: '1',//赋相同的任意值，就变成堆积折线图
          itemStyle: {
            normal: {
              areaStyle: {type: 'default'},
              color: ''//设置线条的颜色
            }
          },
          data: Array.from(dataList, data => data[value.name])
        }))
        TOOL.getChartOption(option)
          .then(option => {
            option.title.text = option.title.text || name
            option.legend.data = option.legend.data || legendData
            option.xAxis = option.xAxis || xAxis
            option.series = option.series || series
            this.state.chart.setOption(option)
          })
          .catch(error => {
            message.error(`折线图：${name} 的 option 有误，请仔细检查！`)
          })
      })
  }

  resize = () => {
    this.state.chart.resize()
  }

  render() {
    return <div className={styles.body} ref={'chart'}>
    </div>
  }

  componentDidUpdate(prevProps) {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(this.refresh, 300)
  }

  componentDidMount() {
    this.setState({chart: ECharts.init(this.refs.chart)}, this.refresh)
  }
}

export default LineChart;
