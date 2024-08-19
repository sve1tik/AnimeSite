<template>
	<div class="container">
		<pagination :pageCount="totalPageCount" :currentPage="currentPage" @page-change="changePage" />
		<div class="content">
			<anime-card :anime="releasesInfo" />
		</div>
	</div>
</template>
<script>
import { getList } from '@/api/getApi';
import { getSearchAnime } from '@/api/getApi';
import AnimeCard from '@/components/AnimeCard.vue';
import Pagination from '@/components/Pagination.vue';

export default {
	components: {
		AnimeCard,
		Pagination
	},
	data() {
		return {
			animeInfo: [],
			paginatedAnime: [],
			animeData: [], // Массив данных об аниме
			currentPage: 1, // Текущая страница
			totalPageCount: 0, // Общее количество страниц
			perPage: 10,
			releasesInfo: [],
			currentDetails: null,
			flagDetails: false,
		};
	},
	created() {
		this.fetchAnimeData();
	},
	methods: {
		async fetchAnimeData() {
			await getList(this.currentPage).then(response => {
				this.animeData = response;
				this.paginatedAnime = this.animeData.list;
				this.totalPageCount = Math.ceil(response.pagination.total_items / this.perPage);
			});

			const releases = this.animeData.list.map(anime => anime.releases);
			this.searchAnime(releases);

		},
		async searchAnime(releases) {

			const idList = [];
			for (const release of releases) {
				for (const rel of release) {
					if (typeof rel === 'object') {
						const animeInfo = {};
						for (const [key, value] of Object.entries(rel)) {
							if (key === 'id') {
								animeInfo.id = value;
							} else if (key === 'names') {
								animeInfo.name = value;
							}
						}
						idList.push(animeInfo);
					}
				}
			}
			console.log(idList);
			const promises = idList.map(id => getSearchAnime(id.id).then(response => response).catch(err => ({ error: err })));
			const settledPromises = promises.map(promise => {
				return Promise.race([
					promise,
					new Promise((resolve, reject) => {
						setTimeout(() => {
							reject(new Error('Timeout'));
						}, 1000);
					}),
				]);
			});

			const results = await Promise.allSettled(settledPromises);
			this.releasesInfo = results.filter(result => result.status === 'fulfilled').map(result => result.value);
			return this.releasesInfo;
		},
		changePage(newPage) {
			this.currentPage = newPage;
			this.releasesInfo = [];
			this.fetchAnimeData();
		},
		sliceDesc(desc) {
			return desc !== null ? desc.slice(0, 200) + '...' : '';
		},
		showDetails(anime) {
			this.currentDetails = anime;
		},
	},
};

</script>
<style scoped>
@import '@/assets/list.css';
</style>