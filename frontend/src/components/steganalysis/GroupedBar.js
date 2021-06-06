import React from "react";
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
		console.log(props.data)
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
			<Chart
				height={600}
				width={1200}
				data={dv}
				autoFit
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
		);
	}
}

export default GroupedBar