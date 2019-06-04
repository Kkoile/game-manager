<template>
  <div class="flex justify-around items-center container column">
    <q-btn @click="$router.go(-1)" class="closeButton" flat icon="close" />
    <div class="flex flex-center" v-if="won">
      <h2 align="center">Solved!</h2>
    </div>
    <v-stage :config="{width: $q.screen.width, height: $q.screen.height - 200}" ref="stage">
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
          :ref="`missingElement-${i}`"
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
          :visible="!triangle.combined"
          @dragend="handleDragEnd"
          @dragmove="handleDragMove"
          @click="handleClick"
        />
      </v-layer>
    </v-stage>
    <div class="operationButtons" v-if="!won && elementsToOperate.length > 1">
      <q-btn :disabled="elementsToOperate.length < 2" @click="addElements" color="primary" icon="add" round size="2rem"/>
    </div>
    <div
      class="flex justify-around row controlButtons"
      v-if="!won"
    >
      <q-btn @click="onUndoPressed" color="secondary" icon="undo" round size="1rem"/>
      <q-btn @click="onRestartPressed" color="secondary" icon="delete" round size="1rem"/>
    </div>
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
      game: {},
      won: false
    }
  },
  beforeMount () {
    this.loadGame(this.$route.params.identifier)
  },
  computed: {
    triangleLength () {
      return this.$q.screen.width / this.game.board[0].length
    },
    triangleHeight () {
      return Math.sqrt(3) / 2 * this.triangleLength
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
            if (columnIndex < row.length - 1 && row[columnIndex + 1].valueLeft) {
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
        if (triangle.positionedOnBoard || triangle.combined) {
          return triangle
        }
        triangle.index = index
        if (indexColumn * (this.triangleLength + 1) > this.$q.screen.width) {
          indexColumn = 0
          indexRow++
        }
        triangle.originalPositionX = indexColumn * this.triangleLength
        indexColumn++
        triangle.originalPositionY = (indexRow * this.triangleHeight) + this.board.length * ((Math.sqrt(3) / 2) * this.triangleHeight) + 50
        if (isNaN(triangle.positionX)) {
          triangle.positionX = triangle.originalPositionX
          triangle.positionY = triangle.originalPositionY
          if (this && this.$refs && this.$refs[`missingElement-${index}`]) {
            this.$refs[`missingElement-${index}`][0].moveTo(triangle.originalPositionX, triangle.originalPositionY)
          }
        }
        return triangle
      })
    }
  },
  methods: {
    loadGame (identifier) {
      this.game = MyStorage.loadGame(identifier)
    },
    onRestartPressed () {
      this.won = false
      this.elementsToOperate = []
      this.hoveredElement = null
      const game = MyStorage.loadGame(this.$route.params.identifier, true)
      this.game.board = game.board
      this.game.missingElements = game.missingElements
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
    evaluateWinningCondition () {
      let won = true
      this.game.board.forEach((row) => {
        row.forEach((triangle) => {
          if (triangle.placeholder && !triangle.placeholderFilled) {
            won = false
          }
        })
      })
      this.won = won
    },
    handleDragEnd (triangle, event) {
      if (this.hoveredElement && this.trianglesMatch(this.hoveredElement, triangle)) {
        triangle.positionedOnBoard = true
        triangle.positionX = this.hoveredElement.positionX
        triangle.positionY = this.hoveredElement.positionY
        triangle.placeholder = this.hoveredElement
        this.hoveredElement.placeholderFilled = true
        this.$set(this.game.board, this.hoveredElement.index, this.hoveredElement)
        this.evaluateWinningCondition()
      } else {
        triangle.positionedOnBoard = false
        triangle.positionX = triangle.originalPositionX
        triangle.positionY = triangle.originalPositionY
        if (triangle.placeholder) {
          triangle.placeholder.placeholderFilled = false
          this.$set(this.game.board, triangle.placeholder.index, triangle.placeholder)
          triangle.placeholder = null
          this.evaluateWinningCondition()
        }
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
      this.rerenderMissingTiles()
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
        triangle.combined = true
        this.$set(this.game.missingElements, triangle.index, triangle)
      })
      this.rerenderMissingTiles()
      setTimeout(() => {
        this.game.missingElements.push(newTriangle)
      }, 800)
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
  .closeButton
    position absolute
    left 0.5rem
    top 0.1rem
    padding 0
  .operationButtons
    position absolute
    bottom 6rem
    padding 0
  .controlButtons
    width 10rem
    position absolute
    bottom 2rem
</style>
