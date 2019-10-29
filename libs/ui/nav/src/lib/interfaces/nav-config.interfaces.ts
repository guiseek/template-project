export enum NavItemType {
  Link = 'link',
  DropDown = 'dropDown',
  Icon = 'icon',
  Separator = 'separator',
  ExtLink = 'extLink'
}
export enum NavState {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
  CollapsedHover = 'collapsedHover',
  Mobile = 'mobile',
  MobileOpen = 'mobileOpen'
}

export interface NavItem extends TreeNode<NavItem> {
  name: string;
  type?: NavItemType;
  icon?: string;
  link?: string;
  badge?: { value: number; color?: string };
  tooltip?: string;
  disabled?: boolean;
  [key: string]: any;
}

import { Comparator } from '../utils/comparator.type';

export enum TraversalStrategy {
  PreOrder = 'PreOrder',
  PostOrder = 'PostOrder'
}

export interface TreeNode<T> {
  parent?: T;
  children?: T[];
  [key: string]: any;
}

export interface TreeConfig<T> {
  nodeComparatorFn?: Comparator<T>;
}
