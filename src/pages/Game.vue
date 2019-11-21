<template>
  <div class="flex justify-around items-center column" v-if="!loading">
    <StarBackground style="z-index: -1" />
    <q-btn @click="$router.go(-1)" class="closeButton" flat icon="close" />
    <v-stage :config="{width: $q.screen.width, height: $q.screen.height - 20}" class="canvas" ref="stage">
      <v-layer ref="layer">
        <Triangle
          :color="triangle.color"
          :direction="triangle.direction"
          :hovered="hoveredElement === triangle"
          :key="`boardElement-${i}`"
          :length="triangleLength"
          :object="triangle"
          :positionX="triangle.positionX"
          :positionY="triangle.positionY"
          :text-hypotenuse="triangle.textHypotenuse"
          :text-left="triangle.textLeft"
          :text-right="triangle.textRight"
          strokeColor="#f1f12f"
          v-for="(triangle, i) in board"
        />
      </v-layer>

      <v-layer ref="missingElements">
        <Triangle
          :hovered="hoveredMissingElement === triangle"
          :key="`missingElement-${triangle.index}`" :ref="`missingElement-${triangle.index}`"
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
          :visible="!triangle.combined"
          color="#B53436"
          strokeColor="#f1f12f"
          v-for="(triangle) in missingElements"
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
          @dragmove="handleDragMove"
          @click="handleClick"
        />
      </v-layer>
    </v-stage>
    <div class="flex flex-center solvedText" v-if="won">
      <h2 align="center">{{$t('message.solved')}}</h2>
    </div>
    <div class="infoText" v-if="game.infoText && !won">
      {{$t(game.infoText)}}
    </div>
    <div
      class="flex justify-around row controlButtons"
      v-if="!won"
    >
      <q-btn :disabled="moves.length < 1" @click="onUndoPressed" color="primary" icon="undo" round size="1.2rem"/>
      <q-btn @click="onRestartPressed" color="primary" icon="delete" round size="1.2rem"/>
    </div>
    <div class="flex row justify-around controlButtons" v-else>
      <q-btn @click="onRestartPressed" color="primary" icon="undo" round size="1.2rem" />
      <q-btn @click="onNextGamePressed" color="primary" icon="done" round size="1.2rem" />
    </div>
  </div>
</template>

