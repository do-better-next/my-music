<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { getSingerId, getSingerDetails, getSongById } from './api/singer'

const singerId = ref(0)
const singerName = ref("法老")
const songUrl = ref("")
const isDisplay = ref(false)
const singerDetailInfos = reactive({
  "artist": {},
  "hotSongs": {}
})
async function SingerId() {
  const { data } = await getSingerId({ "keywords": singerName.value })
  isDisplay.value=true
  singerId.value = data.result.songs[0].ar[0].id
  SingerDetails()
}

async function SongById(param) {
  const { data } = await getSongById({ "id": param })
  songUrl.value = data.data[0].url
  var audio = document.getElementById('music');
  audio.play();
}

async function SingerDetails() {
  const { data } = await getSingerDetails({ "id": singerId.value })
  singerDetailInfos.artist = data.artist
  singerDetailInfos.hotSongs = data.hotSongs
  console.log(singerDetailInfos)
}
onMounted(() => {
  SingerId()
})
</script>

<template>
  <main>
    <audio id="music" class="mAudio" v-if="isDisplay" :src=songUrl autoplay controls>
      您的浏览器不支持 audio 元素。
    </audio>
    <input class="margin-left " type="text" v-model="singerName" @keyup.enter="SingerId(singerName)">
    <button @click=SingerId(singerName)>查询歌手</button>
    <header v-if="isDisplay">
      <div class="margin-top">歌手：{{ singerDetailInfos.artist.name }}</div>
      <div class="margin-top">歌手介绍：{{ singerDetailInfos.artist.briefDesc }}</div>
      <div class="margin-top">总唱片：{{ singerDetailInfos.artist.albumSize }}</div>
    </header>
    <ul class="songList">
      <li v-for="item in singerDetailInfos.hotSongs" :key="item">
        <div class="margin-top">来源:{{ item.al.name }}</div>
        <div class="margin-top">歌曲:{{ item.name }}</div>
        <img class="singerImage" :src=item.al.picUrl @click=SongById(item.privilege.id) />
      </li>
    </ul>
  </main>
</template>

<style scoped>
.mAudio {
  width: 100%;
  background-color: #f90;
  border-radius: 15px;
  padding: 10px 0px;
}

.margin-top {
  margin: 10px;
}
.margin-left {
  margin-left: 10px;
}

.singerImage {
  width: 10vw;
  border-radius: 15px;
  margin: 10% 15%
}

.songList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 1vw;
}

.songList li {
  width: 15vw;
  background-color: #f90;
  border-radius: 15px;
  margin: 10px;
}
</style>
