// Renders the visitor's preview bag to a PNG they can keep or send on WhatsApp.
// Same object as the page: film panel, punched handle slot, seals, the name in Cairo.

const W = 1080;
const H = 1350;

const roundRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
};

const fitFont = (c: CanvasRenderingContext2D, text: string, maxW: number, start: number) => {
  let size = start;
  do {
    c.font = `800 ${size}px Cairo, Tajawal, sans-serif`;
    if (c.measureText(text).width <= maxW) break;
    size -= 4;
  } while (size > 40);
  return size;
};

export async function downloadBag(name: string, phone: string, inkHex: string) {
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (fonts) {
    await Promise.all([fonts.load('800 120px Cairo', name), fonts.load('700 40px Tajawal', 'البركة')]).catch(() => {});
  }
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const c = cv.getContext('2d');
  if (!c) return;
  c.direction = 'rtl';

  // ground
  c.fillStyle = '#0f1b3d';
  c.fillRect(0, 0, W, H);

  // bag body with a punched handle
  const bx = 150;
  const by = 120;
  const bw = W - 300;
  const bh = H - 330;
  c.save();
  c.shadowColor = 'rgba(3, 8, 24, 0.55)';
  c.shadowBlur = 60;
  c.shadowOffsetY = 30;
  roundRect(c, bx, by, bw, bh, 8);
  const g = c.createLinearGradient(0, by, 0, by + bh);
  g.addColorStop(0, '#f7f9fb');
  g.addColorStop(0.55, '#f1f4f7');
  g.addColorStop(1, '#e9edf1');
  c.fillStyle = g;
  c.fill();
  c.restore();
  const sw = 260;
  const sh = 76;
  const sx = W / 2 - sw / 2;
  const sy = by + 56;
  c.save();
  c.globalCompositeOperation = 'destination-out';
  roundRect(c, sx, sy, sw, sh, sh / 2);
  c.fill();
  c.restore();
  // seals + bottom ribs
  c.strokeStyle = 'rgba(15, 27, 61, 0.18)';
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(bx + 22, by);
  c.lineTo(bx + 22, by + bh - 24);
  c.moveTo(bx + bw - 22, by);
  c.lineTo(bx + bw - 22, by + bh - 24);
  c.moveTo(bx, by + bh - 24);
  c.lineTo(bx + bw, by + bh - 24);
  c.stroke();

  // the print
  c.fillStyle = inkHex;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  const size = fitFont(c, name, bw - 140, 150);
  c.font = `800 ${size}px Cairo, Tajawal, sans-serif`;
  c.fillText(name, W / 2, by + bh * 0.5);
  if (phone) {
    c.font = '700 40px Tajawal, Cairo, sans-serif';
    c.direction = 'ltr';
    c.fillText(phone, W / 2, by + bh - 80);
    c.direction = 'rtl';
  }

  // caption under the bag
  c.fillStyle = '#b7c3d6';
  c.font = '700 34px Tajawal, Cairo, sans-serif';
  c.fillText('معاينة توضيحية — البركة بلاست · 01009923040', W / 2, H - 120);

  const url = cv.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = 'شنطتي-البركة-بلاست.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
