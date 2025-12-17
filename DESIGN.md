# QuietHR Design Language & Brand Identity

> **"Discovered MENA"** - Premium, High-Contrast, Bold, Tech-Forward

---

## 🎨 Brand Overview

QuietHR is a recruitment platform that challenges conventional hiring. Our design language reflects **quiet confidence**, **premium quality**, and **technical excellence**. We create an experience that feels like discovering hidden gems in a curated luxury marketplace.

### Brand Personality
- **Sophisticated** - Premium, high-end aesthetic
- **Confident** - Bold, unapologetic design choices  
- **Technical** - Sharp, precise, engineering-focused
- **Exclusive** - Curated, selective, top-tier

---

## 🎯 Design Philosophy

### Core Principles

1. **Clarity Over Decoration**
   - Every element serves a purpose
   - No unnecessary ornamentation
   - Information hierarchy is paramount

2. **Contrast Creates Impact**
   - High contrast black/white foundation
   - Gold accents for critical actions
   - Sharp boundaries, no gradients (except intentional)

3. **Motion With Meaning**
   - Animations communicate state changes
   - Transitions feel natural and purposeful
   - Performance is never sacrificed

4. **Mobile-First, Always**
   - Touch-friendly targets (44px minimum)
   - Responsive from 320px to 4K
   - Progressive enhancement

---

## 🌈 Color System

### Primary Palette

```
Deep Black (#0F0F0F)
├─ Primary background for sidebars, cards, and headers
├─ Conveys sophistication and depth
└─ Used for primary text on light backgrounds

Pure White (#FFFFFF)
├─ Primary background for main content areas
├─ Maximum contrast and readability
└─ Used for text on dark backgrounds

Electric Gold (#FFD700)
├─ Primary CTAs and interactive elements
├─ Score highlights and achievements
├─ Active states and success indicators
└─ Brand accent - use sparingly for maximum impact
```

### Supporting Colors

```
Surface Gray (#F8F9FA)
├─ Subtle backgrounds for cards and sections
└─ Alternative to pure white for reduced eye strain

Slate (#64748B)
├─ Secondary text and icons
└─ Borders and dividers

Dark Slate (#1E293B)
├─ Hover states on dark backgrounds
└─ Secondary surfaces

Success Green (#22C55E)
├─ Confirmation states
└─ "Passed" and "Unlocked" indicators

Warning Red (#EF4444)
├─ Error states and destructive actions
└─ Used sparingly
```

### Color Usage Rules

✅ **Do:**
- Use gold exclusively for primary actions
- Maintain 4.5:1 contrast ratio for text
- Use black for text on light backgrounds
- Reserve pure white text for dark backgrounds

❌ **Don't:**
- Use multiple accent colors on the same screen
- Use gold for decorative elements
- Use colored backgrounds for text content
- Mix warm and cool tones

---

## ✍️ Typography

### Font Stack

**Primary Font: Plus Jakarta Sans / Inter**
```css
font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, 
             BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

```
Display: 72px / Bold / -2% tracking
H1:      48px / Bold / -1.5% tracking
H2:      36px / Bold / -1% tracking  
H3:      24px / Semibold / -0.5% tracking
Body:    16px / Regular / 0% tracking
Small:   14px / Regular / 0% tracking
Tiny:    12px / Medium / +2% tracking (uppercase)
```

### Typography Rules

1. **Headlines**: Always bold, sentence case (except acronyms)
2. **Body Text**: 1.6 line-height for readability
3. **Numbers**: Tabular figures for aligned data
4. **Labels**: 12px uppercase with wide tracking

---

## 🧩 UI Components

### Buttons

**Primary (Gold)**
```
Background: #FFD700
Text: #0F0F0F (black)
Padding: 12px 24px
Border: None
Border-radius: 8px
Font: 16px Semibold
Shadow: 0 0 20px rgba(255, 215, 0, 0.3)

