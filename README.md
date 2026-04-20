# FAQ™ 202 — Scroll Experience
### FOREO Swiss LED Face Mask

---

## Project Structure

```
faq202/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   └── script.js       ← All animations (GSAP)
├── images/
│   ├── mask.png        ← ⬅ DROP YOUR TRANSPARENT PNG HERE
│   └── model.png       ← ⬅ DROP YOUR MODEL PNG HERE
└── README.md
```

---

## Step 1 — Add your images

Place your images in the `/images/` folder:

| File | What it is | Size |
|------|-----------|------|
| `mask.png` | The floating LED mask — **must have transparent background** | 1000×1000px recommended |
| `model.png` | The woman wearing the mask — can have black background | Any 16:9 landscape |

**Getting a transparent mask PNG:**
- Go to **firefly.adobe.com** (free)
- Upload your mask photo
- Use "Remove Background"
- Download as PNG
- Rename to `mask.png` and drop in `/images/`

---

## Step 2 — Open in browser

Just double-click `index.html` — it opens directly in Chrome or Safari.

No build step. No npm. No server needed.

---

## Step 3 — Deploy live (optional)

1. Go to **app.netlify.com/drop**
2. Drag the entire `faq202` folder onto the page
3. Get a live URL in 30 seconds
4. Share with anyone, works on mobile

---

## Customizing

**Change the copy** — Edit `index.html`, find the text between the `<!-- S1 -->` etc. comments

**Change animation speed** — In `script.js`, change `scrub: 1.8` to a lower number (faster) or higher (slower)

**Change colors** — In `css/style.css`, edit the `:root` variables at the top:
```css
--gold:  #C9916A;   /* rose gold accent */
--red:   #D93018;   /* LED red glow */
--cream: #EDE8DF;   /* text color */
```

**Change mask size** — In `css/style.css`, find `.mask-img` and change the width:
```css
width: clamp(320px, 44vw, 620px);
```

---

## Sections

| # | Name | What happens |
|---|------|-------------|
| 1 | Ritual | Model intro → mask rises, headline appears |
| 2 | Truth | Mask slides right, copy enters left |
| 3 | Science | Mask shrinks, light beams shoot out, wavelength dots |
| 4 | Results | Mask flies top-right, stats count up |
| 5 | Trust | Mask shrinks center, FDA badges orbit, testimonial |
| 6 | Yours | Mask drifts up, giant price, CTA button |
