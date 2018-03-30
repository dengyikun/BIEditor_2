import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Row, Col} from 'antd';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import Item from '../Item/Item';
import styles from './JsSetModal.less';

class JsSetModal extends React.Component {

  static propTypes = {}//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      js: '',
    }
  }

  onCancel = () => {
    this.setState({js: ''})
    this.props.dispatch({
      type: 'item/setJsSetModalVisible',
      payload: false
    })
  }

  onOk = () => {
    this.props.dispatch({
      type: 'item/setItem',
      payload: {
        ...this.state
      }
    })
    this.onCancel()
  }

  onCssChange = value => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setState({js: value})
    }, 300)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jsSetModalVisible &&
      nextProps.jsSetModalVisible !== this.props.jsSetModalVisible) {
      const activeItem = nextProps.list.find(item => item.id === nextProps.activeItemId)
      this.setState({...JSON.parse(JSON.stringify(activeItem))})
    }
  }

  render() {

    const {jsSetModalVisible, list, dispatch} = this.props
    const {id, js} = this.state

    return (
      <Modal className={styles.body} title={'js 设置'} maskClosable={false}
             visible={jsSetModalVisible} width={1000}
             onCancel={this.onCancel} onOk={this.onOk}>
        <Row gutter={20}>
          <Col span={12}>
            <AceEditor width="100%" height="400px" mode="javascript" theme="tomorrow"
                       onChange={this.onCssChange}
                       value={js || `var item = document.getElementById('${id}');`}
                       enableLiveAutocompletion={jsSetModalVisible}/>
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
  const {jsSetModalVisible, activeItemId, list} = state.item;
  return {
    jsSetModalVisible, activeItemId, list
  };
}

export default connect(mapStateToProps)(JsSetModal)
