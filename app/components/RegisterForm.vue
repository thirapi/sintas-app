<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <UCard class="max-w-md w-full">
      <template #header>
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white">
            Daftar akun baru
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Silakan masukkan email dan buat password Anda
          </p>
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput class="w-full" v-model="state.email" type="email" placeholder="Masukkan email Anda"
            icon="i-heroicons-envelope" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput class="w-full" v-model="state.password" :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-show="state.password !== ''" color="gray" variant="link"
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" :padded="false"
                @click="showPassword = !showPassword" />
            </template>
          </UInput>
        </UFormField>

        <UFormField label="Konfirmasi Password" name="confirmPassword">
          <UInput class="w-full" v-model="state.confirmPassword" :type="showPassword ? 'text' : 'password'"
            placeholder="Ulangi password" />
        </UFormField>

        <UButton type="submit" block :loading="loading" :disabled="loading">
          {{ loading ? 'Mendaftarkan...' : 'Daftar' }}
        </UButton>
      </UForm>

      <template #footer>
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Sudah punya akun?
            <UButton variant="link" color="primary" size="sm" :padded="false" as="NuxtLink" to="/">
              Masuk sekarang
            </UButton>
          </p>
        </div>
      </template>
    </UCard>

    <UNotifications />
  </div>
</template>

<script setup>
import { z } from 'zod'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const schema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Ulangi password')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Password tidak sama',
  path: ['confirmPassword']
})

const state = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const showPassword = ref(false)
const toast = useToast()

async function onSubmit(event) {
  loading.value = true

  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: event.data.email,
        password: event.data.password
      }
    })

    toast.add({
      title: 'Pendaftaran berhasil',
      description: 'Silakan masuk ke akun Anda',
      color: 'green'
    })

    router.push('/')
  } catch (error) {
    toast.add({
      title: 'Pendaftaran gagal',
      description: error?.data?.message || 'Terjadi kesalahan saat mendaftar',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

</script>
