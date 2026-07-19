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
          { text: 'Release', link: '/guides/release' },
          { text: 'Storybook', link: '/guides/storybook' },
          { text: 'Developers', link: '/guides/developers' }
        ]
      },
      {
        text: 'UI Components',
        items: [
           { text: 'Buttons', link: '/components/buttons' },
          { text: 'ORCID Dialog', link: '/components/orcid-dialog' },
          { text: 'Footer', link: '/components/footer' },
          { text: "Ontology Loader", link:  '/components/load-ontology' } ,
          { text: "Ontology Autocomplete", link:  '/components/ontology-autocomplete' },
          { text: "HPO Annotation Polisher Row", link: '/components/hpo-annotation-polisher'},
          { text: "HPO Polishing Workspace", link: '/components/hpo-polishing-workspace-component'},
          { text: "HPO Modifier Selector", link: '/components/hpo-modifier-selector'},
          { text: "HPO Text Mining Container", link: '/components/hpo-text-mining-container'},
          { text: "HPO Two-Step Mining", link: '/components/hpo-twostep-mining'},
          { text: "HPO Age Selector", link: '/components/hpo-age-selector'},
          { text: "Phenopacket Loader", link:  '/components/phenopacket-loader' } ,
          { text: 'Help button', link: '/components/help-button' }
        ]
      },
      {
        text: 'Shared Services',
        items: [

          { text: 'Notification Service', link: '/services/notification-service' }
        ]
      },
      {
        text: 'Models',
        items: [

          { text: 'OntologyMatch', link: '/models/ontology-match' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/P2GX/ng-hpo-uikit' }
    ]
  }
})