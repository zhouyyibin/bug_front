<template>
  <div class="page-header-index-wide">
    <a-card title="所有的">
      <div slot="extra" style="display:inline-block;margin-right: 10px;font-size:14px;">
        选择部门
        <a-select
          @change="handleChangeQuery"
          v-model="query.department"
          :dropdownMatchSelectWidth="false"
          style="width: 200px;display:inline-block;margin-left: 5px;"
        >
          <template v-for="item in departmentList">
            <a-select-option :value="item.id">{{ item.name }}</a-select-option>
          </template>
        </a-select>
        <!-- <a-button
          class="btn-export"
          type="primary"
          :loading="btnLoading['#bar1']"
          @click="convertCanvasToImage('#bar1', `部门-${query.department}`)"
        >导出图片</a-button>-->
      </div>

      <a-row :gutter="24">
        <a-col :span="12">
          <bar id="bar1" :data="chartData['all']" />
        </a-col>
        <a-col :span="12">
          <pie
            style="height:254px"
            class="pie-chart"
            :chart-data="pieData['all']"
            :options="pieOptions"
          ></pie>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="项目的">
      <div slot="extra" style="display:inline-block;margin-right: 10px;font-size:14px;">
        选择项目
        <a-select @change="handleChangeQuery" style="width:200px" v-model="query.project">
          <a-select-option
            v-for="item in projectList"
            :value="item.name"
            :key="item.id"
          >{{ item.name }}</a-select-option>
        </a-select>
        <!-- <a-button
          class="btn-export"
          type="primary"
          :loading="btnLoading['#bar2']"
          @click="convertCanvasToImage('#bar2', `项目-${query.project}`)"
        >导出图片</a-button>-->
      </div>
      <a-row :gutter="24">
        <a-col :span="12">
          <bar id="bar2" :data="chartData['project']" />
        </a-col>

        <a-col :span="12">
          <pie
            style="height:254px"
            class="pie-chart"
            :chart-data="pieData['project']"
            :options="pieOptions"
          ></pie>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="bug统计" style="margin-top: 20px;padding-bottom: 30px;">
      <div class="allCount-box">
        <div class="count-box" v-for="(item, index) in countTitle" :key="item">
          <div class="count-title">{{item}}</div>
          <table class="count-table" border="1" bordercolor="#dedede" colspan="0" rowspan="0">
            <tr v-for="(counter, index2) in allCount['4']" :key="`${index}-${index2}`">
              <td>{{allCount[index+1][index2] && allCount[index+1][index2].name}}</td>
              <td>{{allCount[index+1][index2] && allCount[index+1][index2].count}}</td>
            </tr>
          </table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import api from '@/api'
import { Bar, Pie } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import html2canvas from 'html2canvas'
import pattern from 'patternomaly'
const DataSet = require('@antv/data-set')

