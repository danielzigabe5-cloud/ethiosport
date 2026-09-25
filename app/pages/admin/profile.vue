<template>
  <div class="max-w-xl mx-auto bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl my-8">
    <h1 class="text-xl font-bold mb-6 border-b border-slate-800 pb-3">Edit Profile</h1>

    <!-- SUCCESS / ERROR ALERT -->
    <div 
      v-if="statusMessage.text" 
      :class="statusMessage.isError ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'" 
      class="mb-4 p-3 rounded-xl border text-xs font-bold flex items-center gap-2"
    >
      <Icon :name="statusMessage.isError ? 'lucide:alert-circle' : 'lucide:check-circle'" class="w-4 h-4 shrink-0" />
      <span>{{ statusMessage.text }}</span>
    </div>

    <form @submit.prevent="updateProfile" class="space-y-4">
      <!-- 1. AVATAR / PROFILE PHOTO -->
      <div class="flex items-center gap-4">
        <div class="relative w-20 h-20 shrink-0">
          <img 
            :src="avatarPreview || authStore.user?.avatar || '/default-avatar.png'" 
            class="w-full h-full rounded-full object-cover border-2 border-[#94FF2B] shadow-md"
          />
        </div>
        <div>
          <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden" />
          <button 
            type="button" 
            @click="fileInput.click()" 
            class="bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer border border-slate-700"
          >
            Change Photo
          </button>
          <p class="text-[10px] text-slate-400 mt-1">JPG, PNG, WEBP (Max 2MB)</p>
        </div>
      </div>

      <!-- 2. NAME -->
      <div>
        <label class="block text-xs font-bold text-slate-400 mb-1">Full Name</label>
        <input 
          v-model="form.name" 
          type="text" 
          required 
          placeholder="Enter your full name"
          class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#94FF2B] transition-all"
        />
      </div>

      <!-- 3. EMAIL -->
      <div>
        <label class="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
        <input 
          v-model="form.email" 
          type="email" 
          required 
          placeholder="Enter your email"
          class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#94FF2B] transition-all"
        />
      </div>

      <!-- 4. PASSWORD (OPTIONAL) -->
      <div>
        <label class="block text-xs font-bold text-slate-400 mb-1">New Password (ይለፍ ቃል ለመቀየር ካልፈለጉ ባዶ ይተውት)</label>
        <input 
          v-model="form.password" 
          type="password" 
          placeholder="••••••••" 
          class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#94FF2B] transition-all"
        />
      </div>

      <!-- SUBMIT BUTTON -->
      <div class="pt-2">
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-[#94FF2B] hover:bg-[#82e026] text-slate-950 font-black py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
          <span>{{ isLoading ? 'Saving Changes...' : 'Save Changes' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const config = useRuntimeConfig()

const isLoading = ref(false)
const selectedFile = ref(null)
const avatarPreview = ref(null)
const fileInput = ref(null)

const statusMessage = reactive({
  text: '',
  isError: false
})

const form = reactive({
  name: '',
  email: '',
  password: ''
})

onMounted(() => {
  if (authStore.user) {
    form.name = authStore.user.name || ''
    form.email = authStore.user.email || ''
  }
})

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    avatarPreview.value = URL.createObjectURL(file)
  }
}

const updateProfile = async () => {
  isLoading.value = true
  statusMessage.text = ''

  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    
    if (form.password && form.password.trim() !== '') {
      formData.append('password', form.password)
    }
    if (selectedFile.value) {
      formData.append('avatar', selectedFile.value)
    }

    const baseUrl = config.public.apiBase || 'http://localhost:8000'
    const token = authStore.token || useCookie('auth_token').value

    const response = await $fetch(`${baseUrl}/api/admin/profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: formData
    })

    if (response.user) {
      authStore.user = response.user
    }

    statusMessage.text = 'ፕሮፋይልዎ በተሳካ ሁኔታ ተዘምኗል!'
    statusMessage.isError = false
    form.password = ''
    selectedFile.value = null
  } catch (err) {
    console.error('Update Profile Error Details:', err)
    
    // Catch Laravel Validation Errors
    const responseData = err.data || err.response?._data
    if (responseData && responseData.errors) {
      const errors = responseData.errors
      const firstKey = Object.keys(errors)[0]
      statusMessage.text = errors[firstKey][0]
    } else if (responseData && responseData.message) {
      statusMessage.text = responseData.message
    } else {
      statusMessage.text = 'መረጃውን Save ማድረግ አልተቻለም! እባክዎ በድጋሚ ይሞክሩ።'
    }
    
    statusMessage.isError = true
  } finally {
    isLoading.value = false
  }
}
</script>