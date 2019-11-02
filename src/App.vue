<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="less">
  #app {
    height: 100%;
  }
  .layout.ant-layout .top-nav-header-index .header-index-wide .ant-menu.ant-menu-horizontal {
    text-align: center;
  }

  .priority_num {
      display: inline-block;
      min-width: 20px;
      max-width: 67px;
      height: 20px;
      padding: 0 4px;
      overflow: hidden;
      line-height: 16px;
      color: #838a9d;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      border: 2px solid #838a9d;
      border-radius: 10px;
      &_1 {
        color: #d50000;
        border-color: #d50000
      }

      &_2{
        color: #ff9800;
        border-color: #ff9800
      }

      &_3 {
        color: #2098ee;
        border-color: #2098ee
      }

      &_4 {
        color: #009688;
        border-color: #009688
      }
    }

    .severity_num {
      position: relative;
      text-align: center;
      &_1 {
        color: #d50000;
        border-color: #d50000
      }

      &_2{
        color: #ff9800;
        border-color: #ff9800
      }

      &_3 {
        color: #2098ee;
        border-color: #2098ee
      }

      &_4 {
        color: #009688;
        border-color: #009688
      }
    }

    .status-bug {
      display: inline-block;
      min-width: 20px;
      max-width: 67px;
      cursor: pointer;
      height: 20px;
      padding: 0 4px;
      line-height: 18px;
      overflow: hidden;
      color: #838a9d;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      border: 1px solid #838a9d;
      border-radius: 10px;
      font-size: 12px;
      &_1 {
        color: #d50000;
        border-color: #d50000
      }

      &_2{
        color: #ff9800;
        border-color: #ff9800
      }

      &_3 {
        color: #2098ee;
        border-color: #2098ee
      }

      &_4 {
        color: #009688;
        border-color: #009688
      }
    }
</style>
