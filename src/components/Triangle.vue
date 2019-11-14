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
    strokeColor: {
      default: 'green'
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
  data () {
    return {
      isDragged: false
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
          let offset = this.toggle ? 1 : 0
          if (this.direction === 'up') {
            offset = offset * -1
          }
          context.beginPath()
          context.moveTo(-1 * (this.length / 2) + offset, this.height / 2 + offset)
          context.lineTo(offset, -this.height / 2 + offset)
          context.lineTo(this.length / 2 + offset, this.height / 2 + offset)
          context.closePath()
          context.fillStrokeShape(shape)
        },
        stroke: this.strokeColor,
        strokeWidth: 8,
        strokeEnabled: !!this.hovered
      }
    },
    configText () {
      return {
        fontSize: 18,
        fontFamily: 'Inter',
        fontFeatureSettings: "'tnum' 1, 'frac' 1",
        fill: '#fff'
      }
    },
    configBottomText () {
      const config = {
        ...this.configText,
        text: this.textHypotenuse
      }
      switch (this.direction) {
        case 'up':
        case 'right':
        case 'left':
          config.x = -config.text.length * config.fontSize / 4
          config.y = this.height / 2 - config.fontSize
          break
        case 'down':
          config.x = config.text.length * config.fontSize / 4
          config.y = this.height / 2
          config.rotation = 180
          break
      }
      return config
    },
    configLeftText () {
      const config = {
        ...this.configText,
        text: this.textLeft
      }
      switch (this.direction) {
        case 'up':
          config.x = -this.length / 4
          config.y = 1 / 3 * config.fontSize
          config.rotation = -60
          break
        case 'down':
          config.x = -this.length / 4
          config.y = -1 / 3 * config.fontSize
          config.lineHeight = -1.5
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
        ...this.configText,
        text: this.textRight
      }
      switch (this.direction) {
        case 'up':
          config.x = this.length / 4
          config.y = 0
          config.rotation = 60
          config.lineHeight = 1.5
          break
        case 'down':
          config.x = this.length / 4
          config.y = 0
          config.lineHeight = -1.5
          config.rotation = -120
          break
        case 'right':
          config.x = this.length / 4
          config.y = 0
          config.lineHeight = -1.5
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
    applyCoordinatesToEvent (event) {
      event.evt.x = event.evt.type === 'mousemove' ? event.evt.x : event.evt.changedTouches[0].clientX
      event.evt.y = event.evt.type === 'mousemove' ? event.evt.y : event.evt.changedTouches[0].clientY
    },
    handleDragStart (event) {
      this.applyCoordinatesToEvent(event)
      this.isDragged = true
      this.$emit('dragstart', this.object, event)
    },
    handleDragEnd (event) {
      this.applyCoordinatesToEvent(event)
      this.isDragged = false
      this.$emit('dragend', this.object, event)
    },
    handleDragMove (event) {
      this.applyCoordinatesToEvent(event)
      this.$emit('dragmove', this.object, event)
    },
    handleClick (event) {
      this.$emit('click', this.object, event)
    },
    intersects (point) {
      return this.$refs.shape.getNode().intersects(point)
    }
  }
}
</script>
