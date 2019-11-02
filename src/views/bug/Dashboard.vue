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
      style="margin-top: 24px"
      :bordered="false">
      <div slot="title">
        <a-radio-group @change="onChangeType" v-model="queryParam.type">
          <a-radio-button :value="0">全部</a-radio-button>
          <a-radio-button :value="1">指派给我的</a-radio-button>
          <a-radio-button :value="2">由我创建的</a-radio-button>
          <a-radio-button :value="3">抄送给我的</a-radio-button>
        </a-radio-group>

        <a-input-search
          placeholder="搜索关键词"
          v-model="queryParam.keyword"
          style="margin-left: 10px;width: 200px"
          @search="onSearch"
        />
        

        <div style="display:inline-block;margin-right: 10px;font-size:14px;float:right">
           <a-select
            placeholder="选择项目"
            @change="handleChangeProject"
            style="width: 200px;display:inline-block;margin-left: 5px;"
          >
            <a-select-option :value="0">全部</a-select-option>
            <a-select-option
              v-for="item in projectList"
              :value="item.id"
              :key="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>

          <a-select
            placeholder="选择部门"
             v-action="`bug_choose_department`"
            @change="handleChangeDepartment"
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
        </div>
        
      </div>

      <div slot="extra">
        <a-button style="margin-right:10px" v-action="`bug_export_excel`" @click="exportExcel"><a-icon type="file-excel" />导出Excel</a-button>
        <a-button type="primary"  v-action="`bug_add_bug`" @click="$router.push('/bug/add')" ><a-icon type="plus" />提Bug</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
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
            <!-- <Ellipsis href="javascript:;" style="color:#333"><Ellipsis :length="50" tooltip>{{ text }}</Ellipsis></a> -->
            <a-tooltip placement="bottom" >
              <template slot="title">
                  <span>{{text}}</span>
              </template>
              <a href="javascript:;" style="color:#333">{{ text | maxLength }}</a>
            </a-tooltip>
          </a-popover>
        </span>
        <span slot="severity"  class="severity_num" :class="severityClass(text)" slot-scope="text">
          <label style="white-space:nowrap">{{BUG_VARIABLES.severity[text]}}</label>
        </span>
        <span slot="priority"   class="priority_num" :class="priorityClass(text)" slot-scope="text">
          {{ BUG_VARIABLES.priority[text]}}
        </span>

        <span slot="model" slot-scope="text">
          <label style="white-space:nowrap">{{ text }}</label>
        </span>

        <span slot="status" slot-scope="text">
          <label style="white-space:nowrap">{{ STATUS_CODES[text] || '未确认' }}</label>
        </span>

        <span slot="action" slot-scope="text, record">
          <router-link :to="`/bug/detail/${record.id}`" v-action="`bug_show_bug`">详情</router-link>
          <a-divider type="vertical"/>
          <router-link :to="`/bug/edit/${record.id}`" v-if="isEditable(record)"  v-action="`bug_edit_bug`">编辑</router-link>
          <a-divider type="vertical"/>
          <a href="javascript:;" @click="handleDelete(record.id)" v-if="isEditable(record)"  v-action="`bug_delete_bug`">删除</a>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import STable from '@/components/Table'
import api from '@/api'
import { Ellipsis } from '@/components'
import { STATUS_CODES, BUG_VARIABLES } from '@/utils/variables'
export default {
  components: {
    HeadInfo,
    STable,
    Ellipsis
  },
  data () {
    return {
      BUG_VARIABLES,
      STATUS_CODES,
      exportVisible: false,
      departmentList: [],
      projectList: [],
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
          title: '项目',
          dataIndex: 'project'
        },
        {
          title: '模块',
          dataIndex: 'model',
          scopedSlots: { customRender: 'model' }
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
          title: '负责人',
          dataIndex: 'leading',
          customRender: v => v.name
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 查询条件参数
      queryParam: {
        type: 2,
        keyword: '',
        department: '',
        project: ''
      },
      loadData: params => {
        return api.bug.list(Object.assign(params, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  created() {
    this.getDepartList()
    this.getProjecttList()
  },
  computed: {
    userid() {
      return this.$store.state.user.info.id
    }
  },
  filters: {
    maxLength(val) {
      return val.length > 10 ? (val.substring(0, 10) + '...') : val
    }
  },
  methods: {
    getProjecttList() {
      api.project.list({
        pageSize: -1,
        pageNo: 1
      }).then(res => {
        this.projectList = res.result.data
      })
    },
    isEditable(record) {
      return record.leading.id == this.userid || record.creatorId == this.userid
    },
    onSearch() {
      this.$refs.table.refresh()
    },
    handleChangeDepartment(value) {
      this.queryParam.department = value
      this.$refs.table.refresh()
    },
    handleChangeProject(value) {
      this.queryParam.project = value
      this.$refs.table.refresh()
    },
    exportExcel() {
      const url = api.bug.getExportUrl(this.queryParam, this.userid)
      window.open(url)
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
    getDepartList() {
      api.department.tree().then(res => {
        const data = res.result.data
        this.departmentList = this.formatTree(data)
      })
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
      if (this.queryParam.type !== 0) {
        this.queryParam.keyword = ''
        this.queryParam.department = 0
        this.queryParam.project = 0
      }
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
          api.bug.remove(id).then(() => this.$refs.table.refresh(1))
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
</style>
