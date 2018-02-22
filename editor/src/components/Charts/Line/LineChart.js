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
      chart: null
    }
  }//初始化 state

  refresh = () => {
    const {item, chart} = this.props
    itemService.getChartData(item.sourceId, item.sql, item.conditionList)
      .then(data => {
        this.state.chart.setOption({
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
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

  componentDidMount() {
    this.setState({chart: ECharts.init(this.refs.chart)}, this.refresh)
  }
}

export default LineChart;
