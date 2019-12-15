<template>
  <div>
    <!-- <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="我的待办" content="8个任务" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="本周任务平均处理时间" content="32分钟" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="本周完成任务数" content="24个"/>
        </a-col>
      </a-row>
    </a-card>-->

    <a-card title="指派给我的 TOP10" style="margin-top: 24px" :bordered="false">
      <a-table
        ref="table"
        size="default"
        rowKey="id"
        :pagination="false"
        :columns="columns"
        :dataSource="bugList"
        @change="handleTableChange"
      >
        <span slot="title2" slot-scope="text, record">
          <a-popover title="当前状态" v-if="record">
            <template slot="content">
              <a-steps
                size="small"
                labelPlacement="vertical"
                :current="record.status"
                class="steps-popover"
              >
                <a-step title="未确认" />
                <a-step title="已确认" />
                <a-step title="处理中" />
                <a-step title="已解决" />
                <a-step title="已通过" />
              </a-steps>
            </template>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{text}}</span>
              </template>
              <a href="javascript:;" style="color:#333">{{ text | maxLength }}</a>
            </a-tooltip>
          </a-popover>
        </span>
        <span slot="severity" class="severity_num" :class="severityClass(text)" slot-scope="text">
          <label>{{BUG_VARIABLES.severity[text]}}</label>
        </span>
        <span
          slot="priority"
          class="priority_num"
          :class="priorityClass(text)"
          slot-scope="text"
        >{{ BUG_VARIABLES.priority[text]}}</span>
        <span slot="status" slot-scope="text">
          <label style="white-space:nowrap">{{ STATUS_CODES[text] || '未确认' }}</label>
        </span>
        <span slot="action" slot-scope="text, record">
          <router-link :to="`/bug/detail/${record.id}`" v-action="'workplace_bug_detail'">详情</router-link>
          <a-divider type="vertical" />
          <router-link :to="`/bug/edit/${record.id}`" v-action="'workplace_bug_edit'">编辑</router-link>
          <a-divider type="vertical" />
          <a
            href="javascript:;"
            @click="handleDelete(record.id)"
            v-action="'workplace_bug_delete'"
          >删除</a>
        </span>
      </a-table>
    </a-card>

    <a-card title="指派给我的" style="margin-top: 24px">
      <a-row :gutter="24">
        <a-col :span="12">
          <bar id="bar3" :data="chartData['mine']" />
        </a-col>
        <a-col :span="12">
          <pie
            style="height:254px"
            class="pie-chart"
            :chart-data="pieData['mine']"
            :options="pieOptions"
          ></pie>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="我创建的" style="margin-top: 24px">
      <a-row :gutter="24">
        <a-col :span="12">
          <bar id="bar4" :data="chartData['created']" />
        </a-col>
        <a-col :span="12">
          <pie
            style="height:254px"
            class="pie-chart"
            :chart-data="pieData['created']"
            :options="pieOptions"
          ></pie>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import STable from '@/components/Table'
import api from '@/api'
import { STATUS_CODES, BUG_VARIABLES } from '@/utils/variables'

import { Bar, Pie } from '@/components'
import { mixinDevice } from '@/utils/mixin'
const DataSet = require('@antv/data-set')

export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    STable,
    Bar,
    Pie
  },
  data() {
    return {
      BUG_VARIABLES,
      STATUS_CODES,
      countTitle: ['状态', '严重程度', '优先级', '项目'],
      columns: [
        {
          title: '编号',
          dataIndex: 'code'
        },
        {
          title: 'Bug标题',
          dataIndex: 'title',
          scopedSlots: { customRender: 'title2' },
          sorter: (a, b) => a.title - b.title
        },
        {
          title: '项目',
          dataIndex: 'project',
          sorter: (a, b) => a.project - b.project
        },
        {
          title: '严重程度',
          dataIndex: 'severity',
          scopedSlots: { customRender: 'severity' },
          sorter: (a, b) => a.severity - b.severity
        },
        {
          title: '优先级',
          dataIndex: 'priority',
          scopedSlots: { customRender: 'priority' }
        },
        {
          title: 'bug类型',
          dataIndex: 'type'
        },
        {
          title: 'bug影响版本',
          dataIndex: 'edition'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建人',
          dataIndex: 'creatorName'
        },
        {
          title: '开始日期',
          dataIndex: 'startTime',
          customRender: v => v.substring(0, 10)
        },
        {
          title: '截止日期',
          dataIndex: 'settlingTime',
          customRender: v => v.substring(0, 10),
          sort: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 查询条件参数
      queryParam: {
        type: 1
      },
      bugList: [],
      allCount: [],
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
      }
    }
  },
  filters: {
    maxLength(val) {
      return val.length > 10 ? val.substring(0, 10) + '...' : val
    }
  },
  created() {
    this.getBugList()
    this.getAllCount()
  },
  methods: {
    getBugList() {
      api.bug.getTop10().then(res => {
        this.bugList = res.result.data
      })
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter)
    },
    priorityClass(num) {
      const classObj = {}
      classObj[`priority_num_${5 - num}`] = true
      return classObj
    },
    severityClass(num) {
      const classObj = {}
      classObj[`severity_num_${6 - num}`] = true
      return classObj
    },
    onChangeType() {
      this.$refs.table.refresh()
    },
    refreshTable(keepCurrentPage = false) {
      this.$refs.table.refresh(keepCurrentPage)
    },
    handleDelete(id) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要删除该Bug吗？删除后无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.bug.remove(id).then(() => {
            this.$refs.table.refresh(false)
          })
        },
        onCancel: () => {
          console.log('Cancel')
        }
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
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
.priority_num {
  display: inline-block;
  min-width: 20px;
  max-width: 67px;
  height: 20px;
  padding: 0 4px;
  overflow: hidden;
  line-height: 16px;
  color: #838a9d;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  border: 2px solid #838a9d;
  border-radius: 10px;
  &_1 {
    color: #d50000;
    border-color: #d50000;
  }

  &_2 {
    color: #ff9800;
    border-color: #ff9800;
  }

  &_3 {
    color: #2098ee;
    border-color: #2098ee;
  }

  &_4 {
    color: #009688;
    border-color: #009688;
  }
}

.severity_num {
  position: relative;
  text-align: center;

  &_1 {
    color: #d50000;
    border-color: #d50000;
  }

  &_2 {
    color: #ff9800;
    border-color: #ff9800;
  }

  &_3 {
    color: #2098ee;
    border-color: #2098ee;
  }

  &_4 {
    color: #009688;
    border-color: #009688;
  }
}
</style>
