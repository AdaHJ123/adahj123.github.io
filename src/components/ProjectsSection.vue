<script setup>
import { useRouter } from 'vue-router'
import ProjectCard from './ProjectCard.vue'
import projects from '../data/projects'

const router = useRouter()
const goDetail = (slug) => {
  router.push(`/projects/${slug}`)
}
</script>

<template>
  <section id="projects">
    <h2 class="section-title" style="font-size:2rem; margin-bottom:16px;">Projects</h2>

    <!-- 网格布局 -->
    <div class="grid">
      <ProjectCard
        v-for="p in projects"
        :key="p.slug"
        v-bind="p"
        @click="goDetail(p.slug)"
      />
      <!-- 用 p.slug 做 key，并确保你的项目数据每条都有 slug -->
    </div>

    <div class="more-link-row">
      <router-link class="more-link" to="/works">
        View More Works
      </router-link>
    </div>

  </section>
</template>

<style scoped>

/* 容器宽度：不贴边，居中 */
#projects {
  /* 你也可以放到外层 main/App 里，这里演示就地设置 */
  max-width: 1280px;                         /* 宽屏两列更舒适 */
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 32px);         /* 左右留边 根据屏幕尺寸来决定留边的距离*/
}


/* 一列/两列 */
.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  align-items: stretch;                    /* 卡片等高拉伸 */
}
/* ≥900px 时两列；也可以用 768/1024，按喜好 */
@media (min-width: 900px) {
  .grid {
     grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


.more-link-row {
  display: flex;
  justify-content: flex-end;
  margin: 32px 0 64px; /* top margin from grid, bottom space before Skills */
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 30px;
  border-radius: 999px;
  border: 1px solid rgba(138, 180, 255, 0.6);
  background: linear-gradient(120deg, rgba(60, 100, 170, 0.2), rgba(120, 90, 110, 0.14));
  color: #d7e6ff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 0 0 1px rgba(138, 180, 255, 0.15), 0 10px 22px rgba(0, 0, 0, 0.45);
  transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.more-link:hover {
  color: #ffffff;
  border-color: rgba(138, 180, 255, 0.9);
  background: linear-gradient(120deg, rgba(138, 180, 255, 0.28), rgba(226, 155, 167, 0.22));
  transform: translateY(-1px);
}
</style>

