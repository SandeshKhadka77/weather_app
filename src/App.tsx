import Header from './components/Header'

function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Weather dashboard</p>
          <h1 id="page-title">Know your weather before you step outside.</h1>
          <p className="intro-text">
            Search for a city to see current conditions and a five-day forecast.
          </p>
        </section>

        <section className="empty-state" aria-live="polite">
          <span className="empty-state-icon" aria-hidden="true">
            +
          </span>
          <h2>No city selected</h2>
          <p>Weather details will appear here once you search.</p>
        </section>
      </main>
    </div>
  )
}

export default App
