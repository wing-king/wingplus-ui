import type { App, Component } from 'vue';
import {uiName } from './config'
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export function withInstall<T extends Component>(options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options;
    if (name) {
      app.component(`${uiName}-${name}`, options);
      app.component(`${uiName}-${name}`, options);
    }
  };

  return options as WithInstall<T>;
}