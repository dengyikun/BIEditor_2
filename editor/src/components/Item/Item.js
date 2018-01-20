import React, {Component, PropTypes} from 'react'
import Resizable from 'react-rnd'
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
      background,
    },
    items,
    activeId,
    drag,
    extendsProps,
    dispatch,
    children,
    className,
  } = props

  const onDragStart = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'items/changeDrag',
      payload: {
        id,
        parentId,
      }
    })
  }

  const onDragStop = (e, d) => {
    dispatch({
      type: 'items/changeDrag',
      payload: {
        id,
        parentId,
        x: d.x,
        y: d.y,
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'items/changeDrag',
        payload: {
          id: null,
          parentId: null,
          x: 0,
          y: 0,
        }
      })
    }, 300)
  }

  const onMouseUp = e => {
    if (drag.id && drag.id !== id && drag.x !== 0 && drag.y !== 0) {
      e.stopPropagation()
      const isOver = drag.parentId !== id
      const x = isOver ? getOverX(drag.parentId, id, drag.x) : drag.x
      const y = isOver ? getOverY(drag.parentId, id, drag.y) : drag.y
      dispatch({
        type: 'items/update',
        payload: {id: drag.id, x, y, parentId: id}
      })
      console.log(drag)
      dispatch({
        type: 'items/changeDrag',
        payload: {
          id: null,
          parentId: null,
          x: 0,
          y: 0,
        }
      })
    }
  }

  const getOverX = (formId, toId, dragX) => {
    const getX = id => {
      const item = items.find(item => item.id === id)
      return item ? (item.parentId ? item.x + getX(item.parentId) : item.x) : 0
    }
    const formX = getX(formId)
    const toX = getX(toId)
    return formX - toX + dragX
  }

  const getOverY = (formId, toId, dragY) => {
    const getY = id => {
      const item = items.find(item => item.id === id)
      return item ? (item.parentId ? item.y + getY(item.parentId) : item.y) : 0
    }
    const formY = getY(formId)
    const toY = getY(toId)
    return formY - toY + dragY
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
    e.stopPropagation()
    dispatch({
      type: 'items/changeActiveId',
      payload: id
    })
  }

  return <Resizable
    className={classNames(
      styles.resizable,
      {
        [styles.active]: activeId === id,
        [styles.drag]: drag.id === id,
      },
      className
    )}
    position={{x, y}}
    size={{width, height}}
    z={drag.id === id ? 9999 : ''}
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
               style={{background}}>
      {children}
    </Scrollbar>
  </Resizable>
}

// Export the wrapped version
export default Item;
