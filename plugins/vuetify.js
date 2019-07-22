import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify, {
  customProperties: true,
  lang: {
    locales: {
      ru
    },
    current: 'ru'
  }
})
