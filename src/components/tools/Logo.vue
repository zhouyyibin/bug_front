<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <img :src="require('@/assets/logo.png')" alt="">
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '艾鑫集团Bug管理系统',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
