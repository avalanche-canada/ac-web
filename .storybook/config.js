import { configure } from '@kadira/storybook';

import 'normalize.css'
import 'react-image-gallery/styles/css/image-gallery.css'

import '../client/src/styles/scaffolding.css'
import '../client/src/styles/prismic.css'
import '../client/src/styles/auth0.css'
import '../client/src/styles/map.css'

function loadStories() {
  require('../client/src/components/blockquote/stories')
  require('../client/src/components/biography/stories')
  require('../client/src/components/description/stories')
  // require('../client/src/components/drawer/stories')
  // require('../client/src/components/footer/stories')
}

configure(loadStories, module);
