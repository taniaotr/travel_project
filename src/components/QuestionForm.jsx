import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { FaArrowRight } from "react-icons/fa";
import Select from "react-select";
import countries from "world-countries";
import { City } from "country-state-city";


const countryOptions = countries.map((country) => ({
    value: country.cca2, // Код країни (наприклад, UA, US)
    label: `${country.name.common} (${country.cca2})`, // Назва країни
  }));

const questions = [
    {
      id: 1,
      question: "Який ваш бюджет на подорож?",
      type: "radio",
      options: ["Менше $500", "$500 - $1000", "$1000 - $3000", "Більше $3000"],
    },
    {
    id: 2,
    question: "Скільки триватиме ваша подорож?",
    type: "radio",
    options: ["1-3 дні", "4-7 днів", "8-14 днів", "Більше 14 днів"],
  },
  {
    id: 3,
    question: "Який тип відпочинку Вам цікавий?",
    type: "checkbox",
    options: [
      "🌴 Пляжний",
      "🏙️ Міський (культурний туризм)",
      "🏔️ Гори / активний відпочинок",
      "🌿 Екологічний (природа, сільський туризм)",
      "🎡 Розважальні парки",
      "🍽️ Гастрономічний тур",
    ],
  },
  {
    id: 4,
    question: "Яке ваше місце відправлення? (Оберіть зі списку країн)",
    type: "select", 
  },
  {
    id: 5,
    question: "Чи маєте ви пріоритетні напрямки?",
    type: "radio",
    options: [
      "Так, я хочу відвідати певну країну",
      "Ні, хочу отримати рекомендації",
    ],
  },
  {
    id: 6,
    question: "Який спосіб пересування вам підходить?",
    type: "checkbox",
    options: [
      "✈️ Літак",
      "🚆 Потяг",
      "🚌 Автобус",
      "⛵ Круїз",
      "🚗 Авто (орендоване чи своє)",
    ],
  },
  {
    id: 7,
    question: "Який тип проживання вам підходить?",
    type: "radio",
    options: [
      "🏨 Готель",
      "🏡 Оренда квартир (Airbnb)",
      "⛺ Кемпінг",
      "🛌 Хостел",
      "🚙 Подорож у кемпері",
    ],
  },
  {
    id: 8,
    question: "Чи маєте ви обмеження щодо харчування?",
    type: "radio",
    options: [
      "Немає обмежень",
      "Вегетаріанське харчування",
      "Веганське харчування",
      "Безглютенове харчування",
    ],
  },
  {
    id: 9,
    question: "Які активності вас цікавлять?",
    type: "checkbox",
    options: [
      "🎨 Музеї, виставки, історичні місця",
      "🏄‍♂️ Водні види спорту",
      "🎭 Театри, концерти, фестивалі",
      "🏕️ Піші походи, екотуризм",
      "🛍️ Шопінг",
      "🍷 Дегустації вин/локальної їжі",
      "🏎️ Екстремальні розваги (парашутний спорт, автогонки)",
    ],
  },
  {
    id: 10,
    question: "Чи подорожуєте ви з дітьми?",
    type: "radio",
    options: [
      "Так",
      "Ні"
    ],
  },
  {
    id: 11,
    question: "Який рівень комфорту вам потрібен?",
    type: "radio",
    options: [
      "💰 Бюджетний",
      "💎 Комфортний",
      "👑 Люкс"
    ],
  },
  {
    id: 12,
    question: "Чи потрібно враховувати сезонність і погоду?",
    type: "radio",
    options: [
      "Так, хочу уникати сезонів дощів",
      "Ні, мені не важливо"
    ],
  },
  {
    question: "Чи хочете включити у маршрут місцеві свята та події?",
    type: "radio",
    options: [
      "Так",
      "Ні"
    ],
  },
      
];
  

