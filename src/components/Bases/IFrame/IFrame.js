import React from 'react'
import styles from './IFrame.less'

const IFrame = props => {
  const option = props.item.option
  return <iframe className={styles.body} src={option.url}
                 style={{pointerEvents: props.isEdit ? 'none' : 'auto'}}/>
}

export default IFrame
