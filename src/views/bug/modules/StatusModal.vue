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
      >
        <a-upload
          v-decorator="[
            'annexs', {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            }
          ]"
          :withCredentials="true"
          name="file"
          extra="文件最大限制10M"
          list-type="text"
          :beforeUpload="beforeUpload"
          @change="handleChange"
          :action="uploadUrl"
        >
          <a-button>
            <a-icon type="upload" /> 选择文件
          </a-button>
        </a-upload>
        <div>
          附件文件类型： <br />
          文档：doc docx xls xlsx ppt pptx pdf csv<br />
          图片：bmp jpg png gif<br />
          视频：3GP MP4 AVI
        </div>
      </a-form-item>

      <a-form-item
        label="描述"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
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
    beforeUpload(file) {
      const fileTypes = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf',
        'csv',
        'bmp',
        'jpg',
        'png',
        'gif',
        '3gp',
        'mp4',
        'avi'
      ]
      const arr = file.name.split('.')
      const ext = arr[arr.length - 1]
      const valid = fileTypes.includes(ext)
      if (!valid) {
        this.$notification.error({
          message: '温馨提示',
          description: `附件上传限于以下文件类型： \n
                  文档：doc docx xls xlsx ppt pptx pdf csv\n
                  图片：bmp jpg png gif\n
                  视频：3GP MP4 AVI\n`
        })
      }
      return valid
    },
    isValidFile(file) {
      const fileTypes = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf',
        'csv',
        'bmp',
        'jpg',
        'png',
        'gif',
        '3gp',
        'mp4',
        'avi'
      ]
      const arr = file.name.split('.')
      const ext = arr[arr.length - 1]
      const valid = fileTypes.includes(ext)

      return valid
    },
    filterValidFile(files) {
      const fileTypes = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf',
        'csv',
        'bmp',
        'jpg',
        'png',
        'gif',
        '3gp',
        'mp4',
        'avi'
      ]

      return files.filter(i => {
        const arr = i.name.split('.')
        const ext = arr[arr.length - 1]
        const valid = fileTypes.includes(ext)
        return valid
      })
    },
    handleChange({ fileList, file, event }) {
      const newList = fileList.filter(this.isValidFile)
      console.log(newList)
      this.form.setFieldsValue({
        annexs: newList
      })
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return this.filterValidFile(e)
      }
      return e && this.filterValidFile(e.fileList)
    },
    reformatData(data) {
      data.describe = encodeURIComponent(data.describe)
      if (data.annexs && data.annexs.length > 0) {
        data.annexs = data.annexs.map(i => {
          console.log(i)
          return i.hasOwnProperty('response')
            ? `http://${window.localStorage.getItem('VUE_APP_HOST') ? window.localStorage.getItem('VUE_APP_HOST') : process.env.VUE_APP_HOST}:${window.localStorage.getItem('VUE_APP_PORT') ? window.localStorage.getItem('VUE_APP_PORT') : process.env.VUE_APP_PORT}/download?path=${i.response.data}`
            : i
        })
      }

      console.log(data)

      return data
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
          const data = this.reformatData(values)
          api.bug
            .setStatus({
              ...this.mdl,
              ...data
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