const QuestionForm = () => {
  const [step, setStep] = useState(0);
  const [cityOptions, setCityOptions] = useState([]);
  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  

  const handleNext = () => {
    if (questions[step].id === 5) {
        if (answers[5] === "Так, я хочу відвідати певну країну") {
            if (!answers[6]) return; // Не даємо перейти, якщо не обрали країну
            if (cityOptions.length > 0 && !answers[7]) return; // Якщо є міста, місто теж обов'язкове
        }
    }

    // Очищуємо країну та місто після переходу на наступне питання (щоб не рендерилось далі)
    if (questions[step].id === 5) {
        setAnswers((prev) => ({
            ...prev,
            6: "",
            7: "",
        }));
    }

    setStep(step + 1); // Переходимо до наступного питання
};

  const handleSelect = (option) => {
    const currentQuestion = questions[step];

    if (currentQuestion.type === "checkbox") {
        setAnswers((prev) => {
            const prevAnswers = prev[currentQuestion.id] || [];
            return {
                ...prev,
                [currentQuestion.id]: prevAnswers.includes(option)
                    ? prevAnswers.filter((item) => item !== option) // Видалення вибору
                    : [...prevAnswers, option], // Додавання вибору
            };
        });
    } else {
        let newAnswers = { ...answers, [currentQuestion.id]: option };

        // Якщо змінюється відповідь на "Ні" в 5-му питанні → видаляємо вибір країни та міста
        if (currentQuestion.id === 5 && option === "Ні, хочу отримати рекомендації") {
            newAnswers[6] = ""; // Видаляємо країну
            newAnswers[7] = ""; // Видаляємо місто
            setCityOptions([]); // Очищаємо список міст
        }

        setAnswers(newAnswers);
    }
};

const handleSelectCountry = (selectedOption) => {
    setAnswers((prev) => ({
        ...prev,
        6: selectedOption.value, // Зберігаємо вибір країни
        7: "", // Очищаємо місто при зміні країни
    }));

    // Отримуємо список міст для вибраної країни
    const cities = City.getCitiesOfCountry(selectedOption.value)?.map((city) => ({
        value: city.name,
        label: city.name,
    })) || [];

    setCityOptions(cities); // Оновлюємо список міст
};

const handleSelectCity = (selectedOption) => {
    setAnswers((prev) => ({
        ...prev,
        7: selectedOption.value, // Зберігаємо вибір міста
    }));
};

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Прогрес-бар */}
      <ProgressBar step={step} totalSteps={questions.length} />

      {/* Питання */}
      <h2 className="text-2xl font-bold mb-4">{questions[step].question}</h2>
      <p className="text-sm text-gray-400 mb-4">
        {questions[step].type === "checkbox"
            ? "*можна вибрати кілька варіантів"
            : "*оберіть лише одну відповідь"}
        </p>
        <div className="grid grid-cols-2 gap-4">
            {questions[step].type === "select" ? ( // Якщо це питання з випадаючим списком
                <Select
                options={countryOptions}
                className="w-full"
                placeholder="Оберіть країну..."
                value={countryOptions.find(option => option.value === answers[questions[step].id])}
                onChange={(selectedOption) => setAnswers({ ...answers, [questions[step].id]: selectedOption.value })}
                isSearchable={true} // Автофільтр
                noOptionsMessage={() => "Країну не знайдено"} // Текст, якщо нічого не знайдено
            />  
            ) : (
                // Рендеримо варіанти для radio/checkbox
                questions[step].options.map((option, index) => (
                <label key={index} className="btn btn-outline flex items-center justify-start text-left w-full h-15 px-5 gap-2">
                    <input
                    type={questions[step].type === "radio" ? "radio" : "checkbox"}
                    name={`question-${questions[step].id}`}
                    className="w-5 h-5"
                    checked={answers[questions[step].id]?.includes(option)}
                    onChange={() => handleSelect(option)}
                    />
                    {option}
                </label>
                ))
            )}
        </div>

{/* Вибір країни та міста (відображається тільки на 5-му питанні) */}
{questions[step].id === 5 && answers[5] === "Так, я хочу відвідати певну країну" && (
  <>
    <Select
      options={countryOptions}
      className="w-full mt-4"
      placeholder="Оберіть країну для подорожі..."
      value={countryOptions.find(option => option.value === answers[6])}
      onChange={handleSelectCountry}
      isSearchable={true}
    />

    {/* Вибір міста (з'являється після вибору країни) */}
    {answers[6] && cityOptions.length > 0 && (
      <Select
        options={cityOptions}
        className="w-full mt-4"
        placeholder="Оберіть місто (якщо є пріоритет)..."
        value={cityOptions.find(option => option.value === answers[7])}
        onChange={handleSelectCity}
        isSearchable={true}
        noOptionsMessage={() => "Місто не знайдено"}
      />
    )}
  </>
)}

      {/* Кнопка "Далі" */}
      <button
        onClick={handleNext}
        className="btn btn-primary text-white mt-6 flex items-center"
        disabled={!answers[questions[step].id]}
      >
        Далі <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default QuestionForm;
