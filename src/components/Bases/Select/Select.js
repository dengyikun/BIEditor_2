import React from 'react'
import {Select} from 'antd'
import styles from './Select.less'

const Option = Select.Option

const CustomSelect = props => {
  let option = {
    options: []
  }
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }

  const onEvent = e => {
    props.onEvent(e, {
      value: option.value,
      text: option.text
    })
  }

  const onSelect = (value, option) => {
    const {item, onChange} = props
    item.option = item.option.replace(/value: ".*?",/, `value: "${value}",`)
    item.option = item.option.replace(/text: ".*?",/, `text: "${option.props.children}",`)
    onChange(item)
  }

  return <div className={styles.body} onClick={onEvent} onDoubleClick={onEvent}>
    <Select className={styles.select} value={option.value} onSelect={onSelect}
            showSearch optionFilterProp="children">
      {
        option.options.map((option, index) =>
        <Option key={index} value={option.value}>{option.text}</Option>)
      }
    </Select>
  </div>
}

export default CustomSelect
