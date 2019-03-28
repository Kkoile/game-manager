<template>
  <div>
    <div class="triangle" :class="direction" :style="backgroundColor">
      <div class="hypotenuse">
        {{textHypotenuse}}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Triangle',
  props: {
    direction: {
      required: true
    },
    color: {
      default: 'tomato'
    },
    'textHypotenuse': {
      default: ''
    },
    'textLeft': {
      default: ''
    },
    'textRight': {
      default: ''
    }
  },
  computed: {
    backgroundColor () {
      const styleObject = {}
      let borderElement = null
      switch (this.direction) {
        case 'right':
          borderElement = 'left'
          break
        case 'down':
          borderElement = 'top'
          break
        case 'left':
          borderElement = 'right'
          break
        case 'up':
          borderElement = 'bottom'
          break
      }
      styleObject[`border-${borderElement}-color`] = this.color
      return styleObject
    }
  }
}
</script>

<style lang='stylus'>
  .triangle
    width 0rem
    height 0rem

    &.right
      border-left 5rem solid tomato
      border-top 5rem solid transparent
      border-bottom 5rem solid transparent

    &.down
      border-left 5rem solid transparent
      border-right 5rem solid transparent
      border-top 5rem solid transparent

    &.left
      border-right 5rem solid transparent
      border-top 5rem solid transparent
      border-bottom 5rem solid transparent

    &.up
      border-left 5rem solid transparent
      border-right 5rem solid transparent
      border-bottom 5rem solid transparent

  .hypotenuse
    bottom 0
</style>
