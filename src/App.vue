<script setup>
import { onMounted, reactive, ref, watch, nextTick } from 'vue';
import { getSingerId, getSingerDetails, getSongById } from './api/singer'
import { generateRandomGradient } from './utils/generateRandomGradient'
//歌手id
const singerId = ref(0)
//搜索的歌手姓名
const singerName = ref("法老")
//热门歌手列表
const hotSingers = reactive([
  "GAI",
  "宝石Gem",
  "PG One",
  "黄旭",
  "艾热",
  "Vinida",
  "Bridge",
  "摩登兄弟刘宇宁",
  "李佳隆",
  "Jony J",
  "郭采洁",
  "那吾克热",
  "Jony J (王栎鑫)",
  "C-Block",
  "Ty. ",
  "苏宣",
  "大鹏",
  "杨和苏",
  "后弦",
  "Tizzy T",
  "艾福杰尼",
  "Piggy",
  "罗言",
  "功夫胖",
  "盛宇",
  "派克特"
])
//音频的src
const songUrl = ref("")
const isDisplay = ref(false)
//搜索的歌手详细信息以及热门歌曲
const singerDetailInfos = reactive({
  "artist": {},
  "hotSongs": {}
})
//当前播放的歌曲
const currentSong = ref("")


async function SingerId() {
  const { data } = await getSingerId({ "keywords": singerName.value })
  if (data.result.songs) {
    singerId.value = data.result.songs[0].ar[0].id
  }
  SingerDetails()
}

async function SongById(param) {
  const { data } = await getSongById({ "id": param.privilege.id })
  songUrl.value = data.data[0].url
  currentSong.value = param.name
}

async function SingerDetails() {
  const { data } = await getSingerDetails({ "id": singerId.value })
  singerDetailInfos.artist = data.artist
  singerDetailInfos.hotSongs = data.hotSongs
  // 很关键
  await nextTick()
  singerDetailInfos.hotSongs.forEach((element, i) => {
    window.document.getElementsByClassName('cardItem')[i].style.background = generateRandomGradient();
  });
  initColor()
}
function serachByHotSinger(name) {
  singerName.value = name
  SingerId()
}
async function initColor() {
  await nextTick()
  Array.from(window.document.getElementsByClassName("bgc2")).forEach((element) => {
    element.style.background = generateRandomGradient()
  });
  window.document.querySelector(".group").style.background = generateRandomGradient()

}
onMounted(() => {
  SingerId()
})
</script>

<template>
  <main class=" bgc-reverse">

    <div class="currentSong bgc2">
      <i class="nes-icon youtube is-small" style="margin-right: 10px;"></i>
      <span class="">当前正在播放的歌曲是:{{ currentSong }}</span>
    </div>

    <div class="nes-field is-inline group">
      <input type="text" id="dark_field" v-model="singerName" @keyup.enter="SingerId(singerName)"
        class="nes-input is-dark" placeholder="歌曲/歌手">
      <button type="button" class="nes-btn is-primary" @click=SingerId(singerName)>Search</button>
    </div>


    <div class="info bgc2 animate__animated animate__fadeInDown">
      <ul class="hotSingers ">
        <li class="bgc " v-for="item in hotSingers " :key=item @click=serachByHotSinger(item)>{{ item }}</li>
      </ul>
    </div>


    <div class="info bgc2 animate__animated animate__fadeInDown">
      <div class="margin-top">歌手：{{ singerDetailInfos.artist.name }}</div>
      <div class="margin-top">歌手介绍：{{ singerDetailInfos.artist.briefDesc }}</div>
      <div class="margin-top">总唱片：{{ singerDetailInfos.artist.albumSize }}</div>
    </div>


    <div>
      <ul class="songList">
        <li class="bgc cardItem" v-for="item in singerDetailInfos.hotSongs" :key="item">
          <div>来源:{{ item.al.name }}</div>
          <div>歌曲:{{ item.name }}</div>
          <img class="singerImage" v-lazy=item.al.picUrl @click=SongById(item) />
        </li>
      </ul>
    </div>

    <audio id="music" class="bgc-reverse mAudio" loop :src=songUrl autoplay controls>
      您的浏览器不支持 audio 元素。
    </audio>
  </main>
</template>
<style scoped>
main {
  overflow: hidden;
}

@media (max-width: 600px) {
  main {
    font-size: 10px;
    /* 当屏幕宽度小于等于 600px 时，字体大小为屏幕宽度的 4% */
  }
}

@media (min-width: 601px) and (max-width: 1200px) {
  main {
    font-size: 1.2vw;
    /* 当屏幕宽度在 601px 到 1200px 之间时，字体大小为屏幕宽度的 3% */
  }
}

@media (min-width: 1201px) {
  main {
    font-size: 1.4vw;
    /* 当屏幕宽度大于等于 1201px 时，字体大小为屏幕宽度的 2% */
  }
}

.currentSong {
  position: fixed;
  width: 100vw;
  padding: 10px;
  z-index: 99;
}

.hotSingers {
  display: flex;
  flex-wrap: wrap;
}

.hotSingers li {
  margin: .5vw;
  cursor: pointer;
  padding: .5rem;
  border-radius: .5rem;
}

.info {
  width: 90vw;
  border-radius: .5rem;
  padding: 15px;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.mAudio {
  width: 100%;
  height: 10vh;
  position: fixed;
  bottom: 0;
  left: 0;
}

.margin-top {
  margin: 10px;
}

.margin-left {
  margin-left: 10px;
}

.songList {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10vh;
  justify-content: space-around;
}

.songList li {
  max-width: 15vw;
  border-radius: .5rem;
  margin: .5rem;
  display: flex;
  flex-direction: column;
  padding: .8rem;
  justify-content: space-evenly;
  align-items: center;
}

.singerImage {
  width: 10vw;
  max-height: 10vw;
  border-radius: .5rem;
}

.group {
  background-color: #212529;
  padding: .5rem 1rem;
  margin-top: 50px;
}

.group input {
  height: 45px;
}

.group button {
  margin-left: 10px;
}
</style>