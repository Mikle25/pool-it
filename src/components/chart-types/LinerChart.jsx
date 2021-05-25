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
import useThemeContext from '../../hooks/useThemeContext';

const LineChart = ({ data }) => {
  const theme = useThemeContext();

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChartDefault data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={false}
          />
          <XAxis axisLine={false} tickLine={false} hide />
          <YAxis axisLine={false} tickLine={false} hide />
          <Tooltip cursor={false} />
          <Legend iconType="circle" iconSize={10} strokeWidth={1} />
          <Line
            type="monotone"
            dataKey="btc"
            stroke={theme.lightBlue}
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="eth"
            stroke="#804fe8"
            strokeWidth={3}
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
