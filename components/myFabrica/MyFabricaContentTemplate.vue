<template>
  <div class="col-md-9 col-sm-8 col-xs-12">
    <div id="my-fabrica-content" class="my-fabrica__content-template">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFabricaContentTemplate',
}
</script>
