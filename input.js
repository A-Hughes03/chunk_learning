export function setupInput(player) {
  window.addEventListener('keydown', e => player.handleKey(e.key, true));
  window.addEventListener('keyup', e => player.handleKey(e.key, false));
}
