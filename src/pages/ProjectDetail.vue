<template>
  <div class="content project-detail">
    <div class="portfolio-header">
      <router-link class="portfolio-close" to="/">
        <span class="close-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation" focusable="false">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
          </svg>
        </span>
        <small>Go Back</small>
      </router-link>
    </div>

    <div class="portfolio-top">
      <div class="content-placeholder">
        <iframe
          v-if="project.youtubeId"
          :src="`https://www.youtube.com/embed/${project.youtubeId}?rel=0`"
          :title="project.title"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <video v-else playsinline loop muted autoplay preload="metadata">
          <source v-if="project.videoMp4" :src="project.videoMp4" type="video/mp4" />
          <source v-if="project.videoWebm" :src="project.videoWebm" type="video/webm" />
        </video>
      </div>
      <h2>{{ project.title }}</h2>
    </div>

    <div class="experience">
      <section class="job-card">
        <h3>About</h3>
        <p>{{ project.summary || "More details coming soon." }}</p>
      </section>

      <section class="job-card">
        <h3>Project Info</h3>
        <ul>
          <li v-if="project.role"><span class="list-label">Role:</span> {{ project.role }}</li>
          <li v-if="project.duration"><span class="list-label">Time:</span> {{ project.duration }}</li>
          <li v-if="project.year"><span class="list-label">Year:</span> {{ project.year }}</li>
          <li v-if="project.tags && project.tags.length">
            <span class="list-label">Tech:</span> {{ project.tags.join(', ') }}
          </li>
        </ul>
        <div class="project-links" v-if="project.links && (project.links.demo || project.links.github)">
          <a
            v-if="project.links.demo"
            class="url-link"
            :href="project.links.demo"
            target="_blank"
            rel="noreferrer"
          >
            Demo
          </a>
          <a
            v-if="project.links.github"
            class="url-link"
            :href="project.links.github"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>

    <div v-for="section in project.sections" :key="section.id || section.title" class="part">
      <h3 v-if="section.title" class="part-header">{{ section.title }}</h3>
      <!-- layout: "split" = 左图右文（可复用到其它项目） -->
      <div v-if="section.layout === 'split'" class="project-detail-split">
        <div
          v-if="section.images && section.images.length"
          class="project-detail-gallery project-detail-gallery--split"
          :data-section="section.dataSection || null"
          :style="getSplitGalleryStyle(section)"
        >
          <!-- 缩略图支持三种可选属性：
               thumbFit: "contain"     显示完整内容不裁切
               thumbSize: "narrow"     缩小该图占位（适合竖图/示意图）
               thumbRatio: "auto" 或 "4 / 3"（auto 取消固定比例；字符串值用于自定义缩略图比例） -->
        <figure
          v-for="image in section.images"
          :key="image.src"
          :class="['project-detail-item', { 'project-detail-item--narrow': image.thumbSize === 'narrow' }]"
        >
          <button
            :class="[
              'project-detail-thumb',
              {
                'project-detail-thumb--contain': image.thumbFit === 'contain',
                'project-detail-thumb--auto': image.thumbRatio === 'auto',
              },
            ]"
            :style="image.thumbRatio && image.thumbRatio !== 'auto' ? { aspectRatio: image.thumbRatio } : null"
            type="button"
            @click="openLightbox(image)"
          >
            <img :src="image.src" :alt="image.alt || ''" loading="lazy" />
          </button>
          <figcaption v-if="image.alt" class="project-detail-caption">
            {{ image.alt }}
          </figcaption>
        </figure>
        </div>
        <div class="project-detail-split-text">
          <!-- section.textVariant = "comment" 时，正文按“注释风格”渲染（可复用到其它项目） -->
          <div
            v-if="section.text"
            :class="[
              'project-detail-text',
              { 'project-detail-text--comment': section.textVariant === 'comment' },
            ]"
            v-html="section.text"
          ></div>
          <p v-if="section.afterText" class="project-detail-text" v-html="section.afterText"></p>
          <div v-if="section.afterText2" class="project-detail-text" v-html="section.afterText2"></div>
        </div>
      </div>
      <!-- 普通布局（非 split）：保持原有渲染顺序（文 -> 图 -> afterText） -->
      <template v-else>
        <!-- section.textVariant = "comment" 时，正文按“注释风格”渲染（可复用到其它项目） -->
        <div
          v-if="section.text"
          :class="[
            'project-detail-text',
            { 'project-detail-text--comment': section.textVariant === 'comment' },
          ]"
          v-html="section.text"
        ></div>
        <div
          v-if="section.images && section.images.length"
          :class="['project-detail-gallery', { 'project-detail-gallery--stack': section.layout === 'stack' }]"
          :data-section="section.dataSection || null"
        >
          <!-- 缩略图支持三种可选属性：
               thumbFit: "contain"     显示完整内容不裁切
               thumbSize: "narrow"     缩小该图占位（适合竖图/示意图）
               thumbRatio: "auto" 或 "4 / 3"（auto 取消固定比例；字符串值用于自定义缩略图比例） -->
          <figure
            v-for="image in section.images"
            :key="image.src"
            :class="['project-detail-item', { 'project-detail-item--narrow': image.thumbSize === 'narrow' }]"
          >
            <button
              :class="[
                'project-detail-thumb',
                {
                  'project-detail-thumb--contain': image.thumbFit === 'contain',
                  'project-detail-thumb--auto': image.thumbRatio === 'auto',
                },
              ]"
              type="button"
              @click="openLightbox(image)"
            >
              <img :src="image.src" :alt="image.alt || ''" loading="lazy" />
            </button>
            <figcaption v-if="image.alt" class="project-detail-caption">
              {{ image.alt }}
            </figcaption>
          </figure>
        </div>
        <p v-if="section.afterText" class="project-detail-text" v-html="section.afterText"></p>
        <div v-if="section.afterText2" class="project-detail-text" v-html="section.afterText2"></div>
      </template>
      <!-- afterImages：用于在 afterText/afterText2 之后追加图片，可用 afterImagesLayout 控制排版 -->
      <div
        v-if="section.afterImages && section.afterImages.length"
        :class="[
          'project-detail-gallery',
          {
            'project-detail-gallery--stack':
              (section.afterImagesLayout || 'grid') === 'stack',
          },
        ]"
      >
        <figure
          v-for="image in section.afterImages"
          :key="image.src"
          :class="['project-detail-item', { 'project-detail-item--narrow': image.thumbSize === 'narrow' }]"
        >
          <button
            :class="[
              'project-detail-thumb',
              {
                'project-detail-thumb--contain': image.thumbFit === 'contain',
                'project-detail-thumb--auto': image.thumbRatio === 'auto',
              },
            ]"
            :style="image.thumbRatio && image.thumbRatio !== 'auto' ? { aspectRatio: image.thumbRatio } : null"
            type="button"
            @click="openLightbox(image)"
          >
            <img :src="image.src" :alt="image.alt || ''" loading="lazy" />
          </button>
          <figcaption v-if="image.alt" class="project-detail-caption">
            {{ image.alt }}
          </figcaption>
        </figure>
      </div>
      <div v-if="section.youtubeId" class="project-detail-video">
        <div class="project-detail-video-frame">
          <iframe
            :src="`https://www.youtube.com/embed/${section.youtubeId}?rel=0`"
            :title="section.videoCaption || section.title || 'Project video'"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p v-if="section.videoCaption" class="project-detail-caption">
          {{ section.videoCaption }}
        </p>
      </div>
    </div>

    <div
      v-if="lightboxImage"
      ref="lightboxElement"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      @click.self="closeLightbox"
    >
      <!--
        Lightbox 大图交互说明：
        @load：图片加载后读取尺寸，计算“真实大小”可放大上限。
        @wheel.prevent：滚轮缩放大图，并阻止页面跟随滚动。
        @click：鼠标左键分步缩放；未到上限时放大，到上限后改为缩小。
        @pointerdown：开始拖拽平移（后续由 pointermove/pointerup 完成）。
        @dragstart.prevent：禁用浏览器默认拖图，避免与自定义平移冲突。
      -->
      <img
        ref="lightboxImageElement"
        :src="lightboxImage.src"
        :alt="lightboxImage.alt || project.title"
        :style="lightboxImageStyle"
        @load="onLightboxImageLoad"
        @wheel.prevent="onLightboxWheel"
        @click="onLightboxClick"
        @pointerdown="onLightboxPointerDown"
        @dragstart.prevent
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import projects from "../data/projects"

