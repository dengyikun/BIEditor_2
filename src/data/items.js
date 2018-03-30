import {Icon} from 'antd';
import Container from '../components/Bases/Container/Container'
import LineChart from '../components/Charts/LineChart/LineChart'
import styles from './items.less';

export default {
  container: {
    instance: Container, // 组件实例
    item: { // 组件数据
      name: '容器', // 组件名称
      parentId: 'base', // 组件父级 ID
      width: 300, // 组件宽度
      height: 200, // 组件高度
      type: 'container', // 组件类型
      style: {}, // 组件样式
      css: ``, // 组件 css
      eventList: [], // 组件事件列表
      refreshAt: new Date(), // 组件上次刷新时间
      option: ``, // 组件数据
    },
    icon: <Icon type="layout"/>, // 组件图标
    node: <div className={styles.widget}>
      <Icon className={styles.icon} type="layout"/>容器组件
    </div>, // 组件在左侧展示样式
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
      css: ``,
      eventList: [],
      refreshAt: new Date(),
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
