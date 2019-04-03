<template>
    <v-shape ref="shape" :config="configTriangle" @dragstart="handleDragStart" @dragend="handleDragEnd" @dragmove="handleDragMove" />
</template>

<script>
export default {
  name: 'Triangle',
  props: {
    object: {
      required: true
    },
    direction: {
      required: true
    },
    color: {
      default: 'tomato'
    },
    length: {
      default: 200
    },
    positionX: {
      default: 0
    },
    positionY: {
      default: 0
    },
    draggable: {
      default: false
    },
    textHypotenuse: {
      default: ''
    },
    textLeft: {
      default: ''
    },
    textRight: {
      default: ''
    },
    hovered: {
      default: false
    },
    toggle: {
      default: false
    }
  },
  computed: {
    height () {
      return (Math.sqrt(3) / 2) * this.length
    },
    configTriangle () {
      const offset = this.toggle ? 1 : 0
      return {
        x: this.positionX - offset,
        y: this.positionY - offset,
        object: this.object,
        fill: this.color,
        draggable: this.draggable,
        sceneFunc: (context, shape) => {
          context.beginPath()
          switch (this.direction) {
            case 'right':
              context.moveTo(0 + offset, 0 + offset)
              context.lineTo(this.height + offset, (this.length / 2) + offset)
              context.lineTo(0 + offset, this.length + offset)
              break
            case 'up':
              context.moveTo(0 + offset, this.height + offset)
              context.lineTo((this.length / 2) + offset, 0 + offset)
              context.lineTo(this.length + offset, this.height + offset)
              break
            case 'left':
              context.moveTo(this.height + offset, this.length + offset)
              context.lineTo(0 + offset, (this.length / 2) + offset)
              context.lineTo(this.height + offset, 0 + offset)
              break
            case 'down':
              context.moveTo(this.length + offset, 0 + offset)
              context.lineTo((this.length / 2) + offset, this.height + offset)
              context.lineTo(0 + offset, 0 + offset)
              break
          }
          context.closePath()
          context.fillStrokeShape(shape)
        },
        stroke: 'green',
        strokeWidth: 10,
        strokeEnabled: !!this.hovered
      }
    },
    leftTextStyle () {
      switch (this.direction) {
        case 'up':
        case 'right':
          return { transform: 'rotate(-60deg) translateX(50%)' }
        case 'left':
        case 'down':
          return { transform: 'rotate(120deg) translateX(-50%)' }
      }
      return {}
    },
    rightTextStyle () {
      switch (this.direction) {
        case 'up':
        case 'left':
          return { transform: 'rotate(60deg) translateX(-50%)' }
        case 'down':
        case 'right':
          return { transform: 'rotate(-120deg) translateX(50%)' }
      }
      return {}
    },
    bottomTextStyle () {
      switch (this.direction) {
        case 'up':
        case 'right':
        case 'left':
          return { transform: 'translateX(-50%) translateY(-50%)' }
        case 'down':
          return { transform: 'rotate(180deg) translateX(50%) translateY(50%)' }
      }
      return {}
    }
  },
  methods: {
    handleDragStart (event) {
      this.$emit('dragstart', this.object, event)
    },
    handleDragEnd (event) {
      this.$emit('dragend', this.object, event)
    },
    handleDragMove (event) {
      this.$emit('dragmove', this.object, event)
    }
  }
}
</script>

<style lang='stylus'>
  .text
    position absolute

  .leftInner
    left 25%
    top 50%

  .rightInner
    right 25%
    top 50%

  .bottomOuter
    left 50%
    bottom 0

</style>
