import { Line, LineConfig } from '@ant-design/plots';
import { FC } from 'react';
import ChartLayout from '../chartLayout/chartLayout';

type LineChartProps = {
    value: any[];
    colors?: string[];
    maxY?: number;
    type: string;
    width?: number;
}
// const LineChart: FC<LineChartProps> = ({ value, colors, maxY, type, width }) => {
    const LineChart: FC<LineChartProps> = ({value, maxY, type, width }) => {

    const data = value;
    
      const config: LineConfig = {
        data,
        xField: 'квартал',
        yField: 'оценка',
        point: {
          shapeField: 'circle',
          sizeField: 4,
        },
        width: width,
        interaction: {
          tooltip: {
            marker: false,
          },
        },
        scale: {
            y: { 
              type: 'linear',
              domain: [0, maxY],
            }
        }
      };

      return (
        <ChartLayout type={type}>
            <Line {...config}  />
        </ChartLayout>
    )

      
};

export default LineChart;