const route = useRoute()
const router = useRouter()

const defaults = {
  slug: "",
  title: "",
  role: "",
  duration: "",
  tags: [],
  summary: "",
  descriptionLong: "",
  videoMp4: "",
  videoWebm: "",
  year: "",
  youtubeId: "",
  links: {},
  sections: [],
}

const project = computed(() => {
  const found = projects.find((p) => p.slug === route.params.slug)
  if (!found) return defaults
  const fallbackSections = [
    {
      id: "introduction",
      title: "Introduction",
      text: found.descriptionLong || found.summary || "",
      layout: "grid",
      images: found.introImages || [],
    },
  ]
  return {
    ...defaults,
    ...found,
    duration: found.duration || found.timeframe || "",
    tags: found.tags || found.tech || [],
    summary: found.summary || found.description || "",
    videoMp4: found.videoMp4 || found.videoSrc || "",
    videoWebm: found.videoWebm || "",
    youtubeId: found.youtubeId || "",
    links: found.links || {},
    sections: found.sections && found.sections.length ? found.sections : fallbackSections,
  }
})

const lightboxImage = ref(null)

// 以下皆是针对lightbox(点击图片放大)功能的变量：
const lightboxElement = ref(null) // Lightbox 容器 DOM 引用（用于读取可视区域尺寸）
const lightboxImageElement = ref(null) // Lightbox 大图 DOM 引用（用于读取图片尺寸）
const minLightboxScale = 1 // 最小缩放：1 表示初始适配大小
const lightboxScale = ref(minLightboxScale) // 当前缩放倍率
const lightboxMaxScale = ref(minLightboxScale) // 最大缩放倍率（按图片真实像素动态计算）
const lightboxPanX = ref(0) // 当前 X 方向平移量
const lightboxPanY = ref(0) // 当前 Y 方向平移量
const isPanningLightbox = ref(false) // 是否处于拖拽平移中
const panPointerId = ref(null) // 当前拖拽对应的 pointer id（鼠标/触摸/笔）
const panStartX = ref(0) // 开始拖拽时的指针 X 坐标
const panStartY = ref(0) // 开始拖拽时的指针 Y 坐标
const panOriginX = ref(0) // 开始拖拽时图片原始 X 平移量
const panOriginY = ref(0) // 开始拖拽时图片原始 Y 平移量
const didPanDuringPointer = ref(false) // 当前 pointer 周期内是否发生过有效拖动
const zoomScaleEpsilon = 0.001 // 缩放比较容差，避免浮点误差造成状态抖动
const clickZoomStep = 1.2 // 左键点击缩放步进（与滚轮单次手感接近）

