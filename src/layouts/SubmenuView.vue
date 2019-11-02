<template>
  <div :style="!$route.meta.hiddenHeaderContent ? 'margin: -24px -24px 0px;' : null">
    <div class="page-submenu">
      <ul class="page-submenu-menu">
        <li class="is-active" v-for="item in submenu" v-if="!item.meta.hideInMenu"  :key="item.path">
          <router-link :to="item.path">{{item.meta.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="page-header-index-wide">
        <slot>
          <!-- keep-alive  -->
          <keep-alive v-if="multiTab">
            <router-view ref="content" />
          </keep-alive>
          <router-view v-else ref="content" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'
import { asyncRouterMap } from '@/config/router.config'

export default {
  name: 'PageView',
  components: {
    PageHeader
  },
  props: {
    avatar: {
      type: String,
      default: null
    },
    title: {
      type: [String, Boolean],
      default: true
    },
    logo: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      pageTitle: null,
      description: null,
      linkList: [],
      extraImage: '',
      search: false,
      tabs: {}
    }
  },
  computed: {
    submenu () {
      const finded = asyncRouterMap[0].children.find(i => i.path === '/org')
      return finded.children
    },
    ...mapState({
      multiTab: state => state.app.multiTab
    })
  },
  mounted () {
    this.getPageMeta()
  },
  updated () {
    this.getPageMeta()
  },
  methods: {
    getPageMeta () {
      // eslint-disable-next-line
      this.pageTitle = (typeof(this.title) === 'string' || !this.title) ? this.title : this.$route.meta.title

      const content = this.$refs.content
      if (content) {
        if (content.pageMeta) {
          Object.assign(this, content.pageMeta)
        } else {
          this.description = content.description
          this.linkList = content.linkList
          this.extraImage = content.extraImage
          this.search = content.search === true
          this.tabs = content.tabs
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-submenu {
  background: #fff;
  padding: 15px 0;
  ul {
    text-align:  center;
    margin-bottom: 0;
  }
  ul li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color:#999;
    text-decoration: none;
    &.router-link-active {
      color: #1890ff;
    }
  }
}
  .content {
    margin: 24px 24px 0;
    .link {
      margin-top: 16px;
      &:not(:empty) {
        margin-bottom: 16px;
      }
      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .page-menu-search {
    text-align: center;
    margin-bottom: 16px;
  }
  .page-menu-tabs {
    margin-top: 48px;
  }

  .extra-img {
    margin-top: -60px;
    text-align: center;
    width: 195px;

    img {
      width: 100%;
    }
  }

  .mobile {
    .extra-img{
      margin-top: 0;
      text-align: center;
      width: 96px;

      img{
        width: 100%;
      }
    }
  }
</style>
