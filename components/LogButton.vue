<template>
  <div>
    <button 
      v-if="loggedIn" 
      class="flex items-center justify-center" 
      @click="signOut()"
    >
      <img :src="userImage" class="size-8 rounded-full" >
    </button>
    <button 
      v-else 
      class="text-white flex items-center justify-center p-2" 
      @click="signIn('discord')"
    >
      <Icon name="ic:baseline-discord" class="size-8 text-accent hover:text-white transition" />
    </button>
  </div>
</template>

<script setup lang="ts">

const { data: user } = useAuthState();
const { status, signIn, signOut } = useAuth();
const loggedIn = computed(() => status.value === 'authenticated');
const userImage = computed(() => user.value?.user?.image ?? undefined);
</script>