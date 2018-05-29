import React from 'react'
import styles from './Text.less'

const Text = props => {
  const option = props.item.option

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
