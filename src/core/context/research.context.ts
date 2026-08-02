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

/**
 * Mirage E-1.0 product data — specs, comparison, architecture, and roadmap.
 * Single source of truth consumed by both the homepage teaser (MirageSpotlight)
 * and the dedicated /research/mirage product page.
 */
export const MIRAGE = {
  disclaimer:
    "Figures below are illustrative pre-release projections based on internal architecture targets, not verified shipped-product specifications.",

  metrics: [
    { label: "Latency Target", value: "< 14ms", detail: "Real-time local inference" },
    { label: "VRAM Footprint", value: "4.2 GB", detail: "Quantized INT4 weights" },
    {
      label: "Efficiency Ratio",
      value: "3.8×",
      detail: "Outperforms standard dense transformers while consuming a fraction of compute overhead.",
    },
    { label: "License Profile", value: "Academic Open-Source", detail: "Open parameter access for research use" },
  ],

  // Baseline values are derived from the 3.8x efficiency ratio above
  // (14ms * 3.8 ≈ 53ms, 4.2GB * 3.8 ≈ 16GB) — internally consistent
  // projections, not disconnected new figures.
  comparison: [
    { metric: "Inference Latency", mirage: "< 14ms", baseline: "~53ms" },
    { metric: "VRAM Footprint", mirage: "4.2 GB", baseline: "~16 GB" },
    { metric: "Efficiency Ratio", mirage: "3.8×", baseline: "1× (reference)" },
    { metric: "Routing", mirage: "Sparse, dynamically routed", baseline: "Dense — all weights active" },
  ],

  architecture: [
    {
      num: "01",
      title: "Sparse Dynamic Routing",
      desc: "Tokens are routed through only the sub-networks they need, bypassing redundant weight paths at inference time.",
    },
    {
      num: "02",
      title: "INT4 Quantized Execution",
      desc: "Compressed weight precision keeps the full model resident in under 4.2GB of VRAM without materially degrading output quality.",
    },
    {
      num: "03",
      title: "Adaptive Weight Pruning",
      desc: "Unused connections are trimmed dynamically, reducing compute overhead relative to a standard dense transformer.",
    },
  ],

  roadmap: [
    { label: "Architecture Research", status: "done" },
    { label: "Internal Benchmarking", status: "done" },
    { label: "Academic Partner Preview", status: "active" },
    { label: "Public Parameter Release", status: "upcoming" },
    { label: "Open Academic License", status: "upcoming" },
  ],
} as const;

export type Mirage = typeof MIRAGE;
