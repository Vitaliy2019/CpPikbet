import {
  HubConnectionBuilder,
  LogLevel
} from '@aspnet/signalr'

/*import {
  getToken
} from '~/assets/js/auth'*/
//const apiUrl = process.env.API_URL || 'https://localhost:5001'
const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api.pikbet.ru'
console.log("process.env", process.env.NODE_ENV)

export default () => {
  const hub = new HubConnectionBuilder()
    .withUrl(`${apiUrl}/hub`
      /*, {
            accessTokenFactory: function () {
              console.log('Getting token for hub')
              return getToken()
            }
          }*/
    )
    .configureLogging(LogLevel.Information)
    .build()

  //inject('hub', hub)

  hub.on('ConnectedOn', res => {
    console.log('Соединились', JSON.stringify(res))
  })

  hub.on('ReceiveMessage', res => {
    debugger
    console.log('Received message from signalr', JSON.stringify(res))
  })

  hub.start().catch(function (err) {
    return console.error("err", err)
  })

  // with reconnect capability (async/await, not IE11 compatible)
  async function start() {
    try {
      console.log('Попытка переподключения')
      debugger
      await hub.start()
    } catch (err) {
      console.log(err)
      setTimeout(() => start(), 5000)
    }
  }

  hub.onclose(async () => {
    await start()
  })

  // sample sending of message
  /*
  hub
    .invoke('SendMessageToOthers', {
      action: action,
      data: Object.assign(
        { user: get(store, 'getters.loggedUser.name') },
        message
      )
    })
    .catch(err => console.error(err.toString()))
  */
}
