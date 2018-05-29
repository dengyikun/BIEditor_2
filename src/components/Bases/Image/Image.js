import React from 'react'
import styles from './Image.less'

const Image = props => {
  let option = {}
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }
  return <img className={styles.body} src={option.image}/>
}

export default Image
