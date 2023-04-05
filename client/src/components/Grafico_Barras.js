import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";

const data = [
  {
    name: "Primero",
    uv: 6000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Segundo",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Tercero",
    uv: 12000,
    pv: 8,
    amt: 2290
  },
  {
    name: "Cuarto ",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  
];

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#FFBB28" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        A
      </text>
    </g>
  );
};

export default function Grafico_Barras() {
  return (
    <BarChart
      width={450}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#FFBB28" minPointSize={5}>
        <LabelList dataKey="name" content={renderCustomizedLabel} />
      </Bar>
      <Bar dataKey="uv" fill="#0088FE" minPointSize={10} />
    </BarChart>
  );
}