import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './ItemList.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, autoResize} = state.item;
  return {
    loading: state.loading.models.item,
    list,
    autoResize,
  };
}

const ItemList = ({dispatch, list, autoResize, isEdit}) => {

  const {clientWidth: listWidth} = document.getElementById('listContainer') || {}
  const ratio = listWidth ? listWidth / 1920 : 1

  console.log(listWidth, "listWidth")

  console.log(ratio, "ratio")

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
      width: isEdit && autoResize ? '100%' : 1920,
      height: isEdit && autoResize ? '100%' : 100 / ratio + '%',
      type: 'container',
      style: {
        background: 'transparent',
        border: 0,
        transform: isEdit && autoResize ? '' : `scale(${ratio})`,
        transformOrigin: '0 0',
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
