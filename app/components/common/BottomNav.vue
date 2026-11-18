<template lang="pug">
div
  //- ================= ボトムナビゲーションバー =================
  .store-bottom-nav
    .nav-buttons
      //- 1. ホーム
      .nav-btn(
        :class="{ active: isHomeActive }"
        v-ripple
        @click="goTo('/')"
      )
        v-icon {{ isHomeActive ? 'mdi-home' : 'mdi-home-outline' }}
        span ホーム

      //- 2. About
      .nav-btn(
        :class="{ active: isAboutActive }"
        v-ripple
        @click="goTo('/about')"
      )
        v-icon {{ isAboutActive ? 'mdi-information' : 'mdi-information-outline' }}
        span About

      //- 3. 設定
      .nav-btn(
        :class="{ active: isSettingsActive }"
        v-ripple
        @click="goTo('/settings')"
      )
        v-icon {{ isSettingsActive ? 'mdi-cog' : 'mdi-cog-outline' }}
        span 設定

      //- 4. その他（ようこそダイアログ）
      .nav-btn(
        :class="{ active: optionsDialog }"
        v-ripple
        @click="openOptions"
      )
        v-icon mdi-dots-horizontal
        span その他

    .bottom-android-15-or-higher(v-if="settings.hidden.isAndroid15OrHigher")

  //- ================= その他 / ようこそダイアログ =================
  v-dialog.options-dialog(
    v-model="optionsDialog"
    :fullscreen="isMobile"
    :transition="isMobile ? 'dialog-bottom-transition' : 'dialog-transition'"
    :max-width="isMobile ? undefined : 500"
    :min-width="isMobile ? undefined : 360"
    :width="isMobile ? '100%' : '90%'"
    scrollable
    teleport="body"
  )
    v-card.options-dialog-card(:class="{ 'is-pc': !isMobile }")
      .top-android-15-or-higher(v-if="settings.hidden.isAndroid15OrHigher && isMobile")
      v-card-actions.dialog-header
        p.ml-4.dialog-title(class="headline font-weight-bold" style="font-size: 1.25em") ようこそ
        v-spacer
        v-btn.dialog-close-btn(
          icon="mdi-close"
          variant="text"
          density="comfortable"
          @click="optionsDialog = false"
        )
      v-card-text.dialog-content
        .account-details(
          style="display: flex; flex-direction: column; align-items: center; gap: 0.6em; margin-bottom: 1.2em;"
        )
          .account-img
            img(
              :src="!isGuest && myProfile.icon ? myProfile.icon : '/icon.png'"
              style="height: 6em; width: 6em; border-radius: 9999px; object-fit: cover;"
              onerror="this.src='/account_default.jpg'"
            )
          .account-info(style="text-align: center;")
            p(style="font-size: 1.2em; font-weight: bold; margin: 0; padding: 0;") {{ !isGuest && myProfile.name ? myProfile.name : 'Nuxt4-Capacitor-Template-2026' }}
            p.text-caption.text-medium-emphasis(style="margin: 0; padding: 0;") {{ !isGuest ? (myProfile.userId ? `@${myProfile.userId}` : 'ログイン中') : 'Nuxt 4 + Capacitor 8 + PWA + Vuetify 3' }}
            v-chip.mt-1(
              v-if="!isGuest"
              size="x-small"
              color="primary"
              variant="flat"
            ) {{ isAdmin ? '管理者' : 'ログイン中' }}
            v-chip.mt-1(
              v-else
              size="x-small"
              color="secondary"
              variant="outlined"
            ) ゲストモード

        v-list.options-list
          v-list-item.item(@click="goTo('/')")
            .icon-and-text
              v-icon mdi-home-outline
              v-list-item-title ホーム
          v-list-item.item(@click="goTo('/about')")
            .icon-and-text
              v-icon mdi-information-outline
              v-list-item-title About
          v-list-item.item(@click="goTo('/settings')")
            .icon-and-text
              v-icon mdi-cog-outline
              v-list-item-title 設定
          v-list-item.item(@click="goTo('/qrcode')")
            .icon-and-text
              v-icon mdi-qrcode-scan
              v-list-item-title QRコードスキャナー
          v-list-item.item(
            v-if="!isGuest"
            @click="goTo('/settings/profile')"
          )
            .icon-and-text
              v-icon mdi-account-edit-outline
              v-list-item-title プロフィール編集
          v-list-item.item(
            v-if="isGuest"
            @click="goTo('/login')"
          )
            .icon-and-text
              v-icon mdi-login
              v-list-item-title ログイン
          v-list-item.item(@click="goTo('/terms')")
            .icon-and-text
              v-icon mdi-file-document-outline
              v-list-item-title 利用規約
          v-list-item.item(@click="goTo('/privacy')")
            .icon-and-text
              v-icon mdi-shield-lock-outline
              v-list-item-title プライバシーポリシー
          v-list-item.item(
            v-if="!isGuest"
            @click="logoutDialog = true"
            style="background: rgba(var(--v-theme-error), 0.08); border-radius: 8px; margin-top: 4px;"
          )
            .icon-and-text
              v-icon(color="error") mdi-logout
              v-list-item-title.font-weight-bold(style="color: rgb(var(--v-theme-error));") ログアウト
          v-list-item.item(@click="shareSite")
            .icon-and-text
              v-icon mdi-share-variant
              v-list-item-title シェア

  //- ================= ログアウト確認ダイアログ =================
  v-dialog(
    v-model="logoutDialog"
    max-width="400"
    teleport="body"
  )
    v-card(style="border-radius: 16px;")
      v-card-title(class="headline font-weight-bold") ログアウトしますか？
      v-card-text ログアウトするとセッションが解除され、ゲスト状態に戻ります。
      v-card-actions
        v-spacer
        v-btn(
          variant="text"
          @click="logoutDialog = false"
        ) キャンセル
        v-btn(
          variant="flat"
          color="error"
          append-icon="mdi-logout"
          :loading="loggingOut"
          @click="logout"
        ) ログアウト
