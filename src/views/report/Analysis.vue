<template>
  <div class="page-header-index-wide">
    <a-card title="所有的">
      <div slot="extra" style="display:inline-block;margin-right: 10px;font-size:14px;">
        选择部门
        <a-select
          @change="handleChangeQuery"
          v-model="query.department"
          style="width: 200px;display:inline-block;margin-left: 5px;"
        >
          <a-select-option :value="0">全部</a-select-option>
          <template v-for="item in departmentList">
            <a-select-option :value="item.id">{{ item.name }}</a-select-option>
            <template v-for="item2 in item.departments">
              <a-select-option :value="item2.id">{{ item.name }}>{{ item2.name }}</a-select-option>
              <template v-for="item3 in item2.departments">
                <a-select-option :value="item3.id">{{ item.name }}>{{ item2.name }}>{{ item3.name }}</a-select-option>
              </template>
            </template>
          </template>
        </a-select>
        <a-button
          class="btn-export"
          type="primary"
          :loading="btnLoading['#bar1']"
          @click="convertCanvasToImage('#bar1', `部门-${query.department}`)"
        >导出图片</a-button>
      </div>

      <a-row :gutter="24">
        <a-col :span="24">
          <bar id="bar1" :data="chartData['all']" />
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
        <a-button
          class="btn-export"
          type="primary"
          :loading="btnLoading['#bar2']"
          @click="convertCanvasToImage('#bar2', `项目-${query.project}`)"
        >导出图片</a-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="24">
          <bar id="bar2" :data="chartData['project']" />
        </a-col>
      </a-row>
    </a-card>

    <a-card title="指派给我的">
      <div slot="extra" style="display:inline-block;margin-right: 10px;font-size:14px;">
        <a-button
          class="btn-export"
          type="primary"
          :loading="btnLoading['#bar3']"
          @click="convertCanvasToImage('#bar3', '指派给我的')"
        >导出图片</a-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="24">
          <bar id="bar3" :data="chartData['mine']" />
        </a-col>
      </a-row>
    </a-card>

    <a-card title="我创建的">
      <div slot="extra" style="display:inline-block;margin-right: 10px;font-size:14px;">
        <a-button
          class="btn-export"
          type="primary"
          :loading="btnLoading['#bar4']"
          @click="convertCanvasToImage('#bar4', '我创建的')"
        >导出图片</a-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="24">
          <bar id="bar4" :data="chartData['created']" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import api from '@/api'
import { Bar } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import html2canvas from 'html2canvas'
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
    Bar
  },
  data() {
    return {
      loading: true,
      projectList: [],
      btnLoading: {
        '#bar1': false,
        '#bar2': false,
        '#bar3': false,
        '#bar4': false
      },
      chartData: {
        all: [],
        mine: [],
        created: [],
        project: []
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
      departmentList: []
    }
  },
  created() {
    this.getAllCount()
    this.getProjecttList()
    this.getDepartList()
  },
  methods: {
    handleChangeQuery() {
      this.getAllCount()
    },
    handleChangeDepartment() {
      this.query.project = ''
      this.getAllCount()
    },
    getDepartList() {
      api.department.tree().then(res => {
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

        this.initChart('all')
        this.initChart('mine')
        this.initChart('created')
        this.initChart('project')
      })
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
</style>
