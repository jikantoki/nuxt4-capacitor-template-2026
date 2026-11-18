export interface FeatureItem {
  id: string
  title: string
  summary: string
  icon: string
  color: string
  details: string[]
}

export interface TechStackItem {
  category: string
  name: string
  version: string
  description: string
  icon: string
}

export const TEMPLATE_INFO = {
  name: 'Nuxt4-Capacitor-Template-2026',
  englishName: 'Nuxt 4 + Capacitor + PWA + Vuetify + PHP Boilerplate',
  title: 'クロスプラットフォーム アプリケーション開発テンプレート',
  version: '2026.1.0',
  description: `Web（PWA）およびネイティブアプリ（iOS / Android）をワンソースで高速開発できる、Nuxt 4 と Capacitor 8、Vuetify 3、PHPバックエンドを統合したモダンテンプレートリポジトリです。`,
  githubUrl: 'https://github.com/',

  features: [
    {
      id: 'nuxt4',
      title: 'Nuxt 4',
      summary: '最新のNuxt 4互換アーキテクチャ',
      icon: 'mdi-nuxt',
      color: '#00DC82',
      details: [
        'Nuxt 4 の app/ ディレクトリ構造を採用',
        'Nitro による高速SSR/SSG & プリレンダリング対応',
        'Pinia による永続化ストア（pinia-plugin-persistedstate）',
        '@nuxtjs/i18n による多言語対応設定',
      ],
    },
    {
      id: 'capacitor',
      title: 'Capacitor 8',
      summary: 'iOS / Android ネイティブアプリ化',
      icon: 'mdi-cellphone-link',
      color: '#119EFF',
      details: [
        'Capacitor 8 によるハイブリッドアプリ構築',
        'StatusBar, Device, Share, Camera, Toast プラグイン連携',
        'Android 15 Edge-to-Edge（切り欠き・ノッチ）対応レイアウト',
        'プッシュ通知（PushNotifications）基盤',
      ],
    },
    {
      id: 'pwa',
      title: 'Progressive Web App',
      summary: 'Web & アプリストア不要のインストール',
      icon: 'mdi-application-export',
      color: '#5A0FC8',
      details: [
        'Web App Manifest (manifest.json) 完備',
        'Service Worker (sw.js) によるキャッシュとオフライン対応',
        'Web Push通知のバックエンド連携',
        '@ionic/pwa-elements によるネイティブUIポリフィル',
      ],
    },
    {
      id: 'vuetify',
      title: 'Vuetify 3 & Custom CSS',
      summary: '洗練されたマテリアルデザイン & Zen Maru Gothic',
      icon: 'mdi-vuetify',
      color: '#1697F6',
      details: [
        'vuetify-nuxt-module による自動インポート & SSR対応',
        'Material Design Icons (@mdi/font)',
        'ダークモード / ライトモード / システムテーマ自動切り替え',
        'Zen Maru Gothicフォント & SCSSレスポンシブミックスイン',
      ],
    },
    {
      id: 'php',
      title: 'PHP & MySQL Backend',
      summary: '軽量で扱いやすいREST APIバックエンド',
      icon: 'mdi-language-php',
      color: '#777BB4',
      details: [
        'トークンベースのユーザー認証 & セッション管理',
        'プロフィール管理 & 画像アップロードAPI',
        'Web Push通知配信API',
        'database.sql によるワンクリック初期化スキーマ',
      ],
    },
  ] as FeatureItem[],

  techStack: [
    {
      category: 'Frontend Framework',
      name: 'Nuxt',
      version: '^4.3.1',
      description: 'Vue 3ベースのフルスタックWebフレームワーク',
      icon: 'mdi-nuxt',
    },
    {
      category: 'UI Library',
      name: 'Vuetify 3',
      version: '^0.19.5 (Module)',
      description: 'マテリアルデザインコンポーネントライブラリ',
      icon: 'mdi-vuetify',
    },
    {
      category: 'Mobile Runtime',
      name: 'Capacitor',
      version: '^8.1.0',
      description: 'クロスプラットフォームネイティブランタイム',
      icon: 'mdi-android',
    },
    {
      category: 'State Management',
      name: 'Pinia',
      version: '^3.0.4',
      description: 'Vue 3公式の軽量・直感的な状態管理',
      icon: 'mdi-fruit-pineapple',
    },
    {
      category: 'Backend Language',
      name: 'PHP',
      version: '8.2+',
      description: '軽量REST API & バックエンドスクリプト',
      icon: 'mdi-language-php',
    },
    {
      category: 'Database',
      name: 'MySQL / MariaDB',
      version: '5.7+ / 8.0+',
      description: 'リレーショナルデータベース',
      icon: 'mdi-database',
    },
  ] as TechStackItem[],
}
