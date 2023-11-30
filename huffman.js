// Create Node class that takes the letter and its probability
class Node {
    constructor(value, letter) {
        this.value = value;
        this.letter = letter;
        this.left = null;
        this.right = null;
    }
}

// Create a Huffman tree that initializes the root, the binary coded array, and the probabilities array 
class HuffmanTree {
    constructor() {
        this.root = null;
        this.binaryCodedArray = [];
        this.probabilities = [];
    }

    // Insert the first element and the second element to the huffman tree
    // O(1)
    huffmanInsertRoot(firstObject, secondObject) {
        const firstNode = new Node(firstObject.probability, firstObject.letter);
        const secondNode = new Node(secondObject.probability, secondObject.letter);
        const rootNode = new Node(firstObject.probability + secondObject.probability, null);
        
        rootNode.left = firstNode;
        rootNode.right = secondNode;
        this.root = rootNode;
    }

    // Insert a new node to the right of the tree  
    // O(1) 
    huffmanInsertToRight(node) {
        const newNode = new Node(node.probability, node.letter);
        const rootNode = new Node(node.probability + this.root.value , null);

        rootNode.right = newNode;
        rootNode.left = this.root;
        this.root = rootNode;
    }
    
    // Insert a new node to the left of the tree
    // O(1)     
    huffmanInsertToLeft(node) {
        const newNode = new Node(node.probability, node.letter);
        const rootNode = new Node(node.probability + this.root.value , null);

        rootNode.left = newNode;
        rootNode.right = this.root;
        this.root = rootNode;
    }    

    // Check Where the new node should add to the tree 
    // O(1)
    checkWhereAddingNode(node) {
        if(node.probability > this.root.value) {
            this.huffmanInsertToRight(node);
        } else if(node.probability < this.root.value) {
            this.huffmanInsertToLeft(node);
        } else {
            this.root.letter = node.letter;
        }
    }    
    
    // Generate the binary code for each letter ,and add it to the binary coded array 
    // O(n)  
    generateBinaryCode(code, node) {
        if(node.left !== null ) {
            if(node.left.letter !== null) {
                let letter = node.left.letter;
                this.binaryCodedArray.push({[letter]: code + '0'});
            }
            if(node.left.left !== null ){
                this.generateBinaryCode(code + '0', node.left);
            }
        }     
        if(node.right !== null ) {
            if(node.right.letter !== null) {
                let letter = node.right.letter;
                this.binaryCodedArray.push({[letter]: code + '1'});
            }
            if(node.right.left !== null ){
                this.generateBinaryCode(code + '1', node.right);
            }
        }    
    }

    // Add new letter to the probabilites array
    // O(1)   
    insertToArray(object) {
        this.probabilities.push(object);
    }

    // Create the huffman tree
    // O(nlogn)   
    createHuffmanTree() {
        // if (!this.checkProbablities()) {
        //     console.log("Invalid total probabilities");

        //     return;
        // }

        this.probabilities.sort((firstObject, secondObject) => firstObject.probability - secondObject.probability);
        this.huffmanInsertRoot(this.probabilities[0], this.probabilities[1]);
        for (let i = 2;i < this.probabilities.length; i++) {
            this.checkWhereAddingNode(this.probabilities[i]);
        }
    
        this.generateBinaryCode('', this.root);
    }

    // Check propabilites 
    checkProbablities() {
        let probabilitesSum = 0;
        for(let i = 0; i < this.probabilities.length; i++){
            probabilitesSum += this.probabilities[i].probability;
        }

        return probabilitesSum === 1 ? true : false; 
    }    
}


let huffmanTree = new HuffmanTree();
huffmanTree.insertToArray({letter: 'a', probability: 0.3});
huffmanTree.insertToArray({letter: 'c', probability: 0.1});
huffmanTree.insertToArray({letter: 'd', probability: 0.06});
huffmanTree.insertToArray({letter: 'b', probability: 0.2});
huffmanTree.insertToArray({letter: 'g', probability: 0.34});


// huffmanTree.insertToArray({letter: 'e', probability: 120});
// huffmanTree.insertToArray({letter: 'd', probability: 42});
// huffmanTree.insertToArray({letter: 'l', probability: 42});
// huffmanTree.insertToArray({letter: 'u', probability: 37});
// huffmanTree.insertToArray({letter: 'c', probability: 32});
// huffmanTree.insertToArray({letter: 'm', probability: 24});
// huffmanTree.insertToArray({letter: 'k', probability: 7});
// huffmanTree.insertToArray({letter: 'z', probability: 2});

// huffmanTree.insertToArray({letter: 'b', probability: .1});
// huffmanTree.insertToArray({letter: 'c', probability: .6});
// huffmanTree.insertToArray({letter: 'd', probability: .3});
huffmanTree.createHuffmanTree();

console.log("Sorted array", huffmanTree.probabilities)
console.log("Binary Coded array", huffmanTree.binaryCodedArray);
