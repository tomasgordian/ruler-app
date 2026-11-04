const url = new URL(location.href);
if (url.searchParams.has('fbclid')) {
  url.searchParams.delete('fbclid');
  history.replaceState(history.state, '', url);
}