// 宽屏时使用 splitGalleryGapDesktop（图片有间隔），小屏时使用 splitGalleryGapMobile（可设为无间隔）
const isDesktop = ref(typeof window !== "undefined" ? window.innerWidth >= 768 : false)

const clampNumber = (value, min, max) => Math.min(max, Math.max(min, value))

const stopLightboxPan = () => {
  isPanningLightbox.value = false
  panPointerId.value = null
}

const resetLightboxInteraction = () => {
  lightboxScale.value = minLightboxScale
  lightboxMaxScale.value = minLightboxScale
  lightboxPanX.value = 0
  lightboxPanY.value = 0
  stopLightboxPan()
}

// 将平移量限制在当前可视范围内，避免放大后把图片拖出过头。
const clampPanToViewport = (x, y, scale = lightboxScale.value) => {
  const boxElement = lightboxElement.value
  const imageElement = lightboxImageElement.value
  if (!boxElement || !imageElement || scale <= minLightboxScale) {
    return { x: 0, y: 0 }
  }

  const viewportWidth = boxElement.clientWidth
  const viewportHeight = boxElement.clientHeight
  const scaledWidth = imageElement.clientWidth * scale
  const scaledHeight = imageElement.clientHeight * scale

  const maxX = Math.max(0, (scaledWidth - viewportWidth) / 2)
  const maxY = Math.max(0, (scaledHeight - viewportHeight) / 2)

  return {
    x: clampNumber(x, -maxX, maxX),
    y: clampNumber(y, -maxY, maxY),
  }
}

