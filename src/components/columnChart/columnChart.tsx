import { Column } from '@ant-design/plots';
import { FC } from 'react';
import ChartLayout from '../chartLayout/chartLayout';

type ColumnChartProps = {
    value: any[];
    colors: string[];
    maxY: number;
    type: string;
    width: number;
}

const ColumnChart: FC<ColumnChartProps> = ({ value, colors, maxY, type, width }) => {

    const config = {
        data: value,
        xField: 'kvartal',
        yField: 'assessment',
        colorField: 'skills',
        group: true,
        width: width,
        style: {
            inset: 0,
        },
        scale: {
            color: { 
                type: 'ordinal',
                range: colors,
            },
            y: {
                domain: [0, maxY]
            }
        },
    };
    return (
        <ChartLayout type={type} >
            <Column {...config} />
        </ChartLayout>
    )
};

export default ColumnChart;