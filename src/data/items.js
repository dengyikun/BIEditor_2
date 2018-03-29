import {Icon} from 'antd';
import Container from '../components/Bases/Container/Container'
import LineChart from '../components/Charts/LineChart/LineChart'
import styles from '../components/LeftAside/LeftAside.less';

export default {
  container: {
    instance: Container,
    item: {
      name: '容器',
      parentId: 'base',
      width: 300,
      height: 200,
      type: 'container',
      style: {},
      eventList: [],
      refreshTime: new Date(),
    },
    icon: <Icon type="layout"/>,
    node: <div className={styles.widget}><Icon className={styles.icon} type="layout"/>容器组件</div>
  },
  lineChart: {
    instance: LineChart,
    item: {
      name: '折线图',
      parentId: 'chart',
      width: 300,
      height: 200,
      type: 'lineChart',
      style: {},
      eventList: [],
      refreshTime: new Date(),
      sourceId: '',
      sql: '',
      conditionList: [],
      dimensionList: [],
      valueList: [],
      option: `option = {
        backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
        title: {
          show: true,//显示隐藏
          x: 'left', // 'center' | 'left' | {number},标题左右位置
          y: 'top', // 'center' | 'bottom' | {number}标题上下位置
          textStyle: {color: 'black', fontSize: '18'}//字体颜色
        },
        grid: {
          borderWidth: 0//设置边框大小
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'horizontal', // 'vertical'标题横向或纵向排列
          x: 'right', // 'center' | 'left' | {number},标题左右位置
          y: 'top', // 'center' | 'bottom' | {number}标题上下位置
          textStyle: {color: 'black', fontSize: '14'},//字体颜色
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        yAxis: [
          {
            show: true,//显示或隐藏Y轴
            axisLine: {
              lineStyle: {
                color: '#008ACD'//坐标线颜色
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'black',
                fontSize: '14'
              }
            },//设置字体颜色和大小
            splitLine: {show: false},//隐藏或显示网格线
            type: 'value'
          }
        ],
      };`
    },
    icon: <Icon type="line-chart"/>,
    node: <div className={styles.widget}><Icon className={styles.icon} type="line-chart"/>折线图</div>,
  },
}
