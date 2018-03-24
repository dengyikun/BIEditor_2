import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import RnD from 'react-rnd'
import classNames from 'classnames'
import items from '../../data/items'
import styles from './Item.less'

const Item = props => {

  const {clientWidth: listWidth} = document.getElementById('list') || {}

  let chart = null

  const {
    item:{
      id, x, y, width, height, type, style, eventList, // 基础属性
    },
    list,
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
    let {x, y} = d
    x = x < 0 ? 0 : x
    x = x > listWidth - width ? listWidth - width : x
    y = y < 0 ? 0 : y
    const item = {
      ...props.item,
      x,
      y,
    }
    dispatch({
      type: 'item/setItem',
      payload: item
    })
    dispatch({
      type: 'item/setDragItem',
      payload: item
    })
    setTimeout(() => {
      dispatch({
        type: 'item/setDragItem',
        payload: {}
      })
    }, 100)
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
    let {x, y} = position
    x = x < 0 ? 0 : x
    x = x > listWidth - width ? listWidth - width : x
    y = y < 0 ? 0 : y
    dispatch({
      type: 'item/setItem',
      payload: {
        id,
        x,
        y,
      }
    })
  }

  //停止调整控件大小
  const onResizeStop = (e, direction, ref, d) => {
    const {width: dWidth, height: dHeight} = d
    const {clientWidth: listWidth, clientHeight: listHeight} = document.getElementById('list')
    const offsetWidth = dWidth
    dispatch({
      type: 'item/setItem',
      payload: {
        id,
        width: width + d.width,
        height: height + d.height,
      }
    })
    chart.resize && chart.resize()
  }

  //鼠标移至控件上时
  const onMouseOver = e => {
    e.stopPropagation()
    if (isEdit) {
      if (!dragItem.id || (dragItem.id && type === 'container')) {
        dispatch({
          type: 'item/setHoverItemId',
          payload: id
        })
      }
    }
  }

  //控件事件
  const onEvent = e => {
    e.stopPropagation()
    if (!isEdit) {
      eventList.map(event => {
        if (event.type === e.type) {
          let targetItem = list.find(item => item.id === event.targetId)
          if (targetItem) {
            switch (event.action) {
              case 'refresh':
                targetItem.conditionList = event.conditionList
                targetItem.refreshTime = new Date()
                break
              case 'hide':
                targetItem.style.visibility = 'hidden'
                break
              case 'show':
                targetItem.style.visibility = 'visible'
                break
              case 'setData':
                break
            }
            dispatch({
              type: 'item/setItem',
              payload: {...targetItem}
            })
          }
        }
      })
    }
  }

  //获取控件内容
  const getContent = (type) => {
    const Content = items[type].instance
    return <Content item={props.item} ref={instance => {
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
    style={style}
    position={{x, y}}
    size={{width: width, height: height}}
    z={((dragItem.id === id) || (activeItemId === id)) ? 9999 : ''}
    onDragStart={onDragStart}
    onDragStop={onDragStop}
    onResizeStart={onResizeStart}
    onResize={onResize}
    onResizeStop={onResizeStop}
    resizeHandleWrapperClass={styles.resizeHandle}
    extendsProps={{
      id,
      onMouseOver,
      onClick: onEvent,
      onDoubleClick: onEvent,
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
      {getContent(type)}
  </RnD>
}

function mapStateToProps(state) {
  const {list, activeItemId, hoverItemId, dragItem} = state.item;
  return {
    list,
    activeItemId,
    hoverItemId,
    dragItem,
  };
}

export default connect(mapStateToProps)(Item)
