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
    </a-card> -->

    <a-card
      title="指派给我的 TOP10"
      style="margin-top: 24px"
      :bordered="false">
      <a-table
        ref="table"
        size="default"
        :pagination="false"
        :columns="columns"
        :dataSource="bugList"
        @change="handleTableChange"
      >
        <span slot="title2" slot-scope="text, record">
          <a-popover title="当前状态"  v-if="record" >
            <template slot="content">
              <a-steps size="small" labelPlacement="vertical" :current="record.status" class="steps-popover">
                <a-step title="未确认" />
                <a-step title="已确认" />
                <a-step title="处理中" />
                <a-step title="已解决" />
                <a-step title="已通过" />
              </a-steps>
            </template>
            <a-tooltip placement="bottom" >
              <template slot="title">
                  <span>{{text}}</span>
              </template>
              <a href="javascript:;" style="color:#333">{{ text | maxLength }}</a>
            </a-tooltip>
          </a-popover>
        </span>
        <span slot="severity"  class="severity_num" :class="severityClass(text)" slot-scope="text">
          <label>{{BUG_VARIABLES.severity[text]}}</label>
        </span>
        <span slot="priority"   class="priority_num" :class="priorityClass(text)" slot-scope="text">
          {{ BUG_VARIABLES.priority[text]}}
        </span>
        <span slot="status" slot-scope="text">
          <label style="white-space:nowrap">{{ STATUS_CODES[text] || '未确认' }}</label>
        </span>
        <span slot="action" slot-scope="text, record">
          <router-link :to="`/bug/detail/${record.id}`" v-action="'workplace_bug_detail'">详情</router-link>
          <a-divider type="vertical"/>
          <router-link :to="`/bug/edit/${record.id}`" v-action="'workplace_bug_edit'">编辑</router-link>
          <a-divider type="vertical"/>
          <a href="javascript:;" @click="handleDelete(record.id)" v-action="'workplace_bug_delete'">删除</a>
        </span>
      </a-table>

    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import STable from '@/components/Table'
import api from '@/api'
import { STATUS_CODES, BUG_VARIABLES } from '@/utils/variables'
export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    STable
  },
  data () {
    return {
      BUG_VARIABLES,
      STATUS_CODES,
      columns: [
        {
          title: '编号',
          dataIndex: 'code'
        },
        {
          title: 'Bug标题',
          dataIndex: 'title',
          scopedSlots: { customRender: 'title2' }
        },
        {
          title: '项目',
          dataIndex: 'project'
        },
        {
          title: '严重程度',
          dataIndex: 'severity',
          scopedSlots: { customRender: 'severity' }
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
      bugList: []
    }
  },
  filters: {
    maxLength(val) {
      return val.length > 10 ? (val.substring(0, 10) + '...') : val
    }
  },
  created() {
    this.getBugList()
  },
  methods: {
    getBugList() {
      api.bug.getTop10().then(res => {
        this.bugList = res.result.data
      })
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination, filters, sorter)
    },
    priorityClass(num) {
      const classObj = {}
      classObj[`priority_num_${5-num}`] = true
      return classObj
    },
    severityClass(num) {
      const classObj = {}
      classObj[`severity_num_${6-num}`] = true
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
            this.$refs.table.refresh(1)
          })
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
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
        color: rgba(0, 0, 0, .45);
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
        border-color: #d50000
      }

      &_2{
        color: #ff9800;
        border-color: #ff9800
      }

      &_3 {
        color: #2098ee;
        border-color: #2098ee
      }

      &_4 {
        color: #009688;
        border-color: #009688
      }
    }

    .severity_num {
      position: relative;
      text-align: center;

      &_1 {
        color: #d50000;
        border-color: #d50000
      }

      &_2{
        color: #ff9800;
        border-color: #ff9800
      }

      &_3 {
        color: #2098ee;
        border-color: #2098ee
      }

      &_4 {
        color: #009688;
        border-color: #009688
      }
    }
</style>
