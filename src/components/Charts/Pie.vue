<script>
import { Pie, mixins } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  props: ['options'],
  mixins: [reactiveProp],
  mounted() {
    this.addPlugin(ChartDataLabels)
    this.renderPieChart()
  },
  computed: {
    attendanceData() {
      return this.data
    }
  },
  methods: {
    renderPieChart() {
      this.renderChart(this.chartData, this.options)
    }
  },
  watch: {
    attendanceData() {
      this.$data._chart.destroy()
      this.renderPieChart()
    }
  }
}
</script>
