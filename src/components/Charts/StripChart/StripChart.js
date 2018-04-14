import React, {PropTypes} from 'react';
import {message} from 'antd'
import ECharts from 'echarts'
import styles from './StripChart.css';
import * as itemService from '../../../services/item';

class StripChart extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      chart: null,
    }
  }//初始化 state

  timer = null

  refresh = () => {
    const {sourceId, sql, conditionList, name, id, dimensionList, valueList} = this.props.item
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
          type: 'bar',
          stack: '1',//赋相同的任意值，就变成堆积折线图
          itemStyle: {
            normal: {
              areaStyle: {type: 'default'},
              color: ''//设置线条的颜色
            }
          },
          data: Array.from(dataList, data => data[value.name])
        }))
        try {
          let option = {}
          eval(this.props.item.option)
          option.title.text = option.title.text || name
          option.legend.data = option.legend.data || legendData
          option.xAxis = option.xAxis || xAxis
          option.series = option.series || series
          this.state.chart.setOption(option)
          this.state.chart.resize()
        } catch (e) {
          console.error(e)
        }
      })
  }

  render() {
    return <div className={styles.body} ref={'chart'}>
    </div>
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.refreshAt !== this.props.item.refreshAt) {
      console.log('refreshAt')
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(this.refresh, 300)
    }
  }

  componentDidMount() {
    this.setState({chart: ECharts.init(this.refs.chart)}, this.refresh)
  }
}

export default StripChart;
