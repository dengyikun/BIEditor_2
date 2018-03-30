import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {message, Modal, Tabs, Row, Col, Tree, Icon, Select, Input} from 'antd';
import Copy from 'react-copy-to-clipboard'
import ScrollBar from 'react-custom-scrollbars';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/mysql';
import 'brace/theme/tomorrow';
import styles from './DataSetModal.less';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

class DataSetModal extends React.Component {

  static propTypes = {}//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      sourceId: '',
      dimensionList: [],
      valueList: [],
      sql: '',
      conditionList: [],
    }
  }

  onCancel = () => {
    this.props.dispatch({
      type: 'item/setDataSetModalVisible',
      payload: false
    })
  }

  onOk = () => {
    this.props.dispatch({
      type: 'item/setItem',
      payload: {
        ...this.state,
        refreshAt: new Date()
      }
    })
    this.onCancel()
  }

  onSourceNodeSelect = (selectedKeys, e) => {
    const key = e.node.props.eventKey
    if (this.props.sourceList.findIndex(item => item.sourceId === e.node.props.eventKey) !== -1) {
      this.setState({sourceId: key})
      this.props.dispatch({
        type: 'source/getTableList',
        payload: key
      })
    }
  }

  onCopy = (text, result) => {
    if (text && result) {
      message.success(text + ' 成功复制到剪切板')
    }
  }

  onDimensionListSelect = text => {
    const name = text.split(':')[0]
    const displayName = text.split(':')[1]
    if (name && displayName) {
      let dimensionList = [...this.state.dimensionList]
      const index = dimensionList.findIndex(item => item.name === name)
      if (index !== -1) {
        dimensionList.splice(index, 1, {name, displayName})
      } else {
        dimensionList.push({name, displayName})
      }
      this.setState({dimensionList})
    }
  }

  onDimensionListDeselect = name => {
    let dimensionList = [...this.state.dimensionList]
    const index = dimensionList.findIndex(item => item.name === name)
    if (index !== -1) {
      dimensionList.splice(index, 1)
    }
    this.setState({dimensionList})
  }

  onValueListSelect = text => {
    const name = text.split(':')[0]
    const displayName = text.split(':')[1]
    if (name && displayName) {
      let valueList = [...this.state.valueList]
      const index = valueList.findIndex(item => item.name === name)
      if (index !== -1) {
        valueList.splice(index, 1, {name, displayName})
      } else {
        valueList.push({name, displayName})
      }
      this.setState({valueList})
    }
  }

  onValueListDeselect = name => {
    let valueList = [...this.state.valueList]
    const index = valueList.findIndex(item => item.name === name)
    if (index !== -1) {
      valueList.splice(index, 1)
    }
    this.setState({valueList})
  }

  onSqlChange = value => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      let conditionList = []
      value.replace(/\$\{(.*?)\}/g, (string, match) => {
        if (match && conditionList.find(item => item.name === match)) {
          message.error('存在相同的 SQL 数值：' + match)
        } else if (match) {
          const condition = this.state.conditionList.find(condition => condition.name === match)
          conditionList.push({
            name: match,
            value: condition ? condition.value : ''
          })
        }
      })
      this.setState({sql: value, conditionList})
    }, 300)
  }

  onConditionChange = name => e => {
    let conditionList = [...this.state.conditionList]
    conditionList.find(condition => {
      if (condition.name === name) {
        condition.value = e.target.value
        return true
      }
    })
    this.setState({conditionList})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSetModalVisible &&
      nextProps.dataSetModalVisible !== this.props.dataSetModalVisible) {
      const activeItem = nextProps.list.find(item => item.id === nextProps.activeItemId)
      this.setState({...JSON.parse(JSON.stringify(activeItem))})
      nextProps.dispatch({
        type: 'source/getTableList',
        payload: activeItem.sourceId
      })
    }
  }

  render() {

    const {dataSetModalVisible, sourceList} = this.props
    const {sourceId, dimensionList, valueList, sql, conditionList} = this.state

    return (
      <Modal className={styles.body} title={'数据设置'} maskClosable={false}
             visible={dataSetModalVisible} width={1000}
             onCancel={this.onCancel} onOk={this.onOk}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="SQL 模式" key="1">
            <Row gutter={20}>
              <Col span={6}>
                <Tree defaultExpandAll
                      expandedKeys={[sourceId]}
                      selectedKeys={[sourceId]}
                      onSelect={this.onSourceNodeSelect}>
                  {
                    sourceList.map(source => <TreeNode
                      key={source.sourceId}
                      title={<span><Icon type="database"/> {source.sourceName}</span>}>
                      {
                        source.tableList &&
                        source.tableList.map(table => <TreeNode
                          key={table}
                          title={<Copy text={table} onCopy={this.onCopy}>
                            <span><Icon type="table"/> {table}</span>
                          </Copy>}>
                        </TreeNode>)
                      }
                    </TreeNode>)
                  }
                </Tree>
              </Col>
              <Col span={18}>
                <Row className={styles.dimensionRow}>
                  <Col span={2}>
                    <div className={styles.dimensionLabel}>维度：</div>
                  </Col>
                  <Col span={22}>
                    <Select className={styles.dimensionList}
                            dropdownClassName={styles.dimensionListDropdown}
                            mode="tags" placeholder="请以 key:value 的形式输入，回车确认"
                            value={Array.from(dimensionList, item => item.name)}
                            onSelect={this.onDimensionListSelect}
                            onDeselect={this.onDimensionListDeselect}>
                      {
                        dimensionList.map(dimension => <Option key={dimension.name}>
                          {dimension.name}:{dimension.displayName}
                        </Option>)
                      }
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span={2}>
                    <div className={styles.valueLabel}>数值：</div>
                  </Col>
                  <Col span={22}>
                    <Select className={styles.valueList}
                            dropdownClassName={styles.valueListDropdown}
                            mode="tags" placeholder="请以 key:value 的形式输入，回车确认"
                            value={Array.from(valueList, item => item.name)}
                            onSelect={this.onValueListSelect}
                            onDeselect={this.onValueListDeselect}>
                      {
                        valueList.map(value => <Option key={value.name}>
                          {value.name}:{value.displayName}
                        </Option>)
                      }
                    </Select>
                  </Col>
                </Row>
                <AceEditor width="100%" height="200px" mode="mysql" theme="tomorrow"
                           onChange={this.onSqlChange} value={sql}
                           enableLiveAutocompletion={dataSetModalVisible}/>
                <div className={styles.conditionList}>
                  <ScrollBar>
                    <Row>
                      {
                        conditionList.map(condition => [
                          (<Col span={5} className={styles.condition}>
                            {condition.name}
                          </Col>),
                          (<Col span={6} className={styles.condition}>
                            <Input value={condition.value}
                                   onChange={this.onConditionChange(condition.name)}/>
                          </Col>)
                        ])
                      }
                    </Row>
                  </ScrollBar>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {dataSetModalVisible, activeItemId, list} = state.item;
  const {list: sourceList} = state.source;
  return {
    dataSetModalVisible, activeItemId, sourceList, list
  };
}

export default connect(mapStateToProps)(DataSetModal)
