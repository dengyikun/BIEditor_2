import React, {PropTypes} from 'react';
import {message} from 'antd'
import EChart from '../EChart/EChart'
import styles from './DoughnutChart.css';
import * as itemService from '../../../services/item';

const DoughnutChart = ({item}) => {

  const getOption = data => {
    const {name, valueList} = item
    const dataList = data.data.data
    const legendData = Array.from(valueList, value => value.displayName)
    const series = Array.from(valueList, value => ({
      name: value.displayName,
      type:'pie',
      radius : ['40%','70%'],
      center: ['50%', '60%'],
      data: Array.from(dataList, data => data[value.name])
    }))
    let option = {}
    eval(item.option)
    option.title.text = option.title.text || name
    option.legend.data = option.legend.data || legendData
    option.series = option.series || series
    return option
  }

  return <EChart className={styles.body} item={item} getOption={getOption}/>
}

export default DoughnutChart;
