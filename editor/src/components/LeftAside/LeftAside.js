import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import RnD from 'react-rnd';
import classNames from 'classnames'
import {TOOL} from '../../utils'
import baseList from './baseList'
import chartList from './chartList'
import styles from './LeftAside.less';

  function mapStateToProps(state) {
  const {dragItem} = state.item;
  return {
    dragItem,
  };
}

function LeftAside({dispatch, dragItem}) {

  const onDragStart = (item) => (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setDragItem',
      payload: {...item, id: TOOL.getGUID(),}
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
          baseList.map((base, index) => <div className={styles.item} key={index}>
            {base.node}
            <RnD className={classNames(
              styles.item,
              {
                [styles.drag]: dragItem.parentId === 'base',
              }
            )}
                 onDragStart={onDragStart(base.item)}
                 onDragStop={onDragStop}
                 position={{x: 0, y: 0}}
                 size={{width: '100%', height: '100%'}}
                 enableResizing="false">
              {base.node}
            </RnD>
          </div>)
        }
      </div>
      <div className={styles.subTitle}>
        <Icon type="caret-down"/>&nbsp;&nbsp;图表控件
      </div>
      <div className={styles.list}>
        {
          chartList.map((chart, index) => <div className={styles.item} key={index}>
            {chart.node}
            <RnD className={classNames(
              styles.item,
              {
                [styles.drag]: dragItem.parentId === 'chart',
              }
            )}
                 onDragStart={onDragStart(chart.item)}
                 onDragStop={onDragStop}
                 position={{x: 0, y: 0}}
                 size={{width: '100%', height: '100%'}}
                 enableResizing="false">
              {chart.node}
            </RnD>
          </div>)
        }
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(LeftAside)
