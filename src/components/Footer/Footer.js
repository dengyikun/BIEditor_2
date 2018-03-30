import React from 'react';
import {connect} from 'dva';
import {InputNumber, Switch} from 'antd'
import styles from './Footer.less';

function mapStateToProps(state) {
  const { list, activeItemId,pageWidth, pageHeight, autoResize,} = state.item;
  return {
    list,
    activeItemId,
    pageWidth,
    pageHeight,
    autoResize,
  };
}

function Footer({dispatch, list, activeItemId, pageWidth, pageHeight, autoResize,}) {

  const activeItem = {
    x: null,
    y: null,
    width: null,
    height: null,
    ...list.find(item => item.id === activeItemId)
  }

  const onPageWidthChange = value => {
    dispatch({
      type: 'item/setPageWidth',
      payload: value
    })
  }

  const onPageHeightChange = value => {
    dispatch({
      type: 'item/setPageHeight',
      payload: value
    })
  }

  const onAutoResizeChange = value => {
    dispatch({
      type: 'item/setAutoResize',
      payload: value
    })
  }

  const onXChange = value => {
    if (activeItemId) {
      dispatch({
        type: 'item/setItem',
        payload: {
          id: activeItemId,
          x: value
        }
      })
    }
  }

  const onYChange = value => {
    if (activeItemId) {
      dispatch({
        type: 'item/setItem',
        payload: {
          id: activeItemId,
          y: value
        }
      })
    }
  }

  const onWidthChange = value => {
    if (activeItemId) {
      dispatch({
        type: 'item/setItem',
        payload: {
          id: activeItemId,
          width: value,
          refreshAt: new Date()
        }
      })
    }
  }

  const onHeightChange = value => {
    if (activeItemId) {
      dispatch({
        type: 'item/setItem',
        payload: {
          id: activeItemId,
          height: value,
          refreshAt: new Date()
        }
      })
    }
  }

  return (
    <div className={styles.body}>
      宽度
      <InputNumber className={styles.numberCircle} min={0}
                   value={pageWidth} onChange={onPageWidthChange}/>
      高度
      <InputNumber className={styles.numberCircle} min={0}
                   value={pageHeight} onChange={onPageHeightChange}/>
      自适应
      <Switch className={styles.resize}
              checked={autoResize} onChange={onAutoResizeChange}/>
      <div className={styles.placeholder}></div>
      X
      <InputNumber className={styles.numberSquare} min={0}
                   value={activeItem.x} onChange={onXChange}/>
      Y
      <InputNumber className={styles.numberSquare} min={0}
                   value={activeItem.y} onChange={onYChange}/>
      W
      <InputNumber className={styles.numberSquare} min={0}
                   value={activeItem.width} onChange={onWidthChange}/>
      H
      <InputNumber className={styles.numberSquare} min={0}
                   value={activeItem.height} onChange={onHeightChange}/>
    </div>
  );
}

export default connect(mapStateToProps)(Footer)
