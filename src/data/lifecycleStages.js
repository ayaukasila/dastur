/** Подписи этапов для URL ?lifecycle=true&stage=… */
export const stageLabelsRu = {
  birth: 'Рождение',
  childhood: 'Детство',
  youth: 'Юность',
  family: 'Семья',
  maturity: 'Зрелость',
  elder: 'Старость',
  farewell: 'Уход',
};

/**
 * Фиксированные списки id для навигации «Пред/След» с ?from=lifecycle&stage=…
 * Только статьи из mockTraditions (без отдельных записей — ищутся через поиск).
 */
export const stageTraditionIds = {
  birth: [101, 15, 100],
  childhood: [3, 102, 16],
  youth: [104, 21],
  family: [13, 14, 2, 1, 103],
  maturity: [104, 6],
  elder: [104, 6],
  farewell: [105, 106, 107],
};

/** Данные вертикальной ленты «Жизненный путь» */
export const lifeStages = [
  {
    id: 'birth',
    title: 'Рождение',
    kazakh: 'туу',
    ageRange: '0',
    iconName: 'Baby',
    color: '#f472b6',
    description:
      'Приход в мир. Первые обряды защищают младенца и связывают его с родом.',
    traditions: [
      { id: 101, name: 'Шілдехана', desc: 'Праздник рождения. Молодёжь поёт и играет, отгоняя злых духов.', timing: '3–7 день', gender: null },
      { id: 15, name: 'Бесік Той', desc: 'Укладывание младенца в священную колыбель (бесік).', timing: '3–7 день', gender: null },
      { id: 100, name: 'Қырқынан шығару', desc: 'Обряд очищения на 40-й день. После него можно показывать ребёнка.', timing: '40 день', gender: null },
    ],
  },
  {
    id: 'childhood',
    title: 'Детство',
    kazakh: 'Балалық',
    ageRange: '1–12',
    iconName: 'GraduationCap',
    color: '#60a5fa',
    description:
      'Время роста и первых уроков. Обряды взросления и обучение через игры.',
    traditions: [
      { id: 3, name: 'Тұсаукесер', desc: 'Разрезание пут при первых шагах ребёнка.', timing: '8–12 месяцев', gender: null },
      { id: 102, name: 'Тілашар', desc: 'Праздник «открывания языка» — первые слова или школа.', timing: 'Первая речь', gender: null },
      { id: 16, name: 'Сүндет Той', desc: 'Обрезание мальчика. После него — часть мужского сообщества.', timing: '3, 5 или 7 лет', gender: 'male' },
      { id: null, name: 'Асық Ату', desc: 'Игра в асық. Развивает характер и честную конкуренцию.', timing: 'Всё детство', gender: null },
    ],
  },
  {
    id: 'youth',
    title: 'Юность',
    kazakh: 'Жастық',
    ageRange: '13–18',
    iconName: 'Heart',
    color: '#f59e0b',
    description:
      'Время силы и первой любви. Состязания, знакомства, становление личности.',
    traditions: [
      { id: 104, name: 'Мүшел жас', desc: 'Первый мүшел в 13 лет — переход во взрослую жизнь.', timing: '13 лет', gender: null },
      { id: null, name: 'Қыз қuu', desc: 'Романтическая игра «догони девушку» на конях.', timing: 'На праздниках', gender: null },
      { id: 21, name: 'Бастаңғы', desc: 'Молодёжные посиделки, когда старшие в отъезде.', timing: 'Спонтанно', gender: null },
    ],
  },
  {
    id: 'family',
    title: 'Семья',
    kazakh: 'Отбасы',
    ageRange: '18–35',
    iconName: 'Users',
    color: '#22c55e',
    description:
      'Создание рода. Свадебные обряды объединяют две семьи навечно.',
    traditions: [
      { id: 13, name: 'Құдалық', desc: 'Официальное сватовство с подарками и калымом.', timing: 'После согласия', gender: null },
      { id: 14, name: 'Сырға Салу', desc: 'Помолвка — надевание золотых серёжек невесте.', timing: 'При сватовстве', gender: 'female' },
      { id: 2, name: 'Қыз Ұзату', desc: 'Проводы невесты из родного дома с песней «Сыңсу».', timing: 'День свадьбы', gender: 'female' },
      { id: 1, name: 'Беташар', desc: 'Открывание лица невесты. Акын поёт, невеста кланяется.', timing: 'На свадьбе', gender: 'female' },
      { id: 103, name: 'Үйлену той', desc: 'Главный свадебный пир с сотнями гостей.', timing: 'После Қыз Ұзату', gender: null },
    ],
  },
  {
    id: 'maturity',
    title: 'Зрелость',
    kazakh: 'Кемел жас',
    ageRange: '36–60',
    iconName: 'Crown',
    color: '#8b5cf6',
    description:
      'Время мудрости. Человек становится наставником и опорой рода.',
    traditions: [
      { id: 104, name: 'Мүшел жас', desc: 'Каждые 12 лет — время осторожности и переосмысления.', timing: '37, 49 лет', gender: null },
      { id: 6, name: 'Бата беру', desc: 'Право давать благословения молодым.', timing: 'Важные события', gender: null },
    ],
  },
  {
    id: 'elder',
    title: 'Старость',
    kazakh: 'Кәрілік',
    ageRange: '60+',
    iconName: 'BookHeart',
    color: '#0ea5e9',
    description:
      'Почтенный возраст. Аксакал — хранитель памяти и мудрости рода.',
    traditions: [
      { id: 104, name: 'Мүшел жас', desc: 'Юбилейные мүшел — чествование аксакала.', timing: '61, 73 года', gender: null },
      { id: 6, name: 'Бата беру', desc: 'Священное благословение чистого сердца.', timing: 'Важные дела', gender: null },
    ],
  },
  {
    id: 'farewell',
    title: 'Уход',
    kazakh: 'Өту',
    ageRange: '—',
    iconName: 'Flower2',
    color: '#6b7280',
    description:
      'Путь к предкам. Достойные проводы и вечная память.',
    traditions: [
      { id: 105, name: 'Жаназа', desc: 'Погребальная молитва и омовение тела.', timing: 'В день смерти', gender: null },
      { id: 106, name: 'Жоқтау', desc: 'Оплакивание с прощальными песнями.', timing: 'После смерти', gender: null },
      { id: 107, name: 'Ас беру', desc: 'Поминальный пир в память ушедшего.', timing: '7, 40 день, год', gender: null },
    ],
  },
];
