import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import styles from './Container.less'
import ScrollBar from 'react-custom-scrollbars'

const Container = props => {

  let chart = null

  const {
    item: {
      id, type, // 基础属性
    },
    list,
    dragItem,
    dispatch,
    children,
  } = props

  const onMouseUp = e => {

    if (dragItem.id && dragItem.id !== id && type === 'container') {
      let x = 0, y = 0;
      switch (dragItem.parentId) {
        case id:
          x = dragItem.x
          y = dragItem.y
          break
        case 'base':
        case 'chart':
          x = e.nativeEvent.offsetX - dragItem.width / 2
          y = e.nativeEvent.offsetY - dragItem.height / 2
          break
        default:
          x = getOverX(dragItem.parentId, id, dragItem.x)
          y = getOverY(dragItem.parentId, id, dragItem.y)
      }
      dispatch({
        type: 'item/setItem',
        payload: {...dragItem, x, y, parentId: id}
      })
      dispatch({
        type: 'item/setActiveItemId',
        payload: dragItem.id,
      })
      dispatch({
        type: 'item/setDragItem',
        payload: {}
      })
      dispatch({
        type: 'item/setHoverItemId',
        payload: ''
      })
      e.stopPropagation()
    }
  }

  const getOverX = (formId, toId, dragItemX) => {
    const getX = id => {
      const item = list.find(item => item.id === id)
      return item ? (item.parentId ? item.x + getX(item.parentId) : item.x) : 0
    }
    const formX = getX(formId)
    const toX = getX(toId)
    return formX - toX + dragItemX
  }

  const getOverY = (formId, toId, dragItemY) => {
    const getY = id => {
      const item = list.find(item => item.id === id)
      return item ? (item.parentId ? item.y + getY(item.parentId) : item.y) : 0
    }
    const formY = getY(formId)
    const toY = getY(toId)
    return formY - toY + dragItemY
  }

  return <ScrollBar className={styles.body} onMouseUp={onMouseUp}
                    renderTrackHorizontal={() => <div className={styles.horizontal}/>}>
    {children}
  </ScrollBar>
}

function mapStateToProps(state) {
  const {list, dragItem} = state.item;
  return {
    list,
    dragItem,
  };
}

export default connect(mapStateToProps)(Container)
