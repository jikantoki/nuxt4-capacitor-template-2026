<template lang="pug">
v-card.home-page-root(
  style="width: 100%; height: 100%;"
  :class="settings.hidden.isAndroid15OrHigher ? 'top-android-15-or-higher' : ''"
)
  //- ================= メインスクロールコンテナ =================
  .home-scroll-container(ref="scrollContainer")

    //- ================= ヒーローセクション =================
    section.hero-section
      .hero-content
        .app-badge
          v-chip(size="small" color="primary" variant="flat" prepend-icon="mdi-rocket-launch")
            | Nuxt4-Capacitor-Template-2026

        .avatar-wrap.my-4
          img.app-logo(src="/icon.png" alt="App Icon" onerror="this.src='/favicon.ico'")

        h1.hero-main-title 次世代クロスプラットフォーム開発ベース
        h2.hero-sub-title Nuxt 4 × Capacitor 8 × PWA × Vuetify 3 × PHP

        p.hero-summary
          | Web・iOS・Androidアプリを単一コードベースで高速開発。
          br
          | 認証、設定、テーマ切り替え、レスポンシブCSS、PHPバックエンド基盤を標準搭載。

        .hero-actions.mt-6
          v-btn.mx-2.my-1(
            size="large"
            rounded="pill"
            prepend-icon="mdi-information-outline"
            color="primary"
            elevation="3"
            @click="$router.push('/about')"
          ) Aboutを見る

          v-btn.mx-2.my-1(
            size="large"
            rounded="pill"
            prepend-icon="mdi-cog-outline"
            variant="tonal"
            @click="$router.push('/settings')"
          ) 設定ページへ

          v-btn.mx-2.my-1(
            v-if="myProfile.guest"
            size="large"
            rounded="pill"
            prepend-icon="mdi-login"
            variant="outlined"
            @click="$router.push('/login')"
          ) ログイン

          v-btn.mx-2.my-1(
            v-else
            size="large"
            rounded="pill"
            prepend-icon="mdi-account"
            variant="outlined"
            @click="$router.push('/profile')"
          ) プロフィール

    //- ================= 機能紹介セクション =================
    section.features-section
      .section-inner
        .section-header.text-center.mb-8
          h3.text-h5.font-weight-bold テンプレートの主要機能
          p.text-caption.text-medium-emphasis 開発に必要なフルスタック基盤が最初から揃っています

        v-row
          //- 1. Nuxt 4
          v-col(cols="12" sm="6" md="4")
            v-card.feature-card(variant="outlined" height="100%")
              v-card-item
                template(#prepend)
                  .icon-circle(style="background: rgba(0, 220, 130, 0.15); color: #00DC82;")
                    v-icon(size="28") mdi-nuxt
                v-card-title.font-weight-bold Nuxt 4
                v-card-subtitle app/ ディレクトリ構造 & Nitro
              v-card-text
                | Vue 3 + Vite による超高速な開発環境。SSR/SSG、Piniaストア永続化、i18n多言語化をサポート。

          //- 2. Capacitor 8
          v-col(cols="12" sm="6" md="4")
            v-card.feature-card(variant="outlined" height="100%")
              v-card-item
                template(#prepend)
                  .icon-circle(style="background: rgba(17, 158, 255, 0.15); color: #119EFF;")
                    v-icon(size="28") mdi-cellphone-link
                v-card-title.font-weight-bold Capacitor 8
                v-card-subtitle iOS & Android ネイティブ
              v-card-text
                | StatusBar、Share、Camera、Toast等のプラグインを完備。Android 15のEdge-to-Edgeノッチ制御にも対応。

          //- 3. PWA
          v-col(cols="12" sm="6" md="4")
            v-card.feature-card(variant="outlined" height="100%")
              v-card-item
                template(#prepend)
                  .icon-circle(style="background: rgba(90, 15, 200, 0.15); color: #5A0FC8;")
                    v-icon(size="28") mdi-application-export
                v-card-title.font-weight-bold PWA
                v-card-subtitle オフライン & インストール可能
              v-card-text
                | manifest.json、Service Worker、Web Push通知、PWA Elementsを標準装備。ブラウザから直接インストール可能。

          //- 4. Vuetify 3
          v-col(cols="12" sm="6" md="4")
            v-card.feature-card(variant="outlined" height="100%")
              v-card-item
                template(#prepend)
                  .icon-circle(style="background: rgba(22, 151, 246, 0.15); color: #1697F6;")
                    v-icon(size="28") mdi-vuetify
                v-card-title.font-weight-bold Vuetify 3
                v-card-subtitle マテリアルデザインUI
              v-card-text
                | 豊富なUIコンポーネント。ダークモード / ライトモード / システムテーマ自動切り替えとStatusBar連動。

          //- 5. カスタムCSS
          v-col(cols="12" sm="6" md="4")
            v-card.feature-card(variant="outlined" height="100%")
              v-card-item
                template(#prepend)
                  .icon-circle(style="background: rgba(225, 35, 120, 0.15); color: rgb(var(--v-theme-primary));")
                    v-icon(size="28") mdi-palette-swatch-outline
                v-card-title.font-weight-bold カスタムCSS
                v-card-subtitle SCSS & Zen Maru Gothic
              v-card-text
                | 丸ゴシック統一フォント、レスポンシブブレークポイントミックスイン、セーフエリア対応パディング定義。

          //- 6. PHP & MySQL
          v-col(cols="12" sm="6" md="4")
            v-card.feature-card(variant="outlined" height="100%")
              v-card-item
                template(#prepend)
                  .icon-circle(style="background: rgba(119, 123, 180, 0.15); color: #777BB4;")
                    v-icon(size="28") mdi-language-php
                v-card-title.font-weight-bold PHP バックエンド
                v-card-subtitle 軽量REST API & DBスキーマ
              v-card-text
                | トークン認証、プロファイル管理、画像アップロード、Web Push配信APIとdatabase.sqlによる初期スキーマを提供。

    //- ================= クイックリンクセクション =================
    section.quicklinks-section.mt-8.mb-16
      .section-inner
        v-card.pa-6(rounded="xl" variant="tonal" color="primary")
          h3.text-h6.font-weight-bold.mb-2 クイックアクセス
          p.text-body-2.mb-4 テンプレートに含まれる主要画面へ直接移動できます
          .d-flex.flex-wrap.gap-2
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-information-outline" @click="$router.push('/about')") Aboutページ
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-cog-outline" @click="$router.push('/settings')") 設定
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-palette-outline" @click="$router.push('/settings/display')") 外観設定
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-cellphone-settings" @click="$router.push('/settings/developer-options')") 開発者オプション
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-qrcode-scan" @click="$router.push('/qrcode')") QRスキャナー
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-file-document-outline" @click="$router.push('/terms')") 利用規約
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-shield-lock-outline" @click="$router.push('/privacy')") プライバシーポリシー
            v-btn.mr-2.mb-2(size="small" variant="flat" color="surface" prepend-icon="mdi-login" @click="$router.push('/login')") ログイン
</template>

<script lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useMyProfileStore } from '@/stores/myProfile'
import Setup from '@/js/setup'
import mixins from '@/mixins/mixins'

export default {
  name: 'HomePage',
  mixins: [mixins],
  data() {
    return {
      settings: useSettingsStore(),
      myProfile: useMyProfileStore(),
    }
  },
  setup() {
    Setup.setTitle('ようこそ')
    Setup.setDescription('Nuxt 4 + Capacitor + PWA + Vuetify + PHP 開発テンプレート')
  },
  mounted() {
    this.setTitle('ホーム')
  },
}
</script>

<style lang="scss" scoped>
.home-page-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  height: 100dvh;
  min-width: 320px;
  position: relative;
  overflow: hidden;

  .home-scroll-container {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 80px;
  }

  .hero-section {
    padding: 48px 16px 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(var(--v-theme-primary), 0.08) 0%,
      transparent 100%
    );

    .hero-content {
      max-width: 720px;
      margin: 0 auto;
    }

    .app-logo {
      width: 96px;
      height: 96px;
      border-radius: 24px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .hero-main-title {
      font-size: 2em;
      font-weight: 800;
      margin-top: 12px;
      margin-bottom: 6px;
    }

    .hero-sub-title {
      font-size: 1.2em;
      color: rgb(var(--v-theme-primary));
      font-weight: 600;
      margin-bottom: 16px;
    }

    .hero-summary {
      font-size: 0.95em;
      line-height: 1.7;
      opacity: 0.8;
      margin: 0 auto;
      max-width: 600px;
    }
  }

  .features-section,
  .quicklinks-section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .feature-card {
    border-radius: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    .icon-circle {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
  }
}
</style>
