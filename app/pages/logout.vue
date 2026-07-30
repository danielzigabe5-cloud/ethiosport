<script setup>
const token = useCookie('token')
const role = useCookie('role')

function logout() {
  token.value = null
  role.value = null
  return navigateTo('/login')
}
</script>