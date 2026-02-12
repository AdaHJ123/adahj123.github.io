<script setup>
import { ref } from "vue"

const form = ref({ name: "", email: "", message: "" })
const status = ref({ sending: false, success: "", error: "" })
const endpoint = "https://formspree.io/f/maqwwvgk" // 换成你的

async function submit() {
  status.value = { sending: true, success: "", error: "" }
  // 简单校验
  if (!form.value.name || !form.value.email || !/\S+@\S+\.\S+/.test(form.value.email) || !form.value.message) {
    status.value = { sending: false, success: "", error: "请完整填写并检查邮箱格式" }
    return
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) throw new Error("Failed to send")
    form.value = { name: "", email: "", message: "" }
    status.value = { sending: false, success: "Sent!", error: "" }
  } catch (e) {
    status.value = { sending: false, success: "", error: "Failed to send, please try again later" }
  }
}
</script>

<template>
  <main style="padding: 40px; max-width: 1600px; margin: 0 auto;">
  <section class="contact">
    <h1>Contact Ada</h1>
    <form @submit.prevent="submit">
      <label>
        Your Name *
        <input v-model.trim="form.name" type="text" required />
      </label>
      <label>
        Your Email *
        <input v-model.trim="form.email" type="email" required />
      </label>
      <label>
        Message Content *
        <textarea v-model.trim="form.message" rows="5" required></textarea>
      </label>
      <button type="submit" :disabled="status.sending">
        {{ status.sending ? "Sending..." : "Send" }}
      </button>
      <p v-if="status.success" class="status success">{{ status.success }}</p>
      <p v-if="status.error" class="status error">{{ status.error }}</p>
    </form>
  </section>
  </main>
</template>
<style scoped>
.contact {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 600;
}
input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}
button {
  padding: 10px 14px;
  border: 1px solid #444;
  border-radius: 10px;
  background: #111;
  color: #f2f2f2;
  cursor: pointer;
}
button:disabled { opacity: 0.6; cursor: not-allowed; }

.status {
  margin: 8px 0 0;
  font-family: inherit;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
}
.status.success { color: #4caf50; }
.status.error { color: #f44336; }


</style>
