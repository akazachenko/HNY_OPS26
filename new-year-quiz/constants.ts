import { Question, ResultMessage } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Новогодний напиток для самых рисковых коллег?",
    icon: "fa-glass-cheers",
    backgroundImage: "https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?q=80&w=2000&auto=format&fit=crop", // Champagne
    options: [
      { id: "a", text: "Зеленый чай" },
      { id: "b", text: "Шампанское" },
      { id: "c", text: "Эспрессо в 18:00" },
      { id: "d", text: "Вода из кулера" }
    ],
    correctOptionId: "b"
  },
  {
    id: 2,
    text: "Какой город считается официальной родиной Деда Мороза в России?",
    icon: "fa-map-location-dot",
    backgroundImage: "https://images.unsplash.com/photo-1548268770-6644eb281138?q=80&w=2000&auto=format&fit=crop", // Winter Forest/Town
    options: [
      { id: "a", text: "Сочи" },
      { id: "b", text: "Москва-Сити" },
      { id: "c", text: "Великий Устюг" },
      { id: "d", text: "Иннополис" }
    ],
    correctOptionId: "c"
  },
  {
    id: 3,
    text: "Какое качество новогодней елки роднит ее с каждой настоящей женщиной?",
    icon: "fa-tree",
    backgroundImage: "https://images.unsplash.com/photo-1576919228236-a097c32a58be?q=80&w=2000&auto=format&fit=crop", // Decorated Tree
    options: [
      { id: "a", text: "Колючий характер" },
      { id: "b", text: "Стремление наряжаться" },
      { id: "c", text: "Любовь к воде" },
      { id: "d", text: "Занимает много места" }
    ],
    correctOptionId: "b"
  },
  {
    id: 4,
    text: "Результат праздничной зажигательности?",
    icon: "fa-fire",
    backgroundImage: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?q=80&w=2000&auto=format&fit=crop", // Fireworks
    options: [
      { id: "a", text: "Годовой отчет" },
      { id: "b", text: "Баг на проде" },
      { id: "c", text: "Фейерверк" },
      { id: "d", text: "Премия" }
    ],
    correctOptionId: "c"
  },
  {
    id: 5,
    text: "Шуточное прозвище Деда Мороза?",
    icon: "fa-santa-hat",
    backgroundImage: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop", // Santa
    options: [
      { id: "a", text: "Красный нос" },
      { id: "b", text: "Синий экран" },
      { id: "c", text: "Сеньор Фрост" },
      { id: "d", text: "Дед Дедлайн" }
    ],
    correctOptionId: "a"
  },
  {
    id: 6,
    text: "Что общего между новогодней гирляндой и кодом?",
    icon: "fa-code",
    backgroundImage: "https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?q=80&w=2000&auto=format&fit=crop", // Lights
    options: [
      { id: "a", text: "Они светятся" },
      { id: "b", text: "Один перегорел — всё не работает" },
      { id: "c", text: "Стоят дорого" },
      { id: "d", text: "Нужно поливать" }
    ],
    correctOptionId: "b"
  },
  {
    id: 7,
    text: "Главное правило 1-го января?",
    icon: "fa-bed",
    backgroundImage: "https://images.unsplash.com/photo-1517865288-ac358b16c682?q=80&w=2000&auto=format&fit=crop", // Cozy/Relax
    options: [
      { id: "a", text: "Проверить почту" },
      { id: "b", text: "Сделать коммит" },
      { id: "c", text: "Доесть салаты" },
      { id: "d", text: "Написать боссу" }
    ],
    correctOptionId: "c"
  }
];

export const RESULTS: ResultMessage[] = [
  {
    minScore: 0,
    title: "Трудоголик года!",
    message: "Видимо, ты слишком много работал и мало отдыхал! Пора выдохнуть, закрыть жиру и взять мандаринку."
  },
  {
    minScore: 3,
    title: "Новогодний Любитель",
    message: "Ты был хорошим коллегой, но иногда спал на созвонах. К празднику готов, но мандаринов нужно больше!"
  },
  {
    minScore: 6,
    title: "Новогодний Экстрасенс!",
    message: "Ты настоящий гуру праздников! Знаешь всё о елке, Деде Морозе и правильном отдыхе. Команда гордится тобой!"
  }
];
