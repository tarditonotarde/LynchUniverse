# LynchUniverse Design System

> A Netflix-inspired streaming platform design system for the David Lynch cinematic universe.

---

## Table of Contents

1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Layout & Grid](#layout--grid)
6. [Components](#components)
7. [Animations & Transitions](#animations--transitions)
8. [Shadows & Effects](#shadows--effects)
9. [Z-Index Layers](#z-index-layers)
10. [Responsive Breakpoints](#responsive-breakpoints)
11. [Icons](#icons)
12. [States & Interactions](#states--interactions)

---

## Overview

LynchUniverse follows a dark-first design philosophy inspired by Netflix's streaming interface, optimized for immersive cinematic content consumption. The design system emphasizes:

- **Dark aesthetic** - Reduced eye strain for extended viewing
- **Premium feel** - Sophisticated animations and transitions
- **Content-first** - UI elements fade when not needed
- **Responsive** - Seamless experience across all devices

---

## Color Palette

### Primary Colors

```css
--bg-primary: #141414        /* Main background - Deep black */
--bg-elevated: #181818       /* Cards, modals, elevated surfaces */
--bg-hover: #232323          /* Hover states for interactive elements */
```

**Usage:**
- `--bg-primary`: Body background, main app canvas
- `--bg-elevated`: Video cards, modals, dropdown menus
- `--bg-hover`: Button hovers, card hovers, interactive states

### Text Colors

```css
--text-primary: #FFFFFF      /* Primary text - Pure white */
--text-secondary: #B3B3B3    /* Secondary text - Light gray */
--text-tertiary: #757575     /* Tertiary text - Medium gray */
```

**Usage:**
- `--text-primary`: Headings, titles, high-emphasis text
- `--text-secondary`: Descriptions, metadata, medium-emphasis
- `--text-tertiary`: Timestamps, tags, low-emphasis info

### Accent Colors

```css
--accent-red: #E50914        /* Netflix red - Primary CTA */
--accent-red-hover: #C11119  /* Darker red for hover states */
```

**Usage:**
- `--accent-red`: Primary buttons, logo, active states, progress bars
- `--accent-red-hover`: Hover states for red buttons and links

### Semantic Colors

```css
/* Success - Green (for "Add to List", Likes) */
#46d369                      /* Success green */
rgba(70, 211, 105, 0.15)     /* Success background */

/* Warning - Amber */
#FFB020                      /* Warning amber */

/* Error - Red */
#E50914                      /* Error state (uses accent red) */

/* Info - Blue */
#0080FF                      /* Information blue */
```

### Transparency & Overlays

```css
/* Modal overlays */
rgba(0, 0, 0, 0.9)          /* Modal backdrop - Heavy dark */
rgba(0, 0, 0, 0.8)          /* Dropdown backdrop */
rgba(0, 0, 0, 0.7)          /* Gradient overlays */

/* Glass effects */
rgba(255, 255, 255, 0.15)   /* Light glass */
rgba(255, 255, 255, 0.1)    /* Subtle glass */
rgba(42, 42, 42, 1)         /* Button backgrounds */

/* Borders */
rgba(255, 255, 255, 0.5)    /* Default border */
rgba(255, 255, 255, 0.1)    /* Subtle border */
```

---

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

**System fonts prioritized for:**
- Fast loading (no web font download)
- Native feel on each platform
- Excellent readability at all sizes

### Type Scale

```css
--text-hero: 52px            /* Hero section titles */
--text-section: 22px         /* Section headers, row titles */
--text-logo: 24px            /* Logo/Brand text */
--text-card-title: 16px      /* Video card titles */
--text-metadata: 14px        /* Descriptions, metadata */
--text-small: 12px           /* Tags, timestamps, fine print */
```

### Font Weights

- **300** - Light (rarely used)
- **400** - Regular (body text, descriptions)
- **500** - Medium (metadata, secondary info)
- **600** - Semibold (card titles, buttons)
- **700** - Bold (section headers, emphasis)
- **800** - Extra bold (hero titles, call-to-actions)

### Responsive Typography

#### Desktop (>1024px)
```css
--text-hero: 52px
--text-section: 22px
--text-card-title: 16px
```

#### Tablet (768px - 1024px)
```css
--text-hero: 42px
--text-section: 18px
--text-card-title: 14px
```

#### Mobile (≤768px)
```css
--text-hero: 32px
--text-section: 18px
--text-card-title: 14px
```

#### Small Mobile (≤480px)
```css
--text-hero: 28px
--text-section: 16px
--text-card-title: 12px
```

### Line Heights

- **Hero text**: 110% - 120% (tight for impact)
- **Body text**: 150% - 160% (comfortable reading)
- **UI text**: 140% (buttons, labels)
- **Dense info**: 130% (cards, metadata)

### Letter Spacing

```css
/* Tight for large text */
letter-spacing: -0.5px      /* Logo, hero titles */

/* Normal for body */
letter-spacing: 0           /* Default */

/* Wide for small caps */
letter-spacing: 0.5px       /* Tags, labels, buttons */
letter-spacing: 0.3px       /* Category navigation */
```

---

## Spacing System

### Base Unit: 8px

All spacing follows an 8px grid for visual consistency and alignment.

```css
--space-1: 8px              /* Micro spacing */
--space-2: 16px             /* Small spacing */
--space-3: 24px             /* Medium spacing */
--space-4: 32px             /* Large spacing */
--space-5: 40px             /* XL spacing */
--space-6: 48px             /* XXL spacing */
--space-8: 64px             /* Huge spacing */
--space-10: 80px            /* Massive spacing */
```

### Usage Guidelines

#### Micro (8px)
- Icon-to-text gaps
- Tight inline elements
- Compact UI components

#### Small (16px)
- Between related elements
- Form field gaps
- Button padding

#### Medium (24px)
- Section padding
- Card gaps
- Content margins

#### Large (32px - 48px)
- Major section separation
- Hero section padding
- Modal internal spacing

#### Huge (64px - 80px)
- Page-level spacing
- Hero section height
- Major visual breaks

### Component-Specific Spacing

```css
--horizontal-padding: 80px   /* Page horizontal margins (desktop) */
--gutter: 24px              /* Grid gutter between cards */
--card-gap: 24px            /* Gap between video cards */
```

**Responsive horizontal padding:**
- Desktop (>1024px): 80px
- Tablet (768px - 1024px): 40px
- Mobile (≤768px): 24px
- Small mobile (≤480px): 16px

---

## Layout & Grid

### Maximum Widths

```css
--max-content-width: 1280px  /* Maximum container width */
```

### Video Card Grid

```css
--card-width: 240px          /* Default card width (desktop) */
--card-gap: 24px            /* Gap between cards */
```

**Responsive card widths:**
- Desktop (>1024px): 240px
- Tablet (768px - 1024px): 200px
- Mobile (≤768px): 180px
- Small mobile (≤480px): 150px

### Aspect Ratios

```css
/* Video thumbnails */
aspect-ratio: 16/9          /* Standard video format */

/* Portrait posters (if needed) */
aspect-ratio: 2/3           /* Movie poster format */
```

---

## Components

### Navbar

```css
--navbar-height: 68px       /* Desktop */
```

**Structure:**
- Fixed position, full width
- Two-tier layout: Logo/actions (top), Categories (bottom)
- Transparent → Solid on scroll
- Gradient background: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0) 100%)`

**Responsive:**
- Desktop: Full horizontal layout
- Mobile (≤660px): Collapsed menu with dropdown

### Video Cards

```css
--card-width: 240px
--border-radius-card: 4px
```

**States:**
1. **Default**: Thumbnail + title overlay
2. **Hover**: Scale 1.15, expanded info panel, shadow glow
3. **Active**: Playing state with animated border

**Hover expansion:**
- Scale: 1.15x
- Elevation: Heavy shadow
- Info panel: Slides in from bottom
- Duration: 300ms
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Buttons

```css
--button-height: 44px
```

**Primary Button (Red CTA):**
```css
background: var(--accent-red)
color: white
padding: 12px 24px
border-radius: 4px
font-weight: 600
transition: all 200ms ease
```

**Hover:**
```css
background: var(--accent-red-hover)
transform: scale(1.02)
```

**Secondary Button (Transparent):**
```css
background: rgba(255, 255, 255, 0.15)
backdrop-filter: blur(10px)
border: none
```

**Icon Buttons (Round):**
```css
width: 32px
height: 32px
border-radius: 50%
background: rgba(255, 255, 255, 0.15)
```

### Modal

```css
--z-modal-overlay: 100
--z-modal-content: 101
```

**Structure:**
- Full-screen overlay with backdrop blur
- Video player (16:9 aspect ratio, max-height: 90vh)
- Info section below with metadata

**Animations:**
- Fade in/out: 300ms
- Scale: 0.98 → 1.0
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

---

## Animations & Transitions

### Duration Scale

```css
--duration-fast: 200ms       /* Quick interactions */
--duration-normal: 300ms     /* Standard transitions */
--duration-slow: 500ms       /* Emphasized movements */
```

### Easing Functions

```css
--easing: cubic-bezier(0.4, 0, 0.2, 1)  /* Default material easing */
```

**Common easings:**
```css
/* Smooth in-out */
cubic-bezier(0.25, 0.46, 0.45, 0.94)

/* Spring bounce */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Fast out, slow in */
cubic-bezier(0.4, 0, 0.2, 1)

/* Material standard */
cubic-bezier(0.4, 0.0, 0.2, 1)
```

### Motion Principles

1. **Purposeful** - Every animation has meaning
2. **Responsive** - Immediate feedback (<100ms)
3. **Natural** - Follows physics-inspired easing
4. **Subtle** - Never distracts from content
5. **Performant** - Hardware-accelerated properties only

### Animated Properties

**Preferred (GPU-accelerated):**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness)

**Avoid animating:**
- `width`, `height` (use `transform: scale`)
- `top`, `left` (use `transform: translate`)
- `background-color` (use opacity layers)

### Common Patterns

**Fade In:**
```css
initial: { opacity: 0 }
animate: { opacity: 1 }
transition: { duration: 0.3 }
```

**Scale Up:**
```css
initial: { scale: 0.95, opacity: 0 }
animate: { scale: 1, opacity: 1 }
transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
```

**Slide In:**
```css
initial: { y: 20, opacity: 0 }
animate: { y: 0, opacity: 1 }
transition: { duration: 0.4 }
```

---

## Shadows & Effects

### Elevation System

**Level 1 - Cards (default):**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
```

**Level 2 - Cards (hover):**
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
```

**Level 3 - Modals:**
```css
box-shadow: 0 16px 64px rgba(0, 0, 0, 0.8);
```

**Level 4 - Dropdowns:**
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8), 
            0 0 0 1px rgba(255, 255, 255, 0.1);
```

### Glow Effects

**Red glow (accent):**
```css
box-shadow: 0 0 20px rgba(229, 9, 20, 0.5);
```

**Text glow:**
```css
text-shadow: 0 0 20px rgba(229, 9, 20, 0.5);
```

**Audio visualizer glow:**
```css
box-shadow: 0 0 8px rgba(229, 9, 20, 0.6), 
            0 0 12px rgba(229, 9, 20, 0.3);
```

### Glass Morphism

**Buttons, overlays:**
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(10px);
```

**Heavy glass (modals):**
```css
background: rgba(20, 20, 20, 0.98);
backdrop-filter: blur(20px);
```

### Gradients

**Navbar gradient:**
```css
background: linear-gradient(
  to bottom, 
  rgba(0, 0, 0, 1) 0%, 
  rgba(0, 0, 0, 0.9) 50%, 
  rgba(0, 0, 0, 0) 100%
);
```

**Video overlay gradient:**
```css
background: linear-gradient(
  to top,
  rgba(20, 20, 20, 1) 0%,
  rgba(20, 20, 20, 0.8) 50%,
  rgba(20, 20, 20, 0) 100%
);
```

**Hero gradient (text protection):**
```css
background: linear-gradient(
  to right,
  rgba(0, 0, 0, 0.95) 0%,
  rgba(0, 0, 0, 0.6) 50%,
  rgba(0, 0, 0, 0) 100%
);
```

---

## Z-Index Layers

Consistent z-index scale for proper stacking:

```css
--z-navbar: 50              /* Fixed navbar */
--z-card-hover: 10          /* Hovered video cards */
--z-modal-overlay: 100      /* Modal backdrop */
--z-modal-content: 101      /* Modal content */
```

**Full scale:**
- `-1` - Background elements
- `0` - Default layer
- `1` - Slight elevation
- `10` - Card hover states
- `20` - Dropdowns, tooltips
- `50` - Fixed navigation
- `100` - Modal overlays
- `101` - Modal content
- `9999` - Toast notifications (if implemented)

---

## Responsive Breakpoints

### Breakpoint Scale

```css
/* Small Mobile */
@media (max-width: 480px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (max-width: 1024px) { }

/* Desktop (default) */
@media (min-width: 1025px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

### Mobile-First Approach

Default styles target desktop, with responsive overrides scaling down.

**Key mobile adaptations:**
- Navbar collapses to hamburger menu at 660px
- Card grid becomes 2-column then 1-column
- Hero text scales down progressively
- Padding reduces from 80px → 16px
- Touch-friendly hit areas (min 44px)

---

## Icons

### Icon Library

**Lucide React** - Consistent, modern icon set

Common icons used:
- `Play`, `Pause`, `Stop` - Playback controls
- `Volume2`, `VolumeX` - Audio controls
- `Plus`, `Check` - Add to list
- `Heart` - Like/favorite
- `X` - Close modal
- `Search` - Search functionality
- `User` - Profile
- `MoreVertical` - Menu (mobile)
- `SkipForward`, `SkipBack` - Skip controls
- `Maximize`, `Minimize` - Fullscreen

### Icon Sizing

```css
/* Small icons (buttons) */
size: 12px - 16px
strokeWidth: 2.5 - 3

/* Medium icons (navigation) */
size: 20px - 24px
strokeWidth: 2 - 2.5

/* Large icons (hero play button) */
size: 44px - 48px
fill: white
strokeWidth: 0
```

---

## States & Interactions

### Hover States

**Cards:**
- Scale: 1.0 → 1.15
- Shadow: Intense glow
- Duration: 300ms
- Info panel reveals

**Buttons:**
- Scale: 1.0 → 1.05
- Background: Lighter/brighter
- Duration: 200ms

**Links/Text:**
- Color: Gray → White
- Duration: 200ms

### Active States

**Buttons:**
- Scale: 1.0 → 0.95 (tap feedback)

**Category navigation:**
- Underline: Red accent line
- Color: Gray → White
- Text glow effect

### Focus States

**Keyboard navigation:**
```css
outline: 2px solid var(--accent-red);
outline-offset: 2px;
```

### Loading States

**Skeleton loaders:**
- Background shimmer animation
- Matches component dimensions
- Subtle pulse effect

### Disabled States

```css
opacity: 0.4;
cursor: not-allowed;
pointer-events: none;
```

---

## Component Patterns

### Card Hover Info Panel

**Structure:**
- Slides in from bottom
- Dark background with blur
- Contains: Buttons (Play, Add), Match %, Year, Duration, Tags

**Animation:**
```css
initial: { y: 20, opacity: 0 }
animate: { y: 0, opacity: 1 }
transition: { delay: 0.1, duration: 0.2 }
```

### Audio Visualizer (Navbar)

**4 bars animated independently:**
```css
animate: { height: ['6px', '18px', '10px', '16px', '8px', '18px', '6px'] }
transition: { duration: 1.2, repeat: Infinity, delay: i * 0.15 }
```

### Skip Indicators (Video Player)

**Visual feedback for 10-second skips:**
- Center screen overlay
- Triple arrow animation
- Time badge with spring bounce
- Duration: 2 seconds
- Radial gradient glow

---

## Best Practices

### Do's ✅

- Use CSS custom properties for theming
- Animate `transform` and `opacity` only
- Keep shadows subtle and purposeful
- Test on actual mobile devices
- Maintain 8px spacing grid
- Use semantic HTML
- Provide keyboard navigation
- Include ARIA labels

### Don'ts ❌

- Don't animate `width`, `height`, or `position`
- Don't use more than 3 font weights
- Don't create custom scrollbars (hidden for immersion)
- Don't use fixed pixel values (use CSS vars)
- Don't nest animations (performance)
- Don't auto-play videos with sound

---

## Accessibility

### WCAG Compliance Targets

- **Color Contrast**: AAA for body text (7:1), AA for UI (4.5:1)
- **Focus Indicators**: Visible on all interactive elements
- **Keyboard Navigation**: Full support with Tab/Enter/Escape
- **Screen Readers**: ARIA labels on all icons and buttons

### Common ARIA Patterns

```html
<!-- Buttons -->
<button aria-label="Play video" title="Play">
  <Play size={16} />
</button>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">

<!-- Navigation -->
<nav aria-label="Main navigation">
```

---

## Performance Considerations

### Optimization Strategies

1. **Hardware Acceleration**
   ```css
   transform: translateZ(0);
   will-change: transform, opacity;
   ```

2. **Lazy Loading**
   - Images load on viewport enter
   - Thumbnails prefetch on hover

3. **Debouncing**
   - Scroll events: 100ms debounce
   - Resize events: 200ms debounce

4. **Request Animation Frame**
   - Use for smooth animations
   - Batch DOM reads/writes

---

## Design Tokens Export

### CSS Custom Properties (Full List)

```css
/* Colors */
--bg-primary: #141414;
--bg-elevated: #181818;
--bg-hover: #232323;
--text-primary: #FFFFFF;
--text-secondary: #B3B3B3;
--text-tertiary: #757575;
--accent-red: #E50914;
--accent-red-hover: #C11119;

/* Spacing */
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-5: 40px;
--space-6: 48px;
--space-8: 64px;
--space-10: 80px;

/* Layout */
--max-content-width: 1280px;
--horizontal-padding: 80px;
--gutter: 24px;

/* Typography */
--text-hero: 52px;
--text-section: 22px;
--text-card-title: 16px;
--text-metadata: 14px;
--text-small: 12px;
--text-logo: 24px;

/* Animation */
--duration-fast: 200ms;
--duration-normal: 300ms;
--easing: cubic-bezier(0.4, 0, 0.2, 1);

/* Components */
--navbar-height: 68px;
--card-gap: 24px;
--card-width: 240px;
--border-radius-card: 4px;
--button-height: 44px;

/* Z-index */
--z-navbar: 50;
--z-card-hover: 10;
--z-modal-overlay: 100;
--z-modal-content: 101;
```

---

## Version History

- **v1.0** (Current) - Initial design system documentation
- Netflix-inspired dark streaming platform
- Optimized for David Lynch cinematic content

---

## Credits

**Design Philosophy**: Netflix UI/UX patterns  
**Brand Identity**: LynchUniverse streaming platform  
**Color Palette**: Netflix signature red (#E50914)  
**Typography**: System fonts for performance  
**Icons**: Lucide React library  
**Animations**: Framer Motion (Motion)

---

**For questions or contributions, please refer to the component implementation files in `/src/app/components/`**
