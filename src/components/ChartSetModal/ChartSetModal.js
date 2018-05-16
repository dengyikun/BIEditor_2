import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Row, Col} from 'antd';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import Item from '../Item/Item';
import styles from './ChartSetModal.less';

class ChartSetModal extends React.Component {

  static propTypes = {}//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      sourceId: '',
      dimensionList: [],
      valueList: [],
      sql: '',
      conditionList: [],
      refreshAt: new Date(),
    }
  }

  onCancel = () => {
    this.props.dispatch({
      type: 'page/setChartSetModalVisible',
      payload: false
    })
  }

  onOk = () => {
    this.props.dispatch({
      type: 'page/setItem',
      payload: {
        ...this.state,
        refreshAt: new Date(),
      }
    })
    this.onCancel()
  }

  onOptionChange = value => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setState({option: value, refreshAt: new Date(),})
    }, 300)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chartSetModalVisible &&
      nextProps.chartSetModalVisible !== this.props.chartSetModalVisible) {
      const activeItem = nextProps.list.find(item => item.id === nextProps.activeItemId)
      this.setState({...JSON.parse(JSON.stringify(activeItem))})
    }
  }

  render() {

    const {chartSetModalVisible, list, dispatch} = this.props
    const {option} = this.state

    return (
      <Modal className={styles.body} title={'图表设置'} maskClosable={false}
             visible={chartSetModalVisible} width={1000}
             onCancel={this.onCancel} onOk={this.onOk}>
        <Row gutter={20}>
          <Col span={12}>
            <AceEditor width="100%" height="400px" mode="javascript" theme="tomorrow"
                       onChange={this.onOptionChange} value={option}
                       enableLiveAutocompletion={chartSetModalVisible}/>
          </Col>
          <Col span={12}>
            <div className={styles.item}>
              <Item item={{
                ...this.state,
                y: 0,
                x: 0,
                width: '100%',
                height: '100%',
              }}
                    dispatch={dispatch}
                    dragItem={{}}
                    className={styles.content}
                    list={list}
                    extendsProps={{
                      disableDragging: true,
                      enableResizing: false,
                    }}/>
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {chartSetModalVisible, activeItemId, list} = state.page;
  return {
    chartSetModalVisible, activeItemId, list
  };
}

export default connect(mapStateToProps)(ChartSetModal)
