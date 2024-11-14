<template>
  <div class="flex">
    <SideBar />
    <MapView />
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';

const { status, data: session } = useAuth();
const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();

onMounted(async () => {

  if (status.value !== 'authenticated') {
    return;
  } 

  if (!session.value) {
    return;
  }

  const a = await fetch(`https://discordapp.com/api/users/@me/guilds/${runtimeConfig.public.discordGuildId}/member`, {
    headers: {
      Authorization: `Bearer ${session.value.accessToken}`
    }
  });

  const roles = await a.json().then(data => data.roles);

  if (roles.includes(runtimeConfig.public.discordRoleId)) {
    userStore.addRole('player');
  }
})


useHeadSafe({
  title: 'Artelballer 2',
  meta: [
    {
      name: 'description',
      content: 'Artelballer is an immersive online map-editing tool where users can color and customize regions on a map, ideal for creating interactive and visually engaging maps for world-building, role-playing games, or collaborative projects. Administrators can log in via Discord to manage and edit maps, while visitors can view and explore the detailed map creations. With intuitive controls, JSON save/load options, and Discord role-based access, Artelballer provides a powerful yet user-friendly platform for map customization and team collaboration.'
    }
  ]
})
</script>