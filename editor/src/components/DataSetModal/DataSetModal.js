import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Tabs, Select} from 'antd';
import styles from './DataSetModal.less';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class DataSetModal extends React.Component {

  static propTypes = {
    dataSetModalVisible: PropTypes.bool.isRequired,
    activeItem: PropTypes.object.isRequired,
  }//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      item: {
        dimensionList: [],
        conditionList: [],
      }
    }
  }

  onCancel = () => {
    this.props.dispatch({
      type: 'item/changeDataSetModalVisible',
      payload: false
    })
  }

  onDimensionListSelect = text => {
    const name = text.split(':')[0]
    const value = text.split(':')[1]
    if (name && value) {
      let dimensionList = [...this.state.item.dimensionList]
      const index = dimensionList.findIndex(item => item.name === name)
      if (index !== -1) {
        dimensionList.splice(index, 1, {name, value})
      } else {
        dimensionList.push({name, value})
      }
      this.setState({item: {...this.state.item, dimensionList}})
    }
  }

  onDimensionListDeselect = name => {
    let dimensionList = [...this.state.item.dimensionList]
    dimensionList.splice(dimensionList.findIndex(item => item.name === name), 1)
    this.setState({item: {...this.state.item, dimensionList}})
  }

  onConditionListSelect = text => {
    const name = text.split(':')[0]
    const value = text.split(':')[1]
    if (name && value) {
      let conditionList = [...this.state.item.conditionList]
      const index = conditionList.findIndex(item => item.name === name)
      if (index !== -1) {
        conditionList.splice(index, 1, {name, value})
      } else {
        conditionList.push({name, value})
      }
      this.setState({item: {...this.state.item, conditionList}})
    }
  }

  onConditionListDeselect = name => {
    let conditionList = [...this.state.item.conditionList]
    conditionList.splice(conditionList.findIndex(item => item.name === name), 1)
    this.setState({item: {...this.state.item, conditionList}})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSetModalVisible &&
      nextProps.dataSetModalVisible !== this.props.dataSetModalVisible) {
      this.setState({item: {...nextProps.activeItem}})
    }
  }

  render() {

    const {dataSetModalVisible} = this.props
    const {item} = this.state

    return (
      <Modal className={styles.body} title={'数据设置'} visible={dataSetModalVisible}
             onCancel={this.onCancel}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="SQL 模式" key="1">
            <Select className={styles.dimensionList} dropdownClassName={styles.dimensionListDropdown}
                    mode="tags" placeholder="请以 key:value 的形式输入，回车确认"
                    value={Array.from(item.dimensionList, item => item.name)}
                    onSelect={this.onDimensionListSelect}
                    onDeselect={this.onDimensionListDeselect}>
              {
                item.dimensionList.map(item => <Option key={item.name}>{item.name}:{item.value}</Option>)
              }
            </Select>
            <Select className={styles.conditionList} dropdownClassName={styles.conditionListDropdown}
                    mode="tags" placeholder="请以 key:value 的形式输入，回车确认"
                    value={Array.from(item.conditionList, item => item.name)}
                    onSelect={this.onConditionListSelect}
                    onDeselect={this.onConditionListDeselect}>
              {
                item.conditionList.map(item => <Option key={item.name}>{item.name}:{item.value}</Option>)
              }
            </Select>
            <textarea defaultValue={'123123123'}/>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {dataSetModalVisible, activeItem} = state.item;
  return {
    dataSetModalVisible, activeItem,
  };
}

export default connect(mapStateToProps)(DataSetModal)
