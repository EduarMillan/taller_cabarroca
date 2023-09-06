import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';
import { Box, Paper, Typography } from '@mui/material';

const data = [
  {
    name: 'Primero',
    uv: 6000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Segundo',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Tercero',
    uv: 12000,
    pv: 8,
    amt: 2290,
  },
  {
    name: 'Cuarto ',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const renderCustomizedLabel = (props) => {
  const {
    x, y, width,
  } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#FF6600 " />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#FFFF00"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        A
      </text>
    </g>
  );
};

export default function GraficoBarras() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5"> COMPARACION POR TRIMESTRES</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BarChart
          width={450}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#FF3300" minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="uv" fill="#0033FF" minPointSize={10} />
        </BarChart>
      </Box>
    </Paper>
  );
}
