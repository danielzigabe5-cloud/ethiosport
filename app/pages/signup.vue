<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
    <div class="max-w-md mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-[#a3e635]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="lucide:users" class="w-8 h-8 text-[#a3e635]" />
        </div>
        <h1 class="text-3xl md:text-4xl font-black mb-2">
          Join <span class="text-[#a3e635]">ETHIO-MEDA</span>
        </h1>
        <p class="text-gray-400">Create your account and start playing!</p>
      </div>

      <div class="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#a3e635]/50 outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              class="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#a3e635]/50 outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
            <input 
              v-model="form.phone"
              type="tel" 
              required
              class="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#a3e635]/50 outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input 
              v-model="form.password"
              type="password" 
              required
              class="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#a3e635]/50 outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
            <input 
              v-model="form.confirmPassword"
              type="password" 
              required
              class="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#a3e635]/50 outline-none transition"
            />
          </div>
          <button 
            type="submit"
            class="w-full bg-[#a3e635] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#bef264] transition"
          >
            Create Account
          </button>
        </form>

        <p class="text-center text-gray-400 text-sm mt-4">
          Already have an account? 
          <NuxtLink to="/login" class="text-[#a3e635] hover:underline">
            Sign In
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  console.log('Signup form submitted:', form.value)
  alert('Account created successfully! Welcome to ETHIO-MEDA!')
  // Add your signup logic here
}

useHead({
  title: 'Sign Up - ETHIO-MEDA | Join Our Community',
  meta: [
    { name: 'description', content: 'Create your ETHIO-MEDA account and join the sports community.' }
  ]
})
</script>