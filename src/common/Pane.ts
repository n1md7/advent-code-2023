import { Debug } from '/src/common/Debug';
import { Pane } from 'tweakpane';

export const pane = new Pane({
  title: 'Tweak Pane',
});

// Only show when hash #debug is present in the URL
pane.disabled = !Debug.enabled();
