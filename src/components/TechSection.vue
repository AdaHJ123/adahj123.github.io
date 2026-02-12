<script setup>
import skills from "../data/skills.json"
</script>

<template>
  <section id="skills" style="padding: 40px 0;">
    <h2 style="margin:0 0 16px 0;font-size: 2rem; ">Skills</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
      <div
        v-for="c in skills.categories"
        :key="c.name"
        style="border:1px solid rgba(60, 100, 170, 0.2);border-radius:12px;padding:12px;background:linear-gradient(120deg, rgba(60, 100, 170, 0.2), rgba(120, 90, 110, 0.14));"
      >
        <h4 style="margin:0 0 8px 0;">{{ c.name }}</h4>
        <div style="display:flex;flex-wrap:wrap;gap:14px;">
          <span v-for="it in c.items" :key="it" style="font-size:14px;border:1px solid #ddd;padding:2px 8px;border-radius:999px;">{{ it }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
