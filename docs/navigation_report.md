# Orionac Information Architecture & Navigation Report

This document extracts and audits all active navigation channels, menu tabs, dynamic dropdown panels, and sitemap footer links configured across the Orionac platform.

---

## 1. Primary Navigation Tabs (Navbar)

The sticky capsule header hosts four master tabs, which trigger full-width Apple-style multi-column dropdown panels on hover:

### I. Research
*   **Explore**:
    *   [Foundation Models](#research)
    *   [Mirage E-1.0](#research)
    *   [Edge AI](#research)
*   **Architectures**:
    *   [Efficient Architectures](#research)
    *   [Agentic Systems](#research)
*   **Resources**:
    *   [Research Papers](#research)
    *   [Technical Metrics](#research)
*   **Status Highlight**:
    *   *Mirage E-1.0 public parameter release window (3 months).*

### II. Iceberg
*   **Ecosystem**:
    *   [Overview](#iceberg)
    *   [AI Literacy](#iceberg)
*   **Networks**:
    *   [Institutional Partnerships](#iceberg)
    *   [Academic Grants](#iceberg)
*   **Programs**:
    *   [Student Programs](#iceberg)
    *   [Faculty Development](#iceberg)
*   **Status Highlight**:
    *   *Sponsoring real-world educational classroom deployments.*

### III. Company
*   **About**:
    *   [About Orionac](#company)
    *   [Research Philosophy](#company)
*   **Foundations**:
    *   [Vision & Mission](#company)
    *   [Academic Collaborations](#company)
*   **Status Highlight**:
    *   *Chennai HQ sponsoring global open academic collaborations.*

### IV. Contact
*   **Inquiries**:
    *   [Get in Touch](#join)
    *   [Partner with Us](#join)
*   **Opportunities**:
    *   [Open Roles](#join)
*   **Direct Channel**:
    *   [hello@orionac.io](mailto:hello@orionac.io)

---

## 2. Sitemap Index (Footer Links)

The sitemap footer index duplicates the active architecture categories in a flat column layout for direct access, sourced from `NAVIGATION_LINKS` configuration in **[links.ts](file:///c:/Users/gurun/Documents/PROJECTS/hota-projects/rappa/src/features/navigation/config/links.ts)**:

| Category | Sitemapped Links | Target Destination |
| :--- | :--- | :--- |
| **Research** | Foundation Models, Mirage E-1.0, Efficient Architectures, Edge AI, Agentic Systems | `#research` anchors |
| **Iceberg** | Overview, AI Literacy, Institutional Partnerships, Student Programs, Faculty Development | `#iceberg` anchors |
| **Company** | About Orionac, Research Philosophy, Vision & Mission, Academic Collaborations | `#company` anchors |
| **Contact** | Get in Touch, Partner with Us, Open Roles, hello@orionac.io | `#join` anchors / mailto |

---

## 3. Social Media Presence & Utility Controls

Embedded within the footer are interactive connection widgets:
- **Mac-Style Social Dock**: Animated floating icons carrying dynamic brand color glows:
  - **GitHub**: [github.com](https://github.com) (`#181717`)
  - **LinkedIn**: [linkedin.com](https://linkedin.com) (`#0077B5`)
  - **X (Twitter)**: [x.com](https://x.com) (`#000000`)
  - **Discord**: [discord.gg](https://discord.gg) (`#5865F2` via inline SVG)
  - **YouTube**: [youtube.com](https://youtube.com) (`#FF0000`)
- **Metadata Sizing**:
  - [Privacy Policy](#privacy)
  - [Terms of Service](#terms)
  - **Back to Top** smooth-scroll control anchor.
