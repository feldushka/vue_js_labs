
class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTree {
  root: TreeNode | null = null;

  insert(value: number): void {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current: TreeNode = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  search(value: number): boolean {
    let current: TreeNode | null = this.root;
    while (current !== null) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  delete(value: number): void {
    this.root = this._deleteNode(this.root, value);
  }

  private _deleteNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let temp: TreeNode = node.right;
      while (temp.left !== null) {
        temp = temp.left;
      }
      node.value = temp.value;
      node.right = this._deleteNode(node.right, temp.value);
    }
    return node;
  }

  change(oldValue: number, newValue: number): boolean {
    const node = this._findNode(oldValue);
    if (node !== null) {
      node.value = newValue;
      return true;
    }
    return false;
  }

  private _findNode(value: number): TreeNode | null {
    let current: TreeNode | null = this.root;
    while (current !== null) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  height(): number {
    return this._getHeight(this.root);
  }

  private _getHeight(node: TreeNode | null): number {
    if (node === null) return 0;
    const leftH = this._getHeight(node.left);
    const rightH = this._getHeight(node.right);
    return Math.max(leftH, rightH) + 1;
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(7);

console.log("Поиск 7:", bst.search(7));
console.log("Высота:", bst.height());

bst.change(5, 6);
bst.delete(10);

console.log("Поиск 10 после удаления:", bst.search(10));