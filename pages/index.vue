<template>
  <div class="flex">
    <Sidebar />
    <Map />
  </div>
</template>

<script setup lang="ts">
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