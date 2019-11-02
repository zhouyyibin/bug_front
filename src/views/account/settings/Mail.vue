<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col
        :md="24"
        :lg="12"
      >

        <a-form
          :form="form"
          :layout="formLayout"
          @submit="handleSubmit"
        >
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="账号名称"
          >
            <a-input
              placeholder=""
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入账号名称' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="是否打开"
          >
            <!-- isOpen -->
            <a-radio-group v-decorator="['isOpen']">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="0">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="服务器"
            :required="false"
          >
            <a-input
              placeholder=""
              disabled
              v-decorator="[
                'host'
              ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="端口号"
            :required="false"
          >
            <a-input
              placeholder=""
              disabled
              v-decorator="[
                'port'
              ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="smtp账号"
            :required="false"
          >
            <a-input
              placeholder=""
              disabled
              v-decorator="[
                'username'
              ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="smtp账号密码"
            :required="false"
          >
            <a-input
              placeholder=""
              disabled
              type="password"
              v-decorator="[
                'password'
              ]"
            />
          </a-form-item>

          <a-form-item
            :wrapper-col="buttonItemLayout.wrapperCol"
          >
            <a-button type="primary" html-type="submit" :loading="confirmLoading">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      // cropper
      form: this.$form.createForm(this),
      account: {},
      formLayout: 'horizontal',
      confirmLoading: false
    }
  },
  mounted() {
    this.getMailSetting()
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 6 }
        }
        : {}
    }
  },
  methods: {
    async getMailSetting() {
      const { data } = await api.system.getMailSetting()
      const { host, port, username, password, name, isOpen } = data
      this.form.setFieldsValue({ host, port, username, password, name, isOpen })
    },
    handleSubmit(e) {
      e.preventDefault()
      // 触发表单验证
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          const { name, isOpen } = values
          api.system.saveMailSetting({
            name,
            isOpen
          })
            .then(res => {
              // Do something
              this.$message.success('保存成功')
            })
            .catch(() => {
              // Do something
            })
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    }
  }
}
</script>
