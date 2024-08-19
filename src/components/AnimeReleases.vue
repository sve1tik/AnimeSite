<template>
  <div class="season__warapp">
		<p>Сезоны:</p>
    <div v-for="el in releases" :key="el.code">
      <router-link
        :to="{ name: 'serials', params: { id: el.code } }"
        :class="{ 'season': true, 'active-season': el.code === currentSeasonId }"
      >
        {{ el.names.ru }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    releases: Object,
  },
  data() {
    return {
      currentSeasonId: null
    }
  },
  mounted() {
    this.currentSeasonId = this.$route.params.id;
  }
};
</script>

<style scoped>
.season__warapp{
	display: flex;
	flex-direction: column;
	row-gap: 10px;
}
.active-season {
  border: 2px solid gray;
}

.season:not(.active-season) {
  border: none;
}
</style>
