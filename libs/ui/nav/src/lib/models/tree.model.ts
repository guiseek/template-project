import {
  TreeNode,
  TreeConfig,
  TraversalStrategy
} from '../interfaces/nav-config.interfaces';
import { mergeSort } from '../utils/merge-sort';

export class Tree<T extends TreeNode<T>> implements Iterable<T> {
  config: TreeConfig<T> = {};

  root: T;

  constructor(root: T, config?: TreeConfig<T>) {
    this.root = this.addParentLinks(root);
  }

  private addParentLinks(parent: T): T {
    if (parent.children) {
      // mergeSort children
      if (this.config && this.config.nodeComparatorFn) {
        parent.children = mergeSort<any>(
          parent.children,
          this.config.nodeComparatorFn
        );
      }

      // add a parent link to a child structure
      parent.children.forEach(d => {
        // each child gets marked with a parent
        d.parent = parent;
        // then marks its own children with itself
        this.addParentLinks(d);
      });
    } else {
      parent.children = [];
    }
    return parent;
  }

  isRoot(node: T) {
    return node.parent === undefined;
  }

  isLeaf(node: T) {
    return node.children.length === 0;
  }

  add(node: T, toNode: T) {
    const parent = toNode ? this.findBFS(toNode) : null;
    if (parent) {
      // TODO: Find the index to insert the child using findInsertIndex()
      parent.children.push(node);
    } else {
      if (!this.root) {
        this.root = node;
      } else {
        return 'Root node is already assigned';
      }
    }
  }

  remove(node: T) {
    if (this.root === node) {
      this.root = null;
    }

    const queue = [this.root];
    while (queue.length) {
      const nodeTemp = queue.shift();
      for (let i = 0; i < nodeTemp.children.length; i++) {
        if (nodeTemp.children[i] === node) {
          nodeTemp.children.splice(i, 1);
        } else {
          queue.push(nodeTemp.children[i]);
        }
      }
    }
  }

  contains(node: T) {
    return !!this.findBFS(node);
  }

  findBFS(node: T) {
    const queue = [this.root];
    while (queue.length) {
      // tslint:disable:no-non-null-assertion
      const nodeTemp = queue.shift()!;
      if (nodeTemp === node) {
        return nodeTemp;
      }
      for (const child of nodeTemp.children) {
        queue.push(child);
      }
    }
    return null;
  }

  findByPredicateBFS(predicate: (node: T) => boolean): T {
    const queue = [this.root];
    while (queue.length) {
      const nodeTemp = queue.shift()!;
      if (predicate(nodeTemp)) {
        return nodeTemp;
      }
      for (const child of nodeTemp.children) {
        queue.push(child);
      }
    }
    return null;
  }

  findByPredicateDFS(
    predicate: (node: T) => boolean,
    strategy: TraversalStrategy = TraversalStrategy.PreOrder
  ): T {
    // TODO
    return null;
  }

  private _preOrder(node: T, fn: (node: T) => any) {
    if (node) {
      if (fn) {
        fn(node);
      }
      for (const child of node.children) {
        this._preOrder(child, fn);
      }
    }
  }

  private _postOrder(node: T, fn: (node: T) => any) {
    if (node) {
      for (const child of node.children) {
        this._postOrder(child, fn);
      }
      if (fn) {
        fn(node);
      }
    }
  }

  traverseDFS(
    fn: (node: T) => any,
    method: TraversalStrategy = TraversalStrategy.PreOrder
  ) {
    const current = this.root;
    if (method === TraversalStrategy.PostOrder) {
      this._postOrder(current, fn);
    } else {
      this._preOrder(current, fn);
    }
  }

  traverseBFS(fn: (node: T) => any) {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (fn) {
        fn(node);
      }
      for (const child of node.children) {
        queue.push(child);
      }
    }
  }

  *[Symbol.iterator](): IterableIterator<T> {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift()!;
      yield node;
      for (const child of node.children) {
        queue.push(child);
      }
    }
  }

  getAllParents(item: T): T[] {
    const parents: T[] = [];
    parents.unshift(item);
    let parent = item.parent;
    while (parent) {
      parents.unshift(parent);
      parent = parent.parent;
    }
    return parents;
  }
}
