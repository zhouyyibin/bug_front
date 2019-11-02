<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper" v-action="`org_permission_add_model`">
      <a-form
        :form="form"
        @submit="handleOk"
        layout="inline"
      >
        <a-row :gutter="48">
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item label="模块名称">
              <a-input
                v-decorator="[
                  'name',
                  {rules: [{ required: true, message: '请输入模块名称' }]}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item label="模块标识">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'action',
                  {rules: [{ required: true, message: '请输入模块标识' }]}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item>
              <a-checkbox
                style="display:inline-block"
                v-decorator="[
                  'defaultCheck',
                  {valuePropName: 'checked', initialValue: true}
                ]"
              >默认选中</a-checkbox>

              <a-button
              type="primary"
              html-type="submit"
            >添加</a-button>
            </a-form-item>
            
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      rowKey="id"
      :columns="columns"
      :pagination="false"
      :dataSource="permissionList"
    >
      <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0"
      >
        <h3>模块方法</h3>
        <a-row :gutter="24">
          <a-col :span="6" v-for="item in record.actionEntitySet">{{ item.name }}({{ item.action }})</a-col>
        </a-row>
      </div>
      <span
        slot="action2"
        slot-scope="text, record"
      >
        <a href="javascript:;" @click="showAdd(record)" v-action="`org_permission_add_action`">添加方法</a>
        <a-divider type="vertical" />
        <a
          href="javascript:;"
          v-action="`org_permission_delete_action`"
          @click="handleDelete(record.id)"
        >删除</a>
      </span>
    </a-table>

    <a-modal
      title="添加子模块"
      :visible="visible"
      @cancel="visible = false"
      :maskClosable="false"
      @ok="handleAddActionEntitySet"
    >
      <a-form :form="form2">
        <a-form-item label="子模块名称">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入模块名称' }]}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item label="子模块标识">
          <a-input
            placeholder="请输入"
            v-decorator="[
              'action',
              {rules: [{ required: true, message: '请输入模块标识' }]}
            ]"
          />
        </a-form-item>

        <a-form-item>
          <a-checkbox
            style="display:inline-block"
            v-decorator="[
              'defaultCheck',
              {valuePropName: 'checked', initialValue: true}
            ]"
            v-model="topForm.defaultCheck"
          >默认选中</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import api from '@/api'

export default {
  name: 'PermissionList',
  components: {
    STable
  },
  data() {
    return {
      description:
        '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      mdl: {},
      topForm: {
        name: '',
        action: '',
        defaultCheck: true,
        actionEntitySet: []
      },
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '模块名称',
          dataIndex: 'name'
        },
        {
          title: '模块标识',
          dataIndex: 'action'
        },
        {
          title: '默认选中',
          dataIndex: 'defaultCheck'
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'action2',
          scopedSlots: { customRender: 'action2' }
        }
      ],
      // 向后端拉取可以用的操作列表
      permissionList: []
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '正常',
        2: '禁用'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    showAdd(record) {
      this.mdl = record
      this.visible = true
    },
    getList() {
      api.permission.list().then(res => {
        this.permissionList = res.result.data
      })
    },
    handleDelete(id) {
      api.permission
        .remove(id)
        .then(res => {
          // Do something
          this.$message.success('删除成功')
          this.getList()
        })
        .catch(() => {
          // Do something
        })
        .finally(() => {
          this.confirmLoading = false
        })
    },
    handleOk(e) {
      e.preventDefault()
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          this.confirmLoading = true
          api.permission
            .save(values)
            .then(res => {
              // Do something
              this.$message.success('添加成功')
              this.getList()
            })
            .catch(() => {
              // Do something
            })
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    },
    handleAddActionEntitySet(e) {
      e.preventDefault()
      // 触发表单验证
      this.form2.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          this.confirmLoading = true
          this.mdl.actionEntitySet.push(values)
          delete this.mdl.actionEntity
          api.permission
            .update(this.mdl)
            .then(res => {
              // Do something
              this.$message.success('添加成功')
              this.getList()
            })
            .catch(() => {
              // Do something
            })
            .finally(() => {
              this.confirmLoading = false
              this.visible = false
            })
        }
      })
    }
  }
}
</script>
