<template>
  <div class="modal">
    <perfect-scrollbar class="modal__overlay" @click="overlayClickHandler">
      <div class="modal__body">
        <button
          type="button"
          class="modal__close"
          @click="closeButtonClickHandler"
        >
          <icon id="close" />
        </button>
        <h3 class="modal__title">{{ title }}</h3>
        <p v-if="desc" class="modal__desc">{{ desc }}</p>
        <div class="modal__content">
          <slot />
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon'

export default {
  name: 'Modal',
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    onClose: {
      type: Function,
    },
  },
  methods: {
    overlayClickHandler(e) {
      if (e.target.classList.contains('modal__overlay')) {
        this.onClose()
      }
    },
    closeButtonClickHandler() {
      this.onClose()
    },
  },
}
</script>
