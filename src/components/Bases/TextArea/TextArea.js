import React, {Component, PropTypes} from 'react'
import styles from './TextArea.less'

const TextArea = props => {
  let option = {}
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }
  return <textarea className={styles.body} defaultValue={option.text} key={option.text}
                   style={{pointerEvents: props.isEdit ? 'none' : 'auto'}}>
  </textarea>
}

export default TextArea
