<template>
    <div class="tab-control">
      <div v-for="(item, index) in titles" class="tab-control-item" 
      :class="{active: nowindex == index}"
      @click="divclick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        nowindex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default: []
      }
    },
    methods: {
      divclick(index) {
        this.nowindex = index
        this.$emit('itemclick', index)
      }
    }
  };
</script>
  
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: #fff;
  }
  .tab-control span {
    padding: 3px;
  }
  .tab-control-item {
    flex: 1;
    font-size: 15px;
    height: 35px;
    line-height: 30px;
  }

  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
