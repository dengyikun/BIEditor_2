import React, {Component, PropTypes} from 'react'
import styles from './IFrame.less'

const IFrame = props => {
  let option = {}
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }
  return <iframe className={styles.body} src={option.url}
                 style={{pointerEvents: props.isEdit ? 'none' : 'auto'}}/>
}

export default IFrame
