interface Url {
  name: string,
  href: string,
}

const AppBarConfig: Url[] = [
  { name: 'Home', href: '/' },
  { name: 'Docs', href: 'https://docs.nonick-js.com' },
  { name: 'Twitter', href: 'https://twitter.com/nonick_js' }, 
  { name: 'GitHub', href: 'https://github.com/nonick-js' }
];

export default AppBarConfig;