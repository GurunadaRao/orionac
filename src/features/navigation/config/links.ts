export interface LinkItem {
  label: string;
  href: string;
}

export interface NavigationColumn {
  title: string;
  links: LinkItem[];
}

export const NAVIGATION_LINKS: Record<'research' | 'iceberg' | 'company' | 'contact', NavigationColumn> = {
  research: {
    title: "Research",
    links: [
      { label: "Foundation Models", href: "/research/foundation-models" },
      { label: "Mirage E-1.0", href: "/research/mirage" },
      { label: "Efficient Architectures", href: "/research/efficient-architectures" },
      { label: "Edge AI", href: "/research/edge-ai" },
      { label: "Agentic Systems", href: "/research/agentic-systems" }
    ]
  },
  iceberg: {
    title: "Iceberg",
    links: [
      { label: "Overview", href: "/iceberg/overview" },
      { label: "AI Literacy", href: "/iceberg/ai-literacy" },
      { label: "Institutional Partnerships", href: "/iceberg/partnerships" },
      { label: "Student Programs", href: "/iceberg/student-programs" },
      { label: "Faculty Development", href: "/iceberg/faculty-development" }
    ]
  },
  company: {
    title: "Company",
    links: [
      { label: "About Orionac", href: "/company/about" },
      { label: "Research Philosophy", href: "/company/philosophy" },
      { label: "Vision & Mission", href: "/company/vision" },
      { label: "Academic Collaborations", href: "/company/collaborations" }
    ]
  },
  contact: {
    title: "Contact",
    links: [
      { label: "Get in Touch", href: "/contact" },
      { label: "Partner with Us", href: "/contact" },
      { label: "Open Roles", href: "/contact" },
      { label: "hello@orionac.io", href: "mailto:hello@orionac.io" }
    ]
  }
};
