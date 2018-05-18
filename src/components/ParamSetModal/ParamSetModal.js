import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Table, Icon, Input} from 'antd';
import {TOOL} from '../../utils';
import styles from './ParamSetModal.less';

class ParamSetModal extends React.Component {

  static propTypes = {}//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      paramList: [],
    }
  }

  isDuplicate = () => {
    const paramList = this.state.paramList.filter(item => item.key)
    const keys = Array.from(paramList, param => param.key)
    if (keys.length !== new Set(keys).size) {
      Modal.warn({
        title: '存在重复的参数名！'
      })
      return true
    } else {
      return false
    }
  }

  add = () => {
    let paramList = this.state.paramList.slice()
    paramList.push({
      id: TOOL.GUID(),
      key: '',
      value: '',
    })
    this.setState({paramList})
  }

  onBlur = (key, record) => e => {
    let paramList = this.state.paramList.slice()
    const index = paramList.findIndex(param => record.id === param.id)
    paramList[index][key] = e.target.value
    this.setState({paramList}, this.isDuplicate)
  }

  onDelete = (record) => () => {
    let paramList = this.state.paramList.slice()
    const index = paramList.findIndex(param => record.id === param.id)
    paramList.splice(index, 1)
    this.setState({paramList}, this.isDuplicate)
  }

  onCancel = () => {
    this.setState({paramList: []})
    this.props.dispatch({
      type: 'page/set',
      payload: {
        paramSetModalVisible: false
      }
    })
  }

  onOk = () => {
    if (!this.isDuplicate()) {
      const paramList = this.state.paramList.filter(item => item.key)
      this.props.dispatch({
        type: 'page/set',
        payload: {
          paramList
        }
      })
      this.onCancel()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paramSetModalVisible &&
      nextProps.paramSetModalVisible !== this.props.paramSetModalVisible) {
      this.setState({paramList: JSON.parse(JSON.stringify(nextProps.paramList))})
    }
  }

  render() {

    const {paramSetModalVisible} = this.props
    const {paramList} = this.state
    const columns = [
      {
        title: '#',
        dataIndex: '#',
        render: (text, record) => paramList.findIndex(param => record === param) + 1
      },
      {
        title: '参数名',
        dataIndex: 'key',
        render: (text, record) =>
          <Input size={'small'} defaultValue={text} onBlur={this.onBlur('key', record)}/>
      },
      {
        title: '默认值',
        dataIndex: 'value',
        render: (text, record) =>
          <Input size={'small'} defaultValue={text} onBlur={this.onBlur('value', record)}/>
      },
      {
        title: '删除',
        dataIndex: 'delete',
        render: (text, record) =>
          <Icon className={styles.delete} type={'delete'} onClick={this.onDelete(record)}/>
      },
    ]

    return (
      <Modal className={styles.body} title={'页面参数设置'} maskClosable={false}
             visible={paramSetModalVisible} width={500}
             onCancel={this.onCancel} onOk={this.onOk}>

        <Table className={styles.table} size={'small'} rowKey={'id'}
               title={() => <span className={styles.add} onClick={this.add}><Icon type={'plus'}/> 添加参数</span>}
               dataSource={paramList} columns={columns}/>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {paramSetModalVisible, paramList} = state.page;
  return {
    paramSetModalVisible, paramList
  };
}

export default connect(mapStateToProps)(ParamSetModal)
