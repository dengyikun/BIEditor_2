import React, {Component, PropTypes} from 'react'
import Resizable from 're-resizable'
import {DragSource, DropTarget} from 'react-dnd'
import flow from 'lodash/flow'
import styles from './Item.less';

const boxSource = {
  beginDrag (props) {
    return props
  },
  canDrag (props) {
    return !props.isResizing
  }
}

const boxTarget = {
  drop(props, monitor) {
    const delta = monitor.getDifferenceFromInitialOffset()
    if (delta) {
      const item = monitor.getItem().item
      const isOver = item.parentId !== props.item.id
      const left = isOver ? 0 : Math.round(item.left + delta.x)
      const top = isOver ? 0 : Math.round(item.top + delta.y)
      props.dispatch({
        type: 'items/update',
        payload: {...item, left, top, parentId: props.item.id}
      })
    }
  },
}

const Item = props => {
  const {
    item:{
      id,
      left,
      top,
      width,
      height,
    },
    connectDragSource,
    connectDropTarget,
    isDragging,
    activeId,
    children,
  } = props

  const onResizeStart = () => {
    props.dispatch({
      type: 'items/changeResize',
      payload: true
    })
  }

  const onResizeStop = (e, direction, ref, d) => {
    props.dispatch({
      type: 'items/update',
      payload: {
        id,
        width: width + d.width,
        height: height + d.height,
      }
    })
    props.dispatch({
      type: 'items/changeResize',
      payload: false
    })
  }

  const onMouseOver = e => {
    e.stopPropagation()
    console.log(id)
    props.dispatch({
      type: 'items/changeActiveId',
      payload: id
    })
  }

  return !isDragging &&
    <Resizable
      className={styles.resizable + ' ' + (id === activeId && !isDragging ? styles.active : '')}
      style={{left, top}}
      size={{width, height}}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      onMouseOver={onMouseOver}>
      {
        connectDragSource(connectDropTarget(
          <div className={styles.content}>
            {children}
          </div>,
        ))
      }
    </Resizable>
}

// Export the wrapped version
export default flow(
  DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('box', boxTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Item);
