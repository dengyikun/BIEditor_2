import React from 'react'
import {Select} from 'antd'
import {TOOL} from '../../../utils'
import styles from './Select.less'

const Option = Select.Option

const CustomSelect = props => {
  const option = props.item.option

  const onEvent = e => {
    props.onEvent(e, {
      value: option.value,
      text: option.text
    })
  }

  const onSelect = (value, option) => {
    const {onChange} = props
    const item = TOOL.deepCopy(props.item)
    item.option.selectValue = value
    item.option.value = option.props['data-value']
    item.option.text = option.props.children
    onChange(item)
  }

  return <div className={styles.body} onClick={onEvent} onDoubleClick={onEvent}>
    <Select className={styles.select} value={option.selectValue} onSelect={onSelect}
            showSearch optionFilterProp="children">
      {
        option.options.map((option, index) =>
        <Option key={index} data-value={option.value}>{option.text}</Option>)
      }
    </Select>
  </div>
}

export default CustomSelect
