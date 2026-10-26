// Renders the visitor's preview bag to an image (JPEG: it is fully opaque) they can keep or forward on WhatsApp.
// Same object as the page, scaled from the hero bag (620 px wide) to 800 px:
// back ply, film panel with 3/3/6/6 corners, welded reinforcement patch, a handle
// punched clean through (the factory shows through it, as in the hero), side
// seals, ribbed bottom seal, grain, and the name in two plates (an off-register
// blue ghost under the ink).
import logoClear from '@/assets/v2/logo-clear.png';
import logoInv from '@/assets/v2/logo-inv.png';

const W = 1080;
const H = 1350;
const GROUND = '#0f1b3d';
const HERO_SRC = '/images/hero.webp';
const SHARE_TEXT = 'اسم محلنا على شنطة البركة بلاست';
const FILE_DL = 'شنطتي-البركة-بلاست.jpg';
const FILE_SHARE = 'baraka-plast-bag.jpg';
/* the image is fully opaque, so JPEG loses nothing visible; at .9 the film grain stays
   (as PNG the per-pixel grain made the file ~1.6 MB) */
const MIME = 'image/jpeg';
const QUALITY = 0.9;

/* geometry: bag = 74% of the canvas width, hero proportions × S */
const BW = 800;
const BH = 1000;
const BX = (W - BW) / 2;
const BY = 66;
const S = BW / 620;
const SLOT_W = Math.round(188 * S);
const SLOT_H = Math.round(56 * S);
const SLOT_TOP = Math.round(40 * S);
const SX = W / 2 - SLOT_W / 2;
const SY = BY + SLOT_TOP;
const R_TOP = 3 * S;
const R_BOT = 6 * S;

/** The factory crop the hero shows through its handle: hero.webp (1536 px) drawn
 *  at 1100 px, offset −122/−188, behind a 196×64 window → centre (307, 307), 274 px wide. */
const CROP = { cx: 307, cy: 307, w: 274, natural: 1536 };

// Logo by ground contrast: the white-and-orange mark on a dark ground, the navy one on a light ground.
const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
};
const LOGO_SRC = luminance(GROUND) < 0.4 ? logoInv : logoClear;

type Assets = { photo: HTMLImageElement | null; logo: HTMLImageElement | null };

const timeout = <T>(p: Promise<T>, ms: number, fallback: T) =>
  Promise.race([p, new Promise<T>((res) => window.setTimeout(() => res(fallback), ms))]);

const loadImg = (src: string) =>
  timeout(
    new Promise<HTMLImageElement | null>((res) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = src;
    }),
    5000,
    null,
  );

let assets: Promise<Assets> | null = null;
/** Warm the photo and logo so a tap renders at once (share needs the tap's activation). */
export const prepareBag = () => {
  if (!assets) {
    assets = Promise.all([loadImg(HERO_SRC), loadImg(LOGO_SRC)]).then(([photo, logo]) => {
      if (!photo || !logo) assets = null; // retry next time, but still draw now
      return { photo, logo };
    });
  }
  return assets;
};

const waitFonts = async (name: string, phone: string) => {
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (!fonts) return;
  await timeout(
    Promise.all([
      fonts.load('800 120px Cairo', name),
      fonts.load('700 40px Tajawal', `معاينة توضيحية البركة بلاست ${phone} 0123456789`),
      fonts.ready,
    ]).catch(() => undefined),
    3000,
    undefined,
  );
};

/* ---------- drawing helpers ---------- */

/** Rounded rect with separate top / bottom radii (the bag is 3/3/6/6). */
const shape = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rt: number, rb = rt) => {
  c.beginPath();
  c.moveTo(x + rt, y);
  c.arcTo(x + w, y, x + w, y + h, rt);
  c.arcTo(x + w, y + h, x, y + h, rb);
  c.arcTo(x, y + h, x, y, rb);
  c.arcTo(x, y, x + w, y, rt);
  c.closePath();
};

/** A CSS `linear-gradient(<deg>, …)` over a box. */
const cssGradient = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  const dx = Math.sin(a);
  const dy = -Math.cos(a);
  const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2;
  const cx = x + w / 2;
  const cy = y + h / 2;
  return c.createLinearGradient(cx - dx * half, cy - dy * half, cx + dx * half, cy + dy * half);
};

const grainPattern = (c: CanvasRenderingContext2D) => {
  const n = document.createElement('canvas');
  n.width = n.height = 200;
  const nc = n.getContext('2d');
  if (!nc) return null;
  const img = nc.createImageData(200, 200);
  for (let i = 0; i < img.data.length; i += 4) {
    img.data[i] = 15;
    img.data[i + 1] = 27;
    img.data[i + 2] = 61;
    img.data[i + 3] = Math.random() * 14;
  }
  nc.putImageData(img, 0, 0);
  return c.createPattern(n, 'repeat');
};

