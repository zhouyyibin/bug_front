<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart
      height="254"
      :data="data"
      :forceFit="true"
      :padding="['auto', 'auto', '40', '50']"
    >
      <v-interval
        position="x*y"
        :label="labelInterval"
        :opcaity="1"
      ></v-interval>
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script>
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]
const scale = [
  {
    dataKey: 'x',
    min: 2
  },
  {
    dataKey: 'y',
    title: '时间',
    min: 1,
    max: 22
  }
]

const label = {
  textStyle: {
    fill: '#aaaaaa'
  }
}

const labelInterval = ['value', {
  useHtml: true,
  htmlTemplate: function htmlTemplate(text, item) {
    var a = item.point;
    return '<span class="g2-label-item" style="font-weight:bold">' + a.count + '</span>'
  }
}]
export default {
  name: 'Bar',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: Array
  },
  data() {
    return {
      scale,
      tooltip,
      label,
      labelInterval
    }
  }
}
</script>
