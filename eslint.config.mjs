import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config nativo de eslint-config-next 16.
 *
 * Antes se usaba `FlatCompat` sobre `next/core-web-vitals`, pero con ESLint 9
 * eso reventaba con "Converting circular structure to JSON" porque el paquete
 * ya exporta configuración plana.
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
      "scripts/**",
      "public/**",
      "data/photos.json",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
