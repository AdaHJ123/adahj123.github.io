<template>
  <main class="works">
    <section class="hero">
      <p class="label">Under Construction</p>
      <h1>More Works Are On The Way</h1>
      <p class="note">This section is currently being built. Check back soon.</p>
    </section>
  </main>
</template>

<style scoped>
.works {
  padding: 40px;
  max-width: 1600px;
  margin: 0 auto;
  color: inherit;
}

.hero {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  text-align: left;
}

.label {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  color: #0f0f0f;
  background: #f5d142;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #e2c134;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 4vw, 4rem);
  color: #f5f5f5;
}

.note {
  margin: 0;
  font-size: 1rem;
  color: #c7c7c7;
}
</style>