Hover: Scale 1.02 + brightness 0.9
```

**Secondary (White on Black)**
```
Background: #FFFFFF
Text: #0F0F0F
Border: 2px solid #FFFFFF
Border-radius: 8px
Padding: 12px 24px

Hover: Background #F8F9FA
```

**Ghost (Outline)**
```
Background: Transparent
Text: #FFFFFF or #0F0F0F (context dependent)
Border: 2px solid current color
Border-radius: 8px
Padding: 12px 24px

Hover: Background rgba(255, 255, 255, 0.05)
```

### Cards

**Elevated Card**
```
Background: #FFFFFF or #1A1A1A
Border: 1px solid rgba(255, 255, 255, 0.1)
Border-radius: 16px
Padding: 24px
Shadow: 0 4px 24px rgba(0, 0, 0, 0.08)

Hover: Translate Y -4px + Shadow increase
```

**Flat Card**
```
Background: #F8F9FA or #1E1E1E
Border: 2px solid #E5E7EB or rgba(255, 255, 255, 0.1)
Border-radius: 12px
Padding: 20px
Shadow: None

Hover: Border color change
```

### Input Fields

```
Background: #FFFFFF or #1E1E1E
Border: 2px solid #E5E7EB
Border-radius: 8px
Padding: 12px 16px
Font: 16px Regular

