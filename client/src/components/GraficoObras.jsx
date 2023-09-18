import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { getTrabajosRealizados } from '../api';
import '../styles/graficoObras.css';

const cx = 150; // espaciado lef
const cy = 97; // espaciado top
const iR = 50;// radio interior
const oR = 100;// radio exterior

export default function GraficoObras() {
  const [value, setValue] = useState(); // aguja
  const [aveProfitLY, setAveProfitLY] = useState(); // verde
  const [aveProfitBLY, setAveProfitBLY] = useState(); // azul
  const [aveG, setAveG] = useState(); // rojo

  const aveAAUtilidad = async () => {
    // aguja
    const currentYear = moment().year();
    const works = await getTrabajosRealizados();
    const worksAY = works.filter((work) => moment(work.fecha).year() === currentYear);
    const profitAY = worksAY.reduce((sum, work) => sum + parseFloat(work.utilidad), 0);
    const avePAY = profitAY / worksAY.length;
    const aveProfitAYRound = avePAY.toFixed(2);
    setValue(aveProfitAYRound);
    // Ave. Works last Year
    const worksLY = works.filter((work) => moment(work.fecha).year() === (currentYear - 1));
    const profitLY = worksLY.reduce((sum, work) => sum + parseFloat(work.utilidad), 0);
    const avePLY = profitLY / worksLY.length;
    const aveProfitLYRound = avePLY / worksLY.length;
    setAveProfitLY(aveProfitLYRound);
    // Average works before last years
    const worksBLY = works.filter((work) => moment(work.fecha).year() === (currentYear - 2));
    const profitBLY = worksBLY.reduce((sum, work) => sum + parseFloat(work.utilidad), 0);
    const avePBLY = profitBLY / worksBLY.length;
    const aveProfitBLYRound = avePBLY / worksBLY.length;
    setAveProfitBLY(aveProfitBLYRound);
    // Average General.... rojo...
    const promG = (aveProfitLY + aveProfitBLY) / 2;
    setAveG(promG);
  };

  const RADIAN = Math.PI / 180;
  const data = [
    {
      id: 1, name: 'A', value: parseFloat(aveG), color: '#ff0000',
    },
    {
      id: 2, name: 'B', value: parseFloat(aveProfitLY), color: '#00ff00',
    },
    {
      id: 3, name: 'C', value: parseFloat(aveProfitBLY), color: '#0000ff',
    },
  ];

  // eslint-disable-next-line no-shadow
  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };

  useEffect(() => {
    aveAAUtilidad();
  }, [value]);

  return (
    <div className="container1">
      <div>
        <PieChart width={280} height={110}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(value, data, cx, cy, iR, oR, '#d0d000')}
        </PieChart>
      </div>
      <div className="data1">
        <p className="footdata1" id="pt">
          Promedio Trabajos
          {' '}
          {aveG}
        </p>
        <p className="footdata1" id="tap">
          Trabajos
          {' '}
          {moment().year() - 1}
          {' '}
          {aveProfitLY}
        </p>
        <p className="footdata1" id="taap">
          Trabajos
          {' '}
          {moment().year() - 2}
          {' '}
          {aveProfitBLY}
        </p>
      </div>
      <div>
        <p className="footdata1" id="aa">
          Año Actual:
          {' '}
          {value}
          {' '}
        </p>
      </div>
    </div>
  );
}
