import {
  BufferAttribute, BufferGeometry, Color, Fog, Line, LineBasicMaterial,
  PerspectiveCamera, Scene, WebGLRenderer,
} from "three";

/**
 * Hero backdrop: a 3D spectrum waterfall of a slow techno bassline.
 * x = log frequency (lows on the right, clear of the headline), z = time (newest rows at the front, drifting back).
 * Each bass note shows its harmonic series; off-beat hi-hats flare up in the highs.
 * With reduced motion it renders one still frame. It pauses while the hero is off screen.
 */
export function startWaterfall(canvas: HTMLCanvasElement, hero: HTMLElement) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.fog = new Fog(0x0a0a0b, 8, 30);
  const camera = new PerspectiveCamera(42, 1, 0.1, 60);

  const ROWS = 60, COLS = 180, WIDTH = 26, Z0 = -20, Z1 = -1, SPACING = (Z1 - Z0) / (ROWS - 1);
  const ROW_DT = 0.16;        // seconds of "song" per row
  const SONG_RATE = 0.45;     // song seconds per real second: slow drift
  const NOTE_LEN = 1.2;       // seconds per bass note
  const BASS = [0, 0, 7, 5, 3, 0, 10, 7];
  const F0 = 55, HARM = 24;
  const WARMTH = 0.45;        // fixed colour: how strong the even harmonics are
  const xOfFreq = (f: number) => 0.75 - Math.log10(f / 40) * 0.9;

  const silver = new Color(0x6e6e74), red = new Color(0xe30613), tmp = new Color();
  const rows: { g: BufferGeometry; pos: Float32Array; col: Float32Array; mat: LineBasicMaterial }[] = [];
  for (let j = 0; j < ROWS; j++) {
    const g = new BufferGeometry();
    const pos = new Float32Array(COLS * 3), col = new Float32Array(COLS * 3);
    for (let i = 0; i < COLS; i++) pos[i * 3] = (i / (COLS - 1) - 0.5) * WIDTH;
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("color", new BufferAttribute(col, 3));
    const mat = new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 });
    scene.add(new Line(g, mat));
    rows.push({ g, pos, col, mat });
  }

  // Oscilloscope trace on the horizon: the current note's waveform, gently soft-clipped.
  const WAVE_N = 500;
  const waveGeo = new BufferGeometry();
  const wavePos = new Float32Array(WAVE_N * 3);
  for (let i = 0; i < WAVE_N; i++) { wavePos[i * 3] = (i / (WAVE_N - 1) - 0.5) * WIDTH * 1.3; wavePos[i * 3 + 2] = -17; }
  waveGeo.setAttribute("position", new BufferAttribute(wavePos, 3));
  scene.add(new Line(waveGeo, new LineBasicMaterial({ color: 0xe30613, transparent: true, opacity: 0.6 })));

  const noteAt = (tau: number) => {
    const n = Math.floor(tau / NOTE_LEN);
    const step = BASS[((n % BASS.length) + BASS.length) % BASS.length];
    return { f0: F0 * 2 ** (step / 12), p: tau / NOTE_LEN - n };
  };
  const harmAmp = (k: number) => (k % 2 === 0 ? 0.25 + WARMTH * 1.4 : 1) / Math.pow(k, 0.9);
  const buf = new Float32Array(COLS);
  const spectrum = (tau: number) => {
    const { f0, p } = noteAt(tau);
    const env = Math.exp(-p * 1.6) * 0.85 + 0.15;
    const half = NOTE_LEN / 2;
    const hat = Math.floor(tau / half) % 2 ? Math.exp(-((tau % half) / half) * 6) : 0;
    for (let i = 0; i < COLS; i++) {
      const x = (i / (COLS - 1)) * 2 - 1;
      let h = 0.05 + 0.03 * (1 + x);                     // noise floor, tilted toward the lows
      for (let k = 1; k <= HARM; k++) {
        const d = (x - xOfFreq(k * f0)) / 0.03;
        if (d > -4 && d < 4) h += harmAmp(k) * env * Math.exp(-d * d);
      }
      const dh = (x + 0.8) / 0.16;
      h += 0.32 * hat * Math.exp(-dh * dh);               // hats
      buf[i] = h;
    }
  };

  const mouse = { x: 0, y: 0 };
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  });

  const amp = 1.8 + WARMTH * 2.4;
  const frame = (t: number) => {
    const song = 100 + (t / 1000) * SONG_RATE;            // offset keeps every row's time positive
    const base = Math.floor(song / ROW_DT), frac = song / ROW_DT - base;
    for (let j = 0; j < ROWS; j++) {
      const r = rows[j], age = ROWS - 1 - j;              // j = ROWS - 1 is the newest row
      spectrum((base - age) * ROW_DT);
      const z = Z1 - (age + frac) * SPACING;
      r.mat.opacity = j === ROWS - 1 ? 0.9 * frac : 0.9;
      for (let i = 0; i < COLS; i++) {
        const h = buf[i];
        r.pos[i * 3 + 1] = h * amp;
        r.pos[i * 3 + 2] = z;
        tmp.copy(silver).lerp(red, Math.min(1, Math.max(0, (h - 0.35) * 2.2)));
        r.col[i * 3] = tmp.r; r.col[i * 3 + 1] = tmp.g; r.col[i * 3 + 2] = tmp.b;
      }
      r.g.attributes.position.needsUpdate = true;
      r.g.attributes.color.needsUpdate = true;
    }
    const { f0, p } = noteAt(song);
    const env = Math.exp(-p * 1.6) * 0.85 + 0.15, cycles = (9 * f0) / F0, drift = (t / 1000) * 0.25;
    for (let i = 0; i < WAVE_N; i++) {
      const ph = (i / (WAVE_N - 1)) * cycles * Math.PI * 2 + drift;
      let y = 0;
      for (let k = 1; k <= 6; k++) y += harmAmp(k) * Math.sin(k * ph);
      wavePos[i * 3 + 1] = 1.9 + Math.tanh(y * (0.8 + WARMTH * 1.5)) * 0.45 * env;
    }
    waveGeo.attributes.position.needsUpdate = true;
    camera.position.x += (mouse.x * 1.6 + 3 - camera.position.x) * 0.04;
    camera.position.y += (4.6 - mouse.y * 0.8 - camera.position.y) * 0.04;
    camera.position.z = 7;
    camera.lookAt(2.5, 0.6, -9);
    renderer.render(scene, camera);
  };

  const resize = () => {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (reduce) frame(4000);
  };
  new ResizeObserver(resize).observe(hero);
  resize();
  if (reduce) return;

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
  const loop = (t: number) => { if (visible) frame(t); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}
