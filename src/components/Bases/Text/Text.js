import React, {Component, PropTypes} from 'react'
import styles from './Text.less'

const Text = props => {
  let option = {}
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }
  return <div className={styles.body}>
    {option.text}
  </div>
}

export default Text
