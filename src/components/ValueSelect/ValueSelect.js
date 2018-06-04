import React from 'react';
import {connect} from 'dva';
import {Select} from 'antd'
import {TOOL} from '../../utils'
import items from '../../data/items'
import styles from './ValueSelect.less';

const {Option, OptGroup} = Select

function mapStateToProps(state) {
  const {list, paramList,} = state.page;
  return {
    list,
    paramList,
  };
}

function ValueSelect(props) {

  const {list, paramList, activeItem, value, onChange} = props

  let selectValue = ''
  let optGroups = []
  let eventValues = items[activeItem.type].eventValues

  if (value.type === 'value') {
    selectValue = value.value
  }

  //加入页面参数
  optGroups.push(<OptGroup label="页面参数" key="param">
    {
      paramList.map(param => {
        const selectKey = TOOL.GUID()
        if (value.type === 'param' && value.key === param.key) {
          selectValue = param.key
        }
        return <Option key={selectKey} value={selectKey}
                       data-type={'param'} data-key={param.key}>
          {param.key}
        </Option>
      })
    }
  </OptGroup>)

  //加入事件参数
  if (eventValues) {
    optGroups.push(<OptGroup label="事件参数" key="event">
      {
        Object.keys(eventValues).map(key => {
          const selectKey = TOOL.GUID()
          if (value.type === 'event' && value.key === key) {
            selectValue = eventValues[key]
          }
          return <Option key={selectKey} value={selectKey}
                         data-type={'event'} data-key={key}>
            {eventValues[key]}
          </Option>
        })
      }
    </OptGroup>)
  }

  //加入组件参数
  list.map(item => {
    let eventValues = items[item.type].eventValues
    if (eventValues && item.id !== activeItem.id &&
      (item.baseType === 'base' || ['SQLSelect', 'SQLText'].includes(item.type))) {
      optGroups.push(<OptGroup label={item.name} key={item.id}>
        {
          Object.keys(eventValues).map(key => {
            const selectKey = TOOL.GUID()
            if (value.type === 'item' && value.id === item.id && value.key === key) {
              selectValue = item.name + ' - ' + eventValues[key]
            }
            return <Option key={selectKey} value={selectKey}
                           data-type={'item'} data-id={item.id}
                           data-key={key}>
              {item.name + ' - ' + eventValues[key]}
            </Option>
          })
        }
      </OptGroup>)
    }
  })

  const onSelect = (value, option) => {
    onChange({
      type: option.props['data-type'],
      key: option.props['data-key'],
      id: option.props['data-id']
    })
  }

  const onSearch = (value) => {
    onChange({
      type: 'value',
      value
    })
  }

  return (
    <Select className={styles.body} allowClear defaultActiveFirstOption={false}
            optionFilterProp={'children'} {...props}
            value={selectValue} onChange={() => {
    }}
            onSelect={onSelect} onSearch={onSearch}>
      {optGroups}
    </Select>
  );
}

export default connect(mapStateToProps)(ValueSelect)
