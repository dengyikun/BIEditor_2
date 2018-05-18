import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Table, Icon, Input} from 'antd';
import styles from './ParamSetModal.less';

class ParamSetModal extends React.Component {

  static propTypes = {}//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      paramList: [],
    }
  }

  add = () => {
    let paramList = this.state.paramList.slice()
    paramList.push({
      key: '',
      value: '',
    })
    this.setState({paramList})
  }

  onChange = (key, index) => e => {
    let paramList = this.state.paramList.slice()
    paramList[index][key] = e.target.value
    this.setState({paramList})

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
    const paramList = this.state.paramList.filter(item => item.key)
    this.props.dispatch({
      type: 'page/set',
      payload: {
        paramList
      }
    })
    this.onCancel()
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
        title: '参数名',
        dataIndex: 'key',
        render: (text, record, index) =>
          <Input size={'small'} value={text} onChange={this.onChange('key', index)}/>
      },
      {
        title: '默认值',
        dataIndex: 'value',
        render: (text, record, index) =>
          <Input size={'small'} value={text} onChange={this.onChange('value', index)}/>
      },
    ]

    return (
      <Modal className={styles.body} title={'页面参数设置'} maskClosable={false}
             visible={paramSetModalVisible} width={500}
             onCancel={this.onCancel} onOk={this.onOk}>

        <Table className={styles.table} size={'small'} rowKey={(record, index) => index}
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
