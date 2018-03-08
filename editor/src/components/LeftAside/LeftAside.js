import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import RnD from 'react-rnd';
import classNames from 'classnames'
import {TOOL} from '../../utils'
import styles from './LeftAside.less';

function mapStateToProps(state) {
  const {dragItem} = state.item;
  return {
    dragItem,
  };
}

function LeftAside({dispatch, dragItem}) {

  const bases = [  // 基础控件
    {
      item: {
        id: TOOL.getGUID(),
        name: '容器',
        parentId: 'base',
        width: 100,
        height: 100,
        type: 'container',
        style: {background: '#' + (~~(Math.random() * (1 << 24))).toString(16)}
      },
      node: <div className={styles.widget}>
        <Icon className={styles.icon} type="layout"/>
        容器组件
      </div>
    },
  ]

  const charts = [  // 图表控件
    {
      item: {
        id: TOOL.getGUID(),
        name: '折线图',
        parentId: 'chart',
        width: 100,
        height: 100,
        type: 'chartLine',
        style: {background: '#' + (~~(Math.random() * (1 << 24))).toString(16)},
        sourceId: '2573632338734d5cb24489b06de09659',
        sql: 'SELECT SUBSTRING(addTime,1,10) as addTime, COUNT(cuId) as total from comment_user where nickname != "${nickname}" and country = "${country}" GROUP BY SUBSTRING(addTime,1,10) ORDER BY addTime asc',
        conditionList: [
          {
            name: 'nickname',
            value: '匿名用户'
          },
          {
            name: 'country',
            value: '中国'
          },
        ],
        dimensionList: [
          {
            name: 'addTime',
            displayName: '日期',
          }
        ],
        valueList: [
          {
            name: 'total',
            displayName: '每天新增人数',
          }
        ],
      },
      node: <div className={styles.widget}>
        <Icon className={styles.icon} type="line-chart"/>
        折线图
      </div>
    },
  ]

  const onDragStart = (item) => (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/changeDragItem',
      payload: {...item}
    })
  }

  const onDragStop = () => {
    setTimeout(() => {
      dispatch({
        type: 'item/changeDragItem',
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
          bases.map((base, index) => <div className={styles.item} key={index}>
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
          charts.map((chart, index) => <div className={styles.item} key={index}>
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
