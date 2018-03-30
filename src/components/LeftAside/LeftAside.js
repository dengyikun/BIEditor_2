import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import RnD from 'react-rnd';
import classNames from 'classnames'
import {TOOL} from '../../utils'
import items from '../../data/items'
import styles from './LeftAside.less';

function mapStateToProps(state) {
  const {dragItem} = state.item;
  return {
    dragItem,
  };
}

function LeftAside({dispatch, dragItem}) {

  const getItems = (parentId, items) => {
    return Object.keys(items).map((type, index) => parentId === items[type].item.parentId ?
      <div className={styles.item} key={index}>
        {items[type].node}
        <RnD className={classNames(
          styles.item,
          {
            [styles.drag]: dragItem.parentId === parentId,
          }
        )}
             onDragStart={onDragStart(items[type].item)}
             onDragStop={onDragStop}
             position={{x: 0, y: 0}}
             size={{width: '100%', height: '100%'}}
             enableResizing="false">
          {items[type].node}
        </RnD>
      </div> : null
    )
  }

  const onDragStart = (item) => (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setDragItem',
      payload: {...item, id: item.type + '-' + new Date().getTime(),}
    })
  }

  const onDragStop = () => {
    setTimeout(() => {
      dispatch({
        type: 'item/setDragItem',
        payload: {}
      })
    }, 300)
  }

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <Icon type="api"/>&nbsp;&nbsp;组&nbsp;&nbsp;件
      </div>
      <div className={styles.subTitle}>
        <Icon type="caret-down"/>&nbsp;&nbsp;基础控件
      </div>
      <div className={styles.list}>
        {
          getItems('base', items)
        }
      </div>
      <div className={styles.subTitle}>
        <Icon type="caret-down"/>&nbsp;&nbsp;图表控件
      </div>
      <div className={styles.list}>
        {
          getItems('chart', items)
        }
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(LeftAside)
