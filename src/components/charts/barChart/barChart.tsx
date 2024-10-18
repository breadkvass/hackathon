import { FC } from 'react';
import { Bar } from '@ant-design/plots';
import ChartLayout from '../chartLayout/chartLayout';

type BarChartProps = {
    value?: { skills?: string; assessment?: number; person?: string; }[];
    colors?: string[];
    maxY?: number;
    type: string;
    width?: number;
}

const BarChart: FC<BarChartProps> = ({type, value, width}) => {
    const config = {
        data: value,
        xField: 'person',
        yField: 'assessment',
        colorField: 'skills',
        width: width,
        group: true,
        style: {
            inset: 0,
        },
        scale: {
            color: { 
                range: [
                    'linear-gradient(180deg, rgba(235, 72, 105, 0.25) 0%, rgba(235, 72, 105, 0.3) 25%, rgba(235, 72, 105, 0.35) 50%, rgba(235, 72, 105, 0.45) 75%)',
                    'linear-gradient(180deg, rgba(70, 135, 255, 0.25) 0%, rgba(70, 135, 255, 0.3) 25%, rgba(70, 135, 255, 0.35) 50%, rgba(70, 135, 255, 0.45) 75%)'],
            },
            y: {
              domain: [0, 5]
            }
          },
      };
  return (
    <ChartLayout type={type}>
        <Bar {...config} />
    </ChartLayout>
  )
};

export default BarChart;