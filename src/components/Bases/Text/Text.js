import React, {Component, PropTypes} from 'react'
import styles from './Text.less'

const Text = props => {
  let option = {}
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }

  const onEvent = e => {
    props.onEvent(e, {
      text: option.text
    })
  }

  return <div className={styles.body} onClick={onEvent} onDoubleClick={onEvent}>
    {option.text}
  </div>
}

export default Text
