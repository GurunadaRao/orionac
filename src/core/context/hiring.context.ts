/**
 * hiring.context.ts
 * Current open roles and hiring information for Orionac.
 * Source: Company Overview PDF
 */

export const HIRING = {
  openRoles: [
    {
      id: "commercial-director-iceberg",
      title: "Commercial Director",
      division: "Iceberg",
      type: "Leadership",
      description:
        "A leadership role responsible for driving strategic partnerships, institutional collaborations, business development, and commercial growth for the Iceberg education vertical.",
      responsibilities: [
        "Drive strategic partnerships with academic institutions",
        "Lead institutional collaborations and business development",
        "Accelerate commercial growth of the Iceberg education vertical",
        "Build and manage a high-performing commercial team",
      ],
    },
  ],

  ctaCopy: "Collaborate with us. Shape the research of tomorrow.",
  contactEmail: "hello@orionac.io",
} as const;

export type Hiring = typeof HIRING;
