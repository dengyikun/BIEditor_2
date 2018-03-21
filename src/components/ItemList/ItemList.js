import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './ItemList.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, activeItemId, hoverItemId, dragItem} = state.item;
  return {
    loading: state.loading.models.item,
    list,
    activeItemId,
    hoverItemId,
    dragItem,
  };
}

const ItemList = ({dispatch, loading, list, activeItemId, hoverItemId, dragItem, isEdit}) => {

  const onMouseDown = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setActiveItemId',
      payload: ''
    })
  }

  const getItemList = (list, parentId) => {

    return list.map(item => item.parentId === parentId ? <Item
          key={item.id}
          item={item}
          isEdit={isEdit}
          list={list}
          dispatch={dispatch}
          activeItemId={activeItemId}
          hoverItemId={hoverItemId}
          dragItem={dragItem}
        >
          {
            getItemList(list, item.id)
          }
        </Item> : undefined
    )
  }

  return <div className={styles.body} onMouseDown={onMouseDown}>
    <Item item={{
      id: '',
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
          list={list}
          dispatch={dispatch}
          activeItemId={activeItemId}
          hoverItemId={hoverItemId}
          dragItem={dragItem}
    >
      {
        getItemList(list, '')
      }
    </Item>
  </div>
}

export default connect(mapStateToProps)(ItemList)
