<template>
  <div class="min-h-screen bg-white px-6 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Selamat datang di Dashboard!
      </h1>

      <p class="text-lg text-gray-600 mb-8">
        Ini adalah halaman setelah login. Kamu bisa mulai mengatur data di sini.
      </p>

      <UButton @click="logout" color="red" variant="solid">
        Logout
      </UButton>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

function logout() {
  // TODO: Kosongkan session/token di backend (opsional)
  // Redirect ke login
  router.push('/')
}
</script>