/** Biggest size (down to `min`) at which every line fits `maxW`. */
const fitLines = (c: CanvasRenderingContext2D, lines: string[], maxW: number, start: number, min: number) => {
  let size = start;
  for (; size > min; size -= 2) {
    c.font = `800 ${size}px Cairo, Tajawal, sans-serif`;
    if (lines.every((l) => c.measureText(l).width <= maxW)) return { size, fits: true };
  }
  c.font = `800 ${min}px Cairo, Tajawal, sans-serif`;
  return { size: min, fits: lines.every((l) => c.measureText(l).width <= maxW) };
};

/** One line when it can be big; else two lines split between words (never inside a word). */
const layoutName = (c: CanvasRenderingContext2D, name: string, maxW: number) => {
  const one = fitLines(c, [name], maxW, 176, 96);
  if (one.fits) return { lines: [name], size: one.size };
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    let best: string[] = [name];
    let bestW = Infinity;
    c.font = '800 100px Cairo, Tajawal, sans-serif';
    for (let i = 1; i < words.length; i++) {
      const pair = [words.slice(0, i).join(' '), words.slice(i).join(' ')];
      const w = Math.max(...pair.map((l) => c.measureText(l).width));
      if (w < bestW) {
        bestW = w;
        best = pair;
      }
    }
    const two = fitLines(c, best, maxW, 140, 56);
    if (two.fits) return { lines: best, size: two.size };
  }
  // one long word: shrink, never break letters apart
  return { lines: [name], size: fitLines(c, [name], maxW, 96, 36).size };
};

/**
 * One plate, drawn opaque on its own sheet. A hairline stroke in the same colour
 * closes the anti-aliasing seams between Cairo's joined glyphs, and drawing the
 * sheet once keeps stroke + fill from doubling the ghost's alpha.
 */
const plate = (c: CanvasRenderingContext2D, lines: { text: string; y: number }[], x: number, color: string) => {
  const p = document.createElement('canvas');
  p.width = W;
  p.height = H;
  const pc = p.getContext('2d');
  if (!pc) return null;
  pc.font = c.font;
  pc.direction = c.direction;
  pc.textAlign = 'center';
  pc.textBaseline = 'middle';
  pc.fillStyle = pc.strokeStyle = color;
  pc.lineWidth = 1.5;
  pc.lineJoin = 'round';
  for (const l of lines) {
    pc.fillText(l.text, x, l.y);
    pc.strokeText(l.text, x, l.y);
  }
  return p;
};

/** The print: ghost plate (#3b6fa0 at +7, −5, α .28), then the ink multiplied over it. */
const twoPlates = (c: CanvasRenderingContext2D, lines: { text: string; y: number }[], x: number, ink: string) => {
  const ghost = plate(c, lines, x, '#3b6fa0');
  const main = plate(c, lines, x, ink);
  c.save();
  if (ghost) {
    c.globalAlpha = 0.28;
    c.drawImage(ghost, 7, -5);
  }
  c.globalAlpha = 1;
  c.globalCompositeOperation = 'multiply';
  if (main) c.drawImage(main, 0, 0);
  else {
    c.fillStyle = ink;
    for (const l of lines) c.fillText(l.text, x, l.y);
  }
  c.restore();
};

