import { Bar } from '@ant-design/plots';
import { dataSkillsAssessment } from '../../data/data';
import ChartLayout from '../chartLayout/chartLayout';
import { FC } from 'react';

type BarChartProps = {
    value?: any[];
    colors?: string[];
    maxY?: number;
    type: string;
    width?: number;
}

const BarChart: FC<BarChartProps> = ({type}) => {
    const config = {
        data: dataSkillsAssessment,
        xField: 'person',
        yField: 'assessment',
        colorField: 'skills',
        width: 686,
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