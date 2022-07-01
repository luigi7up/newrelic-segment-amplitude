

## Local setup

```
yarn install
```




### Running localy

Segment JS doesn't accept events coming from github, localhost etc. so we need to add our custome domain to the etc/hosts

In the terminal run `sudo vi /etc/hosts`

Add this line `127.0.0.1 mylocalhost.com`

Start the server 

`yarn serve  --open --public mylocalhost.com --port 80` 

and go to the `mylocalhost.com:PORT`



### Production

Everything pushed to the `MASTER` branch will automatically be deployed to `https://app.netlify.com/teams/luigi7up/overview`

Check it out at `https://inspiring-villani-7a78ad.netlify.app/`

