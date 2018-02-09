import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import RnD from 'react-rnd';
import classNames from 'classnames'
import styles from './LeftAside.less';

function mapStateToProps(state) {
  const {dragItem} = state.items;
  return {
    dragItem,
  };
}

function LeftAside({dispatch, dragItem}) {

  const onDragStart = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'items/changeDragItem',
      payload: {
        id: 'aaa',
        parentId: 'base',
        y: 0,
        x: 0,
        width: 100,
        height: 100,
        type: '',
        style: {background: '#' + (~~(Math.random() * (1 << 24))).toString(16)}
      }
    })
  }

  const onDragStop = (e, d) => {
    setTimeout(() => {
      dispatch({
        type: 'items/changeDragItem',
        payload: {}
      })
    }, 300)
  }

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <Icon type="api"/>&nbsp;&nbsp;组&nbsp;&nbsp;件
      </div>
      <div className={styles.baseTitle}>
        <Icon type="caret-down"/>&nbsp;&nbsp;基础控件
      </div>
      <div className={styles.base}>
        <div className={styles.item}>
          <Icon type="layout"/>
          <RnD className={classNames(
            styles.item,
            {
              [styles.drag]: dragItem.parentId === 'base',
            }
          )}
               onDragStart={onDragStart}
               onDragStop={onDragStop}
               position={{x: 0, y: 0}}
               size={{width: '100%', height: '100%'}}
               enableResizing="false">
            <Icon type="layout"/>
          </RnD>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(LeftAside)