// 按图片原始像素与当前显示尺寸的比值计算最大缩放倍率（真实大小上限）。
const refreshLightboxMaxScale = () => {
  const imageElement = lightboxImageElement.value
  if (!imageElement) return

  const renderedWidth = imageElement.clientWidth || 1
  const renderedHeight = imageElement.clientHeight || 1
  const naturalWidth = imageElement.naturalWidth || renderedWidth
  const naturalHeight = imageElement.naturalHeight || renderedHeight

  const realSizeScale = Math.max(
    minLightboxScale,
    naturalWidth / renderedWidth,
    naturalHeight / renderedHeight,
  )

  lightboxMaxScale.value = realSizeScale
  lightboxScale.value = clampNumber(lightboxScale.value, minLightboxScale, lightboxMaxScale.value)
  const clampedPan = clampPanToViewport(lightboxPanX.value, lightboxPanY.value, lightboxScale.value)
  lightboxPanX.value = clampedPan.x
  lightboxPanY.value = clampedPan.y
}

const onLightboxImageLoad = () => {
  window.requestAnimationFrame(() => {
    refreshLightboxMaxScale()
  })
}

// 按指定客户端坐标做缩放（wheel 与 click 共用），并保持该坐标处内容尽量稳定。
const applyZoomAtClientPoint = (clientX, clientY, targetScale) => {
  const boxElement = lightboxElement.value
  if (!boxElement) return

  const currentScale = lightboxScale.value
  const nextScale = clampNumber(targetScale, minLightboxScale, lightboxMaxScale.value)
  if (Math.abs(nextScale - currentScale) < 0.0001) return

  const boxRect = boxElement.getBoundingClientRect()
  const pointerX = clientX - (boxRect.left + boxRect.width / 2)
  const pointerY = clientY - (boxRect.top + boxRect.height / 2)

  const nextPanX = pointerX - ((pointerX - lightboxPanX.value) / currentScale) * nextScale
  const nextPanY = pointerY - ((pointerY - lightboxPanY.value) / currentScale) * nextScale
  const clampedPan = clampPanToViewport(nextPanX, nextPanY, nextScale)

  lightboxScale.value = nextScale
  lightboxPanX.value = clampedPan.x
  lightboxPanY.value = clampedPan.y
}

// 以鼠标当前位置为缩放锚点做滚轮缩放，并同步修正平移避免画面跳动。
const onLightboxWheel = (event) => {
  if (!lightboxImage.value) return
  if (lightboxMaxScale.value <= minLightboxScale + zoomScaleEpsilon) return

  const currentScale = lightboxScale.value
  const zoomFactor = Math.exp(-event.deltaY * 0.0015)
  applyZoomAtClientPoint(event.clientX, event.clientY, currentScale * zoomFactor)
}

const onLightboxClick = (event) => {
  if (!lightboxImage.value) return
  if (didPanDuringPointer.value) {
    didPanDuringPointer.value = false
    return
  }
  if (lightboxMaxScale.value <= minLightboxScale + zoomScaleEpsilon) return

  const atMaxScale = lightboxScale.value >= lightboxMaxScale.value - zoomScaleEpsilon
  const zoomFactor = atMaxScale ? (1 / clickZoomStep) : clickZoomStep
  applyZoomAtClientPoint(event.clientX, event.clientY, lightboxScale.value * zoomFactor)
}

