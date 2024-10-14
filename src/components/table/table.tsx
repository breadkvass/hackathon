import { Table } from 'antd';
import { FC } from 'react';

type TableComponentProps = {
  data: any[];
  columns: any[];
}

const TableComponent: FC<TableComponentProps> = ({data, columns}) => {
  return (
    <Table
      dataSource={data}
      columns={columns} 
      pagination={false}
    />
  )
}

export default TableComponent;