This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
Visit to see the documentation.

## React Ducks CookieCutter

This cookiecutter comes armed with [react](https://reactjs.org/), [redux](https://redux.js.org/), [redux-saga](https://redux-saga.js.org/), [jest](https://facebook.github.io/jest/) and is sent by the [ducks](https://github.com/erikras/ducks-modular-redux) army.

## Usage

`cookiecutter gh:lainnie/cookiecutter-react-ducks`

`cd my_project`

`git init`

`echo API_URL=https://your.api > .env.dev`

`yarn`

`yarn run test`

`yarn run start`

## Troubleshooting

If when launching `yarn run test/start` you have a crash, it is possible that you hit the limit of files watched, depending on your OS of choice look for a way to increase it.

Arch Linux: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
