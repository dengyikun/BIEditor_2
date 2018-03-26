import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './ItemList.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, refreshInterval, refreshAt} = state.item;
  return {
    loading: state.loading.models.item,
    list,
    refreshInterval,
    refreshAt,
  };
}

const ItemList = ({dispatch, list, refreshInterval, refreshAt, isEdit}) => {
  const onMouseDown = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setActiveItemId',
      payload: ''
    })
  }

  const getItemList = (list, parentId) => {

    let itemList = []
    list.map(item => {
        if (item.parentId === parentId) {
          itemList.push(<Item
            key={item.id}
            item={item}
            isEdit={isEdit}
          >
            {
              getItemList(list, item.id)
            }
          </Item>)
        }
      }
    )

    return itemList
  }

  return <div className={styles.body} onMouseDown={onMouseDown}>
    <Item item={{
      id: 'list',
      parentId: null,
      y: 0,
      x: 0,
      width: '100%',
      height: '100%',
      type: 'container',
      style: {
        background: 'transparent',
        border: 0,
      },
      eventList: [],
    }}
          isEdit={false}
          className={styles.content}
    >
      {
        getItemList(list, 'list')
      }
    </Item>
  </div>
}

export default connect(mapStateToProps)(ItemList)
