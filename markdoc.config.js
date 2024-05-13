import { nodes, Tag } from '@markdoc/markdoc'

function generateID(children, attributes) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

const config = {
  variables: {
    loremIpsum:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  nodes: {
    fence: {
      render: 'Fence',
      attributes: nodes.fence.attributes,
    },
    heading: {
      children: ['inline'],
      attributes: {
        id: { type: String },
        level: { type: Number, required: true, default: 1 },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config)
        const children = node.transformChildren(config)
        const id = generateID(children, attributes)
        return new Tag(
          `h${node.attributes['level']}`,
          { ...attributes, id },
          children
        )
      },
    },
  },
  tags: {
    arcade: {
      render: 'Arcade',
      attributes: { src: { type: String }, title: { type: String } },
    },
    badge: {
      render: 'Badge',
      description: 'Display a small badge',
      children: ['paragraph', 'tag', 'list'],
      attributes: {
        size: {
          type: String,
          default: 'sm',
          matches: ['xs', 'sm', 'base', 'lg'],
        },
        type: {
          type: String,
          default: 'info',
          matches: ['info', 'success', 'error', 'warning', 'secondary'],
        },
        variant: {
          type: String,
          default: 'contrast',
          matches: ['contrast', 'default'],
        },
      },
    },
    button: {
      render: 'Button',
      description: 'Display a standard button',
      children: ['paragraph', 'tag', 'list'],
      attributes: {
        href: {
          type: String,
          description: 'The button link url',
        },
        size: {
          type: String,
          default: 'base',
          matches: ['sm', 'base', 'lg'],
        },
        type: {
          type: String,
          default: 'default',
          matches: ['default', 'info', 'success', 'error', 'warning'],
        },
        variant: {
          type: String,
          default: 'default',
          matches: ['default', 'shadow', 'pill', 'ghost', 'link'],
        },
      },
    },
    changelog: {
      render: 'Changelog',
      description: 'Display a changelog entry',
      children: ['paragraph', 'tag', 'list'],
      attributes: {
        date: { type: String, default: '1970-01-01' },
        title: { type: String, default: 'Untitled' },
        cover: { type: String },
      },
    },
    collapse: {
      render: 'Collapse',
      children: ['paragraph', 'tag', 'list'],
      attributes: { title: { type: String } },
    },
    guides: {
      render: 'Guides',
      description: 'Display a tab group of guides',
    },
    httpapidoc: {
      render: 'HTTPAPIDoc',
      description: 'An HTTP API Doc card',
      attributes: {
        baseUrl: { type: String },
        path: { type: String },
        method: {
          type: String,
          default: 'GET',
          matches: [
            'GET',
            'HEAD',
            'POST',
            'PUT',
            'DELETE',
            'CONNECT',
            'OPTIONS',
            'TRACE',
            'PATCH',
          ],
        },
        description: { type: String },
        parameters: { type: Array },
        responses: { type: Object },
      },
    },
    iframe: {
      render: 'IFrame',
      attributes: {
        src: { type: String },
        className: { type: String, default: 'w-full h-[400px] rounded-md' },
      },
    },
    img: {
      render: 'Image',
      attributes: {
        src: { type: String },
        alt: { type: String },
        legend: { type: String },
        bordered: { type: Boolean, default: true },
        className: { type: String },
        center: { type: Boolean },
        right: { type: Boolean },
        width: {
          type: String,
          matches: ['1/4', '1/3', '1/2', '2/3', '3/4', '1'],
        },
      },
    },
    loom: {
      render: 'Loom',
      attributes: { src: { type: String }, legend: { type: String } },
    },
    note: {
      render: 'Note',
      description: 'Display the enclosed content in a callout box',
      children: ['paragraph', 'tag', 'list'],
      attributes: {
        type: {
          type: String,
          default: 'info',
          matches: ['info', 'success', 'warning', 'error'],
        },
      },
    },
    openapidoc: {
      render: 'OpenAPIDoc',
      description: 'An Open API Doc card',
      attributes: {
        url: { type: String },
        path: { type: String },
        method: {
          type: String,
          default: 'GET',
          matches: [
            'GET',
            'HEAD',
            'POST',
            'PUT',
            'DELETE',
            'CONNECT',
            'OPTIONS',
            'TRACE',
            'PATCH',
          ],
        },
        serverIndex: { type: Number },
      },
    },
    pageLink: {
      render: 'PageLink',
      children: ['paragraph', 'tag', 'list'],
      attributes: { href: { type: String }, iconUrl: { type: String } },
    },
    pitch: {
      render: 'Pitch',
      attributes: { src: { type: String } },
    },
    releaseNotes: {
      render: 'ReleaseNotes',
      attributes: { repo: { type: String }, tagName: { type: String }, cover: { type: String } },
    },
    sampleGuides: {
      render: 'SampleGuides',
    },
    samplePage: {
      render: 'SamplePage',
    },
    spacer: {
      render: 'Spacer',
      attributes: {
        size: {
          type: String,
          default: 'base',
          matches: ['xs', 'sm', 'base', 'lg', 'xl'],
        },
      },
    },
    tab: {
      render: 'Tab',
      children: ['paragraph', 'tag', 'list'],
      attributes: {
        title: { type: String },
        className: { type: String },
      },
    },
    tabs: {
      render: 'Tabs',
      children: ['paragraph', 'tag', 'list'],
    },
    tweet: {
      render: 'Tweet',
      attributes: { link: { type: String }, className: { type: String } },
    },
    typeform: {
      render: 'Typeform',
      attributes: { src: { type: String } },
    },
    youtube: {
      render: 'YouTube',
      attributes: { src: { type: String } },
    },
  },
}

export default config
