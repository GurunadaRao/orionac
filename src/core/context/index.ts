/**
 * src/core/context/index.ts
 * Barrel export — import any site-wide content context from "@/core/context".
 *
 * Usage:
 *   import { BRAND, COMPANY, RESEARCH, ICEBERG, HIRING } from "@/core/context";
 */

export { BRAND } from "./brand.context";
export type { Brand } from "./brand.context";

export { COMPANY } from "./company.context";
export type { Company } from "./company.context";

export { RESEARCH, MIRAGE } from "./research.context";
export type { Research, Mirage } from "./research.context";

export { ICEBERG } from "./iceberg.context";
export type { Iceberg } from "./iceberg.context";

export { HIRING } from "./hiring.context";
export type { Hiring } from "./hiring.context";
