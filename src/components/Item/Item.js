import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import RnD from 'react-rnd'
import classNames from 'classnames'
import items from '../../data/items'
import styles from './Item.less'

const Item = props => {

  const {
    item:{
      id, x, y, width, height, type, style, eventList, css, js, // 基础属性
    },
    list,
    isEdit,
    activeItemId,
    hoverItemId,
    dragItem,
    dispatch,
    children,
    pageWidth,
    pageHeight,
    className,
  } = props

  const runJs = () => {
    setTimeout(() => {
      if (document.getElementById(id)){
        try {
          eval(js)
        } catch (e) {

        }
      } else {
        runJs()
      }
    }, 400)
  }

  runJs()

  //开始拖拽控件
  const onDragStart = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'page/setDragItem',
      payload: {
        ...props.item,
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      }
    })
  }

  //停止拖拽控件
  const onDragStop = (e, d) => {
    let {x, y} = d
    const totalWidth = width + x
    const totalHeight = height + y
    x = totalWidth < pageWidth ? x : pageWidth - width
    y = totalHeight < pageHeight ? y : pageHeight - height
    x = x < 0 ? 0 : x
    y = y < 0 ? 0 : y
    dispatch({
      type: 'page/setDragItem',
      payload: {
        ...props.item,
        offsetX: dragItem.offsetX,
        offsetY: dragItem.offsetY,
        x,
        y,
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'page/setDragItem',
        payload: {}
      })
      dispatch({
        type: 'page/setHoverItemId',
        payload: ''
      })
    }, 100)
  }

  //调整控件大小时
  const onResize = (e, direction, ref, d, position) => {
    let {x, y} = position
    x = x < 0 ? 0 : x
    y = y < 0 ? 0 : y
    dispatch({
      type: 'page/setItem',
      payload: {
        id,
        x,
        y,
      }
    })
  }

  //停止调整控件大小
  const onResizeStop = (e, direction, ref, d) => {
    const newWidth = width + d.width
    const newHeight = height + d.height
    const totalWidth = newWidth + x
    const totalHeight = newHeight + y
    dispatch({
      type: 'page/setItem',
      payload: {
        id,
        width: totalWidth < pageWidth ? newWidth : pageWidth - x,
        height: totalHeight < pageHeight ? newHeight : pageHeight - y,
        refreshAt: new Date(),
      }
    })
  }

  //鼠标移至控件上时
  const onMouseOver = e => {
    e.stopPropagation()
    if (isEdit) {
      if (dragItem.id && type === 'container') {
        dispatch({
          type: 'page/setHoverItemId',
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
                targetItem.refreshAt = new Date()
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
              type: 'page/setItem',
              payload: {...targetItem}
            })
          }
        }
      })
    }
  }

  const onMouseDown = e => {
    e.stopPropagation()
    dispatch({
      type: 'page/setActiveItemId',
      payload: id,
    })
  }

  //获取控件内容
  const getContent = (type) => {
    const Content = items[type].instance
    return <Content item={props.item} isEdit={isEdit}>{children}</Content>
  }

  return (activeItemId === id) && isEdit ? <RnD
      className={classNames(
        styles.rnd,
        {
          [styles.noneEvents]: dragItem.id === id,
        },
        className
      )}
      style={style}
      position={{x: x, y: y}}
      size={{width: width, height: height}}
      z={((dragItem.id === id) || (activeItemId === id)) ? 999 : ''}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onResize={onResize}
      onResizeStop={onResizeStop}
      resizeHandleWrapperClass={styles.resizeHandle}
      extendsProps={{id}}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      {getContent(type)}
      <style>
        {css}
      </style>
    </RnD> :
    <div className={classNames(
      styles.item,
      {
        [styles.noneEvents]: dragItem.id && type !== 'container',
        [styles.hover]: hoverItemId === id,
      },
      className
    )}
         id={id}
         style={{...style, width: width, height: height, left: x, top: y}}
         onMouseOver={onMouseOver}
         onClick={onEvent}
         onDoubleClick={onEvent}
         onMouseDown={onMouseDown}
    >
      {getContent(type)}
      <style>
        {css}
      </style>
    </div>
}

function mapStateToProps(state) {
  const {
    list,
    activeItemId,
    hoverItemId,
    dragItem,
    autoResize,
    pageWidth,
    pageHeight,
  } = state.page;
  return {
    list,
    activeItemId,
    hoverItemId,
    dragItem,
    autoResize,
    pageWidth,
    pageHeight,
  };
}

export default connect(mapStateToProps)(Item)
