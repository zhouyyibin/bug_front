<template>
  <a-modal
    :title="(this.mdl ? '编辑' : '新增') + '角色'"
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
        label="角色名称"
        hasFeedback
      >
        <a-input
          placeholder="请输入角色名称"
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入角色名称' }]}
          ]"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="角色描述"
        hasFeedback
      >
        <a-textarea
          placeholder="请输入角色描述"
          v-decorator="[
            'describe'
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import api from '@/api'
import pick from 'lodash.pick'

export default {
  name: 'DepartModal',
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
    add() {
      this.mdl = null
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit(record) {
      this.mdl = record ? Object.assign({}, record) : ''
      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'describe', 'name'))
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
          api.role[action](values)
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
