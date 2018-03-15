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
      id, x, y, width, height, type, style, // 基础属性
    },
    activeItemId,
    hoverItemId,
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
      type: 'item/setActiveItemId',
      payload: id,
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

  const onResizeStart = () => {
    dispatch({
      type: 'item/setActiveItemId',
      payload: id,
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
    {
      ...extendsProps
    }>
    <Scrollbar className={styles.content}
      //autoHide
               style={style}>
      {getContent(type)}
    </Scrollbar>
  </RnD>
}

// Export the wrapped version
export default Item;