</template>

<script lang="ts">
import { Share } from '@capacitor/share'
import { Toast } from '@capacitor/toast'
import { useSettingsStore } from '@/stores/settings'
import { useMyProfileStore } from '@/stores/myProfile'
import { useNavigationStore } from '@/stores/navigation'
import { logoutAccountFromPHP } from '@/js/contentApi'

export default {
  name: 'BottomNav',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'tabClick'],
  data() {
    return {
      settings: useSettingsStore(),
      myProfile: useMyProfileStore(),
      navStore: useNavigationStore(),
      logoutDialog: false,
      loggingOut: false,
    }
  },
  watch: {
    modelValue(val: boolean) {
      this.navStore.optionsDialog = val
    },
  },
  computed: {
    optionsDialog: {
      get(): boolean {
        return this.navStore.optionsDialog || this.modelValue
      },
      set(val: boolean) {
        this.navStore.optionsDialog = val
        this.$emit('update:modelValue', val)
      },
    },
    currentPath(): string {
      return this.$route.path
    },
    isHomeActive(): boolean {
      return this.currentPath === '/'
    },
    isAboutActive(): boolean {
      return this.currentPath.startsWith('/about')
    },
    isSettingsActive(): boolean {
      return this.currentPath.startsWith('/settings')
    },
    isGuest(): boolean {
      return !this.myProfile.userId || this.myProfile.guest !== false
    },
    isAdmin(): boolean {
      return (
        !this.isGuest &&
        (this.myProfile.role === 'admin' || this.myProfile.isAdmin === true)
      )
    },
    isMobile(): boolean {
      // 画面幅が600px未満（スマホ縦画面など）の場合は全画面ダイアログ
      return Boolean(this.$vuetify?.display?.xs)
    },
  },
  methods: {
    openOptions() {
      this.optionsDialog = true
      this.navStore.openOptions()
    },
    goTo(path: string) {
      this.optionsDialog = false
      this.$emit('tabClick', path)
      if (this.currentPath !== path) {
        this.$router.push(path)
      }
    },
    async shareSite() {
      this.optionsDialog = false
      const title = 'Nuxt4-Capacitor-Template-2026'
      const text = 'Nuxt 4 + Capacitor + PWA + Vuetify + PHP Template'
      const url = window.location.origin

      try {
        await Share.share({
          title,
          text,
          url,
          dialogTitle: '共有',
        })
      } catch {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url)
          await Toast.show({ text: 'URLをコピーしました' })
        }
      }
    },
    async logout() {
      this.loggingOut = true
      try {
        await logoutAccountFromPHP()
        this.logoutDialog = false
        this.optionsDialog = false
        await Toast.show({ text: 'ログアウトしました' })
        this.$router.push('/')
      } catch (err: any) {
        await Toast.show({
          text: err.message || 'ログアウトに失敗しました',
        })
      } finally {
        this.loggingOut = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.store-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);

  .nav-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 56px;
    max-width: 600px;
    margin: 0 auto;

    .nav-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      height: 100%;
      cursor: pointer;
      color: rgba(var(--v-theme-on-surface), 0.6);
      transition: color 0.15s ease;
      user-select: none;

      .v-icon {
        font-size: 22px;
      }

      span {
        font-size: 11px;
        font-weight: 500;
      }

      &.active {
        color: rgb(var(--v-theme-primary));
        font-weight: 700;
      }
    }
  }

  .bottom-android-15-or-higher {
    height: 16px;
  }
}

.options-dialog-card {
  width: 100%;
  max-width: 500px;
  min-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--v-theme-surface));

  &.is-pc {
    min-width: 360px;
    border-radius: 24px !important;
    max-height: 85vh;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25) !important;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.08);

    .dialog-header {
      padding: 16px 16px 8px 24px;
      flex-shrink: 0;
    }

    .dialog-content {
      padding: 8px 20px 24px 20px;
      overflow-y: auto;
    }
  }

  &:not(.is-pc) {
    min-height: 100vh;
    height: 100%;
    border-radius: 0 !important;

    .dialog-header {
      padding: 8px 8px 8px 16px;
      flex-shrink: 0;
    }

    .dialog-content {
      padding: 8px 16px 24px 16px;
      overflow-y: auto;
    }
  }

  .dialog-title {
    font-size: 1.25em;
    margin: 0;
  }

  .options-list {
    background: transparent;
    padding: 0;

    .item {
      border-radius: 12px;
      margin-bottom: 4px;
      cursor: pointer;

      .icon-and-text {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
  }
}
</style>
