<template>
    <div>
        <div class="row" v-if="!isTest">
            <div class="col-xs-12 col-md-6">
                <div class="form-group">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" class="form-control" v-model="model.date" id="date" @keyup.enter="add"/>
                </div>
            </div>
            <div class="col-xs-12 col-md-6">
                <div class="form-group">
                    <label for="value" class="form-label">Value</label>
                    <input type="number" class="form-control" v-model="model.value" id="value" @keyup.enter="add"/>
                </div>
            </div>
        </div>

        <div :class="[isFullScreen ? fullScreen : '', colSpan]">
            <div :id="outerId" :class="outerClasses" style="padding: 40px; height: 500px; width: 100%; border: 2px solid;">
                <div :id="chartId" :class="chartClasses" style="height: 100%; width: 100%;">

                </div>
                <div class="relative">
                  <div class="col-btns">
                    <button @click="col(3)">3</button>
                    <button @click="col(6)">6</button>
                    <button @click="col(9)">9</button>
                    <button @click="col(12)">12</button>
                    <button @click="isFullScreen = !isFullScreen">FULL</button>
                    <button class="handle">handle</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import chart from '../../mixins/chart'
    import TEST_DATA from '../../test-data'
    export default {
        name: 'simpleLine',
        mixins: [ chart ],
        data() {
            return {
                chart: null,
                model: {
                    date: "2017-01-01",
                    value: 0
                },
                defaultModel:{
                    date: "2017-01-01",
                    value: 0
                },
            }
        },
        computed: {
            isValid() {
                return this.model.date.length && !isNaN(this.model.value)
            }
        },
        methods: {
            add() {
                if(this.isValid) {
                    this.testData.push(this.model)
                    this.model = Object.assign({}, this.defaultModel)
                }
            },
            init(data) {
                this.chart = AmCharts.makeChart(this.chartId, {
                    "type": "serial",
                    "theme": "light",
                    "marginRight": 40,
                    "marginLeft": 40,
                    "autoMarginOffset": 20,
                    "mouseWheelZoomEnabled":true,
                    "dataDateFormat": "YYYY-MM-DD",
                    "valueAxes": [{
                        "id": "v1",
                        "axisAlpha": 0,
                        "position": "left",
                        "ignoreAxisWidth":true
                    }],
                    "balloon": {
                        "borderThickness": 1,
                        "shadowAlpha": 0
                    },
                    "graphs": [{
                        "id": "g1",
                        "balloon":{
                          "drop":true,
                          "adjustBorderColor":false,
                          "color":"#ffffff"
                        },
                        "bullet": "round",
                        "bulletBorderAlpha": 1,
                        "bulletColor": "#FFFFFF",
                        "bulletSize": 5,
                        "hideBulletsCount": 50,
                        "lineThickness": 2,
                        "title": "red line",
                        "useLineColorForBulletBorder": true,
                        "valueField": "value",
                        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
                    }],
                    "chartScrollbar": {
                        "graph": "g1",
                        "oppositeAxis":false,
                        "offset":30,
                        "scrollbarHeight": 80,
                        "backgroundAlpha": 0,
                        "selectedBackgroundAlpha": 0.1,
                        "selectedBackgroundColor": "#888888",
                        "graphFillAlpha": 0,
                        "graphLineAlpha": 0.5,
                        "selectedGraphFillAlpha": 0,
                        "selectedGraphLineAlpha": 1,
                        "autoGridCount":true,
                        "color":"#AAAAAA"
                    },
                    "chartCursor": {
                        "pan": true,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "cursorAlpha":1,
                        "cursorColor":"#258cbb",
                        "limitToGraph":"g1",
                        "valueLineAlpha":0.2,
                        "valueZoomable":true
                    },
                    "valueScrollbar":{
                      "oppositeAxis":false,
                      "offset":50,
                      "scrollbarHeight":10
                    },
                    "categoryField": "date",
                    "categoryAxis": {
                        "parseDates": true,
                        "dashLength": 1,
                        "minorGridEnabled": true
                    },
                    "export": {
                        "enabled": true
                    },
                    "dataProvider": data
                })
            }
        },
        mounted() {
        },
        created(){
        }
    }
</script>
<style>

.col-btns {
    position: absolute;
    bottom: 0;
    max-height: 0;
    transition: max-height 1s;
    background-color: #eee;
    opacity: 0.8;
    color: #000;
    overflow: hidden;
    width: 100%;
}
.chart-outer:hover .col-btns {
    max-height: 1000px;
}
.chart-outer {
    padding: 0 !important;
}
.width-anim {
    /*transition: all 0.5s;*/
}
.full-screen {
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
.relative {
  position: relative;
}

.full-screen .chart-outer {
  background-color: #fff;
  margin: 50px;
}

</style>
