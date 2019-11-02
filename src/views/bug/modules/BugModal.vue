<template>
  <a-modal
    title="编辑部门"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    @ok="handleOk"
  >
    <a-form
      :form="form"
      id="userForm"
    >
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="上级部门"
      >
        <a-select
          @change="handleChange"
          v-decorator="[
            'parentId',
            {
              initialValue: 0,
              rules: [{ required: true, message: '请选择上级部门' }]
            }
          ]"
        >
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
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="部门名称"
        hasFeedback
      >
        <a-input
          placeholder=""
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入部门名称' }]}
          ]"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="负责人"
        hasFeedback
      >
        <a-select
          showSearch
          :value="value"
          placeholder="input search text"
          :defaultActiveFirstOption="false"
          :showArrow="false"
          :filterOption="false"
          @search="handleSearch"
          @change="handleChange"
          :notFoundContent="null"
        >
          <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import api from '@/api'
import pick from 'lodash.pick'

export default {
  name: 'DepartModal',
  props: ['departmentList'],
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      data: [],
      value: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleCheckAccount(rule, value, callback) {
      // 判断字符串中有没有特殊符号
      if (/^[0-9a-zA-Z]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入字母或数字组合的账号'))
      }
    },
    handleSearch(value) {
      api.user.list({
        pageNo: 1,
        pageSize: -1,
        keyword: value
      }).then(res => console.log(res))
    },
    add() {
      this.mdl = null
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit(record) {
      console.log(record)
      this.mdl = record ? Object.assign({}, record) : ''
      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'parentId', 'name', 'userId'))
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          this.confirmLoading = true
          const action = this.mdl ? 'update' : 'save'
          this.mdl && (values.id = this.mdl.id)
          api.user[action](values)
            .then(res => {
              // Do something
              this.$message.success('保存成功')
              this.$emit('ok')
            })
            .catch(() => {
              // Do something
            })
            .finally(() => {
              this.confirmLoading = false
              this.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    onChangeCheck(permission) {
      permission.indeterminate =
        !!permission.selected.length && permission.selected.length < permission.actionsOptions.length
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll(e, permission) {
      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    handleChange(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
</style>
