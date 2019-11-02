<template>
  <!-- Or manually control the data synchronization（或手动控制数据流） -->
  <quill-editor
    class="ueditor-box "
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  >
  </quill-editor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['image'],
  ['clean'] // remove formatting button
]
export default {
  props: ['value'],
  components: {
    quillEditor
  },
  data() {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        },
        debug: false,
        placeholder: '请输入描述...',
        theme: 'snow'
      }
    }
  },
  watch: {
    value(newVal) {
      this.content = newVal
    }
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.content = html
      this.$emit('change', html)
    }
  }
}
</script>

<style lang="less" scoped>
.ueditor-box {
  line-height: 1;
  height: 200px;
  margin-bottom: 40px;
}
</style>
