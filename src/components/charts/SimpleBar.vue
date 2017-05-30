<template>
    <div>
        <div class="row" v-if="!isTest">
            <div class="col-xs-12 col-md-6">
                <div class="form-group">
                    <label for="country" class="form-label">Country</label>
                    <input type="text" class="form-control" v-model="model.country" id="country" @keyup.enter="add"/>
                </div>
            </div>
            <div class="col-xs-12 col-md-6">
                <div class="form-group">
                    <label for="visits" class="form-label">Visits</label>
                    <input type="number" class="form-control" v-model="model.visits" id="visits" @keyup.enter="add"/>
                </div>
            </div>
        </div>
        <div :class="[isFullScreen ? fullScreen : '', colSpan]">
            <div :id="outerId" :class="outerClasses" style="height: 500px; width: 100%; border: 2px solid;">
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
    export default {
        name: 'simpleBar',
        mixins: [ chart ],
        data() {
            return {
                chart: null,
                model: {
                    country: "",
                    visits: 0
                },
                defaultModel: {
                    country: "",
                    visits: 0
                }
            }
        },
        computed: {
            isValid() {
                return this.model.country.length && !isNaN(this.model.visits)
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
                this.chart = AmCharts.makeChart( this.chartId, {
                  "type": "serial",
                  "theme": "light",
                  "dataProvider": data,
                  "valueAxes": [ {
                    "gridColor": "#FFFFFF",
                    "gridAlpha": 0.2,
                    "dashLength": 0
                  } ],
                  "gridAboveGraphs": true,
                  "startDuration": 1,
                  "graphs": [ {
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "visits"
                  } ],
                  "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                  },
                  "categoryField": "country",
                  "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                  },
                  "export": {
                    "enabled": true
                  }
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
</style>
