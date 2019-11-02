<template>
  <a-card :bordered="false">
    <div
      class="table-page-search-wrapper"
      style="text-align: right;margin-bottom:10px;"
      v-action="`org_role_add`"
    >
      <!-- <a-button
        type="primary"
        style="margin-right: 10px;"
      >
        <a-icon type="plus"></a-icon>批量添加用户
      </a-button> -->

      <a-button
        type="primary"
        @click="$refs.modal.add()"
      >
        <a-icon type="plus"></a-icon>添加角色
      </a-button>
    </div>

    <s-table
      ref="table"
      rowKey="id"
      size="default"
      :columns="columns"
      :data="loadData"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="$refs.modal.edit(record)" v-action="`org_role_edit`">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="$router.push(`/org/permission/${record.id}?title=${record.name}`)" v-action="`org_role_permission`">权限管理</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record.id)" v-action="`org_role_delete`">删除</a>
      </span>
    </s-table>

    <role-modal ref="modal" @ok="handleOk"></role-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import RoleModal from './modules/RoleModal'
import api from '@/api'
export default {
  name: 'TableList',
  components: {
    STable,
    RoleModal
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

      visible: false,

      form: null,
      mdl: {},

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '角色描述',
          dataIndex: 'describe'
        }, {
          title: '操作',
          width: '250px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return api.role.list(
          Object.assign(parameter, this.queryParam)
        ).then(res => {
          return res.result
        })
      },

      selectedRowKeys: [],
      selectedRows: [],
      permissionList: []
    }
  },
  created() {
    this.getPermissions()
  },
  methods: {
    getPermissions() {
      api.permission.list().then(res => {
        this.permissionList = res.result.data
      })
    },
    handleEdit (record) {
      this.$ref.modal.visible = true
    },
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.$refs.table.refresh()
    },
    handleOkPermission() {

    },
    handleDelete(id) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要删除该角色吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.role.remove(id).then(() => this.$refs.table.refresh(1))
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
