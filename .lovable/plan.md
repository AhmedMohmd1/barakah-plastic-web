

## Plan: Enhance Hero Section Buttons

### Current State
Two buttons exist: a primary "تصفح المنتجات" (orange) and a secondary outline "تواصل معنا" (white border). They have basic shadow and hover effects but feel flat — no animated icons, no scale/glow transitions, no visual depth.

### Enhancements

**Primary Button ("تصفح المنتجات")**
- Add `hover:scale-105` and `active:scale-95` for tactile press feedback
- Add animated arrow: `group` class on button, arrow slides left on hover via `group-hover:-translate-x-1`
- Increase shadow intensity on hover with a warm orange glow
- Add a subtle gradient background (`bg-gradient-to-r from-secondary to-secondary-dark`) instead of flat color

**Secondary Button ("تواصل معنا")**
- Add `hover:scale-105` and `active:scale-95`
- On hover: fill with a semi-transparent white (`hover:bg-white/15`) and brighten border
- Add a subtle phone icon bounce/ring animation on hover via `group-hover:animate-bounce`
- Add `backdrop-blur-md` for a frosted glass premium feel

**Both Buttons**
- Increase padding slightly for a more prominent CTA feel
- Add `font-semibold` for bolder text weight
- Smooth all transitions with `transition-all duration-300 ease-out`

### File Changed
- `src/components/Hero.tsx` — lines 72-90 (button section only)

