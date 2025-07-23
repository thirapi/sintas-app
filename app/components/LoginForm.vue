<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <UCard class="max-w-md w-full">
      <template #header>
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white">
            Masuk ke akun Anda
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Silakan masukkan email dan password Anda
          </p>
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput
            class="w-full"
            v-model="state.email"
            type="email"
            placeholder="Masukkan email Anda"
            icon="i-heroicons-envelope"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            class="w-full"
            v-model="state.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password Anda"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                v-show="state.password !== ''"
                color="gray"
                variant="link"
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                :padded="false"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <div class="flex items-center justify-between">
          <UCheckbox
            v-model="state.rememberMe"
            label="Ingat saya"
          />
          
          <UButton
            variant="link"
            color="primary"
            size="sm"
            :padded="false"
          >
            Lupa password?
          </UButton>
        </div>

        <UButton
          type="submit"
          block
          :loading="loading"
          :disabled="loading"
        >
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </UButton>
      </UForm>

      <template #footer>
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Belum punya akun?
            <UButton
              variant="link"
              color="primary"
              size="sm"
              :padded="false"
              to="/register"
              as="NuxtLink"
            >
              Daftar sekarang
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
  password: z.string().min(6, 'Password minimal 6 karakter')
})

const state = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const showPassword = ref(false)
const toast = useToast()

async function onSubmit(event) {
  loading.value = true

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: {
        email: event.data.email,
        password: event.data.password
      }
    })

    toast.add({
      title: 'Login Berhasil',
      description: 'Anda berhasil masuk ke akun',
      color: 'green'
    })

    state.email = ''
    state.password = ''
    state.rememberMe = false

    router.push('/dashboard') 

  } catch (error) {
    console.error('Login error:', error)

    toast.add({
      title: 'Login Gagal',
      description: error?.data?.message || 'Email atau password salah',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

</script>