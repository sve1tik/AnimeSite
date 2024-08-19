<template>
	<aside>
		<AnimeUpdate :updateList="updateList" />
	</aside>
	<div class="container">
		<nav>
			<div class="nav__link">
				<router-link to="/">Home</router-link> |
				<router-link :to="{ name: 'serials', params: { id: dataCode } }" @click="randomTitle">Random</router-link> |
				<router-link to="/all">Releases</router-link>
			</div>
			<div class="seacrh">
				<input type="text" placeholder="Поиск аниме" @input="searchAnime($event.target.value)">
				<div class="search__wrapp" v-if="searchData != null">
					<div class="search__item">
						<span v-for="search in searchData.list" :key="search">
							<router-link :to="{ name: 'serials', params: { id: search.code } }">{{ search.names.ru }}</router-link>
						</span>
					</div>
				</div>
			</div>
		</nav>
		<router-view v-slot="{ Component }" class="fade">
			<transition name="fade">
				<component :is="Component" :key="$route.fullPath" />
			</transition>
		</router-view>
	</div>
</template>

<script>

import { defineComponent } from 'vue';
import AnimeUpdate from "@/components/AnimeUpdate.vue"


import { getAnimeUpdate } from "@/api/getApi";
import { searchAnime } from "@/api/getApi";
import { randomTitle } from "@/api/getApi";

export default defineComponent({
	name: 'App',
	components: { AnimeUpdate },
	data() {
		return {
			searchData: "",
			dataCode: "search",
			updateList: {}
		}
	},
	async mounted() {
		await getAnimeUpdate().then(response => {
			this.updateList = response;
		});
	},
	methods: {
		async searchAnime(anime) {
			await searchAnime(anime).then(response => {
				this.searchData = response;
			});
		},
		async randomTitle() {
			await randomTitle().then(response => {
				this.dataCode = response.code;
			});
			await this.$router.push({ name: 'serials', params: { id: this.dataCode } });
		},
	},
})
</script>

<style>
@import "@/assets/app.css";
</style>