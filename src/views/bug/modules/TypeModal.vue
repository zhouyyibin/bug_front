<template>
  <a-modal
    :title="`新增${typeText}`"
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
        :label="`${typeText}名称`"
        hasFeedback
      >
        <a-input
          placeholder=""
          v-decorator="[
            'name',
            {rules: [{ required: true, message: `请输入${typeText}名称` }]}
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      visible: false,
      type: 1,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    typeText() {
      let text = ''
      switch (this.type) {
        case 1:
          text = '项目'
          break
        case 2:
          text = '模块'
          break
        case 3:
          text = '版本'
          break
      }

      return text
    }
  },
  methods: {
    add(type) {
      this.visible = true
      this.type = type
      this.$nextTick(() => {
        this.form.resetFields()
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
          api.system
            .addSystemClassfication(this.type, values.name)
            .then(res => {
              // Do something
              this.$message.success('保存成功')
              this.$emit('ok', this.type, values.name)
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
    }
  }
}
</script>