const paint = (c: CanvasRenderingContext2D, name: string, phone: string, ink: string, { photo, logo }: Assets) => {
  c.direction = 'rtl';

  // ground: navy with a soft light behind the bag
  c.fillStyle = GROUND;
  c.fillRect(0, 0, W, H);
  const glow = c.createRadialGradient(W / 2, BY + BH * 0.45, 40, W / 2, BY + BH * 0.45, 760);
  glow.addColorStop(0, 'rgba(59, 111, 160, 0.30)');
  glow.addColorStop(1, 'rgba(59, 111, 160, 0)');
  c.fillStyle = glow;
  c.fillRect(0, 0, W, H);

  // back ply at the mouth — ends above the punched slot so it never plugs it
  const plyTop = BY - 7 * S;
  shape(c, BX + 3 * S, plyTop, BW - 6 * S, SY - plyTop - 1, R_TOP, 0);
  const plyG = c.createLinearGradient(0, plyTop, 0, SY);
  plyG.addColorStop(0, '#dfe5eb');
  plyG.addColorStop(1, '#e9edf1');
  c.fillStyle = plyG;
  c.fill();

  // panel with the drop shadow of --sh-bag
  c.save();
  c.shadowColor = 'rgba(3, 8, 24, 0.45)';
  c.shadowBlur = 40 * S;
  c.shadowOffsetY = 36 * S;
  shape(c, BX, BY, BW, BH, R_TOP, R_BOT);
  const body = c.createLinearGradient(0, BY, 0, BY + BH);
  body.addColorStop(0, '#f7f9fb');
  body.addColorStop(0.55, '#f1f4f7');
  body.addColorStop(1, '#e9edf1');
  c.fillStyle = body;
  c.fill();
  c.restore();

  // film: top-right bloom, two fold glints, grain — all clipped to the panel
  c.save();
  shape(c, BX, BY, BW, BH, R_TOP, R_BOT);
  c.clip();
  const bloom = c.createRadialGradient(BX + BW * 0.88, BY, 0, BX + BW * 0.88, BY, BW * 0.95);
  bloom.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  bloom.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
  c.fillStyle = bloom;
  c.fillRect(BX, BY, BW, BH);
  // fold glints: a faint crease line + a white sheen beside it. Canvas gradients
  // interpolate unpremultiplied, so each fill keeps one hue (mixing navy and white stops greys the fold).
  const fold = (deg: number, at: number, dark: number, light: number) => {
    const d = cssGradient(c, BX, BY, BW, BH, deg);
    d.addColorStop(at - 0.008, 'rgba(15, 27, 61, 0)');
    d.addColorStop(at, `rgba(15, 27, 61, ${dark})`);
    d.addColorStop(at + 0.004, 'rgba(15, 27, 61, 0)');
    c.fillStyle = d;
    c.fillRect(BX, BY, BW, BH);
    const l = cssGradient(c, BX, BY, BW, BH, deg);
    l.addColorStop(at - 0.01, 'rgba(255, 255, 255, 0)');
    l.addColorStop(at + 0.007, `rgba(255, 255, 255, ${light})`);
    l.addColorStop(at + 0.035, 'rgba(255, 255, 255, 0)');
    c.fillStyle = l;
    c.fillRect(BX, BY, BW, BH);
  };
  fold(112, 0.425, 0.035, 0.7);
  fold(68, 0.712, 0.03, 0.55);
  const grain = grainPattern(c);
  if (grain) {
    c.fillStyle = grain;
    c.fillRect(BX, BY, BW, BH);
  }

  // reinforcement patch: a second film layer heat-welded on, as on the page (.v2-bag__patch) — a soft
  // lighter layer, a fold edge and a stippled weld line along the bottom, all fading out at both ends
  const pw = Math.min(380 * S, BW * 0.7);
  const ph = SLOT_TOP * 2 + SLOT_H;
  const px = W / 2 - pw / 2;
  const pc = document.createElement('canvas');
  pc.width = Math.ceil(pw);
  pc.height = Math.ceil(ph + 2);
  const p2 = pc.getContext('2d');
  if (p2) {
    const film = p2.createLinearGradient(0, 0, 0, ph);
    film.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    film.addColorStop(1, 'rgba(255, 255, 255, 0.45)');
    p2.fillStyle = film;
    p2.fillRect(0, 0, pw, ph);
    p2.fillStyle = 'rgba(15, 27, 61, 0.08)'; // fold edge
    p2.fillRect(0, ph - 1, pw, 1);
    p2.fillStyle = 'rgba(255, 255, 255, 0.9)'; // its highlight
    p2.fillRect(0, ph, pw, 1);
    p2.fillStyle = 'rgba(15, 27, 61, 0.2)'; // stippled weld line: 2 on, 3 off (× S)
    const wy = Math.round(ph - 1 - 6 * S);
    for (let x = 0; x < pw; x += 5 * S) p2.fillRect(Math.round(x), wy, Math.max(2, Math.round(2 * S)), 1);
    // fade both ends (the page's mask: transparent → 9 % → 91 % → transparent)
    p2.globalCompositeOperation = 'destination-in';
    const fade = p2.createLinearGradient(0, 0, pw, 0);
    fade.addColorStop(0, 'rgba(0, 0, 0, 0)');
    fade.addColorStop(0.09, 'rgba(0, 0, 0, 1)');
    fade.addColorStop(0.91, 'rgba(0, 0, 0, 1)');
    fade.addColorStop(1, 'rgba(0, 0, 0, 0)');
    p2.fillStyle = fade;
    p2.fillRect(0, 0, pc.width, pc.height);
    c.drawImage(pc, Math.round(px), BY);
  }

  // side seals (dark 1 px + white 1 px), stopping at the bottom seal
  const sealInset = 14 * S;
  const ribH = 18;
  for (const x of [BX + sealInset, BX + BW - sealInset - 2]) {
    c.fillStyle = 'rgba(15, 27, 61, 0.22)';
    c.fillRect(x, BY, 1, BH - ribH);
    c.fillStyle = 'rgba(255, 255, 255, 0.9)';
    c.fillRect(x + 1, BY, 1, BH - ribH);
  }
  // ribbed bottom seal: 1 px lines every 4 px
  c.fillStyle = 'rgba(15, 27, 61, 0.14)';
  c.fillRect(BX, BY + BH - ribH, BW, 1);
  for (let x = BX; x < BX + BW; x += 4) c.fillRect(x, BY + BH - ribH, 1, ribH);
  c.restore();

  // the punched handle: the factory in colour seen through it (never a transparent hole)
  c.save();
  shape(c, SX, SY, SLOT_W, SLOT_H, SLOT_H / 2);
  c.clip();
  c.fillStyle = '#0a1430';
  c.fillRect(SX, SY, SLOT_W, SLOT_H);
  if (photo) {
    const k = photo.naturalWidth / CROP.natural;
    const sw = CROP.w * k;
    const sh = sw * (SLOT_H / SLOT_W);
    c.filter = 'saturate(1.25) brightness(1.15)';
    c.drawImage(photo, CROP.cx * k - sw / 2, CROP.cy * k - sh / 2, sw, sh, SX, SY, SLOT_W, SLOT_H);
    c.filter = 'none';
  }
  // depth: the film's cut edge throws a little shade on the top of the opening
  const depth = c.createLinearGradient(0, SY, 0, SY + SLOT_H);
  depth.addColorStop(0, 'rgba(3, 8, 24, 0.35)');
  depth.addColorStop(0.35, 'rgba(3, 8, 24, 0)');
  c.fillStyle = depth;
  c.fillRect(SX, SY, SLOT_W, SLOT_H);
  c.restore();
  shape(c, SX, SY, SLOT_W, SLOT_H, SLOT_H / 2);
  c.strokeStyle = 'rgba(15, 27, 61, 0.28)';
  c.lineWidth = 1.5;
  c.stroke();

  // the print
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  const printTop = BY + ph;
  const printBottom = BY + BH - ribH - (phone ? 120 : 40);
  const cy = (printTop + printBottom) / 2;
  const { lines, size } = layoutName(c, name, BW - 160);
  c.font = `800 ${size}px Cairo, Tajawal, sans-serif`;
  const lh = size * 1.3;
  twoPlates(c, lines.map((text, i) => ({ text, y: cy + (i - (lines.length - 1) / 2) * lh })), W / 2, ink);
  if (phone) {
    c.font = '700 44px Tajawal, Cairo, sans-serif';
    c.direction = 'ltr';
    twoPlates(c, [{ text: phone, y: BY + BH - ribH - 64 }], W / 2, ink);
    c.direction = 'rtl';
  }

  // caption, then the mark
  c.fillStyle = '#b7c3d6';
  c.font = '700 32px Tajawal, Cairo, sans-serif';
  c.fillText('معاينة توضيحية — البركة بلاست · 01009923040', W / 2, BY + BH + 66);
  const logoTop = BY + BH + 112;
  if (logo) {
    const lw = 190;
    const lhgt = (logo.naturalHeight / logo.naturalWidth) * lw;
    c.drawImage(logo, W / 2 - lw / 2, logoTop, lw, lhgt);
  } else {
    c.fillStyle = '#ffffff';
    c.font = '800 44px Cairo, Tajawal, sans-serif';
    c.fillText('البركة بلاست', W / 2, logoTop + 40);
  }
};

