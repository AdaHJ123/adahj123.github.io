<script setup>


// 目的

// 卡片里有一�?<video>�?

// 只有当卡片滚动到屏幕里时，才给视频设�?src 并播放（静音、循环）�?

// 滚出屏幕就暂停，省资源�?

// 离开页面时把观察器关掉，防止内存泄露�?

import { ref, onMounted, onBeforeUnmount } from 'vue'//添加观察�?

//接收从母组件传来的数据（props�?
const props = defineProps({
  title: String,
  summary: String,
  tags: { type: Array, default: () => [] },
  poster: String, // 封面�?
  videoSrc: '/media/10secs.mp4',
})


const cardEl = ref(null)         // 用于观察整张�?
const videoEl = ref(null)        // 访问 <video>
let io = null                    // IntersectionObserver 实例

//onMounted()用于template里的相应组件出现在页面上�?
onMounted(() => {
  // 提前 200px 进入视口就触发，体验更顺�?
  io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const v = videoEl.value
      if (!v) return

      // 进入视口：懒加载 + 播放
      if (entry.isIntersecting) {
        if (!v.src && props.videoSrc) v.src = props.videoSrc
        v.muted = true            // 自动播放策略：必须静�?
        v.loop = true
        v.playsInline = true      //playsInline 的意思是“在页面里直接播放”，不要全屏、不要跳到播放器界面里去�?
        v.play().catch(() => {}) // 某些浏览器可能阻止，忽略报错即可
      } else {
        // 离开视口：暂停（节省资源�?
        v.pause()
      }
    })
  }, { rootMargin: '200px 0px', threshold: 0.01 })    
  //threshold: 0.01：当�?% 面积进入视口就算“进入�?rootMargin: '200px 0px'：在视口上下各提�?200px 就开始触发回调（预加载更顺滑�?
  //IntersectionObserver 会算：“目标”和“视口”这两个矩形有多大面积重叠。两个参数控制“什么时候算作进�?离开”�?
  
  if (cardEl.value) io.observe(cardEl.value)
  //把整张卡�?cardEl 加入观察队列。从现在起，只要它进�?离开视口，上面的回调就会执行
})


//组件卸载前，清理观察�?
onBeforeUnmount(() => {
  if (io && cardEl.value) io.unobserve(cardEl.value)
  if (io) io.disconnect()
})
</script>

<template>
   <div class="card" ref="cardEl">
    <div class="media">
      <video
        ref="videoEl"
        class="media__video"
        preload="none"
        playsinline
        muted
        loop
        :poster="poster"
      ></video>
    </div>

    <!-- 文字区域 -->
    <div class="body">
      <h3 class="title">{{ title }}</h3>
      <p class="summary">{{ summary }}</p>

      <!-- 标签 -->
      <ul class="tags" v-if="tags.length">
        <li v-for="t in tags" :key="t">{{ t }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
  cursor: pointer;
  
}
.card:hover {
  transform: translateY(-3px);
  border-color: #3a3a3a;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
}

/* 封面图区�?*/
.media {
  aspect-ratio: 16/9; /* 固定比例 */
  background: #000;
}

.media__video { width:100%; height:100%; object-fit:cover; display:block; }


/* 文本 */
.body {
  padding: 8px 16px 0px;
  display: flex;                /* 让卡片内不同元素纵向布局 */
  flex-direction: column;
  flex: 1 1 auto;               /* 填满剩余空间 */
}
.title {
  margin: 0 0 8px;
  color: #f5f5f5;
  font-size: 18px;
  font-weight: 700;
}
.summary {
  margin: 0 0 18px;
  color: #d8d8d8;
  font-size: 14px;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 3;        /* 只显示三�?*/
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;



  white-space: pre-line; 
  word-break: break-word; 
  min-height: calc(1.4em * 3);  
}
.tags {
  margin-top: auto;             /* 关键：把 tags 推到内容区底�?*/
  margin-bottom: 0;  /* 决定了tags到卡片底部的距离 */
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
}
.tags li {
  font-size: 12px;
  color: #cfcfcf;
  border: 1px solid #3a3a3a;
  padding: 0px 8px 0px;
  border-radius: 999px;
}
</style>
