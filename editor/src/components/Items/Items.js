import React, {Component} from 'react';
import {connect} from 'dva';
import {DropTarget} from 'react-dnd'
import styles from './Items.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, isResizing, activeId} = state.items;
  return {
    loading: state.loading.models.items,
    list,
    isResizing,
    activeId,
  };
}

const boxTarget = {
  drop(props, monitor) {
    const delta = monitor.getDifferenceFromInitialOffset()
    if (delta) {
      const item = monitor.getItem().item
      const isOver = item.parentId !== ''
      const left = isOver ? 0 : Math.round(item.left + delta.x)
      const top = isOver ? 0 : Math.round(item.top + delta.y)
      props.dispatch({
        type: 'items/update',
        payload: {...item, left, top, parentId: ''}
      })
    }
  },
}

const Items = ({dispatch, loading, list, isResizing, activeId, connectDropTarget}) => {

  function getItems(items, parentId) {

    const filterItems = items.filter(item => item.parentId === parentId)

    return filterItems.map(item => {
        return <Item
          key={item.id}
          item={item}
          dispatch={dispatch}
          isResizing={isResizing}
          activeId={activeId}
        >
          {
            getItems(items, item.id)
          }
        </Item>
      }
    )
  }

  const changeActiveId = () => {
    if (!isResizing) {
      dispatch({
        type: 'items/changeActiveId',
        payload: null
      })
    }
  }

  return connectDropTarget(
    <div className={styles.content}
         onMouseLeave={changeActiveId}
         onMouseOver={changeActiveId}>
      {
        getItems(list, '')
      }
    </div>
  )
}


export default connect(mapStateToProps)(
  DropTarget('box', boxTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))(Items)
)
