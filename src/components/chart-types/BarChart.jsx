import React from 'react';
import {
  ResponsiveContainer,
  BarChart as BarChartDefault,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
// import useThemeContext from '../../hooks/useThemeContext';

const BarChart = ({ data }) => {
  // const theme = useThemeContext();

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChartDefault data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="15%" stopColor="#21C7EF" stopOpacity={1} />
              <stop offset="50%" stopColor="#097994" stopOpacity={1} />
              <stop offset="100%" stopColor="#5028A3" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e2e9"
            vertical={false}
          />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis tickLine={false} tickCount={7} />
          <Tooltip cursor={false} />
          <Bar
            dataKey="value"
            // fill={theme.lightBlue}
            barSize={20}
            fill="url(#colorUv)"
            radius={[10, 10, 0, 0]}
            minPointSize={1}
          />
        </BarChartDefault>
      </ResponsiveContainer>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BarChart;
