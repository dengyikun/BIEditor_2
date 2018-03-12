import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Tabs, Row, Col, Tree, Select, Input} from 'antd';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/mysql';
import 'brace/theme/tomorrow';
import styles from './DataSetModal.less';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const {TextArea} = Input;

class DataSetModal extends React.Component {

  static propTypes = {
    dataSetModalVisible: PropTypes.bool.isRequired,
    activeItem: PropTypes.object.isRequired,
  }//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      item: {
        conditionList: [],
        dimensionList: [],
        valueList: [],
      }
    }
  }

  onSourceNodeSelect = () => {

  }

  onCancel = () => {
    this.props.dispatch({
      type: 'item/setDataSetModalVisible',
      payload: false
    })
  }

  onDimensionListSelect = text => {
    const name = text.split(':')[0]
    const displayName = text.split(':')[1]
    if (name && displayName) {
      let dimensionList = [...this.state.item.dimensionList]
      const index = dimensionList.findIndex(item => item.name === name)
      if (index !== -1) {
        dimensionList.splice(index, 1, {name, displayName})
      } else {
        dimensionList.push({name, displayName})
      }
      this.setState({item: {...this.state.item, dimensionList}})
    }
  }

  onDimensionListDeselect = name => {
    let dimensionList = [...this.state.item.dimensionList]
    dimensionList.splice(dimensionList.findIndex(item => item.name === name), 1)
    this.setState({item: {...this.state.item, dimensionList}})
  }

  onValueListSelect = text => {
    const name = text.split(':')[0]
    const displayName = text.split(':')[1]
    if (name && displayName) {
      let valueList = [...this.state.item.valueList]
      const index = valueList.findIndex(item => item.name === name)
      if (index !== -1) {
        valueList.splice(index, 1, {name, displayName})
      } else {
        valueList.push({name, displayName})
      }
      this.setState({item: {...this.state.item, valueList}})
    }
  }

  onValueListDeselect = name => {
    let valueList = [...this.state.item.valueList]
    valueList.splice(valueList.findIndex(item => item.name === name), 1)
    this.setState({item: {...this.state.item, valueList}})
  }

  onSqlChange = () => {

  }

  componentWillMount = () => []

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSetModalVisible &&
      nextProps.dataSetModalVisible !== this.props.dataSetModalVisible) {
      this.setState({item: {...nextProps.activeItem}})
    }
  }

  render() {

    const {dataSetModalVisible, sourceList} = this.props
    const {conditionList, dimensionList, valueList, sql} = this.state.item

    return (
      <Modal className={styles.body} title={'数据设置'} visible={dataSetModalVisible}
             onCancel={this.onCancel} width={1000}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="SQL 模式" key="1">
            <Row gutter={20}>
              <Col span={4}>
                <Tree className={styles.tree} showIcon
                      defaultExpandAll
                      selectedKeys={[]}
                      onSelect={this.onSourceNodeSelect}>
                  {
                    sourceList.map(item => <TreeNode
                      key={item.id}
                      title={item.sourceName}>
                    </TreeNode>)
                  }
                </Tree>
              </Col>
              <Col span={20}>
                <Select className={styles.dimensionList} dropdownClassName={styles.dimensionListDropdown}
                        mode="tags" placeholder="请以 key:value 的形式输入，回车确认"
                        value={Array.from(dimensionList, item => item.name)}
                        onSelect={this.onDimensionListSelect}
                        onDeselect={this.onDimensionListDeselect}>
                  {
                    dimensionList.map(item => <Option key={item.name}>{item.name}:{item.displayName}</Option>)
                  }
                </Select>
                <Select className={styles.valueList} dropdownClassName={styles.valueListDropdown}
                        mode="tags" placeholder="请以 key:value 的形式输入，回车确认"
                        value={Array.from(valueList, item => item.name)}
                        onSelect={this.onValueListSelect}
                        onDeselect={this.onValueListDeselect}>
                  {
                    valueList.map(item => <Option key={item.name}>{item.name}:{item.displayName}</Option>)
                  }
                </Select>
                <AceEditor width="100%" height="140px" mode="mysql" theme="tomorrow"
                           onChange={this.onSqlChange} value={sql}
                           enableLiveAutocompletion={dataSetModalVisible}/>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {dataSetModalVisible, activeItem} = state.item;
  const {list: sourceList} = state.source;
  return {
    dataSetModalVisible, activeItem, sourceList
  };
}

export default connect(mapStateToProps)(DataSetModal)
