import React, {PropTypes} from 'react';
import ECharts from 'echarts'
import 'echarts/map/js/china'
import 'echarts-wordcloud'
import styles from './EChart.css';
import * as pageService from '../../../services/page';

class EChart extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    getOption: PropTypes.func.isRequired,
  }//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      chart: null,
    }
  }//初始化 state

  refresh = () => {
    const {chart} = this.state
    const {getOption} = this.props
    const {sourceId, sql, conditionList} = this.props.item
    pageService.getChartData(sourceId, sql, conditionList)
      .then(data => {
        chart.setOption(getOption(data))
        chart.resize()
      })
      .catch(e => {
        console.log(e)
      })
  }

  onEvent = e => {
    e.stopPropagation()
  }

  render() {
    return <div className={styles.body} ref={'chart'}
                onClick={this.onEvent} onDoubleClick={this.onEvent}>
    </div>
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.refreshAt !== this.props.item.refreshAt) {
      this.refresh()
    }
  }

  componentDidMount() {
    const chart = ECharts.init(this.refs.chart)
    const that = this
    chart.on('click', (params) => {
      that.props.onEvent(params.event.event, {
        dimension: params.name,
        value: params.data,
      })
    })
    chart.on('dblclick', params => {
      that.props.onEvent(params.event.event, {
        dimension: params.name,
        value: params.data,
      })
    })
    this.setState({chart}, this.refresh)
  }
}

export default EChart;