const onLightboxPointerDown = (event) => {
  didPanDuringPointer.value = false
  if (lightboxScale.value <= minLightboxScale) return

  isPanningLightbox.value = true
  panPointerId.value = event.pointerId
  panStartX.value = event.clientX
  panStartY.value = event.clientY
  panOriginX.value = lightboxPanX.value
  panOriginY.value = lightboxPanY.value
  event.preventDefault()
}

const onLightboxPointerMove = (event) => {
  if (!isPanningLightbox.value || event.pointerId !== panPointerId.value) return

  const deltaX = event.clientX - panStartX.value
  const deltaY = event.clientY - panStartY.value
  if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
    didPanDuringPointer.value = true
  }
  const nextPanX = panOriginX.value + deltaX
  const nextPanY = panOriginY.value + deltaY
  const clampedPan = clampPanToViewport(nextPanX, nextPanY)

  lightboxPanX.value = clampedPan.x
  lightboxPanY.value = clampedPan.y
}

const onLightboxPointerUp = (event) => {
  if (!isPanningLightbox.value || event.pointerId !== panPointerId.value) return
  stopLightboxPan()
}

const lightboxImageStyle = computed(() => ({
  transform: `translate3d(${lightboxPanX.value}px, ${lightboxPanY.value}px, 0) scale(${lightboxScale.value})`,
  cursor:
    isPanningLightbox.value
      ? "grabbing"
      : lightboxMaxScale.value <= minLightboxScale + zoomScaleEpsilon
        ? "default"
        : lightboxScale.value >= lightboxMaxScale.value - zoomScaleEpsilon
          ? "zoom-out"
          : "zoom-in",
  transition: isPanningLightbox.value ? "none" : "transform 0.08s ease-out",
}))

const openLightbox = (image) => {
  lightboxImage.value = image
  resetLightboxInteraction()
  document.body.style.overflow = "hidden"
}

const closeLightbox = () => {
  lightboxImage.value = null
  resetLightboxInteraction()
  document.body.style.overflow = ""
}

const onKeydown = (event) => {
  if (event.key === "Escape" && lightboxImage.value) {
    closeLightbox()
  }
}

// 每次浏览器触发 resize 事件时执行一次。
// 触发频率由浏览器决定，用户拖动窗口时会连续触发；不拖动就不触发。
const onResize = () => {
  isDesktop.value = window.innerWidth >= 768
  if (lightboxImage.value) {
    refreshLightboxMaxScale()
  }
}

const getSplitGalleryStyle = (section) => {
  const gap = isDesktop.value ? section.splitGalleryGapDesktop : section.splitGalleryGapMobile
  const columnsRaw = isDesktop.value
    ? (section.splitGalleryColumnsDesktop ?? 1)
    : (section.splitGalleryColumnsMobile ?? 1)
  const columns = Number(columnsRaw)
  const style = {}
  if (gap) style.gap = gap
  if (Number.isFinite(columns) && columns > 0) {
    style.gridTemplateColumns = `repeat(${Math.floor(columns)}, minmax(0, 1fr))`
  }
  return style
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "auto" })
  window.addEventListener("keydown", onKeydown)
  window.addEventListener("resize", onResize)
  // 在全局监听 pointer move/up/cancel，拖拽时即使指针离开图片也能持续跟踪并正确结束。
  window.addEventListener("pointermove", onLightboxPointerMove)
  window.addEventListener("pointerup", onLightboxPointerUp)
  window.addEventListener("pointercancel", onLightboxPointerUp)
  onResize()
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
  window.removeEventListener("resize", onResize)
  window.removeEventListener("pointermove", onLightboxPointerMove)
  window.removeEventListener("pointerup", onLightboxPointerUp)
  window.removeEventListener("pointercancel", onLightboxPointerUp)
  document.body.style.overflow = ""
})

if (!project.value.slug) router.replace("/")
</script>

<style src="../project-detail-style.css"></style>
