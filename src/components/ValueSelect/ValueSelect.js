import React from 'react';
import {connect} from 'dva';
import {Select} from 'antd'
import items from '../../data/items'
import styles from './ValueSelect.less';

const OptGroup = Select.OptGroup
const Option = Select.Option

function mapStateToProps(state) {
  const { list, paramList, } = state.page;
  return {
    list,
    paramList,
  };
}

function ValueSelect(props) {

  const {dispatch, list, paramList, activeItem, value, onChange} = props

  let selectValue = value ? value.value || '' : ''
  let selectKey = 0
  let optGroups = []
  let values = items[activeItem.type].values


  if (paramList.length > 0) {
    optGroups.push(<OptGroup label="页面参数" key="param">
      {
        paramList.map(param => {
          selectKey++
          return <Option key={selectKey} value={selectKey}
          type={'param'}>{param.key}</Option>
        })
      }
    </OptGroup>)
  }

  if (values) {
    optGroups.push(<OptGroup label="事件参数" key="event">
      {
        Object.keys(values).map(key => {
          selectKey++
          return <Option key={selectKey} value={selectKey}>{values[key]}</Option>
        })
      }
    </OptGroup>)
  }

  list.map(item => {
    let values = items[item.type].values
    if (values && item.id !== activeItem.id) {
      optGroups.push(<OptGroup label={item.name} key={item.id}>
        {
          Object.keys(values).map(key => {
            selectKey++
            return <Option key={selectKey} value={selectKey}>{item.name + ' - ' + values[key]}</Option>
          })
        }
      </OptGroup>)
    }
  })

  const onSelectChange = (value, option) => {
    debugger
  }

  const onSearch = (value) => {
    props.onChange({
      type: 'value',
      value
    })
    debugger
  }

  return (
    <Select className={styles.body} showSearch {...props}
            optionFilterProp={'children'} value={selectValue}
            onChange={onSelectChange} onSearch={onSearch}>
      {optGroups}
    </Select>
  );
}

export default connect(mapStateToProps)(ValueSelect)
