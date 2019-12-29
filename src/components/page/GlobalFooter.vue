<template>
  <div class="footer">
    <div class="links">
      深圳市鑫信腾科技有限公司
    </div>
    <!-- <div class="copyright">
      技术支持：珠海研新信息技术有限公司&nbsp;&nbsp;&nbsp;&nbsp;服务热线：18825622418
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>
