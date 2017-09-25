import Vue from 'vue'
import VualComponent from './Vual'

export default function Vual (settings = {}) {
  const vualWrapper = document.createElement('div')
  const vualContainer = document.createElement('div')
  vualWrapper.appendChild(vualContainer)
  document.body.appendChild(vualWrapper)

  settings = Object.assign({}, Vual.defaultSettings, settings)

  /* eslint-disable no-new */
  new Vue({
    el: vualContainer,
    render: h => h(VualComponent, {
      props: {
        ...settings.props,
        modalTitle: settings.title,
        modalFooter: settings.footerContent
      },
      on: {
        open (evt) {
          settings.events.open(evt)
        },
        close (evt) {
          document.body.removeChild(vualWrapper)
          settings.events.close(evt)
        }
      }
    }, [
      settings.content
    ])
  })
}

Vual.install = function install (Vue) {
  Vue.component('vual', VualComponent)
}

Vual.defaultSettings = {
  events: {
    open: () => {},
    close: () => {}
  },
  content: null,
  title: null,
  footerContent: null,
  props: {
    buttons: undefined,
    disableCloseButton: false,
    disableEscKey: false,
    disableOverlayClick: false,
    open: true,
    rtl: false,
    size: undefined
  }
}
