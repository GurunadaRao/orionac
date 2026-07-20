/**
 * research.context.ts
 * AI Research vertical data — focus areas, principles, and the Mirage E-1.0 model release.
 * Source: Company Overview PDF
 */

export const RESEARCH = {
  summary:
    "Focuses on developing next-generation foundation models, efficient AI architectures, and research-driven systems designed for real-world deployment. Emphasizes efficiency, scalability, and practical intelligence over brute-force increases in model/parameter size.",

  principles: [
    {
      label: "Research before Commercialization",
      description: "Scientific inquiry leads every development decision.",
    },
    {
      label: "Efficient Intelligence over Brute-Force Scaling",
      description:
        "Designing lightweight, resource-conscious models that run efficiently on the edge or localized hardware.",
    },
    {
      label: "Open Collaboration with Academia",
      description: "Deep partnerships with universities drive our research forward.",
    },
    {
      label: "Real-World Impact through Applied AI",
      description: "Every research output must translate to practical, measurable usage.",
    },
  ],

  focusAreas: [
    "Foundation Language Models",
    "Efficient Model Architectures",
    "Edge AI",
    "AI Systems Engineering",
    "Applied Machine Learning",
    "Agentic AI Systems",
  ],

  expertise: [
    "Artificial Intelligence Research",
    "Foundation Models",
    "Machine Learning",
    "Edge AI",
    "Agentic AI",
    "Modern AI Education",
    "Academic Collaboration",
    "AI Systems Engineering",
  ],

  upcomingRelease: {
    name: "Mirage E-1.0",
    type: "Foundation Model",
    status: "Public parameter release within the next three months",
    significance:
      "Represents Orionac's first public research release, demonstrating a focus on efficient AI systems and modern model architectures.",
  },
} as const;

export type Research = typeof RESEARCH;
