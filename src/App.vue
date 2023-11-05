<script setup>
import { onMounted, reactive, ref, watch, nextTick } from 'vue';
import { getSingerId, getSingerDetails, getSongById } from './api/singer'
import { generateRandomGradient } from './utils/generateRandomGradient'
import Login from './view/Login.vue';
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()


//歌手id
const singerId = ref(0)
//搜索的歌手姓名
const singerName = ref("谁")
//热门歌手列表
const hotSingers = reactive([
  "谁",
  "阿拉斯加海湾",
  "篝火旁",
  "如果爱忘了",
  "虚拟",
  "Faded",
  "飘向远方",
  "晚风站台",
  "奢香夫人",
  "小河淌水",
  "我的未来式",
  "那吾克热",
  "梁博",
  "破茧",
  "枯木逢春",
  "我怀念的",
  "探窗",
  "张碧晨",
  "素颜",
  "遇见",
  "辞九门回忆",
  "许嵩",
  "陈粒",
  "半生雪",
  "白鸽",
  "予你"
])
//音频的src
const songUrl = ref("")
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
  showConfetti()
  SingerDetails()
}

async function SongById(param) {
  const { data } = await getSongById({ "id": param.privilege.id })
  let audio = window.document.getElementsByTagName('audio')
  songUrl.value = data.data[0].url
  currentSong.value = param.name
  audio.autoplay = true
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
function searchByHotSinger(name) {
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

function showConfetti() {
  confetti.addConfetti()
}

function searchSinger(singer) {
  if (singer == null) {
    return false
  }
  window.document.getElementById("searchSinger").href = `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=monline_3_dg&wd=` + singer

}
onMounted(() => {
  SingerId()
})
</script>

<template>
  <!-- header -->
  <header>
    <Login/>
    <div class="currentSong bgc2" @click="showConfetti()">
      <font-awesome-icon :icon="['fas', 'user']" />
      <i class="nes-icon youtube is-small" style="margin-right: 10px;"></i>
      <span class="">当前正在播放的歌曲是:{{ currentSong }}</span>
    </div>
    <audio id="music" class="bgc-reverse mAudio"  :src=songUrl loop autoplay controls>
      您的浏览器不支持 audio 元素。
    </audio>
  </header>
  <!-- 主体 -->
  <main class=" bgc-reverse">
    <!-- 搜索歌手 -->
    <div class="nes-field is-inline group">
      <input type="text" id="dark_field" v-model="singerName" @keyup.enter="SingerId(singerName)"
        class="nes-input is-dark" placeholder="歌曲/歌手">
      <button type="button" class="nes-btn is-primary" @click=SingerId(singerName)>Search</button>
    </div>

    <!-- 热门歌手 -->
    <div class="info bgc2 animate__animated animate__fadeInDown">
      <a href="" onclick="return false" target="_blank" class="nes-badge is-splited">
        <span class="is-dark">歌手</span>
        <span class="is-success">歌曲</span>
      </a>
      <ul class="hotSingers ">
        <li class="bgc " v-for="item in hotSingers " :key=item @click=searchByHotSinger(item)>{{ item }}</li>
      </ul>
    </div>

    <!-- 歌手介绍 -->
    <div class="info bgc2 animate__animated animate__fadeInDown">
      <div style="margin-left: 15px;" @click="searchSinger(singerDetailInfos.artist.name)">
        <a id="searchSinger" target="_blank" class="nes-badge is-icon">
          <span class="is-dark">more</span>
          <span class="is-warning">歌手简介</span>
        </a>

      </div>
      <div>歌手：{{ singerDetailInfos.artist.name }}</div>
      <div>歌手介绍：{{ singerDetailInfos.artist.briefDesc }}</div>
      <div>总唱片：{{ singerDetailInfos.artist.albumSize }}</div>
    </div>

    <!-- 歌曲列表 -->
    <div>
      <ul class="songList">
        <li class="bgc cardItem" v-for="item in singerDetailInfos.hotSongs" :key="item">
          <div>来源:{{ item.al.name }}</div>
          <div>歌曲:{{ item.name }}</div>
          <img class="singerImage" v-lazy=item.al.picUrl @click=SongById(item) />
        </li>
      </ul>
    </div>
  </main>
  <!-- 底部 -->
  <footer class="footer">
    <div>
      <a href="http://www.caoxiguo.top" target="_parent">Copyright © 2013-2023 我的音乐 caoxiguo.top All Rights
        Reserved.</a>
      <a href="https://beian.miit.gov.cn/" target="_blank">备案号:</a>
      <a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2021017504号</a>
    </div>
  </footer>
</template>
<style scoped>
.currentSong {
  /* position: fixed; */
  width: 100vw;
  padding: 15px 10px;

  height: 50px;
}

.mAudio {
  width: 100%;
  position: fixed;
  bottom: 0px;
  opacity: .9;
  z-index: 98;
  padding: 0;
}

.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  border-top: 1px solid #b89797;
}

.footer a {
  font-size: 14px;
  color: #999;
}

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

.info div {
  margin: 10px;

}

.songList {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15vh;
  justify-content: space-between;
  margin: auto;
  width: 90vw;
  margin-bottom: 1.5rem;
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
  padding: .5rem;
}

.group input {
  height: 45px;
}

.group button {
  margin-left: 10px;
}
</style>