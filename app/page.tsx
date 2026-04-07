import StrategyGraph from '../components/StrategyGraph';

export default function HomePage() {
  return (
    <main>
      <section className="panel">
        <h1 className="title">Huadu Strategy Map</h1>
        <p className="subtitle">Zoom, pan, drag nodes to explore strategy relationships.</p>
        <StrategyGraph />
      </section>
    </main>
  );
}
