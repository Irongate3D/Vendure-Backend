import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';

console.log('Running on port:', process.env.PORT);

runMigrations(config)
  .then(() => bootstrap(config))
  .catch(err => {
    console.error('Failed to start Vendure:', err);
    process.exit(1); // Exit with error status
  });