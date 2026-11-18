<template lang="pug">
v-card(
  style="width: 100%; height: 100%;"
  :class="settings.hidden.isAndroid15OrHigher ? 'top-android-15-or-higher' : ''"
)
  v-card-actions
    p.ml-2(style="font-size: 1.3em") 設定
    v-spacer
    v-btn(
      variant="text"
      @click="$router.back()"
      icon="mdi-close"
    )
  v-card-text(style="height: inherit; overflow-y: auto;")
    .settings-list
      //- 1. 外観
      .setting-item(
        v-ripple
        @click="$router.push('/settings/display')"
      )
        .icon
          v-icon mdi-palette-outline
        .text
          p.title 外観
          p.description テーマ（ライト / ダーク / システム）、言語

      //- 2. 通知
      .setting-item(
        v-ripple
        @click="openNotificationSettings"
      )
        .icon
          v-icon mdi-bell-outline
        .text
          p.title 通知
          p.description Web Push通知、プッシュ通知設定

      //- 3. About
      .setting-item(
        v-ripple
        @click="$router.push('/about')"
      )
        .icon
          v-icon mdi-information-outline
        .text
          p.title About (テンプレート情報)
          p.description バージョン、技術スタック、ガイド

      //- 4. 利用規約
      .setting-item(
        v-ripple
        @click="$router.push('/terms')"
      )
        .icon
          v-icon mdi-file-document-outline
        .text
          p.title 利用規約
          p.description サービスの利用条件

      //- 5. プライバシーポリシー
      .setting-item(
        v-ripple
        @click="$router.push('/privacy')"
      )
        .icon
          v-icon mdi-shield-lock-outline
        .text
          p.title プライバシーポリシー
          p.description 個人情報の取り扱いについて

      //- 6. 開発者オプション
      .setting-item(
        v-if="settings.developerOptions.enabled"
        v-ripple
        @click="$router.push('/settings/developer-options')"
      )
        .icon(
          style="background-color: rgba(var(--v-theme-primary), 1); color: white;"
        )
          v-icon mdi-bug-outline
        .text
          p.title 開発者オプション
          p.description Android 15ステータスバー切り欠き設定など

      //- 7. アカウント・ログイン関連
      .setting-item(
        v-if="myProfile.guest"
        v-ripple
        @click="$router.push('/login')"
      )
        .icon(
          style="background-color: rgba(var(--v-theme-primary), 0.15); color: rgb(var(--v-theme-primary));"
        )
          v-icon mdi-account-circle-outline
        .text
          p.title ログイン
          p.description アカウントでログイン

      .setting-item(
        v-else
        v-ripple
        @click="$router.push('/settings/profile')"
      )
        .icon(
          style="background-color: rgba(var(--v-theme-primary), 0.15); color: rgb(var(--v-theme-primary));"
        )
          v-icon mdi-shield-account-outline
        .text
          p.title プロフィール編集 ({{ myProfile.userId }})
          p.description プロフィール情報の確認・編集

      .setting-item(
        v-if="!myProfile.guest"
        v-ripple
        @click="logoutRequest()"
      )
        .icon(style="background: rgba(var(--v-theme-error), 1); color: white;")
          v-icon mdi-logout
        .text
          p.title ログアウト
          p.description ログアウトしてゲスト状態に戻ります

      .my-16

//- ログアウト確認ダイアログ
v-dialog(
  v-model="logoutDialog"
  max-width="400"
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
import { Browser } from '@capacitor/browser'
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings'
import { useMyProfileStore } from '@/stores/myProfile'
import { useSettingsStore } from '@/stores/settings'
import { logoutAccountFromPHP } from '@/js/contentApi'
import Setup from '@/js/setup'
import mixins from '@/mixins/mixins'
import { Capacitor } from '@capacitor/core'
import { Toast } from '@capacitor/toast'

export default {
  name: 'SettingsPage',
  mixins: [mixins],
  data() {
    return {
      logoutDialog: false,
      loggingOut: false,
      myProfile: useMyProfileStore(),
      settings: useSettingsStore(),
    }
  },
  setup() {
    Setup.setTitle('設定')
    Setup.setDescription('設定ページです')
  },
  mounted() {
    this.setTitle('設定')
  },
  methods: {
    logoutRequest() {
      this.logoutDialog = true
    },
    async logout() {
      this.loggingOut = true
      try {
        await logoutAccountFromPHP()
        this.logoutDialog = false
        await Toast.show({ text: 'ログアウトしました' })
        this.$router.push('/')
      } catch (e: any) {
        await Toast.show({ text: e.message || 'ログアウトに失敗しました' })
      } finally {
        this.loggingOut = false
      }
    },
    async openNotificationSettings() {
      if (Capacitor.isNativePlatform()) {
        try {
          if (Capacitor.getPlatform() === 'android') {
            await NativeSettings.openAndroid({
              option: AndroidSettings.AppNotification,
            })
          } else {
            await NativeSettings.openIOS({
              option: IOSSettings.App,
            })
          }
        } catch {
          await Toast.show({ text: '設定を開けませんでした' })
        }
      } else {
        await Toast.show({ text: '通知設定はブラウザ設定から変更できます' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.settings-list {
  max-width: 600px;
  margin: 0 auto;

  .setting-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    background: rgba(var(--v-theme-surface), 0.6);
    transition: background 0.15s ease;

    &:hover {
      background: rgba(var(--v-theme-on-surface), 0.05);
    }

    .icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      background: rgba(var(--v-theme-on-surface), 0.08);
      flex-shrink: 0;
    }

    .text {
      flex: 1;

      .title {
        font-size: 1.05em;
        font-weight: 700;
        margin: 0 0 2px;
      }

      .description {
        font-size: 0.85em;
        opacity: 0.7;
        margin: 0;
      }
    }
  }
}
</style>
