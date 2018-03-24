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
    dispatch({
      type: 'item/setItem',
      payload: {
        id: 'fe817fc3-f30e-5cc7-3e6c-c7b899896043',
        parentId: '',
      }
    })
    dispatch({
      type: 'item/setItem',
      payload: {
        id: '21eeae93-63c5-b972-ecd5-574c036d2e15',
        parentId: '',
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'item/setItem',
        payload: {
          id: 'fe817fc3-f30e-5cc7-3e6c-c7b899896043',
          parentId: 'df239a1a-a5d1-a99c-13dc-b13d1a6d4ecc',
        }
      })
      dispatch({
        type: 'item/setItem',
        payload: {
          id: '21eeae93-63c5-b972-ecd5-574c036d2e15',
          parentId: 'df239a1a-a5d1-a99c-13dc-b13d1a6d4ecc',
        }
      })
    })
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