<script>
import Triangle from '../components/Triangle'
import MyStorage from '../lib/storage'
import StarBackground from '../components/StarBackground'
export default {
  name: 'Game',
  components: {
    Triangle,
    StarBackground
  },
  data () {
    return {
      loading: true,
      hoveredElement: null,
      hoveredMissingElement: null,
      colors: [
        '#f0ab00',
        '#5AAA95',
        '#8B1E3F',
        '#006A70',
        '#124E78'
      ],
      distanceBetweenMissingElements: 10,
      game: {},
      won: false,
      moves: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadGame(this.$route.params.identifier)
    }
  },
  beforeMount () {
    this.loadGame(this.$route.params.identifier)
  },
  beforeDestroy () {
    this.saveGame()
  },
  computed: {
    triangleLength () {
      if (this.loading) {
        return 1
      }
      return this.$q.screen.width / this.game.board[0].length - this.distanceBetweenMissingElements * 0.65
    },
    triangleHeight () {
      if (this.loading) {
        return 1
      }
      return Math.sqrt(3) / 2 * this.triangleLength
    },
    board () {
      if (this.loading) {
        return []
      }
      let colorIndex = 0
      const offset = (this.$q.screen.width - this.triangleLength * (this.game.board[0].length - 1)) / 2
      return this.game.board.map((row, rowIndex) => {
        return row.map((triangle, columnIndex) => {
          triangle.positionX = offset + columnIndex * this.triangleLength / 2
          triangle.positionY = rowIndex * ((Math.sqrt(3) / 2) * this.triangleLength)
          triangle.rowIndex = rowIndex
          triangle.columnIndex = columnIndex
          triangle.direction = (rowIndex % 2 + columnIndex % 2) % 2 === 0 ? 'up' : 'down'
          if (triangle.placeholder) {
            triangle.color = 'lightgrey'
            triangle.valueLeft = this.getValueOfNeighbour(triangle, rowIndex, columnIndex, 'Left')
            triangle.valueRight = this.getValueOfNeighbour(triangle, rowIndex, columnIndex, 'Right')
            triangle.valueHypotenuse = this.getValueOfNeighbour(triangle, rowIndex, columnIndex, 'Hypotenuse')
          } else {
            triangle.color = this.colors[colorIndex++ % this.colors.length]
          }
          return triangle
        })
      }).flat().sort(element => {
        return element === this.hoveredElement ? 1 : -1
      })
    },
    missingElements () {
      if (this.loading) {
        return []
      }
      let indexColumn = 0
      let indexRow = 0
      return this.game.missingElements.map((triangle, index) => {
        if (triangle.positionedOnBoard || triangle.combined) {
          if (triangle.positionedOnBoard) {
            triangle.positionX = triangle.placeholder.positionX
            triangle.positionY = triangle.placeholder.positionY
          }
          return triangle
        }
        triangle.positionedOnBoard = false
        triangle.index = index
        if (indexColumn * (this.triangleLength + this.distanceBetweenMissingElements + 1) > this.$q.screen.width) {
          indexColumn = 0
          indexRow++
        }
        triangle.originalPositionX = indexColumn * (this.triangleLength + this.distanceBetweenMissingElements / 2) + this.distanceBetweenMissingElements / 2
        indexColumn++
        triangle.originalPositionY = (indexRow * (this.triangleHeight + this.distanceBetweenMissingElements / 2)) + this.game.board.length * ((Math.sqrt(3) / 2) * this.triangleHeight) + 50
        if (isNaN(triangle.positionX)) {
          triangle.positionX = triangle.originalPositionX
          triangle.positionY = triangle.originalPositionY
          if (this && this.$refs && this.$refs[`missingElement-${index}`] && this.$refs[`missingElement-${index}`][0]) {
            this.$refs[`missingElement-${index}`][0].moveTo(triangle.originalPositionX, triangle.originalPositionY)
          }
        }
        return triangle
      }).sort(element => {
        return element.isDragging ? 1 : -1
      })
    }
  },
  methods: {
    async saveGame () {
      this.loading = true
      await MyStorage.saveGame(this.game.identifier, this.won, this.game.board, this.game.missingElements, this.moves)
      this.loading = false
    },
    async loadGame (identifier) {
      this.game = await MyStorage.loadGame(identifier)
      this.moves = this.game.moves
      this.won = this.game.won
      this.loading = false
    },
    async onRestartPressed () {
      this.won = false
      this.timeOutIdForApperance = null
      this.hoveredElement = null
      this.moves = []
      this.loading = true
      const game = await MyStorage.loadGame(this.game.identifier, true)
      this.game.board = game.board
      this.game.missingElements = game.missingElements
      this.loading = false
    },
    onUndoPressed () {
      if (this.moves.length > 0) {
        if (this.timeOutIdForApperance) {
          clearTimeout(this.timeOutIdForApperance)
        }
        const lastState = this.moves.splice(-1, 1)[0]
        this.game = lastState
      }
    },
    async onNextGamePressed () {
      this.saveGame()
      const nextLevelIdentifier = await MyStorage.getNextLevelIdentifier()
      if (nextLevelIdentifier) {
        this.$router.replace(`/game/${nextLevelIdentifier}`)
      } else {
        this.$q.notify(this.$t('message.noGameLeft'))
      }
    },
    getValueOfNeighbour (triangle, rowIndex, columnIndex, side) {
      let rowIndexNeighbour = rowIndex
      let columnIndexNeighbour = columnIndex
      if (triangle.direction === 'up') {
        if (side === 'Left') {
          columnIndexNeighbour = columnIndex - 1
        } else if (side === 'Right') {
          columnIndexNeighbour = columnIndex + 1
        } else if (side === 'Hypotenuse') {
          rowIndexNeighbour = rowIndex + 1
        }
      } else {
        if (side === 'Left') {
          columnIndexNeighbour = columnIndex + 1
        } else if (side === 'Right') {
          columnIndexNeighbour = columnIndex - 1
        } else if (side === 'Hypotenuse') {
          rowIndexNeighbour = rowIndex - 1
        }
      }
      if (
        rowIndexNeighbour >= 0 &&
        rowIndexNeighbour < this.game.board.length &&
        columnIndexNeighbour >= 0 &&
        columnIndexNeighbour < this.game.board[rowIndexNeighbour].length
      ) {
        return this.game.board[rowIndexNeighbour][columnIndexNeighbour][`value${side}`]
      }
      return undefined
    },
    trianglesMatch (placeholder, movedTriangle) {
      if (placeholder.direction !== movedTriangle.direction) {
        return false
      }
      if (!isNaN(placeholder.valueHypotenuse) && placeholder.valueHypotenuse !== movedTriangle.valueHypotenuse) {
        return false
      }
      if (!isNaN(placeholder.valueLeft) && placeholder.valueLeft !== movedTriangle.valueLeft) {
        return false
      }
      if (!isNaN(placeholder.valueRight) && placeholder.valueRight !== movedTriangle.valueRight) {
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
    getCurrentState () {
      const currentState = JSON.parse(JSON.stringify(this.game))
      delete currentState.moves
      currentState.missingElements.forEach((triangle) => {
        triangle.isDragging = undefined
        triangle.toggle = undefined
        triangle.positionX = undefined
        triangle.positionY = undefined
      })
      return currentState
    },
    handleDragStart (triangle) {
      triangle.isDragging = true
      this.$set(this.game.missingElements, triangle.index, triangle)
    },
    handleDragMove (triangle, event, triangleElement) {
      const shapes = this.$refs.layer.$children.filter(element => !!element.object.placeholder && !element.object.placeholderFilled).filter(element => {
        return element.intersects(triangleElement)
      })
      if (shapes.length === 1) {
        const shape = shapes[0]
        this.hoveredElement = shape.object
      } else {
        this.hoveredElement = null
      }

      const missingElements = this.$refs.missingElements.$children.filter(element => element.object !== triangle && !element.object.positionedOnBoard).filter(element => {
        return element.intersects(triangleElement)
      })
      if (missingElements.length === 1) {
        const missingElement = missingElements[0]
        const object = missingElement.object
        if (object && object.direction === triangle.direction) {
          this.hoveredMissingElement = object
        } else {
          this.hoveredMissingElement = null
        }
      } else {
        this.hoveredMissingElement = null
      }
    },
    handleDragEnd (triangle, event) {
      const currentState = this.getCurrentState()
      if (this.hoveredElement && this.trianglesMatch(this.hoveredElement, triangle)) {
        triangle.positionedOnBoard = true
        triangle.positionX = this.hoveredElement.positionX
        triangle.positionY = this.hoveredElement.positionY
        triangle.placeholder = this.hoveredElement
        this.hoveredElement.placeholderFilled = true
        this.$set(this.game.board, this.hoveredElement.index, this.hoveredElement)
        this.evaluateWinningCondition()
      } else if (this.hoveredMissingElement) {
        this.addElements(triangle, this.hoveredMissingElement)
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
      triangle.isDragging = false
      this.hoveredElement = null
      this.hoveredMissingElement = null
      this.$set(this.game.missingElements, triangle.index, triangle)
      const newState = this.getCurrentState()
      if (JSON.stringify(currentState) !== JSON.stringify(newState)) {
        this.moves.push(currentState)
      }
    },
    handleClick (clickedTriangle) {
      if (!this.won) {
        this.rotateElement(clickedTriangle)
      }
    },
    rotateElement (triangle) {
      const currentState = this.getCurrentState()
      if (triangle.direction === 'down') {
        triangle.direction = 'up'
      } else {
        triangle.direction = 'down'
      }
      const oldTextHypotenuse = triangle.textHypotenuse
      const oldValueHypotenuse = triangle.valueHypotenuse
      triangle.textHypotenuse = triangle.textLeft
      triangle.valueHypotenuse = triangle.valueLeft
      triangle.textLeft = triangle.textRight
      triangle.valueLeft = triangle.valueRight
      triangle.textRight = oldTextHypotenuse
      triangle.valueRight = oldValueHypotenuse

      this.$set(this.game.missingElements, triangle.index, triangle)
      this.moves.push(currentState)
    },
    addElements (...elementsToOperate) {
      const valueHypotenuse = elementsToOperate.reduce((accumulator, triangle) => accumulator + triangle.valueHypotenuse, 0)
      const valueRight = elementsToOperate.reduce((accumulator, triangle) => accumulator + triangle.valueRight, 0)
      const valueLeft = elementsToOperate.reduce((accumulator, triangle) => accumulator + triangle.valueLeft, 0)
      const newTriangle = {
        direction: elementsToOperate[0].direction,
        valueHypotenuse: valueHypotenuse,
        textHypotenuse: `${valueHypotenuse}`,
        valueLeft: valueLeft,
        textLeft: `${valueLeft}`,
        valueRight: valueRight,
        textRight: `${valueRight}`
      }
      elementsToOperate.sort((a, b) => { return b.index - a.index }).forEach((triangle) => {
        triangle.combined = true
        this.$set(this.game.missingElements, triangle.index, triangle)
      })
      this.rerenderMissingTiles()
      this.timeOutIdForApperance = setTimeout(() => {
        this.timeOutIdForApperance = null
        this.game.missingElements.push(newTriangle)
      }, 500)
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
  .solvedText
    position absolute
    h2
      color #FFFFFF
  .canvas
    padding-top 20px
  .closeButton
    position absolute
    font-size: 22px
    left 12px
    top 4px
    color: #F5F5F5
    padding 0
    z-index 10
  .controlButtons
    width 10rem
    position absolute
    bottom 1.5rem
  .infoText
    position absolute
    padding 8px
    font-size 18px
    color #F5F5F5
    bottom 6.5rem
    background: rgba(255, 255, 255, 0.05)
    text-align center
</style>
