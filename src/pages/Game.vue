<template>
  <div class="flex column">

    <v-stage ref="stage" :config="{width: 10000, height: 1000}">
      <v-layer ref="layer">
        <div class="flex row" :key="`board-row-${i}`" v-for="(row, i) in board">
          <div :key="`board-row-${i}-column-${j}`" v-for="(triangle, j) in row">
            <Triangle
              :object="triangle"
              :positionX="triangle.positionX"
              :positionY="triangle.positionY"
              :length="triangleLength"
              :direction="triangle.direction"
              :text-hypotenuse="triangle.textHypotenuse"
              :text-left="triangle.textLeft"
              :text-right="triangle.textRight"
              :color="triangle.color"
              :hovered="hoveredElement === triangle"
            />
          </div>
        </div>
      </v-layer>

      <v-layer ref="missingElements">
        <Triangle
          :key="`missingElement-${i}`" v-for="(triangle, i) in missingElements"
          :object="triangle"
          :positionX="triangle.positionX"
          :positionY="triangle.positionY"
          :draggable="true"
          :length="triangleLength"
          :direction="triangle.direction"
          :text-hypotenuse="triangle.textHypotenuse"
          :text-left="triangle.textLeft"
          :text-right="triangle.textRight"
          :toggle="triangle.toggle"
          @dragend="handleDragEnd"
          @dragmove="handleDragMove"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import Triangle from '../components/Triangle'
import MyStorage from '../lib/storage'
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
      game: {}
    }
  },
  beforeMount () {
    this.loadGame(this.$route.params.identifier)
  },
  computed: {
    board () {
      let colorIndex = 0
      return this.game.board.map((row, rowIndex) => {
        return row.map((triangle, columnIndex) => {
          if (triangle.placeholder) {
            triangle.color = 'lightgrey'
            if (columnIndex > 0 && row[columnIndex - 1].valueRight) {
              triangle.valueRight = row[columnIndex - 1].valueRight
            }
            if (columnIndex < row.length - 2 && row[columnIndex + 1].valueLeft) {
              triangle.valueLeft = row[columnIndex + 1].valueLeft
            }
            if (rowIndex > 0) {
              const previousRow = this.game.board[rowIndex - 1]
              if (columnIndex < previousRow.length && previousRow[columnIndex].valueHypotenuse) {
                triangle.valueHypotenuse = previousRow[columnIndex].valueHypotenuse
              }
            }
          } else {
            triangle.color = this.colors[colorIndex++]
          }
          triangle.positionX = columnIndex * this.triangleLength / 2
          triangle.positionY = rowIndex * ((Math.sqrt(3) / 2) * this.triangleLength)
          triangle.rowIndex = rowIndex
          triangle.columnIndex = columnIndex
          triangle.direction = (rowIndex % 2 + columnIndex % 2) % 2 === 0 ? 'up' : 'down'
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
    loadGame (identifier) {
      this.game = MyStorage.loadGame(identifier)
    },
    trianglesMatch (placeholder, movedTriangle) {
      if (placeholder.valueHypotenuse && placeholder.valueHypotenuse !== movedTriangle.valueHypotenuse) {
        return false
      }
      if (placeholder.valueLeft && placeholder.valueLeft !== movedTriangle.valueLeft) {
        return false
      }
      if (placeholder.valueRight && placeholder.valueRight !== movedTriangle.valueRight) {
        return false
      }
      return true
    },
    handleDragEnd (triangle, event) {
      if (this.hoveredElement && this.trianglesMatch(this.hoveredElement, triangle)) {
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
        if (object.placeholder) {
          this.hoveredElement = object
        } else {
          this.hoveredElement = null
        }
      } else {
        this.hoveredElement = null
      }
    }
  }
}
</script>

<style lang='stylus'>

</style>
