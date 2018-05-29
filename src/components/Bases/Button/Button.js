import React from 'react'
import styles from './Button.less'

const Button = ({item}) => {
  let option = {}
  try {
    eval(item.option)
  } catch (e) {
    console.error(e)
  }
  return <div className={styles.body}>
    <div className={styles.text}>
      {option.text}
    </div>
  </div>
}

export default Button
