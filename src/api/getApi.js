import $api from '@/api/axios'

export async function getAnimeUpdate() {
  return await $api
    .get(`title/updates?filter=posters,type,status,names,code,player,description&limit=5`)
    .then((response) => {
      return response.data
    })
}

export async function searchAnime(anime) {
  return await $api.get(`title/search?search=${anime}`).then((response) => {
    return response.data
  })
}

export async function randomTitle() {
  return await $api.get(`title/random`).then((response) => {
    return response.data
  })
}

export async function getSchedule() {
  return await $api.get('title/schedule?playlist_type=array').then((response) => {
    return response.data
  })
}

export default async function getInfo(code) {
  return await $api.get(`title?code=${code}`).then((response) => {
    return response.data
  })
}

export async function getList(currentPage) {
  return await $api.get('franchise/list?page=' + currentPage).then((response) => {
    return response.data
  })
}

export async function getSearchAnime(id) {
  return await $api.get(`title?id=${id}`).then((response) => {
    return response.data
  })
}
export async function getFranchise(id) {
  return await $api.get(`title?id=${id}`).then((response) => {
    return response.data
  })
}
