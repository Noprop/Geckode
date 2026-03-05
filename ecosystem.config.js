module.exports = {
  apps: [
    {
      name: 'nextjs',
      cwd: './frontend',
      script: 'node_modules/.bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '512M',
      exp_backoff_restart_delay: 100,
    },
    // TODO
    // {
    //   name: 'django',
    //   cwd: './backend',
    //   script: './venv/bin/daphne',
    //   args: '-b 127.0.0.1 -p 8000 geckode.asgi:application',
    //   interpreter: 'none',
    //   env: {
    //     DJANGO_SETTINGS_MODULE: 'geckode.settings.prod',
    //   },
    //   instances: 1,
    //   autorestart: true,
    //   max_memory_restart: '512M',
    //   exp_backoff_restart_delay: 100,
    // },
  ],
};
