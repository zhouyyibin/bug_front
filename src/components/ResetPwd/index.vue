<template>
  <a-modal
    :title="title || '修改密码'"
    style="top: 60px;"
    :width="400"
    :maskClosable="false"
    v-model="visible"
    v-bind="$attrs"
    :cancelButtonProps="cancelButtonProps"
    @ok="handleOk"
  >
    <a-form
      :form="form"
      id="userForm"
    >
      <a-form-item
        label="旧密码"
        hasFeedback
      >
        <a-input
          placeholder="请输入旧密码"
          type="password"
          v-decorator="[
            'oldPassword',
            {rules: [{ required: true, message: '请输入旧密码' }]}
          ]"
        />
      </a-form-item>

      <a-form-item
        label="新密码"
        hasFeedback
      >
        <a-input
          placeholder="请输入新密码"
          type="password"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入新密码' }, { validator: this.handlePasswordCheck }]}
          ]"
        />
      </a-form-item>

      <a-form-item
        label="确认密码"
        hasFeedback
      >
        <a-input
          placeholder="请再次输入新密码"
          type="password"
          v-decorator="[
            'repassword',
            {rules: [{ required: true, message: '请再次输入新密码' }, { validator: this.handleRePasswordCheck }]}
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import api from '@/api'
export default {
  props: {
    title: String,
    isFirstLogin: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      cancelButtonProps: {
        props: { disabled: this.isFirstLogin }
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleOk() {
      const {
        form: { validateFields }
      } = this
      validateFields({ force: true }, async (err, values) => {
        if (!err) {
          delete values.repassword
          try {
            const res = await api.user.changePassword(values)
            this.$message.success('修改成功')
            this.$emit('success')
            this.close()
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    handlePasswordCheck(rule, value, callback) {
      var reg = new RegExp(/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,30}$$/)
      if (value && !reg.test(value)) {
        callback(new Error('至少6-30位密码，必须包含大小写字母与数字'))
      }
      callback()
    },
    handleRePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    }
  }
}
</script>
