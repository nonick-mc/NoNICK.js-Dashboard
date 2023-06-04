import { GitHub, Icon, Twitter } from 'react-feather';

interface AppBarConfigType {
  links: Link[],
  linkButtons: LinkButton[],
}

interface Link {
  name: string,
  href: string,
}

interface LinkButton {
  label: string,
  href: string,
  icon: Icon,
}

const AppBarConfig: AppBarConfigType = {
  links: [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: 'https://nonick-js.com' }
  ],
  linkButtons: [
    { label: 'Twitter', href: 'https://twitter.com/nonick_js', icon: Twitter },
    { label: 'GitHub', href: 'https://github.com/nonick-js', icon: GitHub },
  ]
}

export default AppBarConfig;