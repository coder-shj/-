<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
}
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  /* position: fix生成绝对定位 */
  position: fixed;  
  left: 0;
  right: 0;
  bottom: 0%;

  /* x偏移量 y偏移量 模糊程度 颜色 */ 
  box-shadow: 0px -2px 1px rgba(100, 100, 100, .1);
}

</style>
