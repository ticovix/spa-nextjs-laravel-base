const withImages = require("next-images");
const withStyles = require("@webdeb/next-styles");

const customExports = {
  publicRuntimeConfig: {
    api: {
      baseUrl: process.env.API_BASE_URL,
      minutesToRefreshToken: process.env.API_MINUTES_TO_REFRESH_TOKEN,
    },
  },
};

module.exports = withImages(
  withStyles({
    ...customExports,
    less: true, // use .less files
    sass: true, // use .scss files
    modules: true, // style.(m|module).css & style.(m|module).scss for module files
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    sassLoaderOptions: {
      sassOptions: {
        includePaths: ["src/assets/styles"], // @import 'variables'; # loads (src/styles/varialbes.scss), you got it..
      },
    },
  })
);
