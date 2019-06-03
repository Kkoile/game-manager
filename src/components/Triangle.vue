<template>
  <v-group :config="configGroup" @click="handleClick" @dragend="handleDragEnd" @dragmove="handleDragMove" @dragstart="handleDragStart" @tap="handleClick" ref="node" >
    <v-shape ref="shape" :config="configTriangle"/>
    <v-text :config="configBottomText"/>
    <v-text :config="configLeftText"/>
    <v-text :config="configRightText"/>
  </v-group>
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
    },
    visible: {
      default: true
    }
  },
  computed: {
    height () {
      return (Math.sqrt(3) / 2) * this.length
    },
    rotation () {
      switch (this.direction) {
        case 'up':
          return 0
        case 'right':
          return 90
        case 'down':
          return 180
        case 'left':
          return -90
      }
      return 0
    },
    configGroup () {
      const offset = this.toggle ? 1 : 0
      return {
        draggable: this.draggable,
        x: this.positionX + this.length / 2 + offset,
        y: this.positionY + this.height / 2 + offset,
        rotation: this.rotation,
        visible: this.visible
      }
    },
    configTriangle () {
      return {
        object: this.object,
        fill: this.color,
        sceneFunc: (context, shape) => {
          const offset = this.toggle ? 1 : 0
          context.beginPath()
          context.moveTo(-1 * (this.length / 2) + offset, this.height / 2 + offset)
          context.lineTo(offset, -this.height / 2 + offset)
          context.lineTo(this.length / 2 + offset, this.height / 2 + offset)
          context.closePath()
          context.fillStrokeShape(shape)
        },
        stroke: 'green',
        strokeWidth: 10,
        strokeEnabled: !!this.hovered
      }
    },
    configBottomText () {
      const config = {
        text: this.textHypotenuse,
        fontSize: 15
      }
      switch (this.direction) {
        case 'up':
        case 'right':
        case 'left':
          config.x = 0
          config.y = this.height / 2 - config.fontSize
          break
        case 'down':
          config.x = 0
          config.y = this.height / 2
          config.rotation = 180
          break
      }
      return config
    },
    configLeftText () {
      const config = {
        text: this.textLeft,
        fontSize: 15
      }
      switch (this.direction) {
        case 'up':
          config.x = -this.length / 4
          config.y = config.fontSize
          config.rotation = -60
          break
        case 'down':
          config.x = -this.length / 4
          config.y = 0
          config.lineHeight = -1
          config.rotation = 120
          break
        case 'right':
          config.x = -this.length / 4
          config.y = 0
          config.rotation = -60
          break
        case 'left':
          config.x = -this.length / 4
          config.y = 0
          config.lineHeight = -1
          config.rotation = 120
          break
      }
      return config
    },
    configRightText () {
      const config = {
        text: this.textRight,
        fontSize: 15
      }
      switch (this.direction) {
        case 'up':
          config.x = this.length / 4
          config.y = 0
          config.rotation = 60
          break
        case 'down':
          config.x = this.length / 4
          config.y = 0
          config.lineHeight = -1
          config.rotation = -120
          break
        case 'right':
          config.x = this.length / 4
          config.y = 0
          config.lineHeight = -1
          config.rotation = -120
          break
        case 'left':
          config.x = this.length / 4
          config.y = 0
          config.rotation = 60
          break
      }
      return config
    }
  },
  methods: {
    moveTo (x, y) {
      this.$refs.node.getNode().to({ x: (this.length / 2) + x, y: this.height / 2 + y })
    },
    applyCorrdinatesToEvent (event) {
      event.evt.x = event.evt.type === 'mousemove' ? event.evt.x : event.evt.changedTouches[0].clientX
      event.evt.y = event.evt.type === 'mousemove' ? event.evt.y : event.evt.changedTouches[0].clientY
    },
    handleDragStart (event) {
      this.applyCorrdinatesToEvent(event)
      this.$emit('dragstart', this.object, event)
    },
    handleDragEnd (event) {
      this.applyCorrdinatesToEvent(event)
      this.$emit('dragend', this.object, event)
    },
    handleDragMove (event) {
      this.applyCorrdinatesToEvent(event)
      this.$emit('dragmove', this.object, event)
    },
    handleClick (event) {
      this.$emit('click', this.object, event)
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
