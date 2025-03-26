const data = {
    "destination": {
      "country": "Італія",
      "cities": ["Рим", "Неаполь", "Помпеї"],
      "description": "Літня Італія — чудове поєднання пляжного відпочинку, культурних вражень та гастрономії. У серпні погода сонячна і тепла (30–33°C), тож подорож адаптована до температурного комфорту."
    },
    "accommodation": [
      {
        "city": "Рим",
        "name": "Hotel Bella Vita",
        "type": "3★ готель",
        "features": ["Сніданок включено", "Кондиціонер", "Веганські опції", "Центр міста"],
        "estimatedPricePerNight": 90
      },
      {
        "city": "Неаполь",
        "name": "Casa Mare Guesthouse",
        "type": "Гостьовий будинок",
        "features": ["Поруч з пляжем", "Кондиціонер", "Сімейна атмосфера"],
        "estimatedPricePerNight": 75
      }
    ],
    "foodRecommendations": [
      {
        "name": "Olio Verde Bistro",
        "location": "Рим",
        "type": "Веганський ресторан",
        "highlight": "Веганська паста з трюфелем та локальні вина",
        "averagePrice": 20
      },
      {
        "name": "Vegan Napoli",
        "location": "Неаполь",
        "type": "Кафе",
        "highlight": "Веганська піца маринара та джелато без лактози",
        "averagePrice": 15
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Прибуття до Риму",
        "activities": [
          "Приліт з України",
          "Заселення в готель Hotel Bella Vita",
          "Прогулянка історичним центром (Пантеон, П’яцца Навона)",
          "Вечеря в Olio Verde Bistro"
        ]
      },
      {
        "day": 2,
        "title": "Культурний день у Римі",
        "activities": [
          "Відвідини Колізею",
          "Музеї Ватикану (зранку, щоб уникнути спеки)",
          "Вечір у Трастевере з дегустацією вина"
        ]
      },
      {
        "day": 3,
        "title": "Переїзд до Неаполя",
        "activities": [
          "Ранковий поїзд до Неаполя",
          "Відпочинок на пляжі",
          "Обід у Vegan Napoli",
          "Участь у музичному фестивалі на площі"
        ]
      },
      {
        "day": 4,
        "title": "Історична подорож",
        "activities": [
          "Поїздка до Помпеї",
          "Вечірній шопінг на Віа Толедо",
          "Фруктовий сорбет у вуличному кафе"
        ]
      },
      {
        "day": 5,
        "title": "Гастрономія та море",
        "activities": [
          "Прогулянка на човні по затоці",
          "Відвідини ринку та дегустація вуличної їжі",
          "Театральна вистава просто неба"
        ]
      },
      {
        "day": 6,
        "title": "Повернення",
        "activities": [
          "Потяг до Риму",
          "Сніданок у веганському кафе",
          "Виліт до України"
        ]
      }
    ],
    "events": [
      {
        "name": "Estate a Napoli",
        "type": "Музичний фестиваль",
        "location": "Неаполь",
        "day": 3
      },
      {
        "name": "Teatro all'aperto",
        "type": "Вистава просто неба",
        "location": "Неаполь",
        "day": 5
      }
    ],
    "summary": "Ця подорож подарує тобі баланс між історією, гастрономією та морем. Рим і Неаполь відкриють свою атмосферу — від класики до сучасного життя. Бюджет витримано, температура врахована, емоції — гарантовані! 🇮🇹✨",
    "totalBudgetEstimate": 900
  }
  

const ResultBox = () => {
        if (!data) return null;

  const {
    destination,
    accommodation,
    foodRecommendations,
    itinerary,
    events,
    summary,
    totalBudgetEstimate,
  } = data;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto text-gray-800 mt-4 mb-8">
      {/* Основна інформація */}
      <h2 className="text-3xl font-bold mb-2">🌍 Подорож до {destination.country}</h2>
      <p className="text-lg italic mb-4">{destination.description}</p>

      {/* Міста */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">📍 Міста подорожі</h3>
        <ul className="list-disc list-inside">
          {destination.cities.map((city, i) => (
            <li key={i}>{city}</li>
          ))}
        </ul>
      </div>

      {/* Проживання */}
      {accommodation?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">🏨 Рекомендоване проживання</h3>
          {accommodation.map((place, i) => (
            <div key={i} className="mb-3 border p-4 rounded-lg">
              <p className="font-bold">{place.name} ({place.city})</p>
              <p className="text-sm text-gray-600">{place.type}</p>
              <ul className="list-disc list-inside text-sm mt-1">
                {place.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <p className="text-sm mt-1">💸 ≈ ${place.estimatedPricePerNight}/ніч</p>
            </div>
          ))}
        </div>
      )}

      {/* Заклади харчування */}
      {foodRecommendations?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">🍽️ Ресторани та кафе</h3>
          {foodRecommendations.map((place, i) => (
            <div key={i} className="mb-3 border p-4 rounded-lg">
              <p className="font-bold">{place.name} ({place.location})</p>
              <p className="text-sm">{place.type}</p>
              <p className="text-sm italic">🔥 {place.highlight}</p>
              <p className="text-sm mt-1">💰 Середній чек: ${place.averagePrice}</p>
            </div>
          ))}
        </div>
      )}

      {/* Маршрут по днях */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">📅 Маршрут подорожі</h3>
        <ul className="timeline timeline-snap-icon timeline-vertical">
            {itinerary.map((day, idx) => (
                <li key={day.day}>
                    {idx !== 0 && <hr />}
                    <div className="timeline-middle">
                        <span className="bg-base-content text-white rounded-full w-8 h-8 flex items-center justify-center">{idx+1}</span>
                    </div>
                    <div className={`${idx % 2 === 0 ? "timeline-start text-end" : "timeline-end"} mb-10`}>
                        <h4 className="font-bold text-lg mt-1">День {day.day}: {day.title}</h4>
                        <ul className="list-disc list-inside ml-4 text-sm">
                        {day.activities.map((act, i) => (
                            <li key={i}>{act}</li>
                        ))}
                        </ul>
                    </div>
                    {idx !== itinerary.length - 1 && <hr />}
                </li>
            ))}
        </ul>
      </div>

      {/* Події */}
      {events?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">🎉 Місцеві події</h3>
          <ul className="list-disc list-inside ml-4 text-sm">
            {events.map((e, i) => (
              <li key={i}>
                {e.name} ({e.type}) — {e.location}, День {e.day}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Підсумок */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">📌 Загальний бюджет</h3>
        <p className="text-sm mb-4">💰 Орієнтовно: <strong>${totalBudgetEstimate}</strong></p>

        <h3 className="text-xl font-semibold mb-2">💫 Підсумок подорожі</h3>
        <p className="text-base">{summary}</p>
      </div>
    </div>
  );    
}

export default ResultBox;