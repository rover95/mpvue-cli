
import complateF2 from "./complateF2";
const F2 = complateF2()

export default function pieChart(canvas, width, height, data, config) {
    // data = [
    //     {
    //         ratio: 10,
    //         memo: "第一类",
    //         const: "const"
    //     },
    //     {
    //         ratio: 30,
    //         memo: "第二类",
    //         const: "const"
    //     },
    //     {
    //         ratio: 60,
    //         memo: "第三类",
    //         const: "const"
    //     }
    // ];
    if (!config) {
        config = {}
    }
    let padding = config && config.padding ? config.padding : [30, 0, 20, 0];
    let unit = config && config.unit ? config.unit : '';
    let innerRadius = (config && config.innerRadius) ? config.innerRadius : 0;
    let colors = config && config.colors ? config.colors : null;
    let flag = config && config.flag ? config.flag : null;
    let chart = new F2.Chart({
        el: canvas,
        width,
        height,
        padding: padding,
    });

    if (config && config.content) {
        chart
            .guide()
            .text({
                position: ["50%", "50%"],
                content: config.content.value,
                offsetY: -10,
                style: {
                    fontSize: config.content.fontSize_val || 18,
                    fill: "#000",
                    fontWeight: "bolder",
                    textAlign: "center",
                    textBaseLine: "middle"
                }
            });
        chart
            .guide()
            .text({
                position: ["50%", "50%"],
                content: config.content.lable,
                offsetY: 10,
                style: {
                    fontSize: config.content.fontSize_lab || 12,
                    textAlign: "center",
                    textBaseLine: "middle"
                }
            });
    }

    // let startAngle = 1.5 * Math.PI
    // let endAngle = 3.5 * Math.PI 
    // if(config && config.angle){
    //     startAngle = config.angle.start;
    //     endAngle = config.angle.end;
    // }

    //数据全为零
    if (config && config.zero) {
        for (let i in data) {
            data[i].ratio = 1;
        }
    }

    chart.source(data);
    chart.axis(false);
    chart.legend("memo", {
        position: "bottom",
        align: "center",
        clickable: config.clickDisable ? false : true
    });

    if (config && config.zero) {
        colors = ["#bbb"];
        chart.tooltip({
            onChange(obj) {
                let item = obj.items[0];
                if (item.name.length > 18) {
                    item.name = item.name.substring(0, 16) + "... ";
                }
                item.value = '0';
            }
        });
    } else {
        chart.tooltip({
            onChange(obj) {
                // obj: { x, y, title, items }

                let item = obj.items[0];
                if (item.name.length > 18) {
                    item.name = item.name.substring(0, 16) + '... '
                }
                item.value += unit;
            },
        })

        // chart.legend(false);
        if (flag != 'pccsTypeDistribute') {
            chart.pieLabel({
                anchorOffset: 5, // 锚点的偏移量
                sidePadding: 0, // 文本距离画布左右两边的距离
                skipOverlapLabels: false,// 是否不展示重叠的文本
                label1(data, color) {
                    return {
                        text: data.ratio + unit, // 文本内容
                        fill: color // 文本颜色
                    };
                }
            });
        }


    }
    chart.interaction('pie-select');
    chart.coord("polar", {
        transposed: true,
        innerRadius: innerRadius,
        radius: 0.75,
        //   startAngle,
        //   endAngle 
    });
    chart
        .interval()
        .position("const*ratio")
        .color("memo", colors)
        .adjust("stack");
    chart.render();
    return chart;
}