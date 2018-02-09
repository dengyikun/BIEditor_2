import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './Items.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, activeItem, dragItem} = state.items;
  return {
    loading: state.loading.models.items,
    list,
    activeItem,
    dragItem,
  };
}

const Items = ({dispatch, loading, list, activeItem, dragItem}) => {

  function getItems(items, parentId) {

    const filterItems = items.filter(item => item.parentId === parentId)

    return filterItems.map(item => {
        return <Item
          key={item.id}
          item={item}
          items={items}
          dispatch={dispatch}
          activeItem={activeItem}
          dragItem={dragItem}
        >
          {
            getItems(items, item.id)
          }
        </Item>
      }
    )
  }

  return <div className={styles.body}>
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
      }
    }}
          className={styles.content}
          items={list}
          dispatch={dispatch}
          activeItem={activeItem}
          dragItem={dragItem}
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
