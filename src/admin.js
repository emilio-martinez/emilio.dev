import CMS from 'netlify-cms-app';

CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
      branch: '_content',
      squash_merges: true,
    },
    local_backend: {
      url: 'http://localhost:8081/api/v1',
      allowed_hosts: [],
    },
    publish_mode: 'editorial_workflow',
    media_folder: 'src/site/media',
    public_folder: '/media',
    collections: [
      {
        name: 'globals',
        label: 'Globals',
        files: [
          {
            name: 'site_data',
            label: 'Site Data',
            delete: false,
            file: 'src/site/_data/site.json',
            fields: [
              { label: 'Site Name', name: 'name', widget: 'string' },
              { label: 'Site Url', name: 'url', widget: 'string' },
            ],
          },
        ],
      },
      {
        name: 'key_pages',
        label: 'Key Pages',
        files: [
          {
            name: 'home',
            label: 'Home',
            delete: false,
            file: 'src/site/index.md',
            slug: '{{slug}}',
            fields: [
              { label: 'Title', name: 'pageTitle', widget: 'string' },
              { label: 'Body', name: 'body', widget: 'markdown' },
            ],
          },
        ],
      },
    ],
  },
});
