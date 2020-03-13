<template>
  <div>
    <userBlogView />
  </div>
</template>

<script>
  import userBlogView from '../components/blogComponents/userBlogView'

  export default {
    name: 'Blog',
    components: {
      userBlogView
    }
  }
</script>