<template>
  <div>
    <button 
      v-if="loggedIn" 
      @click="signOut()" 
      class="flex items-center justify-center"
    >
      <img :src="userImage" class="size-8 rounded-full " />
    </button>
    <button 
      v-else 
      @click="signIn('discord')" 
      class="bg-gray-700 hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center p-2"
    >
      <Icon name="ic:baseline-discord" class="size-6" />
    </button>
  </div>
</template>

<script setup lang="ts">

const { data: user } = useAuthState();
const { status, signIn, signOut } = useAuth();
const loggedIn = computed(() => status.value === 'authenticated');
const userImage = computed(() => user.value?.user?.image ?? undefined);
</script>