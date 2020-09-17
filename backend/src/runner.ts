import server from './server';

try {
  server();
} catch (e) {
  console.error(e);
}
