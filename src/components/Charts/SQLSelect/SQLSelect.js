import React from 'react'
import {Select} from 'antd'
import styles from './SQLSelect.less'
import * as pageService from "../../../services/page";
import {TOOL} from "../../../utils";

const Option = Select.Option

class SQLSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: [],
      selectValue: null,
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
        const {onChange} = this.props
        const item = TOOL.deepCopy(this.props.item)
        if (item.option.selectValue === undefined && options[0]) {
          item.option.selectValue = '0'
          item.option.value = options[0].value
          item.option.text = options[0].text
          onChange(item)
        }
        this.setState({options})
      })
      .catch(e => {
        console.log(e)
      })
  }

  onEvent = e => {
    const option = this.props.item.option
    this.props.onEvent(e, {
      value: option.value,
      text: option.text
    })
  }

  onSelect = (value, option) => {
    const {onChange} = this.props
    const item = TOOL.deepCopy(this.props.item)
    item.option.selectValue = value
    item.option.value = option.props['data-value']
    item.option.text = option.props.children
    onChange(item)
  }

  render() {
    const {options} = this.state
    const {option} = this.props.item
    return <div className={styles.body} onClick={this.onEvent} onDoubleClick={this.onEvent}>
      <Select className={styles.select} value={option.selectValue} onSelect={this.onSelect}
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