function downLoad(url, name) {
  var oA = document.createElement('a')
  oA.download = name // 设置下载的文件名，默认是'下载'
  oA.href = url
  document.body.appendChild(oA)
  oA.click()
  oA.remove() // 下载之后把创建的元素删除
}

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    Bar,
    Pie
  },
  data() {
    return {
      loading: true,
      projectList: [],
      countTitle: ['状态', '严重程度', '优先级', '项目'],
      btnLoading: {
        '#bar1': false,
        '#bar2': false,
        '#bar3': false,
        '#bar4': false
      },
      pieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          render: 'value',
          precision: 1
        },
        showAllTooltips: true,
        plugins: {
          datalabels: {
            color: '#ffffff',
            font: {
              size: 16
            }
          }
        }
      },
      pieData: {
        all: {},
        mine: {},
        created: {},
        project: {},
        depart: {}
      },
      chartData: {
        all: [],
        mine: [],
        created: [],
        project: [],
        depart: []
      },
      query: {
        project: '',
        department: ''
      },
      checkList: {
        '0': '所有未解决的',
        '1': '所有已解决的',
        '2': '所有超时的',
        '10': '指派给我，我未解决的',
        '11': '指派给我，我已解决的',
        '12': '指派给我，超时的',
        '20': '我创建的，我未解决的',
        '21': '我创建的，我已解决的',
        '22': '我创建的，超时的'
      },
      allCount: {
        all: [],
        mine: [],
        created: [],
        project: []
      },
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      departmentList: [],
      allCount: []
    }
  },
  created() {
    this.getAllCount()
    this.getProjecttList()
    this.getDepartList()
    this.getAllCountTable()
  },
  methods: {
    getAllCountTable() {
      api.bug.getAllCount().then(res => {
        this.allCount = res.data
      })
    },
    handleChangeQuery() {
      this.getAllCount()
    },
    handleChangeDepartment() {
      this.query.project = ''
      this.getAllCount()
    },
    getDepartList() {
      api.department.getSearchList().then(res => {
        const data = res.result.data
        this.departmentList = this.formatTree(data)
      })
    },
    formatTree(arr) {
      return arr.map(i => {
        i.title = i.name
        if (i.departments && i.departments.length > 0) {
          i.children = this.formatTree(i.departments)
        }

        return i
      })
    },
    getProjecttList() {
      api.project
        .list({
          pageSize: -1,
          pageNo: 1
        })
        .then(res => {
          this.projectList = res.result.data
        })
    },
    getAllCount() {
      api.bug.getCount(this.query).then(res => {
        const data = res.data.map(i => {
          i.title = i.name
          i.x = i.name
          i.y = i.count
          return i
        })
        this.allCount['all'] = data.filter(i => i.name.indexOf('所有') >= 0)
        this.allCount['mine'] = data.filter(i => i.name.indexOf('指派给我') >= 0)
        this.allCount['created'] = data.filter(i => i.name.indexOf('创建') >= 0)
        this.allCount['project'] = data.filter(i => i.name.indexOf('项目') >= 0)
        this.allCount['depart'] = data.filter(i => i.name.indexOf('部门') >= 0)

        this.formatPieData()

        this.initChart('all')
        this.initChart('mine')
        this.initChart('created')
        this.initChart('project')
      })
    },
    formatPieData() {
      for (let key in this.allCount) {
        this.pieData[key] = {
          datasets: [
            {
              data: this.allCount[key].map(i => {
                return i.count
              }),
              backgroundColor: ['#3AA1FF', '#FBD437', '#975FE5']
            }
          ],
          labels: this.allCount[key].map(i => {
            return i.name
          })
        }
      }
      console.log(this.pieData)
    },
    initChart(type) {
      const dv = new DataSet.View().source(this.allCount[type])
      dv.transform({
        type: 'count',
        field: 'count',
        dimension: 'item',
        as: 'count'
      })
      this.chartData[type] = dv.rows
    },
    convertCanvasToImage(id, name) {
      this.btnLoading[id] = true
      html2canvas(document.querySelector(id)).then(canvas => {
        this.btnLoading[id] = false
        var url = canvas.toDataURL('image/jpeg')
        downLoad(url, name)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;

  &.desktop div[class^='ant-col']:last-child {
    position: absolute;
    right: 0;
    height: 100%;
  }
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
.ant-card {
  margin-bottom: 20px;
}
.btn-export {
  margin-left: 10px;
}
/deep/ .pie-chart {
  canvas {
    margin: auto;
  }
}

.allCount-box {
  width: 100%;
  display: flex;
  .count-box {
    flex: 1;
  }
  .count-title {
    text-align: center;
    background: #fdad44;
    color: #fff;
    border-radius: 4px 4px 0 0;
    border-bottom: none;
    padding: 5px;
    font-size: 14px;
  }

  .count-box {
    &:nth-child(2) {
      .count-title {
        background: #e85b51;
      }

      .count-table tr td {
        background: #fff;
      }
    }
    &:nth-child(3) {
      .count-title {
        background: #008f5c;
      }

      .count-table tr td {
        background: #e9f2df;
      }
    }

    &:nth-child(4) {
      .count-title {
        background: #f3986a;
      }

      .count-table tr td {
        background: #fff;
      }
    }
  }

  .count-table {
    width: 100%;
    height: 100%;
    tr td {
      text-align: center;
      background: #fbeedd;
      width: 50%;
      height: 22px;
      font-size: 14px;
      padding: 0;
      line-height: 22px;
    }
  }
}
</style>
