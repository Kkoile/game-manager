<template>
  <div class="flex column">

    <v-stage ref="stage" :config="{width: 600, height: 1000}">
      <v-layer ref="layer">
        <div class="flex row" :key="`board-row-${i}`" v-for="(row, i) in board">
          <div :key="`board-row-${i}-column-${j}`" v-for="(triangle, j) in row">
            <Triangle
              :object="triangle"
              :positionX="triangle.positionX"
              :positionY="triangle.positionY"
              :length="triangleLength"
              :direction="(i % 2 + j % 2) % 2 === 0 ? 'up' : 'down'"
              :color="triangle.color"
              :hovered="hoveredElement === triangle"
            />
          </div>
        </div>
      </v-layer>

      <v-layer>
        <div class="flex row" :key="`missingElement-${i}`" v-for="(triangle, i) in missingElements">
          <Triangle
            :object="triangle"
            :positionX="triangle.positionX"
            :positionY="triangle.positionY"
            :draggable="true"
            :length="triangleLength"
            :direction="triangle.direction"
            :toggle="triangle.toggle"
            @dragend="handleDragEnd"
            @dragmove="handleDragMove"
          />
        </div>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import Triangle from '../components/Triangle'
export default {
  name: 'Game',
  components: {
    Triangle
  },
  data () {
    return {
      hoveredElement: null,
      triangleLength: 200,
      colors: [
        'green',
        'blue',
        'brown',
        'yellow',
        'pink'
      ],
      game: {
        board: [
          [{ filled: true }, { placeholder: true }, { filled: true }],
          [{ placeholder: true }, { filled: true }, { placeholder: true }]
        ],
        missingElements: [
          { direction: 'down', textHypotenuse: '1', textLeft: '2', textRight: '3' },
          { direction: 'down', textHypotenuse: '1', textLeft: '2', textRight: '3' },
          { direction: 'down', textHypotenuse: '1', textLeft: '2', textRight: '3' }
        ]
      }
    }
  },
  computed: {
    board () {
      let colorIndex = 0
      return this.game.board.map((row, rowIndex) => {
        return row.map((triangle, columnIndex) => {
          if (triangle.placeholder) {
            triangle.color = 'lightgrey'
          } else {
            triangle.color = this.colors[colorIndex++]
          }
          triangle.positionX = columnIndex * this.triangleLength / 2
          triangle.positionY = rowIndex * ((Math.sqrt(3) / 2) * this.triangleLength)
          triangle.rowIndex = rowIndex
          triangle.columnIndex = columnIndex
          return triangle
        })
      })
    },
    missingElements () {
      return this.game.missingElements.map((triangle, index) => {
        triangle.index = index
        triangle.originalPositionX = index * this.triangleLength
        triangle.originalPositionY = this.board.length * ((Math.sqrt(3) / 2) * this.triangleLength) + 50
        triangle.positionX = !isNaN(triangle.positionX) ? triangle.positionX : triangle.originalPositionX
        triangle.positionY = !isNaN(triangle.positionY) ? triangle.positionY : triangle.originalPositionY
        return triangle
      })
    }
  },
  methods: {
    handleDragEnd (triangle) {
      if (this.hoveredElement) {
        triangle.positionX = this.hoveredElement.positionX
        triangle.positionY = this.hoveredElement.positionY
      } else {
        triangle.positionX = triangle.originalPositionX
        triangle.positionY = triangle.originalPositionY
      }
      triangle.toggle = !triangle.toggle
      this.hoveredElement = null
      this.$set(this.game.missingElements, triangle.index, triangle)
    },
    handleDragMove (triangle, event) {
      const shape = this.$refs.layer.getNode().getIntersection(event.evt)
      if (shape) {
        const object = shape.getAttr('object')
        this.hoveredElement = object
      } else {
        this.hoveredElement = null
      }
    }
  }
}
</script>

<style lang='stylus'>

</style>
