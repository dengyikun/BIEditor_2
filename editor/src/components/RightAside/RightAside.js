import React from 'react';
import {message, Button, Tree} from 'antd';
import {connect} from 'dva';
import Copy from 'react-copy-to-clipboard'
import DataSetModal from '../DataSetModal/DataSetModal'
import ChartSetModal from '../ChartSetModal/ChartSetModal'
import EventSetModal from '../EventSetModal/EventSetModal'
import styles from './RightAside.less';

const TreeNode = Tree.TreeNode;

function RightAside({dispatch, list, activeItemId}) {
  const activeItem = list.find(item => item.id === activeItemId)

  const onCopy = (text, result) => {
    if (text && result) {
      message.success(text + ' 成功复制到剪切板')
    }
  }

  const onNameChange = e => {
    if (activeItemId) {
      dispatch({
        type: 'item/setItem',
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
        type: 'item/setDataSetModalVisible',
        payload: true
      })
    }
  }

  const onChartSetClick = () => {
    if (activeItemId) {
      dispatch({
        type: 'item/setChartSetModalVisible',
        payload: true
      })
    }
  }

  const onEventSetClick = () => {
    if (activeItemId) {
      dispatch({
        type: 'item/setEventSetModalVisible',
        payload: true

      })
    }
  }

  const getItemNodeList = () => {

    const itemType = {
      container: '容器',
      chartLine: '折线图',
    }

    let nodeList = []

    Object.keys(itemType).map(type => {

      const filterItemList = list.filter(item => item.type === type)

      if (filterItemList.length) {
        nodeList.push(<TreeNode
          key={type}
          title={itemType[type]}>
          {
            filterItemList.map(item => <TreeNode
              key={item.id}
              title={item.name}/>
            )
          }
        </TreeNode>)
      }
    })

    return nodeList
  }

  const onSelect = keys => {
    dispatch({
      type: 'item/setActiveItemId',
      payload: keys[0]
    })
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
                   value={activeItemId || ''}/>
          </label>
        </div>
      </Copy>
      <div className={styles.name}>
        <label>
          组件名称<br/>
          <input placeholder="&#xE692;" value={activeItem ? activeItem.name : ''}
                 onChange={onNameChange}/>
        </label>
      </div>
      <div className={styles.title}>
        组件设置
      </div>
      <div className={styles.set}>
        <Button className={styles.setButton} size={'small'}
                onClick={onDataSetClick}>
          数据设置
          <DataSetModal/>
        </Button>
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
      </div>
      <div className={styles.title}>
        事件设置
      </div>
      <div className={styles.title}>
        组件列表
      </div>
      <Tree className={styles.tree} showIcon
            defaultExpandAll
            selectedKeys={[activeItemId]}
            onSelect={onSelect}>
        {
          getItemNodeList()
        }
      </Tree>
    </div>
  );
}

function mapStateToProps(state) {
  const {list, activeItemId} = state.item;
  return {
    list, activeItemId,
  };
}

export default connect(mapStateToProps)(RightAside)
