<template>
  <div>
    <todoView />
  </div>
</template>

<script>
  import todoView from '../components/todoComponents/todoView'

  export default {
    name: 'Todo',
    components: {
      todoView
    }
  }
</script>