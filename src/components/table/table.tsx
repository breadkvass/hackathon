import { Table } from 'antd';

const TableComponent = () => {
    const dataSource = [
        {
          key: '1',
          number: '1',
          name: 'Акимов Роберт',
          position: 'Дизанер',
          grade: 'Middle',
          team: 'Медиа',
          hard: 3.81,
          soft: 4.24
        },
        {
          key: '2',
          number: '2',
          name: 'Волков Денис',
          position: 'Разработчик',
          grade: 'Middle',
          team: 'Медиа',
          hard: 3.98,
          soft: 3.95
        },
        {
          key: '3',
          number: '3',
          name: 'Журавлев Максим',
          position: 'Тестировщик',
          grade: 'Junior',
          team: 'Медиа',
          hard: 4.16,
          soft: 3.82
        },
        {
          key: '4',
          number: '4',
          name: 'Комарова Вера',
          position: 'Менеджер',
          grade: 'Senior',
          team: 'Медиа',
          hard: 4.40,
          soft: 4.17
        },
        {
          key: '5',
          number: '5',
          name: 'Костин Михаил',
          position: 'Менеджер',
          grade: 'Middle',
          team: 'Медиа',
          hard: 3.69,
          soft: 4.37
        },
      ];
      
      const columns = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Фамилия и имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Грейд',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: 'Команда',
            dataIndex: 'team',
            key: 'team',
        },
        {
            title: 'Hard skills',
            dataIndex: 'hard',
            key: 'hard',
        },
        {
            title: 'Soft skills',
            dataIndex: 'soft',
            key: 'soft',
        },
        {
            title: 'К. соот-я',
            dataIndex: 'soft',
            key: 'soft',
        },
      ];
      
    
    return (
        <Table
            
            dataSource={dataSource}
            columns={columns} 
            pagination={false}
        />
    )
}

export default TableComponent;