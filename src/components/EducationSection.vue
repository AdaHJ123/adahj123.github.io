<script setup>
import schools from "../data/education.json"
</script>

<template>
  <section id="education" style="padding: 40px 0;">
    <h2 style="margin:0 0 16px 0;font-size: 2rem; ">Education</h2>
    <ul style="margin:0;padding-left:18px;">
      <ul class="edu-list">
        <li v-for="e in schools" :key="e.school + e.startYear">
          <strong>{{ e.school }}</strong> — {{ e.program }} ({{ e.startYear }}–{{ e.endYear || "Present" }})
        </li>
      </ul>

    </ul>
  </section>

</template>

<style scoped>
.edu-list {
  list-style: none;
  /* 去掉前面的点 */
  margin: 0;
  padding-left: 18px;
  font-size: 18px;  
  line-height: 1.6; 
  /* 保留左边一点空隙 */
}
</style>
