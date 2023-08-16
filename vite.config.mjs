/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    // eslint-disable-next-line comma-dangle
    },
  },
};
