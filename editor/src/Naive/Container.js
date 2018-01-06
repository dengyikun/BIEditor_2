import React, {Component, PropTypes} from 'react'
import update from 'immutability-helper'
import {DropTarget} from 'react-dnd'
import Box from './Box'

const styles = {
  width: 800,
  height: 800,
  border: '1px solid black',
  position: 'relative',
}

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
    if (delta) {
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)

      component.moveBox(item, left, top)
    }
  },
}

class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      boxes: {
        c: {top: 20, left: 80, width: 100, height: 100, title: 'Drag me around'},
        b: {top: 180, left: 20, width: 300, height: 300, title: 'Drag me too'},
      },
    }
  }

  moveBox = (item, left, top) => {
    this.setState(
      update(this.state, {
        boxes: {
          [item.id]: {
            $merge: {left, top},
          },
        },
      }),
    )
  }

  render() {
    const {connectDropTarget} = this.props
    const {boxes} = this.state

    return connectDropTarget(
      <div style={styles}>
        {Object.keys(boxes).map(key => {
          const {left, top, title, width, height} = boxes[key]
          return (
            <Box
              key={key}
              id={key}
              left={left}
              top={top}
              width={width}
              height={height}
            >
              {title}
            </Box>
          )
        })}
      </div>,
    )
  }
}


// Export the wrapped version
export default DropTarget('box', boxTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Container);
