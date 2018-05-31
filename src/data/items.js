import {Icon} from 'antd';
import moment from 'moment'
import Text from '../components/Bases/Text/Text'
import Image from '../components/Bases/Image/Image'
import Button from '../components/Bases/Button/Button'
import TextArea from '../components/Bases/TextArea/TextArea'
import Time from '../components/Bases/Time/Time'
import TimeRange from '../components/Bases/TimeRange/TimeRange'
import Container from '../components/Bases/Container/Container'
import Select from '../components/Bases/Select/Select'
import IFrame from '../components/Bases/IFrame/IFrame'
import LineChart from '../components/Charts/LineChart/LineChart'
import LineAreaChart from '../components/Charts/LineAreaChart/LineAreaChart'
import BarChart from '../components/Charts/BarChart/BarChart'
import StripChart from '../components/Charts/StripChart/StripChart'
import ScatterChart from '../components/Charts/ScatterChart/ScatterChart'
import StackedLineChart from '../components/Charts/StackedLineChart/StackedLineChart'
import StackedLineAreaChart from '../components/Charts/StackedLineAreaChart/StackedLineAreaChart'
import StackedBarChart from '../components/Charts/StackedBarChart/StackedBarChart'
import StackedStripChart from '../components/Charts/StackedStripChart/StackedStripChart'
import DoughnutChart from '../components/Charts/DoughnutChart/DoughnutChart'
import NestedDoughnutChart from '../components/Charts/NestedDoughnutChart/NestedDoughnutChart'
import MapChart from '../components/Charts/MapChart/MapChart'
import SQLSelect from '../components/Charts/SQLSelect/SQLSelect'
import SQLTable from '../components/Charts/SQLTable/SQLTable'
import SQLText from '../components/Charts/SQLText/SQLText'
import styles from './items.less';

// 基础组件属性
const baseItem = {
  parentId: 'base', // 父级 ID
  baseType: 'base', // 基础类型
  width: 300, // 宽度
  height: 200, // 高度
  style: {}, // 样式
  option: {}, //数据
  optionText: ``, // 数据文本
  css: ``, // css
  js: ``, // js
  eventList: [], // 事件列表
  refreshAt: new Date(), // 上次刷新时间
}

// 图表组件属性
const chartItem = {
  ...baseItem,
  parentId: 'chart',
  baseType: 'chart',
  // sourceId: '',
  // sql: '',
  // conditionList: [],
  // dimensionList: [],
  // valueList: [],
  sourceId: '2573632338734d5cb24489b06de09659',
  sql: 'SELECT SUBSTRING(addTime,1,10) as addTime, COUNT(cuId) as total from comment_user where nickname != "${nickname}" and country = "${country}" GROUP BY SUBSTRING(addTime,1,10) ORDER BY addTime asc',
  conditionList: [{name: 'nickname', value: '匿名用户'}, {name: 'country', value: '中国'}],
  dimensionList: [{displayName: '日期', name: 'addTime'}],
  valueList: [{displayName: '每天新增人数', name: 'total'}],
}

// 组件在左侧展示样式
const Node = props => <div className={styles.widget}>
  <Icon className={styles.icon} type={props.type}/>{props.name}
</div>