/** Draw the bag and return it as a JPEG blob. Image failures still yield an image. */
export async function renderBag(name: string, phone: string, inkHex: string): Promise<Blob> {
  const [a] = await Promise.all([prepareBag(), waitFonts(name, phone)]);
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const c = cv.getContext('2d');
  if (!c) throw new Error('canvas 2d unavailable');
  paint(c, name, phone, inkHex, a);
  const blob = await new Promise<Blob | null>((res) => cv.toBlob(res, MIME, QUALITY));
  if (blob) return blob;
  return (await fetch(cv.toDataURL(MIME, QUALITY))).blob();
}

const download = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = FILE_DL;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
};

export type SaveResult = 'shared' | 'downloaded' | 'cancelled';

/**
 * Share the image through the system sheet (WhatsApp) when `preferShare` and the
 * browser can share files; otherwise download it. A cancelled share is silent.
 */
export async function saveBag(name: string, phone: string, inkHex: string, preferShare = false): Promise<SaveResult> {
  const blob = await renderBag(name, phone, inkHex);
  if (preferShare && typeof navigator.share === 'function' && typeof File === 'function') {
    const file = new File([blob], FILE_SHARE, { type: MIME });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: SHARE_TEXT });
        return 'shared';
      } catch (e) {
        if ((e as DOMException)?.name === 'AbortError') return 'cancelled';
        // NotAllowedError (activation spent) etc.: fall back to saving the file
      }
    }
  }
  download(blob);
  return 'downloaded';
}

/** @deprecated kept for older call sites — same as `saveBag(..., false)`. */
export const downloadBag = (name: string, phone: string, inkHex: string) => saveBag(name, phone, inkHex, false);
