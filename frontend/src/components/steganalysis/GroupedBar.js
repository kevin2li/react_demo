import React from "react";
import {Button} from "antd"
import { DownloadOutlined } from '@ant-design/icons';
import {
	Chart,
	Interval,
	Axis,
	Tooltip,
	Coordinate,
	Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";



class GroupedBar extends React.Component {
	constructor(props){
		super(props)
		// console.log(props.data)
		this.state = {
			chartIns: null
		}
	}
	saveImg = ()=>{
		const chartIns = this.state.chartIns;
    // console.log(chartIns)

    var image = chartIns['canvas'].cfg.el.toDataURL("image/jpeg");
    const link = document.createElement('a');
    link.href = image;
    link.download = "result.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)

	}
	render() {
		const ds = new DataSet();
		const dv = ds.createView().source(this.props.data);
		dv.transform({
			type: "fold",
			fields: ["cover", "stego"],
			// 展开字段集
			key: "type",
			// key字段
			value: "value" // value字段
		});
		return (
			<>
        <Chart
          height={this.props.height}
          width={this.props.width}
          data={dv}
          autoFit
          onGetG2Instance={chartIns => {
            this.setState({
              chartIns:chartIns
            })
          }}
        >
          <Legend />
          <Coordinate transpose scale={[1, -1]} />
          <Axis
            name="label"
            label={{
              offset: 12
            }}
          />
          <Axis name="value" position={"right"} />
          <Tooltip />
          <Interval
            position="label*value"
            color={"type"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
        <div style={{ textAlign: 'left', margin: "20px 0" }}>
          <Button type="primary" icon={<DownloadOutlined />} onClick={this.saveImg}>保存图片</Button>
        </div>
		  </>
		);
	}
}

export default GroupedBar