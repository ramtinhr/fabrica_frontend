<template>
  <div class="sidebar">
    <div class="sidebar__head">
      <slot name="head" />
    </div>
    <div class="sidebar__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSidebar',
}
</script>
