<!--
 * @Author: pengzhiming
 * @Date: 2019-05-20 14:26:46
 * @LastEditors: pengzhiming
 * @LastEditTime: 2019-12-13 09:30:49
 * @Description:
 -->
<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="4">
        <a-card :bordered="false" title="部门结构">
          <a-tree
            :defaultSelectedKeys="[0]"
            ddefaultExpandParent
            showLine
            :treeData="treeData"
            @select="onSelectDepartment"
          ></a-tree>
        </a-card>
      </a-col>
      <a-col :span="20">
        <a-card :bordered="false">
          <div slot="title">
            <a-input-search
              placeholder="搜索关键词"
              v-model="queryParam.keyword"
              style="margin-left: 10px;width: 200px"
              @search="onSearch"
            />

            <div style="display:inline-block;margin-right: 10px;font-size:14px;float:right">
              <a-button type="primary" v-action="`org_user_add`" @click="$refs.modal.add()">
                <a-icon type="plus"></a-icon>添加用户
              </a-button>
            </div>
          </div>
          <s-table size="default" ref="table" rowKey="id" :columns="columns" :data="loadData">
            <span slot="action" slot-scope="text, record">
              <a @click="$refs.modal.edit(record)" v-action="`org_user_edit`">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleResetPwd(record.id)" v-action="`org_user_resetpwd`">重置密码</a>
              <a-divider type="vertical" />
              <a
                href="javascript:;"
                v-action="`org_user_delete`"
                @click="handleDelete(record)"
              >{{record.status ? '禁用' : '启用'}}</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-action="`org_user_remove`" @click="handleRemove(record)">删除</a>
            </span>
          </s-table>
        </a-card>
      </a-col>
    </a-row>

    <user-modal ref="modal" :role-list="roleList" :department-list="departmentList" @ok="handleOk"></user-modal>
  </div>
</template>

<script>
import { STable } from '@/components'
import api from '@/api'
import UserModal from './modules/UserModal'
import moment from 'moment'
export default {
  name: 'TableList',
  components: {
    STable,
    UserModal
  },
  data() {
    return {
      treeData: [],
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
      mdl: {},

      // 高级搜索 展开/关闭
      advanced: false,
      // 表头
      columns: [
        {
          title: '真实姓名',
          dataIndex: 'name'
        },
        {
          title: '登录账号',
          dataIndex: 'account'
        },
        {
          title: '职位',
          dataIndex: 'position'
        },
        {
          title: '部门',
          dataIndex: 'department',
          customRender: v => v.name
        },
        {
          title: '最后登录',
          dataIndex: 'lastLoginTime',
          customRender: v => {
            return v && moment(new Date(v)).format('YYYY/MM/DD HH:mm')
          }
        },
        {
          title: '角色',
          dataIndex: 'roleBeans',
          customRender: roles => {
            const arr = this.roleList.filter(i => roles.includes(i.id))
            const nameArr = arr.map(i => i.name)
            return nameArr.join(',')
          }
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      departmentList: [],
      roleList: [],
      queryParam: {
        keyword: '',
        department_id: null
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return api.user.list(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    this.getDepartList()
    this.getRoleList()
  },
  methods: {
    onSearch() {
      this.$refs.table.refresh()
    },
    getRoleList() {
      api.role.list({ pageNo: 1, pageSize: -1 }).then(res => {
        const data = res.result.data
        this.roleList = data
      })
    },
    getDepartList() {
      api.department.tree().then(res => {
        const data = res.result.data
        const newData = [{ key: 0, name: '艾鑫集团', id: 0, departments: data }]
        this.departmentList = this.formatTree(data)
        this.treeData = this.formatTree(newData)
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
    handleDelete(record) {
      this.$confirm({
        title: '温馨提示',
        content: record.status
          ? '您确定要禁用该用户吗？禁用后用户无法登录'
          : '您确定要启用该用户吗？启用后该用户能正常登陆',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.user.remove(record.id).then(() => this.$refs.table.refresh(false))
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    handleRemove(record) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要删除该用户吗？删除后将无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.user.deleteUser(record.id).then(() => this.$refs.table.refresh(false))
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    handleRemove(record) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要删除该用户吗？删除用户后无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.user.deleteUser(record.id).then(() => this.$refs.table.refresh(true))
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    handleEdit(record) {
      this.$refs.modal.visible = true
    },
    handleOk() {
      this.$refs.table.refresh(false)
    },
    handleResetPwd(id) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要重置该用户密码吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.user.resetPwd(id).then(res => {
            console.log(res)
          })
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    onSelectDepartment(selectedKeys, info) {
      const { id } = info.node.dataRef
      this.queryParam.department_id = id
      this.$refs.table.refresh()
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
