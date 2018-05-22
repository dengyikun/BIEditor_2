import React, {Component, PropTypes} from 'react'
import styles from './TextArea.less'

const TextArea = props => {
  let option = {}
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }

  const onChange = e => {
    const {item, onChange} = props
    let value = JSON.stringify(e.target.value)
    item.option = item.option.replace(/text: ["|'|`].*?["|'|`],/, `text: ${value},`)
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
