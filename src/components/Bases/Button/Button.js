import React from 'react'
import styles from './Button.less'

const Button = props => {
  const option = props.item.option
  return <div className={styles.body}>
    <div className={styles.text}>
      {option.text}
    </div>
  </div>
}

export default Button