export default {
  text: {
    instance: Text, // 实例
    item: { // 组件属性
      ...baseItem,
      name: '文字', // 名称
      type: 'text', // 类型
      optionText: `option = {
        text: '文字',
      };`,
    },
    eventValues: {
      text: '当前值',
    }, // 发生事件时需要传出的值
    icon: <Icon type="file-text"/>, // 组件图标
    node: <Node type="file-text" name="文字"/>,
  },
  image: {
    instance: Image,
    item: {
      ...baseItem,
      name: '图片',
      type: 'image',
      optionText: `option = {
        image: '',
      };`,
    },
    icon: <Icon type="picture"/>,
    node: <Node type="picture" name="图片"/>,
  },
  button: {
    instance: Button,
    item: {
      ...baseItem,
      name: '按钮',
      type: 'button',
      optionText: `option = {
        text: '按钮',
      };`,
    },
    icon: <Icon type="laptop"/>,
    node: <Node type="laptop" name="按钮"/>,
  },
  textArea: {
    instance: TextArea,
    item: {
      ...baseItem,
      name: '文本',
      type: 'textArea',
      optionText: `option = {
        text: '文本',
      };`,
    },
    eventValues: {
      text: '当前值',
    },
    icon: <Icon type="code-o"/>,
    node: <Node type="code-o" name="文本"/>,
  },
  container: {
    instance: Container,
    item: {
      ...baseItem,
      name: '容器',
      type: 'container',
    },
    icon: <Icon type="layout"/>,
    node: <Node type="layout" name="容器"/>,
  },
  time: {
    instance: Time,
    item: {
      ...baseItem,
      name: '时间',
      type: 'time',
      optionText: `option = {
        time: '${moment().format('YYYY-MM-DD HH:mm:ss')}',
        format: 'YYYY-MM-DD HH:mm:ss',
      };`,
    },
    eventValues: {
      time: '当前值',
    },
    icon: <Icon type="clock-circle-o"/>,
    node: <Node type="clock-circle-o" name="时间"/>,
  },
  timeRange: {
    instance: TimeRange,
    item: {
      ...baseItem,
      name: '时间范围',
      type: 'timeRange',
      optionText: `option = {
        startTime: '${moment().format('YYYY-MM-DD HH:mm:ss')}',
        endTime: '${moment().format('YYYY-MM-DD HH:mm:ss')}',
        format: 'YYYY-MM-DD HH:mm:ss',
      };`,
    },
    eventValues: {
      startTime: '起始时间',
      endTime: '结束时间',
    },
    icon: <Icon type="calendar"/>,
    node: <Node type="calendar" name="时间范围"/>,
  },
  select: {
    instance: Select,
    item: {
      ...baseItem,
      name: '下拉选框',
      type: 'select',
      optionText: `option = {
        value: '',
        text: '',
        options: [{
          value: '值',
          text: '文字',
        }],
      };`,
    },
    eventValues: {
      value: '选中值',
      text: '选中文字',
    },
    icon: <Icon type="select"/>,
    node: <Node type="select" name="下拉选框"/>,
  },
  iFrame: {
    instance: IFrame,
    item: {
      ...baseItem,
      name: '网页',
      type: 'iFrame',
      optionText: `option = {
        url: '',
      };`,
    },
    icon: <Icon type="ie"/>,
    node: <Node type="ie" name="网页"/>,
  },
  lineChart: {
    instance: LineChart,
    item: {
      ...chartItem,
      name: '折线图',
      type: 'lineChart',
      optionText: `option = {
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="line-chart"/>,
    node: <Node type="line-chart" name="折线图"/>,
  },
  lineAreaChart: {
    instance: LineAreaChart,
    item: {
      ...chartItem,
      name: '区域图',
      type: 'lineAreaChart',
      optionText: `option = {
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="area-chart"/>,
    node: <Node type="area-chart" name="区域图"/>,
  },
  barChart: {
    instance: BarChart,
    item: {
      ...chartItem,
      name: '柱状图',
      type: 'barChart',
      optionText: `option = {
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="bar-chart"/>,
    node: <Node type="bar-chart" name="柱状图"/>,
  },
  stripChart: {
    instance: StripChart,
    item: {
      ...chartItem,
      name: '条形图',
      type: 'stripChart',
      optionText: `option = {
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
        xAxis: [
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="bars"/>,
    node: <Node type="bars" name="条形图"/>,
  },
  scatterChart: {
    instance: ScatterChart,
    item: {
      ...chartItem,
      name: '散点图',
      type: 'scatterChart',
      optionText: `option = {
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="dot-chart"/>,
    node: <Node type="dot-chart" name="散点图"/>,
  },
  stackedLineChart: {
    instance: StackedLineChart,
    item: {
      ...chartItem,
      name: '堆叠折线图',
      type: 'stackedLineChart',
      optionText: `option = {
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="line-chart"/>,
    node: <Node type="line-chart" name="堆叠折线"/>,
  },
  stackedLineAreaChart: {
    instance: StackedLineAreaChart,
    item: {
      ...chartItem,
      name: '堆叠区域图',
      type: 'stackedLineAreaChart',
      optionText: `option = {
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="area-chart"/>,
    node: <Node type="area-chart" name="堆叠区域"/>,

  },
  stackedBarChart: {
    instance: StackedBarChart,
    item: {
      ...chartItem,
      name: '堆叠柱状图',
      type: 'stackedBarChart',
      optionText: `option = {
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="bar-chart"/>,
    node: <Node type="bar-chart" name="堆叠柱状"/>,
  },
  stackedStripChart: {
    instance: StackedStripChart,
    item: {
      ...chartItem,
      name: '堆叠条形图',
      type: 'stackedStripChart',
      optionText: `option = {
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
        xAxis: [
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
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="bars"/>,
    node: <Node type="bars" name="堆叠条形"/>,
  },
  doughnutChart: {
    instance: DoughnutChart,
    item: {
      ...chartItem,
      name: '环形图',
      type: 'doughnutChart',
      optionText: `option = {
        backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
        title: {
          show: true,//显示隐藏
          x: 'left', // 'center' | 'left' | {number},标题左右位置
          y: 'top', // 'center' | 'bottom' | {number}标题上下位置
          textStyle: {color: 'black', fontSize: '18'}//字体颜色
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)'
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
      };`
    },
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="pie-chart"/>,
    node: <Node type="pie-chart" name="环形图"/>,
  },
  nestedDoughnutChart: {
    instance: NestedDoughnutChart,
    item: {
      ...chartItem,
      name: '嵌套环形图',
      type: 'nestedDoughnutChart',
      optionText: `option = {
        backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
        title: {
          show: true,//显示隐藏
          x: 'left', // 'center' | 'left' | {number},标题左右位置
          y: 'top', // 'center' | 'bottom' | {number}标题上下位置
          textStyle: {color: 'black', fontSize: '18'}//字体颜色
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)'
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
      };`
    },
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="pie-chart"/>,
    node: <Node type="pie-chart" name="嵌套环形"/>,
  },
  mapChart: {
    instance: MapChart,
    item: {
      ...chartItem,
      name: '地图',
      type: 'mapChart',
      optionText: `option = {
        title: {
          text: '地图',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}'//单位{b}<br/>{c}（个）
        },
        legend: {
          orient: 'horizontal', // 'vertical'标题横向或纵向排列
          x: 'right', // 'center' | 'left' | {number},标题左右位置
          y: 'top', // 'center' | 'bottom' | {number}标题上下位置
          textStyle: {color: 'black', fontSize: '14'},//字体颜色
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue','yellow', 'orangered']
          }
        },
      };`
    },
    eventValues: {
      dimension: '维度值',
      value: '指标值',
    },
    icon: <Icon type="environment"/>,
    node: <Node type="environment" name="地图"/>,
  },
  SQLSelect: {
    instance: SQLSelect,
    item: {
      ...chartItem,
      name: 'SQL 下拉',
      type: 'SQLSelect',
    },
    eventValues: {
      value: '选中值',
      text: '选中文字',
    },
    icon: <Icon type="select"/>,
    node: <Node type="select" name="SQL 下拉"/>,
  },
  SQLTable: {
    instance: SQLTable,
    item: {
      ...chartItem,
      name: 'SQL 表格',
      type: 'SQLTable',
    },
    icon: <Icon type="table"/>,
    node: <Node type="table" name="SQL 表格"/>,
  },
  SQLText: {
    instance: SQLText,
    item: {
      ...chartItem,
      name: 'SQL 文字',
      type: 'SQLText',
    },
    eventValues: {
      text: '当前值',
    },
    icon: <Icon type="file-text"/>,
    node: <Node type="file-text" name="SQL 文字"/>,
  },
}
