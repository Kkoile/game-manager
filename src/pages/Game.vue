<template>
  <div class="flex column">
    <!--<div :key="`board-${i}`" v-for="(triangle, i) in board">-->
      <!--<drop @drop="handleDrop({element: triangle, index: i}, ...arguments)">-->
        <!--<Triangle :direction="triangle.direction" :color="triangle.color"/>-->
      <!--</drop>-->
    <!--</div>-->

    <div class="flex row items-center">
      <drag :transfer-data="{ element: triangle }" :key="`missing-${i}`" v-for="(triangle, i) in missingElements">
        <Triangle
          :direction="triangle.direction"
          :color="triangle.color"
          :textHypotenuse="triangle.textHypotenuse"
          :textLeft="triangle.textLeft"
          :textRight="triangle.textRight"/>
      </drag>
    </div>
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
      board: [
        { direction: 'down', color: 'grey' }
      ],
      missingElements: [
        { direction: 'up', textHypotenuse: '1', textLeft: '2', textRight: '3' }
      ]
    }
  },
  computed: {
  },
  methods: {
    handleDrop (dropZoneElement, draggedElement) {
      const oElement = this.board[dropZoneElement.index]
      if (oElement.direction === draggedElement.element.direction) {
        oElement.color = 'green'
        this.$set(this.board, 0, oElement)
      }
    }
  }
}
</script>

<style lang='stylus'>

</style>
