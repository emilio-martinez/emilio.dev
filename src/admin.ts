import CMS from 'netlify-cms-app';

CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
      branch: '_content',
      // Note: `squash_merges` is an experimental/beta feature
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      squash_merges: true,
    },
    local_backend: {
      url: 'http://localhost:8081/api/v1',
      allowed_hosts: [],
    },
    publish_mode: 'editorial_workflow',
    media_folder: 'src/site/assets/uploads',
    public_folder: '/assets/uploads',
    collections: [
      {
        name: 'globals',
        label: 'Globals',
        files: [
          {
            name: 'site_data',
            label: 'Site Data',
            // Note: `delete` feature is an optional feature that's not typed yet
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
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
            // Note: `delete` feature is an optional feature that's not typed yet
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
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
