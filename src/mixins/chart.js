import TEST_DATA from '../test-data'
//import { ResizeSensor } from 'css-element-queries'

export default {
    props: ['chartData', 'isTest', 'columns'],
    data() {
        return {
            testData: TEST_DATA[this.$options.name],
            cols: 6,
            isFullScreen: false
        }
    },
    computed: {
        outerId() {
            return "chart-outer-" + this._uid
        },
        chartId() {
            return "chart-" + this._uid
        },
        outerClasses() {
            return "chart-outer"
        },
        chartClasses() {
            return "chart-inner"
        },
        colSpan() {
            return `col-sm-12 col-md-${this.cols} width-anim `
        },
        fullScreen() {
          return 'full-screen'
        }
    },
    watch: {
        testData: {
            handler: function (val, oldVal) {
                this.chart.dataProvider = val
                this.chart.validateData()
            },
            deep: true
        },
        chartData: {
            handler: function (val, oldVal) {
                this.chart.dataProvider = val
                this.chart.validateData()
            },
            deep: true
        }
    },
    methods: {
        init(data) {
            throw `Chart with ID: ${this.chartId} has not overwritten 'init' method`
        },
        col(n) {
            this.cols = n
        }
    },
    mounted() {
        if(!this.isTest) {
            this.init(this.chartData)
        } else {
            this.init(this.testData)
        }

        this.$nextTick( () => {
          this.$forceUpdate()
        })

        /*new ResizeSensor(document.getElementById(this.outerId), function(){
            console.log('content dimension changed');
        })*/
        this.cols = this.columns ? this.columns : this.cols
    }
}
