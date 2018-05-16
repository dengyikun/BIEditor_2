import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import styles from './Container.less'
import ScrollBar from 'react-custom-scrollbars'

const Container = props => {

  const {
    item: {
      id, type, // 基础属性
    },
    dragItem,
    dispatch,
    children,
  } = props

  const onMouseUp = e => {
    if (dragItem.id && dragItem.id !== id && type === 'container') {
      let x = 0, y = 0;
      if (dragItem.parentId !== id) {
        x = e.nativeEvent.offsetX - (dragItem.offsetX || dragItem.width / 2)
        y = e.nativeEvent.offsetY - (dragItem.offsetY || dragItem.height / 2)
      } else {
        x = dragItem.x
        y = dragItem.y
      }
      dispatch({
        type: 'page/setItem',
        payload: {...dragItem, x, y, parentId: id}
      })
      dispatch({
        type: 'page/setActiveItemId',
        payload: dragItem.id,
      })
      dispatch({
        type: 'page/setDragItem',
        payload: {}
      })
      dispatch({
        type: 'page/setHoverItemId',
        payload: ''
      })
      e.stopPropagation()
    }
  }

  return <ScrollBar className={styles.body} onMouseUp={onMouseUp}>
    {children}
  </ScrollBar>
}

function mapStateToProps(state) {
  const {list, dragItem} = state.page;
  return {
    list,
    dragItem,
  };
}

export default connect(mapStateToProps)(Container)
