<template lang="pug">
.about-view-container
  //- ================= ヒーローヘッダー =================
  .profile-hero-card
    .hero-body
      .avatar-wrapper
        img.profile-avatar(src="/icon.png" alt="Template Icon" onerror="this.src='/favicon.ico'")
      .profile-titles
        .name-row
          h2.profile-name {{ templateInfo.name }}
        p.profile-role {{ templateInfo.title }}
        p.profile-motto {{ templateInfo.englishName }}

      //- 属性チップ
      .profile-badges
        v-chip(size="small" variant="tonal" prepend-icon="mdi-tag-outline" color="primary") Version {{ templateInfo.version }}
        v-chip(size="small" variant="tonal" prepend-icon="mdi-application-brackets" color="teal") Nuxt 4 & Capacitor 8
        v-chip(size="small" variant="tonal" prepend-icon="mdi-palette-outline" color="amber-darken-2") Vuetify 3 & Custom CSS

  //- ================= セクション切り替えタブ =================
  .profile-tabs-wrapper
    v-tabs(
      v-model="currentTab"
      color="primary"
      density="comfortable"
      align-tabs="center"
      grow
    )
      v-tab(value="features")
        v-icon(start) mdi-star-outline
        | 主な特徴
      v-tab(value="tech")
        v-icon(start) mdi-code-tags
        | 技術スタック
      v-tab(value="guide")
        v-icon(start) mdi-book-open-page-variant-outline
        | クイックガイド

  //- ================= タブコンテンツ =================
  .tab-content-area
    //- ---------------- 1. 主な特徴 ----------------
    .tab-pane(v-if="currentTab === 'features'")
      .content-card
        .card-header
          v-icon(color="primary") mdi-text-box-outline
          h3 概要
        .bio-text
          p {{ templateInfo.description }}

      .content-card
        .card-header
          v-icon(color="primary") mdi-layers-triple-outline
          h3 搭載機能
        .skills-grid
          .skill-box(
            v-for="feature in templateInfo.features"
            :key="feature.id"
            :style="{ borderColor: feature.color + '40' }"
          )
            .skill-box-header
              .skill-icon-circle(:style="{ background: feature.color + '20', color: feature.color }")
                v-icon {{ feature.icon }}
              .skill-header-text
                h4.skill-title {{ feature.title }}
                p.skill-summary {{ feature.summary }}
            ul.skill-items-list
              li(v-for="(item, i) in feature.details" :key="i") {{ item }}

    //- ---------------- 2. 技術スタック ----------------
    .tab-pane(v-else-if="currentTab === 'tech'")
      .content-card
        .card-header
          v-icon(color="primary") mdi-wrench-outline
          h3 使用ライブラリ & バージョン
        v-list.tech-list(lines="two")
          v-list-item(
            v-for="tech in templateInfo.techStack"
            :key="tech.name"
            :prepend-icon="tech.icon"
          )
            v-list-item-title.font-weight-bold
              | {{ tech.name }}
              v-chip.ml-2(size="x-small" color="primary" variant="outlined") {{ tech.version }}
            v-list-item-subtitle {{ tech.description }}
            template(#append)
              v-chip(size="x-small" variant="text") {{ tech.category }}

    //- ---------------- 3. クイックガイド ----------------
    .tab-pane(v-else-if="currentTab === 'guide'")
      .content-card
        .card-header
          v-icon(color="primary") mdi-rocket-launch-outline
          h3 はじめかた
        .guide-steps
          .guide-step
            h4 1. 依存関係のインストール
            pre.pa-2.rounded.my-2
              code npm install
          .guide-step.mt-4
            h4 2. 開発サーバーの起動
            pre.pa-2.rounded.my-2
              code npm run dev
          .guide-step.mt-4
            h4 3. ネイティブアプリビルド (Capacitor)
            pre.pa-2.rounded.my-2
              code npm run generate && npx cap sync
          .guide-step.mt-4
            h4 4. Android Studio で開く
            pre.pa-2.rounded.my-2
              code npx cap open android
</template>

<script lang="ts">
import { TEMPLATE_INFO } from '@/data/profile'

export default {
  name: 'AboutView',
  props: {
    initialTab: {
      type: String,
      default: 'features',
    },
  },
  data() {
    return {
      templateInfo: TEMPLATE_INFO,
      currentTab: this.initialTab,
    }
  },
}
</script>

<style lang="scss" scoped>
.about-view-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 80px;

  .profile-hero-card {
    background: rgba(var(--v-theme-surface), 1);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

    .hero-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;

      .profile-avatar {
        width: 88px;
        height: 88px;
        border-radius: 20px;
        object-fit: cover;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }

      .profile-name {
        font-size: 1.5em;
        font-weight: 700;
        margin: 0;
      }

      .profile-role {
        font-size: 0.95em;
        color: rgb(var(--v-theme-primary));
        font-weight: 600;
        margin: 0;
      }

      .profile-motto {
        font-size: 0.85em;
        opacity: 0.7;
        margin: 0;
      }

      .profile-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: center;
        margin-top: 4px;
      }
    }
  }

  .profile-tabs-wrapper {
    background: rgba(var(--v-theme-surface), 1);
    border-radius: 12px;
    margin-bottom: 16px;
  }

  .content-card {
    background: rgba(var(--v-theme-surface), 1);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      h3 {
        font-size: 1.15em;
        font-weight: 700;
        margin: 0;
      }
    }

    .bio-text {
      line-height: 1.7;
      font-size: 0.95em;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;

    .skill-box {
      border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
      border-radius: 12px;
      padding: 14px;
      background: rgba(var(--v-theme-surface), 0.5);

      .skill-box-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;

        .skill-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-title {
          font-size: 0.95em;
          font-weight: 700;
          margin: 0;
        }

        .skill-summary {
          font-size: 0.8em;
          opacity: 0.7;
          margin: 0;
        }
      }

      .skill-items-list {
        margin: 0;
        padding-left: 20px;
        font-size: 0.85em;
        line-height: 1.6;
        opacity: 0.85;
      }
    }
  }

  .tech-list {
    background: transparent;
  }

  .guide-steps {
    .guide-step {
      h4 {
        font-size: 0.95em;
        font-weight: 600;
      }
      pre {
        background: rgba(var(--v-theme-on-surface), 0.05);
        border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
        border-radius: 8px;
        overflow-x: auto;
        code {
          font-family: monospace;
          font-size: 0.9em;
        }
      }
    }
  }
}
</style>
