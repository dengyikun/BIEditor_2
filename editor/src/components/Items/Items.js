import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './Items.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, activeId, drag} = state.items;
  return {
    loading: state.loading.models.items,
    list,
    activeId,
    drag,
  };
}

const Items = ({dispatch, loading, list, activeId, drag}) => {

  function getItems(items, parentId) {

    const filterItems = items.filter(item => item.parentId === parentId)

    return filterItems.map(item => {
        return <Item
          key={item.id}
          item={item}
          items={items}
          dispatch={dispatch}
          activeId={activeId}
          drag={drag}
        >
          {
            getItems(items, item.id)
          }
        </Item>
      }
    )
  }

  const changeActiveId = () => {
    dispatch({
      type: 'items/changeActiveId',
      payload: null
    })
  }

  return <div className={styles.body}>
    <Item item={{
      id: '',
      parentId: null,
      y: 0,
      x: 0,
      width: '100%',
      height: '100%',
      background: 'transparent'
    }}
          className={styles.content}
          items={list}
          dispatch={dispatch}
          drag={drag}
          extendsProps={{
            disableDragging: true,
            enableResizing: false,
          }}
    >
      {
        getItems(list, '')
      }
    </Item>
  </div>
}


export default connect(mapStateToProps)(Items)
