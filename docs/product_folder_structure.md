# Next.js Premium Product Folder Structure (Apple-Style)

This document outlines a world-class folder structure for next-generation product landing pages, drawing inspiration from the technical modularity and feature colocation patterns of premium platforms (like Apple, Stripe, and Vercel).

---

## 1. Core Architecture Strategy: "Feature Colocation"

Instead of organizing your codebase strictly by technical file types (e.g., placing all hooks together, all helpers together, all components together), we organize the directory structure by **Features & Business Domains**. 

This keeps related assets physically close to one another, avoiding file-hunting and minimizing spaghetti code in large systems.

```text
src/
├── app/                      # NEXT.JS ROUTING & PAGES ONLY
│   ├── (shop)/               # Route groups for layout bundling
│   │   ├── products/
│   │   │   └── [id]/         # Dynamic product route
│   │   │       ├── page.tsx  # Server component page entry point
│   │   │       └── layout.tsx# Section-level layouts (e.g., floating summary bar)
│   └── layout.tsx            # Global layout wrapper
│
├── core/                     # GLOBAL SYSTEM SETUP (Framework & Configs)
│   ├── config/               # API clients, system environment constants
│   ├── utils/                # Pure formatting or mathematical utilities
│   └── styles/               # CSS modules, animations, styling variables
│
├── ui/                       # SYSTEM-WIDE DESIGN BLOCKS ("Dumb Components")
│   ├── Button/               # Primary, secondary, outline styles
│   ├── Accordion/            # Primitives for accordion animation
│   ├── Container/            # Standard grid offsets & widths
│   └── Dialog/               # Premium modals, slide-overs
│
├── features/                 # INTERACTIVE PRODUCT BLOCKS & STORIES
│   ├── product-hero/         # Act I & II: Hero presentations
│   │   ├── components/       # Scattered title elements, lens effects
│   │   ├── hooks/            # ScrollTrigger binding sequences
│   │   └── assets/           # Local icons or SVGs
│   │
│   ├── product-specs/        # Act III: Technical grid specs
│   │   ├── components/       # Table nodes, compare sliders
│   │   └── hooks/            # Intersection details for highlights
│   │
│   └── product-iceberg/      # Act IV: Deep ecosystem reveals
│       ├── components/       # Waterline visualizer, item badges
│       └── hooks/            # Animate-in coordinates tracking scroll
│
└── domains/                  # BUSINESS LOGIC & DATA LAYER (Pure TypeScript)
    ├── product/              # Product domain
    │   ├── api/              # Product-specific endpoint calls
    │   ├── types/            # Type interfaces (e.g., Variant, Spec)
    │   └── mappers/          # Translating API responses to client schemas
    └── cart/                 # Cart logic
```

---

## 2. Core Pillars of the Structure

### 1. Simple app/ Folder
The `src/app` folder serves only as the router. It is responsible for parsing routing params, wrapping page modules, fetching initial server data, and assembling layouts. It should not contain complex styles, components, or API utilities directly.

### 2. Feature Colocation
All custom components, custom hooks, and graphical assets used solely by a single feature (e.g., the scattered letter animations in `product-hero`) are stored directly inside the corresponding sub-feature folder:
- **`src/features/product-hero/hooks/useHeroScroll.ts`**
- **`src/features/product-hero/components/TitleSynthesizer.tsx`**

This ensures that deleting or rewriting a section doesn't leave orphaned components scattered throughout the global directory structure.

### 3. Global ui/ Primitives
Shared, UI-only blocks that do not hold any feature logic (like our glassmorphic buttons, inputs, modal containers, and custom scroll wraps) live inside `src/ui/`. Think of this folder as your local implementation of **Radix UI** or **Shadcn/ui** elements.

### 4. Pure business domain/ Separation
The `src/domains/` folder holds code that doesn't care about the UI. It contains TypeScript interfaces, mapper functions (transforming raw API outputs to custom shapes), client fetches, and context containers. This is particularly useful for separating data management from the UI presentation layer.
