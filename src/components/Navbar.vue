<script setup>

/* 这行是从 vue‑router 里拿两个工具�?
   useRoute()：获取当前路由对象，知道现在在哪个路径（比如 / 还是 /contact）�?
   useRouter()：获取路由实例，代码里可以调用它跳转（比�?router.push('/') 回首页）�?
   换句话说，一个用来“看我在哪”，一个用来“带我去哪里”�?
*/
import { useRoute, useRouter } from "vue-router"
import profile from "../data/profile.json";


const route = useRoute()
const router = useRouter()

const links = {
  linkedin: profile?.socials?.linkedin || "#",
  github: profile?.socials?.github || "#",
  instagram: profile?.socials?.instagram || "#",
  resume: profile?.resumeUrl || "#",
};


function goHome(e) {                     // 点击名字时触发的函数
  e.preventDefault()                     // 阻止默认的链接跳�?
  if (route.path === "/") {              // 如果当前就在首页
    window.scrollTo({ top: 0, behavior: "smooth" }) // ƽ�����ض���
  } else {                               // 如果在其它页�?
    router.push("/")                     // 通过路由跳转回首�?
  }
}

</script>

<template>
  <nav class="nav">
    <div class="nav__inner">
      <a href="#home" class="brand" aria-label="Go to top"@click="goHome" >{{
        profile.name || "Your Name"
      }}</a>

      <div class="actions">
        <a
          v-if="links.linkedin"
          :href="links.linkedin"
          target="_blank"
          rel="noreferrer"
          class="icon"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <!-- LinkedIn SVG -->
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <g transform="translate(1,1)"><!-- 强制图标在box内居�?-->
              <path
                id="Path_2520"
                d="M17.291,19.073h-3.007v-4.709c0-1.123-0.02-2.568-1.564-2.568c-1.566,0-1.806,1.223-1.806,2.487v4.79H7.908   V9.389h2.887v1.323h0.04c0.589-1.006,1.683-1.607,2.848-1.564c3.048,0,3.609,2.005,3.609,4.612L17.291,19.073z M4.515,8.065   c-0.964,0-1.745-0.781-1.745-1.745c0-0.964,0.781-1.745,1.745-1.745c0.964,0,1.745,0.781,1.745,1.745   C6.26,7.284,5.479,8.065,4.515,8.065L4.515,8.065 M6.018,19.073h-3.01V9.389h3.01V19.073z M18.79,1.783H1.497   C0.68,1.774,0.01,2.429,0,3.246V20.61c0.01,0.818,0.68,1.473,1.497,1.464H18.79c0.819,0.01,1.492-0.645,1.503-1.464V3.245   c-0.012-0.819-0.685-1.474-1.503-1.463"
              />
            </g>
          </svg>
        </a>

        <a
          v-if="links.github"
          :href="links.github"
          target="_blank"
          rel="noreferrer"
          class="icon"
          aria-label="Github"
          title="Github"
        >
          <!-- Github SVG -->
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M12 2C6.476 2 2 6.477 2 12c0 4.418 2.865 8.166 6.84 9.488.5.092.683-.216.683-.482 0-.238-.009-.87-.014-1.706-2.782.604-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.464-1.11-1.464-.907-.62.069-.607.069-.607 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.089.636-1.34-2.221-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.706.115 2.505.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.698 1.028 1.591 1.028 2.682 0 3.842-2.337 4.687-4.565 4.936.358.309.678.92.678 1.855 0 1.337-.012 2.414-.012 2.742 0 .268.18.58.688.481C19.138 20.163 22 16.416 22 12 22 6.477 17.523 2 12 2z"
            />
          </svg>
        </a>

        <a
          v-if="links.instagram"
          :href="links.instagram"
          target="_blank"
          rel="noreferrer"
          class="icon"
          aria-label="Instagram"
          title="Instagram"
        >
          <!-- Instagram SVG -->
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608   c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608   c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07   c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849   c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311   C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014   C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038   c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072   c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12   c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942   C15.668,0.014,15.259,0,12,0z"
            />
            <path
              d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162   C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z"
            />
            <circle cx="18.406" cy="5.594" r="1.44" />
          </svg>
        </a>

        <a
          v-if="links.resume"
          :href="links.resume"
          class="icon"
          aria-label="Download Resume"
          title="Download Resume"
          download
        >
          <!-- Download/Resume SVG -->
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <g transform="scale(0.185)">
              <!-- 24 / 128 = 0.1875 -->
              <path
                d="M30.13 51.31h20a1.75 1.75 0 0 0 1.75-1.75v-5.12a11.067 11.067 0 0 0-4.4-8.832 9.977 9.977 0 1 0-14.713 0 11.08 11.08 0 0 0-4.387 8.832v5.12a1.75 1.75 0 0 0 1.75 1.75zm10-28.894a6.477 6.477 0 1 1-6.477 6.477 6.485 6.485 0 0 1 6.473-6.476zM31.88 44.44a7.576 7.576 0 0 1 3.87-6.594 9.857 9.857 0 0 0 8.754 0 7.56 7.56 0 0 1 3.876 6.594v3.37h-16.5z"
              />
              <path
                d="M112.654 4.75H15.346A1.75 1.75 0 0 0 13.6 6.5v115a1.75 1.75 0 0 0 1.75 1.75h97.308a1.75 1.75 0 0 0 1.75-1.75V6.5a1.75 1.75 0 0 0-1.754-1.75zm-1.75 115H17.1V8.25h93.8z"
              />
              <path
                d="M26.346 65.75h75.308a1.75 1.75 0 1 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM26.346 80.194h75.308a1.75 1.75 0 0 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM26.346 109.083h75.308a1.75 1.75 0 0 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM26.346 94.639h75.308a1.75 1.75 0 1 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM64 22.417h37.654a1.75 1.75 0 0 0 0-3.5H64a1.75 1.75 0 0 0 0 3.5zM64 36.861h37.654a1.75 1.75 0 0 0 0-3.5H64a1.75 1.75 0 0 0 0 3.5zM64 51.306h37.654a1.75 1.75 0 0 0 0-3.5H64a1.75 1.75 0 0 0 0 3.5z"
              />
            </g>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
   
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(120deg, rgba(80, 115, 170, 0.2), rgba(180, 90, 110, 0.14));   /* 深灰背景 */
  /* border-bottom: 1px solid #000000; */
  backdrop-filter: saturate(150%) blur(6px);
  isolation: isolate;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55), inset 0 0 26px rgba(0, 0, 0, 0.55), 0 0 20px rgba(138, 180, 255, 0.16);
  
  
  /* width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw); */
  /* �?用百分比，不要用 100vw + calc(...) */
  width: 100%;
  margin: 0;                /* 删掉 margin-left/right �?calc */
  padding-inline: clamp(16px, 4vw, 48px); /* 小屏16px �?大屏最�?8px */
}

.nav__inner {

  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  /* margin: 0 auto; */
  padding-block: 20px;
  /* padding: 20px 32px;  */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  /* 测试边框大小�?*/
  /* outline: 3px solid red;   */

}
.brand {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
  font-size: 2.0rem; 
}
.actions {
  display: flex;
  gap: 20px;
  align-items: center;
}
.icon {
  --size: 60px;
  width: var(--size);
  height: var(--size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e6e6e6;
  background: #fafafa;
  border-radius: 50%; 
  text-decoration: none;

  /* 图标多大：用“字体大小”来控制 */
  font-size: 44px;    /* 图标=22px；想大或小就改这个数 */
  line-height: 1;

  transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease;
}

/* 这句让所有图标跟着 font-size 变化，不用改每个 <svg> */
.icon svg {
  width: 1em;   /* 1em = .icon �?font-size */
  height: 1em;
  display: block; /* 去掉行内小缝隙，更居�?*/
}

.icon:hover {
  transform: translateY(-1px);
  background: #e2e1e1;
  border-color: #e2e1e1;
}
</style>



