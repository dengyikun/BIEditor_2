import React, {Component, PropTypes} from 'react'
import styles from './Container.less'

const Item = props => {

  let chart = null

  const {
    item:{
      id, type, style, // 基础属性
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
        type: 'item/setDragItem',
        payload: {}
      })
      dispatch({
        type: 'item/setActiveItemId',
        payload: dragItem.id,
      })
      dispatch({
        type: 'item/setItem',
        payload: {...dragItem, x, y, parentId: id}
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

  return <div className={styles.body}
              onMouseUp={onMouseUp}
              style={style}>
    {children}
  </div>
}

// Export the wrapped version
export default Item;
