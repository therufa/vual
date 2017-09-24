<template lang="pug">
div.modal.modal--large(role="dialog"
  tabindex="-1"
  :class="classModifiers"
  @click="overlayClickListener")
  div.modal-dialog(role="document" @click.stop="")
    .modal-dialog__header
      button.modal-dialog__close-btn(@click="emitClose" v-if="disableCloseButton !== true")
        span(aria-hidden="true" type="button") ×
      slot(name="header")
        h4(class="modal-dialog__header__title" v-if="modalTitle") {{ modalTitle }}
    .modal-dialog__body
      slot {{ modalBody }}
    .modal-dialog__footer
      slot(name="footer")
        button(type="button"
          v-for="button in buttons"
          v-bind="button.attrs"
          @click="bindClickListener(button, $event)"
        ) {{ button.label }}
</template>

<style type="text/scss" lang="scss">
@import './Vual'
</style>

<script charset="utf-8">

export default {
  name: 'vual',
  data () {
    return {
      isOpen: this.open
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validate (size) {
        return ['tiny', 'small', 'large', 'full'].indexOf(size) !== -1
      }
    },
    rtl: Boolean,
    disableCloseButton: Boolean,
    disableOverlayClick: Boolean,
    buttons: Array,
    modalTitle: String,
    modalBody: String
  },
  watch: {
    open (change) {
      this.isOpen = change
    },
    isOpen (change) {
      if (change === false) {
        this.emitClose()
      } else {
        this.emitOpen()
      }
    }
  },
  computed: {
    classModifiers () {
      const modifiers = []

      if (this.isOpen) {
        modifiers.push(this.getModifier('open'))
      }

      if (this.rtl) {
        modifiers.push(this.getModifier('rtl'))
      }

      return modifiers
    }
  },
  methods: {
    getModifier (modifier) {
      return 'modal--' + modifier
    },
    emitClose (meta) {
      this.$emit('close', meta)
    },
    emitOpen (meta) {
      this.$emit('open', meta)
    },
    bindClickListener (button, $event) {
      const handlers = []

      if (button.close) {
        handlers.push(this.emitClose)
      }

      if (button.click) {
        handlers.push(button.click)
      }

      return this.actionButtonListener(handlers, $event)
    },
    actionButtonListener (handler, $event) {
      if (Array.isArray(handler)) {
        handler.forEach(h => h($event))
      } else {
        handler($event)
      }
    },
    overlayClickListener (evt) {
      if (!this.disableOverlayClick) {
        this.emitClose(evt)
      }
    },
    registerTabloop (elements) {
      elements = Array.from(elements)

      elements.forEach(element => element.addEventListener('keydown', e => {
        if (e.keyCode !== 9) return

        let nextTarget = null

        if (e.currentTarget === elements.slice(-1)[0] && !e.shiftKey) {
          nextTarget = elements[0]
        } else if (e.currentTarget === elements[0] && e.shiftKey) {
          nextTarget = elements[elements.length - 1]
        }

        if (nextTarget !== null) {
          nextTarget.focus()
          e.preventDefault()
        }
      }))
    }
  },
  mounted () {
    const elements = this.$el.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]')
    this.$on('open', this.registerTabloop(elements))
  }
}
</script>
