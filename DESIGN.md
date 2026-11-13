# Code Blue Companion — design system (v5.7.0)

There was no written design system before this pass; the only documentation was the theme
tokens and comments in `index.html`. This file records the rules the v5.7.0 pass derived and
now enforces. Each rule cites the screen that triggered it.

## Character

A clinical instrument. The user is a team leader mid-resuscitation, glancing at a phone or a
wall-mounted tablet, under stress, often in poor light, sometimes with gloves on.

- One obvious next action at any moment.
- Doses legible at arm's length.
- Colour carries meaning only. Motion is used only to say "this is due now".
- No gradients, glass, decorative emoji or marketing inside the working console.

## Colour

Semantic hues are fixed: red = drugs / arrest, amber = electricity / due, blue = rhythm and
assessment, green = airway / ROSC / go, violet = guidance.

| Token | Use |
|---|---|
| `--red` `--amber` `--green` `--blue` `--violet` | text, borders, accents on a surface |
| `--red-fill` | any red *background* that carries white text |
| `--on-green` `--on-blue` `--on-red` `--onwarm` | text on a green / blue / red / amber fill |

Rule: never write `color:#fff` on a semantic fill. Use the matching `--on-*` token.
*Trigger: START CPR in the Navy theme was white on `#2ed573`, about 1.9:1; the "Deliver shock"
status bar in Bright was white on `#b8770f`, about 3.7:1.*

Bright-theme amber is `#94600a` so it passes 4.5:1 both as text on white and as a fill under
white text.

## Type

System font stack. Sizes are whole pixels from this set only:
`11 · 12 · 13 · 14 · 15 · 16 · 18` for interface text, larger for readouts (weight, clock, dose value).

- 11px is the floor. *Trigger: timer and action sub-labels were 7–9.5px.*
- Dose guidance (`.dose .s`: route, interval, maximum) is 12px. It is clinical content, not fine print.
  *Trigger: "max 1 mg" was 10px dim grey on the arrest-drugs card.*

## Shape

`--r-sm: 8px` controls and inner tiles · `--r-md: 12px` cards · `--r-lg: 16px` console and sheets ·
`999px` pills. *Trigger: eleven different radii (6–20px) across the console.*

One emphasis device per element: a border **or** a shadow **or** a tinted fill. The console frame
is a 1px neutral line at rest and turns red only while a code is running, so the red frame means
"live". *Trigger: the console carried a 2px red border, a 28px shadow and a tinted background
before any code had started.*

## Controls

- Touch target 44px; 40px is allowed only for dense secondary chips (age chips).
  *Trigger: START CPR was 37px tall, header icons 30px.*
- A primary fill (green) is reserved for the single forward action on a screen. Destructive or
  ending actions are outlined red. *Trigger: END CODE was the same green button as START CPR.*
- Settings buttons name the control and its value ("Theme: Bright"), never the value alone.
- Disabled means `disabled`, not only faded. State lives in classes (`.on`, `.act-off`,
  `.collapsed`); the accessibility layer at the bottom of `index.html` mirrors them to
  `aria-pressed`, `aria-selected`, `aria-expanded` and `disabled`. New stateful controls must use
  the same classes or be added to that mirror.

## Motion

- "Due now" cues pulse a frame or a dot. They never fade the text they point at.
  *Trigger: the status bar dropped to 50% opacity every second while telling the leader to shock.*
- Press feedback: 0.97 scale, 80ms. Hover: border darkens.
- Everything stops under `prefers-reduced-motion`.

## Layout

- Split view (console rail left, reference right) on tablets, desktops and short landscape screens.
- Stacked on portrait phones, with Drugs / Airway / Causes / Log tabs while a code runs.
- During a code the reading order is: console → quick reference → dose cards → reversible causes.
  *Trigger: at 1280×800 the H's and T's list pushed every arrest drug below the fold.*
- A sticky element must never be taller than the viewport. Under 560px height the stacked console
  is not sticky.

## Dialogs

Every gate and sheet is listed in `MODALS` in the accessibility layer. That gives it
`role="dialog"`, an inert background, Esc and backdrop close (where it is dismissable) and focus
return. Add new sheets to that list.
