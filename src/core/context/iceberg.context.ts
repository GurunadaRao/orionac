/**
 * iceberg.context.ts
 * Iceberg Education vertical data — mission, programs, and pipeline steps.
 * Source: Company Overview PDF
 */

export const ICEBERG = {
  summary:
    "Dedicated to modern, project-based AI education. Its mission is to equip students, professionals, educators, and institutions with practical, systems-level AI skills.",

  tagline: "90% of the ecosystem is built beneath the surface—supporting long-term human progress.",

  focusAreas: [
    "AI Literacy",
    "Industry-Ready AI Education",
    "Research-Driven Learning",
    "Project-Based Education",
    "Institutional Partnerships",
    "Student Innovation Programs",
    "Faculty Development",
  ],

  /** The Research → Classroom 3-step pipeline displayed in the Overview page */
  pipeline: [
    {
      num: "01",
      name: "Core Research",
      description: "Our lab creates small-weight localized models.",
    },
    {
      num: "02",
      name: "Translation",
      description:
        "We convert model parameters into practical, project-based courses.",
    },
    {
      num: "03",
      name: "Academic Delivery",
      description:
        "Universities host our curriculum testbeds to train next-generation talent.",
    },
  ],

  /** Ecosystem actors revealed in the Iceberg scroll reveal animation */
  ecosystemLayers: [
    "students",
    "educators",
    "researchers",
    "institutions",
    "innovation",
    "academia",
    "industry",
  ],

  practicalSovereignty:
    "We believe that true AI literacy is built by doing. Through our Iceberg division, we build open curriculum modules and developer programs that guide students and faculty to train, run, and optimize localized models on their own hardware.",

  academicPartnership:
    "We partner with academic institutions to establish structural courses, moving students away from generic consumer APIs toward direct, systems-level intelligence construction.",
} as const;

export type Iceberg = typeof ICEBERG;
