import React, {PropTypes} from 'react';
import ECharts from 'echarts'
import styles from './EChart.css';
import * as itemService from '../../../services/item';

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
    itemService.getChartData(sourceId, sql, conditionList)
      .then(data => {
        chart.setOption(getOption(data))
        chart.resize()
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return <div className={styles.body} ref={'chart'}>
    </div>
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.refreshAt !== this.props.item.refreshAt) {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(this.refresh, 300)
    }
  }

  componentDidMount() {
    this.setState({chart: ECharts.init(this.refs.chart)}, this.refresh)
  }
}

export default EChart;
