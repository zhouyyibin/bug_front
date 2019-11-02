<template>
  <div class="history-list">
    <h4>历史记录</h4>
    <ul>
      <li>
        {{ first.creatorTime | dateTrim }}, 由 {{ first.creatorName }} 创建。
      </li>
      <li
        v-for="item in others"
        :key="item.id"
      >
        {{ item.creatorTime | dateTrim }}, 由 {{ item.creatorName }} {{ STATUS_ACTION_CODES[item.status] }}。 <a :href="item.annex | staticUrl"  target="_blank" v-if="item.annex">{{item.annex.split('/')[1]}}</a>
        <div class="history-describe" v-if="item.describe">{{item.describe}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { STATUS_ACTION_CODES } from '@/utils/variables'
export default {
  props: ['list'],
  data() {
    return {
      STATUS_ACTION_CODES,
      first: {},
      others: {}
    }
  },
  watch: {
    list(newVal) {
      const arr = [].concat(this.list)
      this.first = arr.splice(0, 1)[0]
      this.others = arr
    }
  }
}
</script>
<style lang="less" scoped>
.history-list {
    ul {
        margin-left: 0;
        padding-left: 0px;
        list-style-position: inside;
    }
    li {
        list-style-type: decimal;
        margin-bottom: 3px;
    }

    .history-describe {
        padding: 5px 5px 5px 10px;
        margin: 5px 0 0;
        background-color: rgba(0,0,0,.025);
        border: 1px solid #eee;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.57142857;
    }
}
</style>
