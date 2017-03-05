// Flightplan - Deployment and Server Administration
//
// Acceptable arguments:
//   --skip-build           If I've recently bundled, I can skip the build.
//   --fresh-dependencies   Don't copy cached NPM module dependencies.

'use strict';

require('babel-core/register');

const plan = require('flightplan');
const _ = require('lodash');
const dateFns = require('date-fns');

const config = require('./config/server.env');
const SERVER_HOST = config.SERVER_HOST;
const SERVER_USER = config.SERVER_USER;

const privateKey = process.env.HOME + "/.ssh/id_rsa";

const user = 'deploy';
const appName = 'uncover';
const timestamp = dateFns.format(new Date, 'YYYY-MM-DD_hh[h]mm[m]ss[s]');
const newDirectoryName = `uncover_${timestamp}`;

const tempDir = `/tmp/${newDirectoryName}`;
const projectDir = `/home/${user}/${appName}`;

const newDirectory = `${projectDir}/${newDirectoryName}`;
const linkedDirectory = `${projectDir}/current`;

const MAX_SAVED_DEPLOYS = 3

plan.target('production', {
  host:       SERVER_HOST,
  username:   SERVER_USER,
  agent:      process.env.SSH_AUTH_SOCK
});

plan.local('deploy', local => {
  local.log(`Deployment started! Deploying to ${newDirectoryName}`);

  if (!plan.runtime.options['skip-build']) {
    local.log('Building client and server');
    local.exec('npm run build');
  } else {
    local.log('Skipping webpack bundle.')
  }

  // This is indeed much less DRY than I would like.
  // For some reason it fails when I try to build the file list in a loop.
  local.log('Copying files to remote');
  const index     = local.find('index.html', {silent: true}).stdout.split('\n');
  const config    = local.find('config', {silent: true}).stdout.split('\n');
  const client    = local.find('client', {silent: true}).stdout.split('\n');
  const server    = local.find('server', {silent: true}).stdout.split('\n');
  const packjson  = local.find('package.json', {silent: true}).stdout.split('\n');
  const files     = [].concat(index, config, client, server, packjson);

  local.transfer(files, `/tmp/${newDirectoryName}`);
});

plan.remote( 'deploy', remote => {
  remote.log('Move folder to web root')
  remote.sudo(`cp -R ${tempDir} ${newDirectory}`, { user });
  remote.rm(`-rf ${tempDir}`); // clean up after ourselves

  if (!plan.runtime.options['fresh-dependencies']) {
    remote.log('Copying dependencies from last deploy');
    remote.exec(`cp -R ${linkedDirectory}/node_modules ${newDirectory}/node_modules`)
  }

  remote.log('Installing dependencies');
  remote.sudo(
    `npm --production --prefix ${newDirectory} install ${newDirectory}`,
    { user }
  );


  remote.log('Creating symlink');
  remote.sudo(`ln -snf ${newDirectory} ${linkedDirectory}`, { user });

  // Start/Restart the application
  let appDetails = remote.exec(`pm2 show ${appName}`, {failsafe: true});
  let appNotRunning = !!appDetails.stderr;

  if ( appNotRunning ) {
    remote.log("App is not already running. Starting it fresh")
    remote.exec(`pm2 start ${linkedDirectory}/server/dist --name="${appName}"`)
  } else {
    remote.log("Restarting app")
    remote.exec(`pm2 restart ${appName}`)
  }

  remote.log('Removing oldest copies of deploy');
  remote.exec(`cd ${projectDir} && rm -rf \`ls -td ${appName}_* | awk 'NR>${MAX_SAVED_DEPLOYS}'\``);

});
