<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="about">
    <h1>{{ t('about.title') }}</h1>
    <p>{{ t('about.p1') }}</p>
    <p>
      {{ t('about.p2') }}
      <a href="https://github.com/sharwapi/sharwapi_market" target="_blank">
        Sharwapi Market
      </a>
    </p>
  </div>
</template>

<style scoped>
.about {
  max-width: 80%;
  margin: 0 auto;
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border);
}
h1 {
  margin-bottom: 1rem;
  color: var(--color-heading);
}
p {
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>