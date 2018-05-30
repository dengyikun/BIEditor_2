import React from 'react'
import {Select} from 'antd'
import styles from './SQLSelect.less'
import * as pageService from "../../../services/page";

const Option = Select.Option

class SQLSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: '',
      text: ''
    }
  }//初始化 state

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.refreshAt !== this.props.item.refreshAt) {
      this.refresh()
    }
  }

  refresh = () => {
    const {sourceId, sql, conditionList, dimensionList, valueList} = this.props.item
    pageService.getChartData(sourceId, sql, conditionList)
      .then(data => {
        const options = Array.from(data.data.data, item => ({
          text: item[dimensionList[0].name],
          value: item[valueList[0].name],
        }))
        this.setState({options})
      })
      .catch(e => {
        console.log(e)
      })
  }

  onEvent = e => {
    const {value, text} = this.state
    this.props.onEvent(e, {
      value,
      text
    })
  }

  onSelect = (value, option) => {
    this.setState({
      value: option.props['data-value'],
      text: option.props.children,
    })
  }

  render() {
    const {options} = this.state
    return <div className={styles.body} onClick={this.onEvent} onDoubleClick={this.onEvent}>
      <Select className={styles.select} onSelect={this.onSelect}
              showSearch optionFilterProp="children">
        {
          options.map((option, index) =>
            <Option key={index} data-value={option.value}>{option.text}</Option>)
        }
      </Select>
    </div>
  }
}

export default SQLSelect
