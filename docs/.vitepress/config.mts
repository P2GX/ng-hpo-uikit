import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ng-hpo-uikit",
  description: "Angular HPO Component Toolkit",
  base: '/ng-hpo-uikit/', // Matches your GitHub Pages repository subfolder URL path
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides/installation' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation & Setup', link: '/guides/installation' },
          { text: 'Release', link: '/guides/release' }
        ]
      },
      {
        text: 'UI Components',
        items: [
          { text: 'ORCID Dialog', link: '/components/orcid-dialog' },
          { text: 'Footer', link: '/components/footer' }
        ]
      },
      {
        text: 'Shared Services',
        items: [

          { text: 'Notification Service', link: '/services/notification-service' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/P2GX/ng-hpo-uikit' }
    ]
  }
})