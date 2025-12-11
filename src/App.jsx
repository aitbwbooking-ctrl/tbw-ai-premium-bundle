import { useEffect, useState } from "react";
import { LANGS, T } from "./translations";
import "./App.css";

const HERO_MAP = {
  Zagreb: "/hero-zagreb.jpg",
  Split: "/hero-split.jpg",
  Karlovac: "/hero-karlovac.jpg",
  Zadar: "/hero-zadar.jpg"
};

const CITIES = ["Zagreb", "Split", "Zadar", "Karlovac"];

const CITY_WEATHER_PRESET = {
  Zagreb: { condition: "snow", temp: -1 },
  Split: { condition: "clear", temp: 15 },
  Zadar: { condition: "rain", temp: 10 },
  Karlovac: { condition: "storm", temp: 3 }
};

export default function App() {
  const [lang, setLang] = useState("hr");
  const [mode, setMode] = useState("trial"); // trial | demo | premium
  const [city, setCity] = useState("Zadar");
  const [hero, setHero] = useState(HERO_MAP["Zadar"]);
  const [search, setSearch] = useState("");
  const [activeWindow, setActiveWindow] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const [weather, setWeather] = useState({
    condition: "clear",
    temp: 20
  });

  useEffect(() => {
    const vid = document.getElementById("tbw-intro-video");
    if (!vid) {
      const t = setTimeout(() => setShowIntro(false), 2500);
      return () => clearTimeout(t);
    }
    vid.onended = () => setShowIntro(false);
  }, []);

  useEffect(() => {
    setHero(HERO_MAP[city] || HERO_MAP["Zadar"]);
  }, [city]);

  useEffect(() => {
    const preset = CITY_WEATHER_PRESET[city] || CITY_WEATHER_PRESET["Zadar"];
    setWeather(preset);
  }, [city, mode]);

  const tickerText =
    "Traffic · Weather · Sea · Events · Shops · Airports · TBW AI LIVE · Informational only – always follow official sources.";

  const currentDict = T[lang];

  const handleSearch = () => {
    if (!search.trim()) return;
    if (mode !== "premium") {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(search),
        "_blank"
      );
      return;
    }
    alert("TBW AI premium engine: full synced search for\n\n" + search);
  };

  const handleMic = () => {
    if (mode !== "premium") {
      alert("Voice control is available only in TBW Premium mode.");
      return;
    }
    alert(
      "Premium voice listener (hey TBW...) – ovdje spajaš WebSpeech + backend."
    );
  };

  const openNav = () => {
    if (mode !== "premium") {
      window.open("https://www.google.com/maps/dir/", "_blank");
      return;
    }
    setActiveWindow("navigation");
  };

  const openWindow = (id) => setActiveWindow(id);
  const closeWindow = () => setActiveWindow(null);

  const renderWindowContent = () => {
    if (!activeWindow) return null;

    const isPremium = mode === "premium";

    switch (activeWindow) {
      case "navigation":
        return (
          <>
            <h2>{currentDict.premiumNavTitle}</h2>
            <p className="modal-text">
              {isPremium ? currentDict.premiumNavText : currentDict.freeNavText}
            </p>
            {isPremium && (
              <ul className="modal-list">
                <li>Glasovne upute (hands–free, Bluetooth u autu).</li>
                <li>Live promet, kamere, radovi i alternative rute.</li>
                <li>Truck profil: visine, mase, zabrane i odmor.</li>
                <li>
                  AI suputnik: „hej TBW, vodi me najbrže do aerodroma“.
                </li>
              </ul>
            )}
          </>
        );
      case "weather":
        return (
          <>
            <h2>{currentDict.weatherTitleModal}</h2>
            <p className="modal-text">{currentDict.weatherText}</p>
            <ul className="modal-list">
              <li>Grad: {city}</li>
              <li>Temperatura: {weather.temp}°C (demo)</li>
              <li>Stanje: {weather.condition}</li>
              <li>Vjetar: 12 km/h, umjereno</li>
              <li>More: smireno, kupanje moguće (ovisno o sezoni)</li>
            </ul>
          </>
        );
      case "accommodation":
        return (
          <>
            <h2>{currentDict.accommodation}</h2>
            <p className="modal-text">{currentDict.accommodationText}</p>
            <ul className="modal-list">
              <li>Grad: {city}</li>
              <li>
                Filteri: cijena, lokacija, ocjene, parking, pogled na more.
              </li>
              <li>
                Premium: AI ranking po tvojem profilu (obitelj, posao, solo).
              </li>
            </ul>
            <a
              href={
                "https://www.booking.com/searchresults.html?ss=" +
                encodeURIComponent(city)
              }
              target="_blank"
              rel="noreferrer"
              className="link-out"
            >
              Otvori ponude (Booking.com demo)
            </a>
          </>
        );
      case "traffic":
        return (
          <>
            <h2>{currentDict.traffic}</h2>
            <p className="modal-text">{currentDict.trafficText}</p>
            <ul className="modal-list">
              <li>Grad: {city}</li>
              <li>Prosječna brzina kroz grad: 30–45 km/h.</li>
              <li>Gužve na ulazima i izlazima za vikend.</li>
              <li>Premium: live radari, kamere i upozorenja na ruti.</li>
            </ul>
          </>
        );
      case "events":
        return (
          <>
            <h2>{currentDict.events}</h2>
            <p className="modal-text">{currentDict.eventsText}</p>
            <ul className="modal-list">
              <li>Večeras: koncert na otvorenom u centru {city}.</li>
              <li>Klubovi: rad produžen do 05:00 (ovisno o gradu).</li>
              <li>Obitelj: dječje radionice, izložbe, šetnje.</li>
            </ul>
          </>
        );
      case "shops":
        return (
          <>
            <h2>{currentDict.shops}</h2>
            <p className="modal-text">{currentDict.shopsText}</p>
            <ul className="modal-list">
              <li>Najbliže trgovine: Konzum, Spar, Lidl (primjer).</li>
              <li>Shopping centri: po gradu {city} ili okolici.</li>
              <li>Benzinske: INA, Petrol, Crodux, EV punjači.</li>
            </ul>
          </>
        );
      case "sos":
        return (
          <>
            <h2>{currentDict.sos}</h2>
            <p className="modal-text">{currentDict.sosText}</p>
            <ul className="modal-list">
              <li>112 – EU hitne službe.</li>
              <li>Policija, vatrogasci, hitna pomoć.</li>
              <li>
                ICE kontakti (obitelj, partner, doktor) – pohranjeni lokalno.
              </li>
            </ul>
            <div className="sos-buttons">
              <a href="tel:112" className="btn-sos">
                Call 112
              </a>
              <a href="tel:911" className="btn-sos-secondary">
                Call 911
              </a>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const conditionIcon =
    weather.condition === "snow"
      ? "❄️"
      : weather.condition === "rain"
      ? "🌧"
      : weather.condition === "storm"
      ? "⛈"
      : "☀️";

  return (
    <div className="app-root">
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-inner">
            <video
              id="tbw-intro-video"
              autoPlay
              muted={false}
              className="intro-video"
              src="/intro.mp4"
            />
            <div className="intro-fallback">TBW AI PREMIUM NAVIGATOR</div>
          </div>
        </div>
      )}

      <header className="top-header">
        <div className="header-left">
          <div className="logo-circle">
            <img src="/tbw-logo.png" alt="TBW" />
          </div>
          <div className="brand-text">
            <div className="brand-title">TBW AI PREMIUM NAVIGATOR</div>
            <div className="brand-subtitle">
              Traffic · Weather · Sea · Stays · Safety
            </div>
          </div>
        </div>

        <div className="header-center">
          <div className="weather-pill">
            <span className="weather-icon">{conditionIcon}</span>
            <span className="weather-temp">{weather.temp}°C</span>
            <span className="weather-city">{city}</span>
          </div>
        </div>

        <div className="header-right">
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {Object.entries(LANGS).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <div className="mode-switch">
            <button
              className={`mode-btn ${
                mode === "trial" ? "mode-trial active" : "mode-trial"
              }`}
              onClick={() => setMode("trial")}
            >
              Trial
            </button>
            <button
              className={`mode-btn ${
                mode === "demo" ? "mode-demo active" : "mode-demo"
              }`}
              onClick={() => setMode("demo")}
            >
              Demo
            </button>
            <button
              className={`mode-btn ${
                mode === "premium" ? "mode-premium active" : "mode-premium"
              }`}
              onClick={() => setMode("premium")}
            >
              Premium
            </button>
          </div>
        </div>

        {weather.condition !== "clear" && (
          <div className={`weather-anim weather-${weather.condition}`} />
        )}
      </header>

      <div
        className={`tbw-ticker ${
          mode === "premium" ? "ticker-premium" : "ticker-normal"
        }`}
      >
        <div className="ticker-inner">
          <span>{tickerText}</span>
          <span>{tickerText}</span>
        </div>
      </div>

      <section className="hero-shell">
        <div className="hero" style={{ backgroundImage: `url(${hero})` }}>
          <div className="hero-overlay">
            <div className="hero-top-row">
              <div className="city-label">{currentDict.cityLabel}:</div>
              <div className="city-buttons">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    className={c === city ? "city-btn active" : "city-btn"}
                    onClick={() => setCity(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="search-box">
              <input
                className="search-input"
                placeholder={currentDict.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="button"
                className="search-mic"
                onClick={handleMic}
              >
                🎤
              </button>
              <button
                type="button"
                className="search-btn"
                onClick={handleSearch}
              >
                TBW AI
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="main-scroll">
        <div className="cards-grid">
          <article className="card" onClick={openNav}>
            <h3>{currentDict.navigation}</h3>
            <p>
              {city} · AI copilot · {mode === "premium" ? "full" : "basic"} mode
            </p>
          </article>

          <article
            className="card"
            onClick={() => openWindow("accommodation")}
          >
            <h3>{currentDict.accommodation}</h3>
            <p>{city} · apartmani, hoteli, sobe</p>
          </article>

          <article className="card" onClick={() => openWindow("weather")}>
            <h3>{currentDict.weather}</h3>
            <p>
              {city} · {weather.temp}°C · {weather.condition}
            </p>
          </article>

          <article className="card" onClick={() => openWindow("traffic")}>
            <h3>{currentDict.traffic}</h3>
            <p>{city} · gužve, radovi, nesreće</p>
          </article>

          <article className="card" onClick={() => openWindow("events")}>
            <h3>{currentDict.events}</h3>
            <p>{city} · koncerti, nightlife, događanja</p>
          </article>

          <article className="card" onClick={() => openWindow("shops")}>
            <h3>{currentDict.shops}</h3>
            <p>trgovine, shopping centri, benzinske</p>
          </article>

          <article className="card" onClick={() => openWindow("sos")}>
            <h3>{currentDict.sos}</h3>
            <p>SOS profil, ICE kontakti, 112/911</p>
          </article>
        </div>

        <footer className="tbw-footer">
          TBW AI PREMIUM NAVIGATOR is an informational tool only. It does not
          replace official traffic, weather, maritime or aviation sources.
          Always follow road signs, police instructions and official emergency
          services. All rights reserved.
        </footer>
      </main>

      {activeWindow && (
        <div className="modal-overlay" onClick={closeWindow}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {renderWindowContent()}
            <button className="modal-close" onClick={closeWindow}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
