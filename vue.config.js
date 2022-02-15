module.exports = {
    
  publicPath: process.env.NODE_ENV === 'production' ? '/newrelic-segment-amplitude/' : '/',  //This is the URL to the assets in github

  devServer: {
    host: 'mylocalhost.com'
  },


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