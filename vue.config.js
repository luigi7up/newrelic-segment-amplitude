module.exports = {
    
  publicPath: process.env.NODE_ENV === 'production' ? '/newrelic-segment-amplitude/' : '/',

    css: {
      loaderOptions: {
        sass: {
          additionalData: `
            @import "@/assets/scss/app.scss";
          `
        }
      }
    }
  };