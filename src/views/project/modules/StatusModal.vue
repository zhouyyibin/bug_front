<template>
  <a-modal
    :title="`${STATUS_ACTION_CODES[mdl.status]}`"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    @ok="handleOk"
  >
    <a-form :form="form">
      <a-form-item
        label="附件"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
        hasFeedback
      >
        <a-upload
          v-decorator="['annex', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
        }]"
          name="file"
          extra="文件最大限制10M"
          list-type="picture"
          :action="uploadUrl"
        >
          <a-button>
            <a-icon type="upload" /> 选择文件
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item
        label="描述"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
        hasFeedback
      >
        <a-textarea
          placeholder=""
          v-decorator="[
            'describe'
          ]"
        />
      </a-form-item>
    </a-form>
    <!-- <HistoryList :list="history"></HistoryList> -->
  </a-modal>
</template>

<script>
import api from '@/api'
import { STATUS_ACTION_CODES } from '@/utils/variables'
import HistoryList from './HistoryList'
export default {
  props: ['history'],
  components: {
    HistoryList
  },
  data() {
    return {
      visible: false,
      mdl: {},
      uploadUrl: process.env.NODE_ENV === 'development' ? '/api/upload' : 'http://61.144.170.37:8085/upload',
      STATUS_ACTION_CODES,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    normFile(e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    show({ id, status }) {
      this.visible = true
      this.mdl = {
        id,
        status
      }
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
          if (values.annex) {
            values.annex = values.annex[0].response.data
          }
          api.bug
            .setStatus({
              ...this.mdl,
              ...values
            })
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
    }
  }
}
</script>
