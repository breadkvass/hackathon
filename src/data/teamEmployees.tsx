import ThreeDotsCircle from "../components/icons/threeDotsCircle/threeDotsCircle";

export const dataSource = [
    {
      key: '1',
      number: '1',
      name: 'Акимов Роберт',
      position: 'Дизанер',
      hard: 3.81,
      soft: 4.24,
      bus: 'нет',
      compliance: 1.0,
      todo: <ThreeDotsCircle />
    },
    {
      key: '2',
      number: '2',
      name: 'Волков Денис',
      position: 'Разработчик',
      hard: 3.98,
      soft: 3.95,
      bus: 'нет',
      compliance: 0.9,
      todo: <ThreeDotsCircle />
    },
    {
      key: '3',
      number: '3',
      name: 'Журавлев Максим',
      position: 'Тестировщик',
      hard: 4.16,
      soft: 3.82,
      bus: 'нет',
      compliance: 0.95,
      todo: <ThreeDotsCircle />
    },
    {
      key: '4',
      number: '4',
      name: 'Комарова Вера',
      position: 'Менеджер',
      hard: 4.40,
      soft: 4.17,
      bus: 'нет',
      compliance: 0.85,
      todo: <ThreeDotsCircle />
    },
    {
      key: '5',
      number: '5',
      name: 'Костин Михаил',
      position: 'Менеджер',
      hard: 3.69,
      soft: 4.37,
      bus: 'да',
      compliance: 0.80,
      todo: <ThreeDotsCircle />
    },
  ];
  
export const dataColumns = [
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
        title: 'Bus-фактор',
        dataIndex: 'bus',
        key: 'bus',
    },
    {
        title: 'К. соот-я',
        dataIndex: 'compliance',
        key: 'compliance',
    },
    {
        title: 'Действие',
        dataIndex: 'todo',
        key: 'todo',
    },
  ];