Focus: Border #FFD700 + Shadow 0 0 0 3px rgba(255, 215, 0, 0.1)
```

---

## 🎬 Motion & Animation

### Animation Principles

1. **Duration**
   - Micro: 150ms (hover, focus)
   - Short: 250ms (transitions)
   - Medium: 400ms (page transitions)
   - Long: 600ms (complex animations)

2. **Easing**
   - Enter: `cubic-bezier(0.16, 1, 0.3, 1)` - Snap out
   - Exit: `cubic-bezier(0.7, 0, 0.84, 0)` - Fade in
   - Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Score updates

3. **Use Cases**
   - **Hover**: Scale, color, shadow changes
   - **Loading**: Skeleton screens, spinners
   - **Success**: Check animations, confetti
   - **Score Updates**: Number counting, radial progress

### Signature Animations

**Radial Score Dial**
```javascript
// Market value score animation
- Initial: Opacity 0, Scale 0.8
- Animate: Rotate from 0° to target angle over 1.2s
- Easing: Bounce
- Color: Gradient based on score (Red → Yellow → Gold)
```

**Card Unlock**
```javascript
- Blur: 20px → 0px over 600ms
- Opacity: 0.3 → 1 over 400ms
- Scale: 0.95 → 1 over 400ms
- Delay: Stagger by 100ms per card
```

---

## 📐 Layout & Spacing

### Grid System

- **Container Max Width**: 1440px
- **Columns**: 12-column grid
- **Gutter**: 24px (desktop), 16px (mobile)
- **Margin**: 48px (desktop), 16px (mobile)

### Spacing Scale

```
4px   → XS  → Tight spacing
8px   → SM  → Icon padding
12px  → MD  → Button padding
16px  → LG  → Card padding
24px  → XL  → Section padding
32px  → 2XL → Component spacing
48px  → 3XL → Section spacing
64px  → 4XL → Hero spacing
```

---

## 🖼️ Iconography

### Style
- **Library**: Lucide React + Material Symbols
- **Weight**: Medium (24px stroke-width: 2px)
- **Size**: 20px (inline), 24px (standalone), 32px (features)
- **Color**: Inherit from parent or explicit

### Icon Usage

✅ **Do:**
- Use for navigation items
- Pair with text labels
- Maintain consistent sizing within a context
- Use filled variants for active states

❌ **Don't:**
- Use decorative icons without purpose
- Mix icon styles (outlined + filled)
- Use icons smaller than 16px

---

## 🎭 Voice & Tone

### Brand Voice

**Professional yet approachable**
- Technical but not jargon-heavy
- Confident without arrogance
- Exclusive but not elitist

### Writing Guidelines

**Headings**: Action-oriented, benefit-focused
```
✅ "Unlock Top-Tier Talent"
❌ "Candidate Database Access"
```

**Microcopy**: Clear, concise, human
```
✅ "Upload your project to boost your score"
❌ "Project upload functionality for market value calculation"
```

**Error Messages**: Helpful, not blaming
```
✅ "Looks like you need to pass the assessment first"
❌ "Error: Assessment not completed"
```

---

## 🎪 Page Patterns

### Landing Page
- **Hero**: Full viewport, split CTA (Recruiter/Candidate)
- **Feature Sections**: Alternating light/dark backgrounds
- **Footer**: Minimal, links centered

### Dashboard
- **Sidebar**: Fixed left, 280px width, black background
- **Main**: Padded content area, white/gray background
- **Navbar**: Sticky top, wallet/profile in top right

### E-commerce (Talent Shop)
- **Grid**: 3 columns (desktop), 2 (tablet), 1 (mobile)
- **Filters**: Sticky sidebar or top bar
- **Cards**: Hover effects, unlock states

---

## 🏆 Best Practices

### Accessibility
- ✅ Minimum 4.5:1 contrast ratio
- ✅ Focus indicators on all interactive elements
- ✅ Keyboard navigation support
- ✅ Alt text for all images
- ✅ ARIA labels for complex interactions

### Performance
- ✅ Lazy load images and components
- ✅ Optimize animations (GPU-accelerated properties)
- ✅ Minimize layout shifts (CLS)
- ✅ Preload critical fonts

### Responsive Design
- ✅ Mobile-first approach
- ✅ Touch targets minimum 44×44px
- ✅ Test on real devices
- ✅ Optimize for slow networks

---

## 📱 Platform-Specific Considerations

### Desktop (1440px+)
- Multi-column layouts
- Hover states prominent
- Sidebar navigation
- Rich animations

### Tablet (768px - 1439px)
- 2-column grids
- Collapsible sidebar
- Touch-optimized targets

### Mobile (< 768px)
- Single column
- Bottom navigation
- Simplified animations
- Reduced shadows

---

## 🎨 Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #FFD700;
  --color-background: #FFFFFF;
  --color-foreground: #0F0F0F;
  --color-surface: #F8F9FA;
  --color-border: #E5E7EB;
  --color-success: #22C55E;
  --color-error: #EF4444;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;
  
  /* Typography */
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 24px;
  --text-2xl: 36px;
  --text-3xl: 48px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  
  /* Borders */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

---

## 🚀 Design Evolution

### Version 0.1.0 (Current - MVP)
- ✅ Core color system established
- ✅ Component library foundation
- ✅ Animation patterns defined
- ✅ Mobile-responsive layouts

### Version 0.2.0 (Planned)
- [ ] Advanced micro-interactions
- [ ] Dark mode refinements
- [ ] Custom illustrations
- [ ] Motion design library

### Future Considerations
- Video backgrounds for hero sections
- 3D elements for premium feel
- Advanced data visualizations
- Personalized theming

---

## 📚 Resources

### Design Files
- Figma: `[Link to Figma workspace]`
- Brand Assets: `[Link to asset repository]`
- Component Storybook: `[Link to Storybook]`

### Inspiration
- Premium SaaS platforms
- High-end e-commerce
- Modern B2B tools
- Minimalist portfolios

---

## 🤝 Contributing to Design

When proposing design changes:
1. Reference this document for consistency
2. Provide visual mockups or prototypes
3. Consider accessibility implications
4. Test on multiple devices
5. Document new patterns added

---

**Last Updated**: December 17, 2025  
**Version**: 0.1.0  
**Maintained by**: QuietHR Design Team

---

*"Design is not just what it looks like and feels like. Design is how it works."* - Steve Jobs

