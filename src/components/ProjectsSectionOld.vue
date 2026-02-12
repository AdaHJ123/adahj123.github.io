<script setup>
import projects from "../data/projects"
</script>

<template>
  <section id="projects" style="padding: 40px 0;">
    <h2 style="margin:0 0 16px 0;">Projects</h2>
    <div style="display:flex;flex-direction:column;gap:28px;">
      <article v-for="p in projects" :key="p.slug" style="border:1px solid #eaeaea;border-radius:12px;padding:16px;">
        <header style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;">
          <h3 style="margin:0;">{{ p.title }}</h3>
          <small style="opacity:.7;">{{ p.year }} · {{ p.role }} · {{ p.duration }}</small>
        </header>
        <p style="margin:10px 0 8px 0;">{{ p.summary }}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <span v-for="t in p.tech" :key="t" style="font-size:12px;border:1px solid #ddd;padding:2px 8px;border-radius:999px;">{{ t }}</span>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a v-if="p.links?.demo" :href="p.links.demo" target="_blank" rel="noreferrer">Demo</a>
          <a v-if="p.links?.github" :href="p.links.github" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </article>
    </div>
  </section>
</template>
