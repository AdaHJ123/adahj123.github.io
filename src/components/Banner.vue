<script setup>
import profile from "../data/profile.json";
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="banner">

  
    <img
        v-if="profile.avatar"
        :src="profile.avatar"
        alt="avatar"
        class="avatar"
    />

    
    <div class="banner_right">
      <!-- 名字 -->
      <h1 class="name">{{ profile.name || "Your Name" }}</h1>

      <!-- 副标题 + 地点 -->
      <p class="sub">
        {{ profile.headline }} · {{ profile.location }}
      </p>

          <!-- 头像 -->
    

      <!-- 自我介绍（从 profile.intro / about 读取；没有就给一段默认文案） -->
      <p class="intro">
        {{
          profile.intro ||profile.about }}
      </p>

      <!-- 行动按钮：发邮件 -->
      <div class="cta">

         <!-- <a>：一个可以点的链接，整块都是可点区域（包括图标和文字）
              class="mail"：给按钮一个样式钩子，控制外观（圆角、边框、hover 等）。
              aria-label：无障碍文本，读屏软件会念「Send me an email」
              title：鼠标悬停时显示的小提示气泡 -->
        <RouterLink
          to="/contact"
          class="mail"
          aria-label="Send me an email"
          title="Send me an email"
        >
          <!-- 信封 SVG（跟随字体大小缩放） -->
          <svg viewBox="0 0 24 24" aria-hidden="true" class="mail__icon">
            <path
              d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 8.5l8 6 8-6V18H4V8.5Z"
              fill="currentColor"
            />
          </svg>
          <span>Send Email</span>
        </RouterLink>
        
      </div>
    </div>

  </header>
</template>

<style scoped>
/* 布局 */
.banner {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  padding: 32px clamp(32px, 6vw, 80px); /* 尝试用中间值 6vw（视口宽度的 6%）但结果不会小于最小值 32px，也不会大于最大值 80px */
  position: relative;
  background: linear-gradient(120deg, rgba(80, 115, 170, 0.2), rgba(180, 90, 110, 0.14));
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55), inset 0 0 26px rgba(0, 0, 0, 0.55), 0 0 20px rgba(138, 180, 255, 0.16);
}

.banner_right {
  flex: 1;
  min-width: 0;
}

/* 文案 */
.name {
  margin: 0;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff; 
}
.sub {
  margin: 8px 0 10px 0;
  color: #bccce7;
  font-size: clamp(14px, 1.8vw, 16px);
}
.intro {
  max-width: clamp(70ch, 80vw, 90ch);
  text-align: left;
  text-indent: 16px;
  margin-left: 0;
  color: #bccce7;
  line-height: 1.6;

  /* “vw” = 视口宽度的百分比。1vw = 屏幕宽度的 1% */
  font-size: clamp(16px, 1.8vw, 18px);
}

/* CTA 区域 */
.cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-start;
}


/* 发邮件按钮（带 SVG） */
.mail {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 999px;
  text-decoration: none;
  color: #f7fafc;
  font-weight: 600;
  transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
.mail:hover {
  color: #ffffff;
  border-color: rgba(138, 180, 255, 0.9);
  background: linear-gradient(120deg, rgba(138, 180, 255, 0.28), rgba(226, 155, 167, 0.22));
  transform: translateY(-1px);
}
.mail__icon {
  width: 1.1em;  /* 跟随文字大小 */
  height: 1.1em;
  display: block;
}

/* 头像 */
.avatar {
  width: clamp(151px, 12vw, 201px);
  height: clamp(151px, 12vw, 201px);
  border-radius: 9999px;
  object-fit: cover;
}

/* 小屏优化 */
@media (max-width: 640px) {
  .banner {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 16px;
  }
  .avatar {
    width: 84px;
    height: 84px;
  }
}
</style>
