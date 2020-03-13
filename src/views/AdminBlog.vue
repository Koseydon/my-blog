<template>
  <div>
    <adminBlogView />
  </div>
</template>

<script>
  import adminBlogView from '../components/blogComponents/adminBlogView'

  export default {
    name: 'Admin Blog',
    components: {
      adminBlogView
    }
  }
</script>