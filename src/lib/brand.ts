import brand from "./brand.json";

export { brand };
export const logoSvg = (color = brand.faviconBackground) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>${brand.name} mark</title><path d="${brand.markPath}" fill="${color}"/></svg>`;
