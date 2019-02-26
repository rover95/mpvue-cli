import complateF2 from "./complateF2";
const F2 = complateF2()

export default function barChart(canvas, width, height, data, config) {
    // data = [{
    //     kind: '第一部',
    //     value: 38,
    //     typeColor: '2018年10月'
    // }, {
    //     kind: '第二部',
    //     value: 92,
    //     typeColor: '2018年10月'
    // }, {
    //     kind: '第一部',
    //     value: 18,
    //     typeColor: '2018年11月'
    // }, {
    //     kind: '第二部',
    //     value: 22,
    //     typeColor: '2018年11月'
    // }];

    let type = config && config.type ? config.type : null;
    let typeColor = config && config.typeColor ? config.typeColor : 'type';
    let xAxis = config && config.xAxis ? config.xAxis : 'kind';
    let yAxis = config && config.yAxis ? config.yAxis : 'value';
    let flag = config && config.flag ? config.flag : null;
    let padding = config && config.padding ? config.padding : [25, 0, 20, 0];

    let chart = new F2.Chart({
        el: canvas,
        width,
        height,
        padding: padding
    });

    chart.source(data);

    let label = {};
    if (flag && flag == 'caseArea') {
        label = {
            rotate: Math.PI / 2,
            textAlign: 'start',
            textBaseline: 'middle'
        }
    }

    chart.axis(xAxis, {
        label
    });

    if (type && type == 'Grouping') {
        chart.legend({
            offsetY: -15
        })
        chart.tooltip({
            custom: true, // 自定义 tooltip 内容框
            onChange: function onChange(obj) {
                var legend = chart.get('legendController').legends.top[0];
                var tooltipItems = obj.items;
                var legendItems = legend.items;
                let map = [];
                for (let legendItem of legendItems) {
                    legendItem.value = '0';
                }
                for (let legendItem of legendItems) {
                    for (let tooltipItem of tooltipItems) {
                        if (legendItem.name == tooltipItem.name) {
                            legendItem.value = tooltipItem.value;
                        }
                    }
                }
                legend.setItems(legendItems);
            },
            onHide: function onHide() {
                var legend = chart.get('legendController').legends.top[0];
                legend.setItems(chart.getLegendItems().country);
            }
        });
        chart.interval().position(`${xAxis}*${yAxis}`).color(typeColor).adjust({
            type: 'dodge',
            marginRatio: 0.05 // 设置分组间柱子的间距
        });
    } else {
        chart.interval().position(`${xAxis}*${yAxis}`)
    }

    chart.render();
    return chart;
}