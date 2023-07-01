module.exports = {
  apps: [{
    name: 'movies',
    script: 'app.js',
  }],
  deploy: {
    production: {
      user: 'maria',
      host: ['62.84.123.152'],
      ref: 'origin/level-1',
      repo: 'https://github.com/marusillda/movies-explorer-api.git',
      path: '~/movies/backend',
      'post-deploy': 'npm install',
    },
  },
};
