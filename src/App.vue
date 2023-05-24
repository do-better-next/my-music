<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { getSingerId, getSingerDetails, getSongById } from './api/singer'
import Loading from './components/Loading.vue'
const singerId = ref(0)
const isLoading = ref(true)
const singerName = ref("法老")
const hotSingers = ref([
  "老舅",
  "GAI",
  "PG One",
  "黄旭",
  "艾热",
  "Vinida",
  "Bridge",
  "摩登兄弟刘宇宁",
  "李佳隆",
  "Jony J",
  "郭采洁",
  "纳吾克热",
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
const songUrl = ref("")
const isDisplay = ref(false)
const randomColor = ref("")
const singerDetailInfos = reactive({
  "artist": {},
  "hotSongs": {}
})

function color16() {//十六进制颜色随机
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  randomColor.value = color
  console.log(randomColor.value);
}

async function SingerId() {
  const { data } = await getSingerId({ "keywords": singerName.value })
  isDisplay.value = true
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

}
function orderByHotSinger(name){
  singerName.value=name
  SingerId(singerName)
}

onMounted(() => {
  SingerId()
  color16()
})
</script>

<template>
  
  <main class="bgc-reverse">
    
    <audio id="music" class="bgc-reverse mAudio" v-if="isDisplay" loop :src=songUrl autoplay controls>
      您的浏览器不支持 audio 元素。
    </audio>
    <div class="group">
      <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path
            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
          </path>
        </g>
      </svg>
      <input class="input margin-left " type="search" v-model="singerName" @keyup.enter="SingerId(singerName)" />
    </div>
    <button @click=SingerId(singerName) class="learn-more">查询歌手</button>

    <div class="info bgc2">
      <ul class="hotSingers">
        <li v-for="item in hotSingers " :key=item @click=orderByHotSinger(item) >{{item}}</li>
      </ul>
    </div>


    <div v-if="isDisplay" class="info bgc2">
      <div class="margin-top">歌手：{{ singerDetailInfos.artist.name }}</div>
      <div class="margin-top">歌手介绍：{{ singerDetailInfos.artist.briefDesc }}</div>
      <div class="margin-top">总唱片：{{ singerDetailInfos.artist.albumSize }}</div>
    </div>



    <ul class="songList" v-if="singerDetailInfos.hotSongs!=null">
      <li class="bgc" v-for="item in singerDetailInfos.hotSongs" :key="item">
        <div class="margin-top">来源:{{ item.al.name }}</div>
        <div class="margin-top">歌曲:{{ item.name }}</div>
        <img class="singerImage" :src=item.al.picUrl @click=SongById(item.privilege.id) />
      </li>
    </ul>
     </main>
</template>
<style scoped>
.hotSingers{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
}
.hotSingers li{
  width: 5vw;
  margin: 5vh;
  cursor: pointer;
  
}
.info {
  width: 90vw;
  border-radius: 15px;
  padding: 15px;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;

}

.mAudio {
  width: 100%;
  height: 10vh;
  padding: 10px 0px;
  position: fixed;
  bottom: 0;
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
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  margin-bottom: 12vh;
}

.songList li {
  width: 15vw;
  background-color: #f90;
  border-radius: 15px;
  margin: 10px;
}

button {
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-family: inherit;
  font-size: 15px;
}

button.learn-more {
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 0.6em 1em;
  background: #fff0f0;
  border: 2px solid #b18597;
  border-radius: 0.75em;
  margin: 10px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
}

button.learn-more::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f9c4d2;
  border-radius: inherit;

  transform: translate3d(0, 0.75em, -1em);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
}

button.learn-more:hover {
  background: #ffe9e9;
  -webkit-transform: translate(0, 0.25em);
  transform: translate(0, 0.25em);
}

button.learn-more:hover::before {
  -webkit-box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
  box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
  -webkit-transform: translate3d(0, 0.5em, -1em);
  transform: translate3d(0, 0.5em, -1em);
}

button.learn-more:active {
  background: #ffe9e9;
  -webkit-transform: translate(0em, 0.75em);
  transform: translate(0em, 0.75em);
}

button.learn-more:active::before {
  -webkit-box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  -webkit-transform: translate3d(0, 0, -1em);
  transform: translate3d(0, 0, -1em);
}

.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 200px;
}

.input {
  width: 100%;
  height: 35px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: .3s ease;
  margin-top: 15px;
}

.input::placeholder {
  color: #9e9ea7;
}

.input:focus,
input:hover {
  outline: none;
  border-color: rgba(234, 76, 137, 0.4);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
}

.icon {
  margin-top: 15px;
  position: absolute;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
}
</style>