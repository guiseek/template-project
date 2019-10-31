import { Params } from '@angular/router';

export interface Crumb {
  name: string;
  params?: Params;
  link?: string;
}
