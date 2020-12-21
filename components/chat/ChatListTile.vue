<template>
  <nuxt-link
    :to="{
      name: 'my-fabrica-chat-id___' + $cookies.get('lang'),
      params: { id: chat._id },
    }"
    tag="div"
    class="chat__list-tile"
  >
    <div class="chat__list-tile-detail">
      <div class="chat__list-tile-detail-avatar">
        <img v-if="chat.avatar_url" :src="chat.avatar_url" alt="avatar" />
        <img v-else src="/images/avatar.jpg" alt="avatar" />
      </div>
      <div class="chat__list-tile-detail-info">
        <span class="font-size-16 text-medium m-b-10">{{ chat.title }}</span>
        <span class="font-size-14">{{ $strLimit(chat.preview, 85) }}</span>
      </div>
    </div>
    <div v-if="chat.unread_count > 0" class="chat__list-tile-unread-count">
      {{ chat.unread_count }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ChatListTile',
  props: {
    chat: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onClickHandler(id) {
      this.$router.push({
        name: 'my-fabrica-chat-id___' + this.$cookies.get('lang'),
      })
    },
  },
}
</script>
