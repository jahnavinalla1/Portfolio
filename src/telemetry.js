// Synthetic-but-plausible cleanroom telemetry for the hero panel. Mirrors the
// kind of series the ingestion pipeline at Arrant streams through Lambda/SQS
// into DynamoDB: one reading per 30 minutes across a 24-hour window.

export const ROOMS = [
  { id: 'iso7-fill-a', label: 'ISO-7 · Fill Suite A', seed: 11 },
  { id: 'iso8-gowning', label: 'ISO-8 · Gowning Airlock', seed: 27 },
  { id: 'iso5-aseptic', label: 'ISO-5 · Aseptic Core', seed: 43 },
];

export const METRICS = [
  {
    id: 'dp',
    label: 'ΔP',
    name: 'Differential pressure',
    unit: 'Pa',
    base: 15.2,
    swing: 0.9,
    decimals: 1,
    // ISO 14644 style: the room must stay positive against the next grade down.
    floor: 10,
    ceiling: 20,
  },
  {
    id: 'temp',
    label: 'TEMP',
    name: 'Temperature',
    unit: '°C',
    base: 20.4,
    swing: 0.45,
    decimals: 1,
    floor: 19,
    ceiling: 23,
  },
  {
    id: 'rh',
    label: 'RH',
    name: 'Relative humidity',
    unit: '%',
    base: 45,
    swing: 2.6,
    decimals: 0,
    floor: 30,
    ceiling: 60,
  },
];

const POINTS = 48;

// Deterministic pseudo-noise so the chart is stable across re-renders.
const noise = (n) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x) - 0.5;
};

export function buildSeries(metric, roomSeed, excursion) {
  const out = [];
  for (let i = 0; i < POINTS; i++) {
    const seed = roomSeed * 100 + i + metric.base;
    // Slow diurnal drift plus sensor-level jitter.
    const drift = Math.sin((i / POINTS) * Math.PI * 2 + roomSeed) * metric.swing * 0.55;
    const jitter = noise(seed) * metric.swing;
    let value = metric.base + drift + jitter;

    // A door held open during a material transfer: pressure collapses toward
    // the floor and humidity climbs before recovery.
    if (excursion && i >= 33 && i <= 41) {
      const depth = 1 - Math.abs(i - 37) / 5;
      if (metric.id === 'dp') value -= depth * 6.6;
      if (metric.id === 'rh') value += depth * 13;
      if (metric.id === 'temp') value += depth * 1.9;
    }

    out.push({ i, value, label: timeLabel(i) });
  }
  return out;
}

function timeLabel(i) {
  const mins = i * 30;
  const h = String(Math.floor(mins / 60)).padStart(2, '0');
  const m = String(mins % 60).padStart(2, '0');
  return `${h}:${m}`;
}

export const breached = (series, metric) =>
  series.some((p) => p.value < metric.floor || p.value > metric.ceiling);
