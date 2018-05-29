import React from 'react'
import styles from './Image.less'

const Image = props => {
  const option = props.item.option
  return <img className={styles.body} src={option.image}/>
}

export default Image
