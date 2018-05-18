import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {message, Modal, Tabs, Row, Col, Tree, Icon, Select, Input, Table} from 'antd';
import {TOOL, ENUM} from '../../utils';
import styles from './EventSetModal.less';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

const {eventTypes, actions} = ENUM

class EventSetModal extends React.Component {

  static propTypes = {}//props 类型检查

  constructor(props) {
    super(props)
    this.state = {
      eventList: [],
      id: '',
      type: 'click',
    }
  }

  onCancel = () => {
    this.props.dispatch({
      type: 'page/setEventSetModalVisible',
      payload: false
    })
  }

  onOk = () => {
    this.props.dispatch({
      type: 'page/setItem',
      payload: {
        id: this.props.activeItemId,
        eventList: this.state.eventList
      }
    })
    this.onCancel()
  }

  onTabsChange = key => {
    this.setState({id: '', type: key})
  }

  onEventNodeSelect = keys => {
    if (keys[0] === 'add') {
      let newEventList = this.state.eventList.slice()
      const newEvent = {
        id: TOOL.getGUID(),
        type: this.state.type,
        name: eventTypes[this.state.type],
        targetId: '',
        action: '',
        conditionList: [],
      }
      newEventList.push({
        ...newEvent
      })
      this.setState({eventList: newEventList, ...newEvent})
    } else {
      const newEventList = this.state.eventList.slice()
      newEventList.find(event => {
        if (event.id === keys[0]) {
          this.setState({eventList: newEventList, ...event})
          return true
        }
      })
    }
  }

  onEventNodeDelete = id => e => {
    e.stopPropagation()
    Modal.confirm({
      title: '确认删除该事件？',
      content: '删除后该事件将无法找回！',
      onOk: () => {
        let newEventList = this.state.eventList.slice()
        const index = this.state.eventList.findIndex(event => event.id === id)
        if (index !== -1) {
          newEventList.splice(index, 1)
        }
        if (id === this.state.id) {
          this.setState({eventList: newEventList, id: ''})
        } else {
          this.setState({eventList: newEventList})
        }
      }
    })
  }

  onNameChange = e => {
    let newEventList = this.state.eventList.slice()
    newEventList.find(event => {
      if (event.id === this.state.id) {
        event.name = e.target.value
        this.setState({eventList: newEventList, ...event})
        return true
      }
    })
  }

  onTargetIdSelect = (value, option) => {
    let newEventList = this.state.eventList.slice()
    newEventList.find(event => {
      if (event.id === this.state.id) {
        event.targetId = value
        event.conditionList = JSON.parse(JSON.stringify(option.props.item.conditionList || []))
        this.setState({eventList: newEventList})
        return true
      }
    })
  }

  onActionSelect = value => {
    let newEventList = this.state.eventList.slice()
    newEventList.find(event => {
      if (event.id === this.state.id) {
        event.action = value
        this.setState({eventList: newEventList})
        return true
      }
    })
  }

  onConditionChange = name => e => {
    let newEventList = this.state.eventList.slice()
    newEventList.find(event => {
      if (event.id === this.state.id) {
        event.conditionList.find(condition => {
          if (condition.name === name) {
            condition.value = e.target.value
            this.setState({eventList: newEventList})
            return true
          }
        })
        return true
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventSetModalVisible &&
      nextProps.eventSetModalVisible !== this.props.eventSetModalVisible) {
      const activeItem = nextProps.list.find(item => item.id === nextProps.activeItemId)
      this.setState({eventList: JSON.parse(JSON.stringify(activeItem.eventList))})
    }
  }

  render() {

    const {eventSetModalVisible, list} = this.props
    const {eventList, id, type} = this.state
    const {name, action, targetId, conditionList} = eventList.find(event => event.id === id) || {}

    return (
      <Modal className={styles.body} title={'事件设置'} maskClosable={false}
             visible={eventSetModalVisible} width={1000}
             onCancel={this.onCancel} onOk={this.onOk}>
        <Tabs defaultActiveKey="click" activeKey={type} onChange={this.onTabsChange}>
          {
            Object.keys(eventTypes).map(key => <TabPane tab={eventTypes[key]} key={key}>
              <Row gutter={20}>
                <Col span={4}>
                  <Tree className={styles.tree}
                        defaultExpandAll
                        selectedKeys={[id]}
                        onSelect={this.onEventNodeSelect}>
                    {
                      eventList.filter(event => event.type === type).map(event => <TreeNode
                        title={<div className={styles.node}>
                          <div>{event.name}</div>
                          <Icon type="delete" onClick={this.onEventNodeDelete(event.id)}/>
                        </div>}
                        key={event.id}/>)
                    }
                    <TreeNode title={<div className={styles.add}>
                      添加事件<Icon type="plus"/>
                    </div>} key={'add'}/>
                  </Tree>
                </Col>
                {
                  id &&
                  <Col span={20}>
                    <Row gutter={20}>
                      <Col span={3} className={styles.label}>
                        事件名称：
                      </Col>
                      <Col span={5} className={styles.value}>
                        <Input value={name}
                               onChange={this.onNameChange}/>
                      </Col>
                      <Col span={3} className={styles.label}>
                        联动组件：
                      </Col>
                      <Col span={5} className={styles.value}>
                        <Select value={targetId}
                                onSelect={this.onTargetIdSelect}>
                          {
                            list.map(item => <Option key={item.id} item={item}>
                              {item.name}
                            </Option>)
                          }
                        </Select>
                      </Col>
                      <Col span={3} className={styles.label}>
                        组件动作：
                      </Col>
                      <Col span={5} className={styles.value}>
                        <Select value={action}
                                onSelect={this.onActionSelect}>
                          {
                            Object.keys(actions).map(key => <Option key={key}>
                              {actions[key]}
                            </Option>)
                          }
                        </Select>
                      </Col>
                      <Col span={24}>

                      </Col>
                      {
                        conditionList && conditionList.length > 0 && action === 'refresh' &&
                        <Col span={24}>
                          <Row gutter={20}>
                            <Col span={24}>
                              <hr/>
                            </Col>
                            {
                              conditionList.map(condition => [
                                (<Col span={5} className={styles.label}>
                                  {condition.name}
                                </Col>),
                                (<Col span={6} className={styles.value}>
                                  <Input value={condition.value}
                                         onChange={this.onConditionChange(condition.name)}/>
                                </Col>)
                              ])
                            }
                          </Row>
                        </Col>
                      }
                    </Row>
                  </Col>
                }
              </Row>
            </TabPane>)
          }
        </Tabs>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {eventSetModalVisible, activeItemId, list} = state.page;
  return {
    eventSetModalVisible, activeItemId, list
  };
}

export default connect(mapStateToProps)(EventSetModal)
