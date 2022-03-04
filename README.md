# newrelic-prototype

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development

Segment JS doesn't accept events coming from github, localhost etc. so we need to add our custome domain to the etc/hosts

In the terminal run `sudo vi /etc/hosts`

Add this line `127.0.0.1 mylocalhost.com`

and then start the server `yarn serve  --open --public mylocalhost.com --port 80` and go to the `mylocalhost.com:PORT`

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
