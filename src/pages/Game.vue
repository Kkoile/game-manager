<template>
  <div class="flex column flex-center">

    <v-stage ref="stage" :config="{width: $q.screen.width, height: $q.screen.height / 5 * 4}">
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
          :hovered="triangle.selected"
          @dragend="handleDragEnd"
          @dragmove="handleDragMove"
          @click="handleClick"
        />
      </v-layer>
    </v-stage>
    <q-btn :disabled="elementsToOperate.length < 2" @click="addElements">+</q-btn>
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
      elementsToOperate: [],
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
    triangleLength () {
      return this.$q.screen.width / this.game.board[0].length
    },
    board () {
      let colorIndex = 0
      const offset = (this.$q.screen.width - this.triangleLength * (this.game.board[0].length - 1)) / 2
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
          triangle.positionX = offset + columnIndex * this.triangleLength / 2
          triangle.positionY = rowIndex * ((Math.sqrt(3) / 2) * this.triangleLength)
          triangle.rowIndex = rowIndex
          triangle.columnIndex = columnIndex
          triangle.direction = (rowIndex % 2 + columnIndex % 2) % 2 === 0 ? 'up' : 'down'
          return triangle
        })
      })
    },
    missingElements () {
      let indexColumn = 0
      let indexRow = 0
      return this.game.missingElements.map((triangle, index) => {
        if (triangle.positionedOnBoard) {
          return triangle
        }
        triangle.index = index
        if (indexColumn * (this.triangleLength + 1) > this.$q.screen.width) {
          indexColumn = 0
          indexRow++
        }
        triangle.originalPositionX = indexColumn * this.triangleLength
        indexColumn++
        triangle.originalPositionY = (indexRow * (Math.sqrt(3) / 2) * this.triangleLength) + this.board.length * ((Math.sqrt(3) / 2) * this.triangleLength) + 50
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
        triangle.positionedOnBoard = true
        triangle.positionX = this.hoveredElement.positionX
        triangle.positionY = this.hoveredElement.positionY
      } else {
        triangle.positionedOnBoard = false
        triangle.positionX = triangle.originalPositionX
        triangle.positionY = triangle.originalPositionY
      }
      this.rerenderMissingTiles()
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
    },
    handleClick (clickedTriangle) {
      if (clickedTriangle.selected) {
        clickedTriangle.selected = false
        const index = this.elementsToOperate.findIndex((triangle) => triangle.index === clickedTriangle.index)
        this.$delete(this.elementsToOperate, index)
      } else {
        clickedTriangle.selected = true
        this.elementsToOperate.push(clickedTriangle)
      }
      this.$set(this.game.missingElements, clickedTriangle.index, clickedTriangle)
    },
    addElements () {
      const valueHypotenuse = this.elementsToOperate.reduce((accumulator, triangle) => accumulator + triangle.valueHypotenuse, 0)
      const valueRight = this.elementsToOperate.reduce((accumulator, triangle) => accumulator + triangle.valueRight, 0)
      const valueLeft = this.elementsToOperate.reduce((accumulator, triangle) => accumulator + triangle.valueLeft, 0)
      const newTriangle = {
        direction: this.elementsToOperate[0].direction,
        valueHypotenuse: valueHypotenuse,
        textHypotenuse: `${valueHypotenuse}`,
        valueLeft: valueLeft,
        textLeft: `${valueLeft}`,
        valueRight: valueRight,
        textRight: `${valueRight}`
      }
      this.elementsToOperate.sort((a, b) => { return b.index - a.index }).forEach((triangle) => {
        this.$delete(this.game.missingElements, triangle.index)
      })
      this.rerenderMissingTiles()
      this.game.missingElements.push(newTriangle)
      this.elementsToOperate = []
    },
    rerenderMissingTiles () {
      this.game.missingElements.forEach((triangle, index) => {
        if (!triangle.positionedOnBoard) {
          triangle.positionX = undefined
          triangle.positionY = undefined
          this.$set(this.game.missingElements, index, triangle)
        }
      })
    }
  }
}
</script>

<style lang='stylus'>

</style>
