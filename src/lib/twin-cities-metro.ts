/**
 * Service-area ring: Minneapolis, St. Paul, north/east metro, Chisago, plus
 * Bloomington, Eagan, Edina, Hopkins, St. Louis Park, Golden Valley, Crystal, Brooklyn Park, Plymouth.
 * Leaflet [lat, lng].
 */
export const twinCitiesMetroRing: [number, number][] = [
  [45.67, -93.12],
  [45.67, -92.88],
  [45.55, -92.74],
  [45.3, -92.74],
  [45.05, -92.74],
  [44.84, -92.76],
  [44.8, -92.85],
  [44.78, -93.1],
  [44.8, -93.22],
  [44.8, -93.35],
  [44.86, -93.4],
  [44.92, -93.43],
  [44.975, -93.48],
  [44.99, -93.55],
  [45.045, -93.55],
  [45.08, -93.48],
  [45.1, -93.45],
  [45.14, -93.45],
  [45.25, -93.48],
  [45.32, -93.42],
  [45.32, -93.2],
  [45.41, -93.12],
  [45.55, -93.12],
];

export const twinCitiesAnchors: { name: string; position: [number, number] }[] = [
  { name: "Minneapolis", position: [44.9778, -93.265] },
  { name: "St. Paul", position: [44.9537, -93.09] },
];
