import React, {Component, PropTypes} from 'react'
import styles from './IFrame.less'

const IFrame = ({item, isEdit}) => {
  let option = {}
  try {
    eval(item.option)
  } catch (e) {
    console.error(e)
  }
  return <iframe className={styles.body} src={option.url}
                 style={{pointerEvents: isEdit ? 'none' : 'auto'}}/>
}

export default IFrame
