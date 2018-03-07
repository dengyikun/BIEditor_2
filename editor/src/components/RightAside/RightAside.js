import React from 'react';
import {Icon, Tree} from 'antd';
import {connect} from 'dva';
import classNames from 'classnames'
import Copy from 'react-copy-to-clipboard'
import {TOOL} from '../../utils'
import styles from './RightAside.less';

const TreeNode = Tree.TreeNode;

function RightAside({dispatch, list, activeItem}) {

  const onCopy = (text, result) => {
    alert(text + ' || ' +result)
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
    const filterItemList = list.filter(item => item.id === keys[0])
    dispatch({
      type: 'item/changeActiveItem',
      payload: {
        ...filterItemList[0],
      }
    })
  }

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        基础信息
      </div>
      <Copy text={activeItem.id} onCopy={onCopy}>
        <div className={styles.id}>
          <label>
            组件ID<br/>
            <input placeholder="&#xE648;" disabled
                   value={activeItem.id || ''}/>
          </label>
        </div>
      </Copy>
      <div className={styles.name}>
        <label>
          组件名称<br/>
          <input placeholder="&#xE692;" value={activeItem.name || ''}/>
        </label>
      </div>
      <div className={styles.title}>
        组建设置
      </div>
      <div className={styles.title}>
        事件设置
      </div>
      <div className={styles.title}>
        组件列表
      </div>
      <Tree className={styles.tree} showIcon
            defaultExpandAll
            selectedKeys={[activeItem.id]}
            onSelect={onSelect}>
        {
          getItemNodeList()
        }
      </Tree>
    </div>
  );
}

function mapStateToProps(state) {
  const {list, activeItem} = state.item;
  return {
    list, activeItem,
  };
}

export default connect(mapStateToProps)(RightAside)
