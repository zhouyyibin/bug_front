<template>
  <a-modal title="操作" style="top: 20px;" :width="800" v-model="visible" @ok="handleOk">
    <a-form :form="form" id="userForm">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属部门">
        <a-select
          @change="handleChange"
          v-decorator="[
            'departmentId',
            {
              initialValue: '0',
              rules: [{ required: true, message: '请选择部门' }]
            }
          ]"
        >
          <a-select-option value="0">/</a-select-option>
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

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="账号">
        <a-input
          placeholder
          v-decorator="[
            'account',
            {rules: [{ required: true, message: '请输入邮箱格式的账号' }, {type: 'email', message: '请输入正确邮箱格式'}]}
          ]"
        />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="真实姓名">
        <a-input
          placeholder
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入真实姓名' }]}
          ]"
        />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色">
        <a-select
          placeholder
          mode="multiple"
          v-decorator="[
            'roleBeans',
            {rules: [{ required: true, message: '请选择用户角色' }]}
          ]"
        >
          <a-select-option v-for="role in roleList" :value="role.id" :key="role.id">{{role.name}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职位">
        <a-input placeholder v-decorator="[
            'position'
          ]" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话">
        <a-input placeholder v-decorator="[
            'tel'
          ]" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="QQ">
        <a-input placeholder v-decorator="[
            'qq'
          ]" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="微信">
        <a-input placeholder v-decorator="[
            'wechar'
          ]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别">
        <a-radio-group
          name="radioGroup"
          v-decorator="[
            'sex',
            {
              initialValue: 1,
            }
          ]"
        >
          <a-radio :value="1">男</a-radio>
          <a-radio :value="0">女</a-radio>
          <a-radio :value="2">未知</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据权限">
        <a-radio-group
          name="radioGroup"
          v-decorator="[
            'setData',
            {
              initialValue: 1,
            }
          ]"
        >
          <a-radio :value="3">本人数据</a-radio>
          <a-radio :value="2">本部门数据</a-radio>
          <a-radio :value="1">本公司数据</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import api from '@/api'
import pick from 'lodash.pick'

export default {
  name: 'UserModal',
  props: ['departmentList', 'roleList'],
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
      console.log(this.mdl)
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(this.mdl, 'name', 'account', 'position', 'departmentId', 'qq', 'wechar', 'mail', 'roleBeans', 'setData')
        )
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
    handleChange(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
</style>
