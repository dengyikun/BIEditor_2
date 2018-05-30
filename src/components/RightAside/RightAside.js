import React from 'react';
import {message, Button, Tree, Icon, Modal} from 'antd';
import {connect} from 'dva';
import Copy from 'react-copy-to-clipboard'
import DataSetModal from '../DataSetModal/DataSetModal'
import ChartSetModal from '../ChartSetModal/ChartSetModal'
import EventSetModal from '../EventSetModal/EventSetModal'
import CssSetModal from '../CssSetModal/CssSetModal'
import JsSetModal from '../JsSetModal/JsSetModal'
import items from '../../data/items'
import styles from './RightAside.less';

const TreeNode = Tree.TreeNode;

function RightAside({dispatch, list, activeItemId}) {
  const activeItem = {
    name: '',
    ...list.find(item => item.id === activeItemId)
  }

  const onCopy = (text, result) => {
    if (text && result) {
      message.success(text + ' 成功复制到剪切板')
    }
  }

  const onNameChange = e => {
    if (activeItemId) {
      dispatch({
        type: 'page/setItem',
        payload: {
          id: activeItemId,
          name: e.target.value
        }
      })
    }
  }

  const onDataSetClick = () => {
    if (activeItemId) {
      dispatch({
        type: 'page/setDataSetModalVisible',
        payload: true
      })
    }
  }

  const onChartSetClick = () => {
    if (activeItemId) {
      dispatch({
        type: 'page/setChartSetModalVisible',
        payload: true
      })
    }
  }

  const onEventSetClick = () => {
    if (activeItemId) {
      dispatch({
        type: 'page/setEventSetModalVisible',
        payload: true
      })
    }
  }

  const onCssSetClick = () => {
    if (activeItemId) {
      dispatch({
        type: 'page/setCssSetModalVisible',
        payload: true
      })
    }
  }

  const onJsSetClick = () => {
    if (activeItemId) {
      dispatch({
        type: 'page/setJsSetModalVisible',
        payload: true
      })
    }
  }

  const onItemNodeDelete = id => e => {
    e.stopPropagation()
    if (list.find(item => item.parentId === id)) {
      message.error('请先删除容器中控件！')
      return
    }
    Modal.confirm({
      title: '确认删除该控件？',
      content: '删除后该控件将无法找回！',
      onOk: () => {
        // list.map(item => {
        //   dispatch({
        //     type: 'page/setItem',
        //     payload: {id: item.id, parentId: '', parentIdCopy: item.parentId}
        //   })
        // })
        dispatch({
          type: 'page/deleteItem',
          payload: id
        })
        if (id === activeItemId) {
            dispatch({
              type: 'page/setActiveItemId',
              payload: ''
            })
        }
      }
    })
  }

  const getItemNodeList = (parentId) => {

    let filterList = list.filter(item => item.parentId === parentId)

    return filterList.length ? filterList.map(item => <TreeNode
        key={item.id}
        title={<div className={styles.node}>
          {items[item.type].icon}&nbsp;&nbsp;
          {item.name}
          <Icon className={styles.delete} type="delete"
                onClick={onItemNodeDelete(item.id)}/>
        </div>}>
        {
          getItemNodeList(item.id)
        }
      </TreeNode>) : null
  }

  const onSelect = keys => {
    if (!items[keys[0]]) {
      dispatch({
        type: 'page/setActiveItemId',
        payload: keys[0]
      })
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        基础信息
      </div>
      <Copy text={activeItemId} onCopy={onCopy}>
        <div className={styles.id}>
          <label>
            组件ID<br/>
            <input placeholder="&#xE648;" disabled
                   value={activeItemId}/>
          </label>
        </div>
      </Copy>
      <div className={styles.name}>
        <label>
          组件名称<br/>
          <input placeholder="&#xE692;" value={activeItem.name}
                 onChange={onNameChange}/>
        </label>
      </div>
      <div className={styles.title}>
        组件设置
      </div>
      <div className={styles.set}>
        <Button className={styles.setButton} size={'small'}
                onClick={onChartSetClick}>
          图表设置
          <ChartSetModal/>
        </Button>
        <Button className={styles.setButton} size={'small'}
                onClick={onEventSetClick}>
          事件设置
          <EventSetModal/>
        </Button>
        <Button className={styles.setButton} size={'small'}
                onClick={onCssSetClick}>
          css 设置
          <CssSetModal/>
        </Button>
        <Button className={styles.setButton} size={'small'}
                onClick={onJsSetClick}>
          js 设置
          <JsSetModal/>
        </Button>
        {
          activeItem.baseType === 'chart' &&
          <Button className={styles.setButton} size={'small'}
                  onClick={onDataSetClick}>
            数据设置
            <DataSetModal/>
          </Button>
        }
      </div>
      <div className={styles.title}>
        组件列表
      </div>
      <Tree className={styles.tree}
            defaultExpandedKeys={Array.from(list, item => item.id)}
            selectedKeys={[activeItemId]}
            onSelect={onSelect}>
        {
          getItemNodeList('')
        }
      </Tree>
    </div>
  );
}

function mapStateToProps(state) {
  const {list, activeItemId} = state.page;
  return {
    list, activeItemId,
  };
}

export default connect(mapStateToProps)(RightAside)
