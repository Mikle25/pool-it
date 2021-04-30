import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart as LineChartDefault,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

const LineChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '200px' }}>
      <ResponsiveContainer>
        <LineChartDefault data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={false}
          />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="btc"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="eth"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
          />
        </LineChartDefault>
      </ResponsiveContainer>
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LineChart;
