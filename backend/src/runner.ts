import loader from './server';

try {
  loader();
} catch (e) {
  console.error(e);
}
