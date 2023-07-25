module.exports = {
  apps: [{
    name: 'movies',
    script: 'app.js',
  }],
  deploy: {
    production: {
      user: 'maria',
      host: ['api.movies.marusillda.nomoreparties.sbs'],
      ref: 'origin/level-1',
      repo: 'https://github.com/marusillda/movies-explorer-api.git',
      path: '~/movies/backend',
      'post-deploy': 'npm install && pm2 restart movies',
    },
  },
};
