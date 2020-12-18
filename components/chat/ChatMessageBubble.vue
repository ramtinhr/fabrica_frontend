<template>
  <div
    :class="{
      'bg-yellow': message.is_user_own,
      'bg-lightGray': !message.is_user_own,
    }"
    class="chat__message-bubble"
  >
    <span class="text-dimLightGray font-size-16">{{ message.text }}}</span>
    <span class="text-dimLightGray font-size-14">{{
      message.created_at_jalali_date
    }}</span>
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
