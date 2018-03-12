import React, {Component, PropTypes} from 'react'
import RnD from 'react-rnd'
import Scrollbar from 'react-custom-scrollbars'
import classNames from 'classnames'
import LineChart from '../Charts/Line/LineChart'
import styles from './Item.less'

const Item = props => {

  let chart = null

  const {
    item:{
      id, parentId, x, y, width, height, type, style, // 基础属性
      dimensions, values, sourceId, sql, conditionList, // 数据获取属性
    },
    list,
    activeItem,
    hoverItem,
    dragItem,
    extendsProps,
    dispatch,
    children,
    className,
  } = props

  const onDragStart = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setDragItem',
      payload: {
        ...props.item,
      }
    })
    dispatch({
      type: 'item/setActiveItem',
      payload: {
        ...props.item,
      }
    })
  }

  const onDragStop = (e, d) => {
    dispatch({
      type: 'item/setDragItem',
      payload: {
        ...props.item,
        x: d.x,
        y: d.y,
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'item/setDragItem',
        payload: {}
      })
    }, 300)
  }

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
        type: 'item/setActiveItem',
        payload: {...dragItem, x, y, parentId: id}
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

  const onResizeStart = () => {
    dispatch({
      type: 'item/setActiveItem',
      payload: {
        ...props.item,
      }
    })
  }

  const onResize = (e, direction, ref, d, position) => {
    dispatch({
      type: 'item/setItem',
      payload: {
        id,
        x: position.x,
        y: position.y,
      }
    })
  }

  const onResizeStop = (e, direction, ref, d) => {
    dispatch({
      type: 'item/setItem',
      payload: {
        id,
        width: width + d.width,
        height: height + d.height,
      }
    })
    dispatch({
      type: 'item/setActiveItem',
      payload: {
        ...props.item,
      }
    })
    chart && chart.resize()
  }

  const onMouseOver = e => {
    if (!dragItem.id || (dragItem.id && type === 'container')) {
      e.stopPropagation()
      dispatch({
        type: 'item/setHoverItem',
        payload: props.item
      })
    }
  }

  const getContent = (type) => {
    switch (type) {
      case 'chartLine':
        return <LineChart item={{...props.item}} dispatch={dispatch} ref={instance => {
          if (!chart) chart = instance
        }}/>
    }
  }

  return <RnD
    className={classNames(
      styles.rnd,
      {
        [styles.active]: (activeItem.id === id) || (hoverItem.id === id),
        [styles.noneEvents]: (dragItem.id === id) || (dragItem.id && type !== 'container'),
      },
      className
    )}
    position={{x, y}}
    size={{width, height}}
    z={((dragItem.id === id) || (activeItem.id === id)) ? 9999 : ''}
    onDragStart={onDragStart}
    onDragStop={onDragStop}
    onResizeStart={onResizeStart}
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
      {getContent(type)}
      {children}
    </Scrollbar>
  </RnD>
}

// Export the wrapped version
export default Item;
