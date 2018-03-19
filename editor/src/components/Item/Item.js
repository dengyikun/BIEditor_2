import React, {Component, PropTypes} from 'react'
import RnD from 'react-rnd'
import Scrollbar from 'react-custom-scrollbars'
import classNames from 'classnames'
import items from '../../data/items'
import styles from './Item.less'

const Item = props => {

  let chart = null

  const {
    item:{
      id, x, y, width, height, type, style, eventList, // 基础属性
    },
    isEdit,
    activeItemId,
    hoverItemId,
    dragItem,
    dispatch,
    children,
    className,
  } = props

  //开始拖拽控件
  const onDragStart = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setDragItem',
      payload: {
        ...props.item,
      }
    })
    dispatch({
      type: 'item/setActiveItemId',
      payload: id,
    })
  }

  //停止拖拽控件
  const onDragStop = (e, d) => {
    dispatch({
      type: 'item/setDragItem',
      payload: {
        ...props.item,
        x: d.x,
        y: d.y,
      }
    })
    dispatch({
      type: 'item/setActiveItemId',
      payload: id,
    })
    setTimeout(() => {
      dispatch({
        type: 'item/setDragItem',
        payload: {}
      })
    }, 300)
  }

  //开始调整控件大小
  const onResizeStart = () => {
    dispatch({
      type: 'item/setActiveItemId',
      payload: id,
    })
  }

  //调整控件大小时
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

  //停止调整控件大小
  const onResizeStop = (e, direction, ref, d) => {
    dispatch({
      type: 'item/setItem',
      payload: {
        id,
        width: width + d.width,
        height: height + d.height,
      }
    })
    chart && chart.resize()
  }

  //鼠标移至控件上时
  const onMouseOver = e => {
    e.stopPropagation()
    if (!dragItem.id || (dragItem.id && type === 'container')) {
      dispatch({
        type: 'item/setHoverItem',
        payload: props.item
      })
    }
  }

  //控件事件
  const onEvent = e => {
    e.stopPropagation()
    if (isEdit) {
      eventList.map(event => {
        if (event.type === e.type) {
          console.log(event.type)
        }
      })
    }
  }

  //获取控件内容
  const getContent = (type) => {
    const Content = items[type].instance
    return <Content {...props} ref={instance => {
      if (!chart) chart = instance
    }}>{children}</Content>
  }

  return <RnD
    className={classNames(
      styles.rnd,
      {
        [styles.active]: (activeItemId === id) || (hoverItemId === id),
        [styles.noneEvents]: (dragItem.id === id) || (dragItem.id && type !== 'container'),
      },
      className
    )}
    position={{x, y}}
    size={{width, height}}
    z={((dragItem.id === id) || (activeItemId === id)) ? 9999 : ''}
    onDragStart={onDragStart}
    onDragStop={onDragStop}
    onResizeStart={onResizeStart}
    onResize={onResize}
    onResizeStop={onResizeStop}
    resizeHandleWrapperClass={styles.resizeHandle}
    extendsProps={{
      onMouseOver,
    }}
    disableDragging={!isEdit}
    enableResizing={{
      top: isEdit,
      right: isEdit,
      bottom: isEdit,
      left: isEdit,
      topRight: isEdit,
      bottomRight: isEdit,
      bottomLeft: isEdit,
      topLeft: isEdit,
    }}
  >
    <Scrollbar className={styles.content}
               onClick={onEvent}
               onDoubleClick={onEvent}
      //autoHide
               style={style}>
      {getContent(type)}
    </Scrollbar>
  </RnD>
}

// Export the wrapped version
export default Item;
