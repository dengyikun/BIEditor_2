import React, {Component, PropTypes} from 'react'
import Resizable from 're-resizable'
import {DragSource, DropTarget} from 'react-dnd'
import flow from 'lodash/flow'

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  cursor: 'move',
}

const boxSource = {
  beginDrag(props) {
    const {id, left, top} = props
    return {id, left, top, aaa: 111}
  },
}

const boxTarget = {
  drop(props, monitor, component) {
  },
}

const Box = props => {
  const {
    left,
    top,
    width,
    height,
    connectDragSource,
    connectDropTarget,
    isDragging,
    children,
  } = props

  return !isDragging && connectDragSource(connectDropTarget(
    <div style={{...style, left, top, width, height}}>
      {children}
    </div>,
  ))
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
)(Box);
