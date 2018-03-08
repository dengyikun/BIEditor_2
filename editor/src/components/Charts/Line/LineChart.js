import React, {PropTypes} from 'react';
import ECharts from 'echarts'
import styles from './LineChart.css';
import * as itemService from '../../../services/item';

class LineChart extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      defaultOption: {
        backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
        title: {
          show: true,//显示隐藏
          x: 'left', // 'center' | 'left' | {number},标题左右位置
          y: 'top', // 'center' | 'bottom' | {number}标题上下位置
          textStyle: {color: 'black', fontSize: '18'}//字体颜色
        },
        grid: {
          borderWidth: 0//设置边框大小
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'horizontal', // 'vertical'标题横向或纵向排列
          x: 'right', // 'center' | 'left' | {number},标题左右位置
          y: 'top', // 'center' | 'bottom' | {number}标题上下位置
          textStyle: {color: 'black', fontSize: '14'},//字体颜色
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        yAxis: [
          {
            show: true,//显示或隐藏Y轴
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
            type: 'value'
          }
        ],
      },
      option: null,
      chart: null,
    }
  }//初始化 state

  refresh = () => {
    const {sourceId, sql, conditionList, name, dimensionList, valueList} = this.props.item
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
        let option = this.state.option || this.state.defaultOption
        option.title.text = option.title.text || name
        option.legend.data = option.legend.data || legendData
        option.xAxis = option.xAxis || xAxis
        option.series = option.series || series
        this.state.chart.setOption(option)
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
    if (JSON.stringify(prevProps.item) !== JSON.stringify(this.props.item)) {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(this.refresh, 300)
    }
  }

  componentDidMount() {
    this.setState({chart: ECharts.init(this.refs.chart)}, this.refresh)
  }
}

export default LineChart;
