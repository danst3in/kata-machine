export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(item: string): void {
        let currentNode = this.root;
        for (const char of item) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.isEndOfWord = true;
    }

    delete(item: string): void {
        const helper = (
            node: TrieNode,
            word: string,
            index: number,
        ): boolean => {
            if (index === word.length) {
                if (!node.isEndOfWord) return false; // Word does not exist
                node.isEndOfWord = false;
                return node.children.size === 0;
            }
            const char = word[index];
            if (!node.children.has(char)) return false; // Character not found

            const childNode = node.children.get(char)!;
            if (helper(childNode, word, index + 1)) {
                node.children.delete(char);
                return !node.isEndOfWord && node.children.size === 0;
            }
            return false;
        };

        helper(this.root, item, 0);
    }

    find(partial: string): string[] {
        const results: string[] = [];

        const helper = (node: TrieNode, prefix: string): void => {
            if (node.isEndOfWord) {
                results.push(prefix);
            }
            for (const [char, child] of node.children.entries()) {
                helper(child, prefix + char);
            }
        };

        let currentNode = this.root;
        for (const char of partial) {
            if (!currentNode.children.has(char)) return results; // No matches found
            currentNode = currentNode.children.get(char)!;
        }

        helper(currentNode, partial);
        return results;
    }
}

class TrieNode {
    public children: Map<string, TrieNode>;
    public isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}
