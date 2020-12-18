<template>
  <div
    :class="{
      'bg-yellow': message.is_user_own,
      'bg-lightGray': !message.is_user_own,
    }"
    class="chat__messages-bubble"
  >
    <span class="text-dimLightGray m-t-5 font-size-10">
      {{ message.created_at_jalali_date.split(' ')[1] }}
    </span>
    <span class="text-dimLightGray font-size-12 m-r-10">
      {{ message.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ChatMessageBubble',
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
}
</script>
