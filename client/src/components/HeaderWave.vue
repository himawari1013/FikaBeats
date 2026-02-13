<template>
  <header class="header-wrapper">
    <!-- 波SVG -->
    <svg viewBox="0 0 1400 332" fill="none" xmlns="http://www.w3.org/2000/svg" class="header-wave">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 294L33 308C67 322 133 350 200 315C267 280 333 182 400 168C467 154 533 224 600 252C667 280 733 266 800 217C867 168 933 84 1000 112C1067 140 1133 280 1200 308C1267 336 1333 252 1367 210L1400 168V0H0V294Z"
        fill="#2849AB"
      />
    </svg>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
/* ヘッダー全体 */
.header-wrapper {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

/* 波 */
.header-wave {
  width: 100%;
  height: auto;
  display: block;
}
</style>
