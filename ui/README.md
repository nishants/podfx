**How to run with shell**

- With hot reload

  Run `yarn start` in ui and `yarn start` in shell. This will run ui with hot reload. It opens ui using webpack-dev-server as a url.

- Packge app on local

  Run `yarn build` in ui and `yarn make` in app. The fiest command will output build in `../app/assets` so it can be packed with client

- On ci

  Run `yarn build:prod` and copy asseets into `../app/assets`

