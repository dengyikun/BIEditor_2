import React, {Component, PropTypes} from 'react'
import RnD from 'react-rnd'
import Scrollbar from 'react-custom-scrollbars'
import classNames from 'classnames'
import styles from './Item.less'

const Item = props => {
  const {
    item:{
      id,
      parentId,
      x,
      y,
      width,
      height,
      type,
      style,
    },
    items,
    activeItem,
    dragItem,
    extendsProps,
    dispatch,
    children,
    className,
  } = props

  const onDragStart = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'items/changeDragItem',
      payload: {
        ...props.item,
      }
    })
  }

  const onDragStop = (e, d) => {
    dispatch({
      type: 'items/changeDragItem',
      payload: {
        ...props.item,
        x: d.x,
        y: d.y,
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'items/changeDragItem',
        payload: {}
      })
    }, 300)
  }

  const onMouseUp = e => {
    if (dragItem.id && dragItem.id !== id && type === 'container') {
      e.stopPropagation()
      let x = 0, y = 0;
      switch (dragItem.parentId) {
        case id:
          x = dragItem.x
          y = dragItem.y
          break
        case 'base':
          x = e.nativeEvent.offsetX + 20
          y = e.nativeEvent.offsetY + 20
          break
        default:
          x = getOverX(dragItem.parentId, id, dragItem.x)
          y = getOverY(dragItem.parentId, id, dragItem.y)
      }
      dispatch({
        type: 'items/changeDragItem',
        payload: {}
      })
      dispatch({
        type: 'items/update',
        payload: {...dragItem, x, y, parentId: id}
      })
    }
  }

  const getOverX = (formId, toId, dragItemX) => {
    const getX = id => {
      const item = items.find(item => item.id === id)
      return item ? (item.parentId ? item.x + getX(item.parentId) : item.x) : 0
    }
    const formX = getX(formId)
    const toX = getX(toId)
    return formX - toX + dragItemX
  }

  const getOverY = (formId, toId, dragItemY) => {
    const getY = id => {
      const item = items.find(item => item.id === id)
      return item ? (item.parentId ? item.y + getY(item.parentId) : item.y) : 0
    }
    const formY = getY(formId)
    const toY = getY(toId)
    return formY - toY + dragItemY
  }

  const onResize = (e, direction, ref, d, position) => {
    dispatch({
      type: 'items/update',
      payload: {
        id,
        x: position.x,
        y: position.y,
      }
    })
  }

  const onResizeStop = (e, direction, ref, d) => {
    dispatch({
      type: 'items/update',
      payload: {
        id,
        width: width + d.width,
        height: height + d.height,
      }
    })
  }

  const onMouseOver = e => {
    if (!dragItem.id || (dragItem.id && type === 'container')) {
      e.stopPropagation()
      dispatch({
        type: 'items/changeActiveItem',
        payload: props.item
      })
    }
  }

  return <RnD
    className={classNames(
      styles.rnd,
      {
        [styles.active]: activeItem.id === id,
        [styles.drag]: dragItem.id === id,
      },
      className
    )}
    position={{x, y}}
    size={{width, height}}
    z={dragItem.id === id ? 9999 : ''}
    onDragStart={onDragStart}
    onDragStop={onDragStop}
    onResize={onResize}
    onResizeStop={onResizeStop}
    resizeHandleWrapperClass={styles.resizeHandle}
    extendsProps={{
      onMouseOver,
    }}
    {
      ...extendsProps
    }>
    <Scrollbar className={styles.content}
               onMouseUp={onMouseUp}
      //autoHide
               style={style}>
      {children}
    </Scrollbar>
  </RnD>
}

// Export the wrapped version
export default Item;
