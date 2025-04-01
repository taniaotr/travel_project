const ResultBox = (props) => {
  const { data } = props;
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