import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Row, Col} from 'antd';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/css';
import 'brace/theme/tomorrow';
import Item from '../Item/Item';
import styles from './CssSetModal.less';

class CssSetModal extends React.Component {

  static propTypes = {}//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      css: '',
    }
  }

  onCancel = () => {
    this.setState({css: ''})
    this.props.dispatch({
      type: 'page/setCssSetModalVisible',
      payload: false
    })
  }

  onOk = () => {
    this.props.dispatch({
      type: 'page/setItem',
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
      this.setState({css: value})
    }, 300)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cssSetModalVisible &&
      nextProps.cssSetModalVisible !== this.props.cssSetModalVisible) {
      const activeItem = nextProps.list.find(item => item.id === nextProps.activeItemId)
      this.setState({...JSON.parse(JSON.stringify(activeItem))})
    }
  }

  render() {

    const {cssSetModalVisible, list, dispatch} = this.props
    const {id, css} = this.state

    return (
      <Modal className={styles.body} title={'css 设置'} maskClosable={false}
             visible={cssSetModalVisible} width={1000}
             onCancel={this.onCancel} onOk={this.onOk}>
        <Row gutter={20}>
          <Col span={12}>
            <AceEditor width="100%" height="400px" mode="css" theme="tomorrow"
                       onChange={this.onCssChange}
                       value={css || `#${id} {

}`}
                       enableLiveAutocompletion={cssSetModalVisible}/>
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
  const {cssSetModalVisible, activeItemId, list} = state.page;
  return {
    cssSetModalVisible, activeItemId, list
  };
}

export default connect(mapStateToProps)(CssSetModal)
