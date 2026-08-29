export interface Coordinates { x: number; y: number; z: number; } export const distance = (a: Coordinates, b: Coordinates): number => Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
