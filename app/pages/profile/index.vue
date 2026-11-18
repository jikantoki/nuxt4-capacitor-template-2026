<template lang="pug">
v-card.profile-page-root(
  style="width: 100%; height: 100%;"
  :class="settings.hidden.isAndroid15OrHigher ? 'top-android-15-or-higher' : ''"
)
  //- トップヘッダーバー
  v-card-actions.profile-page-header
    v-btn(
      icon="mdi-arrow-left"
      variant="text"
      @click="handleBack"
    )
    p.header-title プロフィール
    v-spacer
    v-btn(
      icon="mdi-cog-outline"
      variant="text"
      @click="$router.push('/settings')"
    )

  //- メインスクロールエリア
  v-card-text.profile-page-content
    .profile-card.pa-6.text-center
      img.user-avatar(
        :src="myProfile.icon ? myProfile.icon : '/icon.png'"
        onerror="this.src='/account_default.jpg'"
      )
      h2.mt-4.font-weight-bold {{ myProfile.name || (myProfile.guest ? 'ゲストユーザー' : 'ユーザー') }}
      p.text-caption.text-medium-emphasis {{ myProfile.userId ? `@${myProfile.userId}` : 'ログインしていません' }}
      v-chip.mt-2(
        v-if="!myProfile.guest"
        size="small"
        color="primary"
        variant="flat"
      ) {{ myProfile.role === 'admin' ? '管理者' : 'ログイン中' }}
      v-chip.mt-2(
        v-else
        size="small"
        color="secondary"
        variant="outlined"
      ) ゲスト

      p.mt-4.user-message(v-if="myProfile.message") {{ myProfile.message }}

      .actions.mt-6.d-flex.justify-center.gap-2
        v-btn(
          v-if="!myProfile.guest"
          color="primary"
          rounded="pill"
          prepend-icon="mdi-account-edit"
          @click="$router.push('/settings/profile')"
        ) プロフィール編集
        v-btn(
          v-else
          color="primary"
          rounded="pill"
          prepend-icon="mdi-login"
          @click="$router.push('/login')"
        ) ログイン
</template>

<script lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useMyProfileStore } from '@/stores/myProfile'
import Setup from '@/js/setup'
import mixins from '@/mixins/mixins'

export default {
  name: 'ProfilePage',
  mixins: [mixins],
  data() {
    return {
      settings: useSettingsStore(),
      myProfile: useMyProfileStore(),
    }
  },
  setup() {
    Setup.setTitle('プロフィール')
    Setup.setDescription('ユーザープロフィール情報です。')
  },
  mounted() {
    this.setTitle('プロフィール')
  },
  methods: {
    handleBack() {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-page-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  height: 100dvh;
  position: relative;
  overflow: hidden;

  .profile-page-header {
    background: rgba(var(--v-theme-surface), 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);

    .header-title {
      font-size: 1.1em;
      font-weight: 700;
      margin: 0;
    }
  }

  .profile-page-content {
    overflow-y: auto;
    padding: 24px 16px;
    display: flex;
    justify-content: center;

    .profile-card {
      width: 100%;
      max-width: 500px;
      background: rgba(var(--v-theme-surface), 1);
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

      .user-avatar {
        width: 100px;
        height: 100px;
        border-radius: 9999px;
        object-fit: cover;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .user-message {
        font-size: 0.95em;
        line-height: 1.6;
        padding: 12px;
        background: rgba(var(--v-theme-on-surface), 0.04);
        border-radius: 12px;
      }

      .actions {
        gap: 12px;
      }
    }
  }
}
</style>
