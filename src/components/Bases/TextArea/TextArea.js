import React from 'react'
import {TOOL} from '../../../utils'
import styles from './TextArea.less'

const TextArea = props => {
  const option = props.item.option

  const onChange = e => {
    const {onChange} = props
    const item = TOOL.deepCopy(props.item)
    item.option.text = e.target.value
    onChange(item)
  }

  const onEvent = e => {
    props.onEvent(e, {
      text: option.text
    })
  }

  return <textarea className={styles.body} onClick={onEvent} onDoubleClick={onEvent}
                   value={option.text} onChange={onChange}
                   style={{pointerEvents: props.isEdit ? 'none' : 'auto'}}>
  </textarea>
}

export default TextArea
