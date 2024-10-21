import { FC } from 'react';
import { Column } from '@ant-design/plots';
import ChartLayout from '../chartLayout/chartLayout';

type ColumnChartProps = {
    value: {
        skills: string;
        kvartal: string;
        assessment: number;
    }[];
    colors: string[];
    maxY: number;
    type: string;
    width: number;
    style?: string;
    height?: number;
}

const ColumnChart: FC<ColumnChartProps> = ({ value, colors, maxY, type, width, style, height }) => {
    const config = {
        data: value,
        xField: 'kvartal',
        yField: 'assessment',
        colorField: 'skills',
        group: true,
        width: width,
        height: height,
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
        <ChartLayout type={type} style={style} >
            <Column {...config} />
        </ChartLayout>
    )
};

export default ColumnChart;