import { useMemo, useRef, useState } from 'react';
import { profile } from '../data';
import { ROOMS, METRICS, buildSeries, breached } from '../telemetry';

const W = 600;
const H = 186;
const PAD = { top: 14, right: 10, bottom: 30, left: 10 };

const TelemetryPanel = () => {
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [metricId, setMetricId] = useState('dp');
  const [excursion, setExcursion] = useState(false);
  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);

  const room = ROOMS.find((r) => r.id === roomId);
  const metric = METRICS.find((m) => m.id === metricId);

  const series = useMemo(
    () => buildSeries(metric, room.seed, excursion),
    [metric, room.seed, excursion]
  );

  const { path, area, points, min, max } = useMemo(() => {
    const values = series.map((p) => p.value);
    // Keep the spec floor in frame so a breach reads as crossing a line, not
    // as the series simply running off the bottom of the chart.
    const lo = Math.min(...values, metric.floor) - metric.swing;
    const hi = Math.max(...values, metric.floor + metric.swing) + metric.swing;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;

    const pts = series.map((p, i) => ({
      ...p,
      x: PAD.left + (i / (series.length - 1)) * innerW,
      y: PAD.top + (1 - (p.value - lo) / (hi - lo)) * innerH,
    }));

    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const baseline = PAD.top + innerH;
    return {
      path: d,
      area: `${d} L${pts[pts.length - 1].x.toFixed(1)},${baseline} L${pts[0].x.toFixed(1)},${baseline} Z`,
      points: pts,
      min: lo,
      max: hi,
    };
  }, [series, metric]);

  const floorY =
    PAD.top + (1 - (metric.floor - min) / (max - min)) * (H - PAD.top - PAD.bottom);

  const isBreached = breached(series, metric);
  const latest = series[series.length - 1];
  const active = hover !== null ? points[hover] : points[points.length - 1];

  const onMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const rel = ((e.clientX - rect.left) / rect.width) * W;
    const innerW = W - PAD.left - PAD.right;
    const idx = Math.round(((rel - PAD.left) / innerW) * (points.length - 1));
    setHover(Math.max(0, Math.min(points.length - 1, idx)));
  };

  const fmt = (v) => v.toFixed(metric.decimals);

  return (
    <div className="panel">
      <div className="panel__bar">
        <span className="panel__title">
          <span className={"dot dot--live"} style={isBreached ? { background: 'var(--bad)' } : undefined} />
          Cleanroom // Live Telemetry
        </span>
        <select
          className="panel__select"
          value={roomId}
          onChange={(e) => { setRoomId(e.target.value); setHover(null); }}
          aria-label="Select monitored room"
        >
          {ROOMS.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </div>

      <div className="panel__chart">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${metric.name} for ${room.label} over the last 24 hours`}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* horizontal guides */}
          {[0, 0.5, 1].map((t) => {
            const y = PAD.top + t * (H - PAD.top - PAD.bottom);
            return <line key={t} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="var(--line)" strokeWidth="1" />;
          })}

          {/* ISO specification floor */}
          <line
            x1={PAD.left} y1={floorY} x2={W - PAD.right} y2={floorY}
            stroke={isBreached ? 'var(--bad)' : 'var(--line-strong)'}
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <text x={W - PAD.right} y={floorY - 5} textAnchor="end" className="axis-label" style={{ fill: isBreached ? 'var(--bad)' : 'var(--text-3)' }}>
            ISO limit {fmt(metric.floor)}{metric.unit}
          </text>

          <path d={area} fill="url(#fill)" />
          <path d={path} fill="none" stroke="var(--signal)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />

          {hover !== null && (
            <line x1={active.x} y1={PAD.top} x2={active.x} y2={H - PAD.bottom} stroke="var(--line-strong)" strokeWidth="1" />
          )}
          <circle cx={active.x} cy={active.y} r="3" fill="var(--bg)" stroke="var(--signal)" strokeWidth="1.6" />

          {/* time axis */}
          {[0, 12, 24, 36, 47].map((i) => (
            <text key={i} x={points[i].x} y={H - 10} textAnchor="middle" className="axis-label">
              {points[i].label}
            </text>
          ))}
        </svg>

        {hover !== null && (
          <div className="tip" style={{ left: `${(active.x / W) * 100}%`, top: `${(active.y / H) * 100}%` }}>
            <div className="tip__v">{fmt(active.value)}<span style={{ fontSize: '0.7em', marginLeft: 2 }}>{metric.unit}</span></div>
            <div className="tip__u">{active.label} · {metric.label}</div>
          </div>
        )}
      </div>

      <div className="panel__controls">
        <div className="seg">
          <span className="seg__label">Metric:</span>
          <div className="seg__btns">
            {METRICS.map((m) => (
              <button
                key={m.id}
                className={`seg__btn${m.id === metricId ? ' seg__btn--on' : ''}`}
                onClick={() => { setMetricId(m.id); setHover(null); }}
                aria-pressed={m.id === metricId}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`switch${excursion ? ' switch--on' : ''}`}
          onClick={() => setExcursion((v) => !v)}
          aria-pressed={excursion}
        >
          <span className="switch__track"><span className="switch__thumb" /></span>
          <span className="seg__label">Simulate door excursion</span>
        </button>
      </div>

      <dl className="panel__stats">
        <div className="panel__stat">
          <dt>Current</dt>
          <dd>{fmt(latest.value)} {metric.unit}</dd>
        </div>
        <div className="panel__stat">
          <dt>ISO state</dt>
          <dd style={{ color: isBreached ? 'var(--bad)' : 'var(--ok)' }}>
            {isBreached ? 'Excursion' : 'In spec'}
          </dd>
        </div>
        <div className="panel__stat">
          <dt>Ingest</dt>
          <dd>Lambda → SQS</dd>
        </div>
        <div className="panel__stat">
          <dt>Readings</dt>
          <dd>48 / 24h</dd>
        </div>
      </dl>
    </div>
  );
};

const Hero = () => (
  <header className="hero" id="top">
    <div className="wrap hero__grid">
      <div>
        <p className="hero__name">{profile.name}</p>
        <h1 className="h1 hero__title">Software Engineer.</h1>
        <p className="hero__sub">I build systems that have to stay right when nobody is watching.</p>
        <p className="hero__blurb">
          Telemetry pipelines, contract-first APIs and AI features for a compliance
          platform where a missed reading is an audit finding, not a bug ticket.
        </p>

        <div className="hero__cta">
          <a href="#work" className="btn btn--primary">
            See the work <span className="btn__arrow">→</span>
          </a>
          <button className="btn" onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}>
            Ask about my background
          </button>
        </div>

        <div className="hero__social">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-mono">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-mono">GitHub ↗</a>
          <a href={`mailto:${profile.email}`} className="link-mono">Email ↗</a>
          <a href="/resume.pdf" download="Jahnavi_Nalla_Resume.pdf" className="link-mono">Résumé ↓</a>
        </div>
      </div>

      <div>
        <TelemetryPanel />
        <p className="hero__caption">
          Live interactive panel · hover to inspect a reading, switch metric or
          simulate an out-of-spec excursion
        </p>
      </div>
    </div>
  </header>
);

export default Hero;
