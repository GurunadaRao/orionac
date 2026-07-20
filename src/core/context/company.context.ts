/**
 * company.context.ts
 * Company positioning, vision, mission, and global objectives for Orionac.
 * Source: Company Overview PDF
 */

export const COMPANY = {
  summary:
    "Orionac is a research-first artificial intelligence company focused on advancing AI research and transforming modern education. The company builds foundational AI technologies while creating educational systems to prepare the next generation for an AI-driven world.",

  positioning:
    "Positioned strictly as a research-first AI company rather than a software services organization.",

  philosophy:
    "Rather than acting as a traditional AI service provider, Orionac operates with a long-term research vision, running scientific AI development in lockstep with practical educational initiatives that bridge the gap between academic theory and real-world deployment.",

  vision:
    "To accelerate human progress by advancing artificial intelligence research and redefining how people learn in the age of AI.",

  mission: [
    {
      verb: "Develop",
      description: "Efficient and capable foundation AI models.",
    },
    {
      verb: "Educate",
      description: "Make AI education accessible, practical, and industry-relevant.",
    },
    {
      verb: "Bridge",
      description: "Connect AI research with real-world applications.",
    },
    {
      verb: "Contribute",
      description:
        "Build technologies that contribute to the global advancement of intelligence.",
    },
  ],

  globalObjectives: [
    "Develop world-class foundation models.",
    "Advance efficient AI architectures.",
    "Expand the Iceberg vertical into a globally leading AI education ecosystem.",
    "Collaborate with academia and industry worldwide.",
    "Contribute to the overall scientific progress of AI through research and innovation.",
  ],
} as const;

export type Company = typeof COMPANY;
