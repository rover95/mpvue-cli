
import complateF2 from "./complateF2";
const F2 = complateF2()

export default function lineChart(canvas, width, height, data, config) {
    let xAxis = config && config.xAxis ? config.xAxis : 'time';
    let yAxis = config && config.yAxis ? config.yAxis : 'value';
    let flag = config && config.flag ? config.flag : null;
    let unit = config && config.unit ? config.unit : '';

    let chart = new F2.Chart({
        el: canvas,
        width,
        height,
        // padding: [30, 0, 43, 30],
    });

    chart.source(data, {
        time: {
            type: 'timeCat',
        },
    });

    chart.axis(xAxis, {
        label: (text, index, total) => {
            const cfg = {};
            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
            // if (flag != 'cityCation') {
            //     if (index === 0) {
            //         cfg.textAlign = 'start';
            //     } else if (index > 0 && index === total - 1) {
            //         cfg.textAlign = 'end';
            //     }
            // }

            if (flag == 'pccsMonth') {
                cfg.text = parseInt(text.substring(8));  // cfg.text 支持文本格式化处理
            } else if (flag == 'cityCation' || flag == 'airRateMonth') {
                cfg.text = text.substring(2) + '月'
            }
            return cfg;
        }
    })

    // chart.axis(yAxis, {
    //     label: (text, index, total) => {
    //         const cfg = {};
    //         cfg.text = '';
    //         return cfg;
    //     }
    // })

    chart.tooltip({
        onChange(obj) {
            // obj: { x, y, title, items }
            let item = obj.items[0];
            let items = obj.items;
            if (flag == 'airRateMonth') {
                item.name = item.origin.year + item.origin.month.substring(2) + '月-' + '优良率';
                item.value = ' ' + item.value + '%';
            } else {
                for (let i of items) {
                    i.value += unit;
                }
            }
        },
    });
    chart.legend('type', {
        position: 'bottom',
        align: 'center',
        // offsetY: 20
    });

    let axis = `${xAxis}*${yAxis}`;
    if (config && config.type == "map") {
        chart.line().position(axis);
        chart.area().position(axis);
    } else if (config && config.type == "contrast") {
        chart.line().position(axis).color('type');
    } else {
        chart.line().position(axis);
    }
    chart.render();
    return chart;
}