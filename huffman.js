// Create Node class that takes the letter and its probability
class Node {
    constructor(probability, letter) {
        this.probability = probability;
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
    // O(n)
    InsertToHuffmanTree() {
        const rootNode = new Node(this.probabilities[0].probability + this.probabilities[1].probability, null);
        
        rootNode.left = this.probabilities[0];
        rootNode.right = this.probabilities[1];
        this.root = rootNode;
        this.probabilities.shift();
        this.probabilities.shift();
        this.probabilities.unshift(rootNode);
    }
    
    // Generate the binary code for each letter ,and add it to the binary coded array 
    // O(n)  
    generateBinaryCode(code, node) {
        if(node.left !== null ) {
            if(node.left.letter !== null) {
                this.binaryCodedArray.push({[node.left.letter]: code + '0'});
            }
            if(node.left.left !== null ){
                this.generateBinaryCode(code + '0', node.left);
            }
        }     
        if(node.right !== null ) {
            if(node.right.letter !== null) {
                this.binaryCodedArray.push({[node.right.letter]: code + '1'});
            }
            if(node.right.left !== null ){
                this.generateBinaryCode(code + '1', node.right);
            }
        }


    }

    // Add new letter to the probabilities array
    // O(1)   
    insertToArray(object) {
        const newNode = new Node(object.probability, object.letter);
        this.probabilities.push(newNode);
    }

    // Create the huffman tree
    // O(n*2logn)   
    createHuffmanTree() {
        if (!this.checkProbabilities()) {
            console.log("Invalid total probabilities");

            return;
        }

        while(this.probabilities.length !== 1) {
            this.probabilities.sort((firstObject, secondObject) => firstObject.probability - secondObject.probability);
            this.InsertToHuffmanTree();
        }

        this.generateBinaryCode('', this.root);
    }

    // Check probabilities 
    checkProbabilities() {
        let probabilitiesSum = 0;
        for(let i = 0; i < this.probabilities.length; i++){
            probabilitiesSum += this.probabilities[i].probability;
        }

        return probabilitiesSum === 1 ? true : false; 
    }    
}

let huffmanTree = new HuffmanTree();

huffmanTree.insertToArray({letter: 'a', probability: 0.05});
huffmanTree.insertToArray({letter: 'c', probability: 0.12});
huffmanTree.insertToArray({letter: 'd', probability: 0.13});
huffmanTree.insertToArray({letter: 'b', probability: 0.09});
huffmanTree.insertToArray({letter: 'e', probability: 0.16});
huffmanTree.insertToArray({letter: 'f', probability: 0.45});
huffmanTree.createHuffmanTree();
console.log("Binary Coded array", huffmanTree.binaryCodedArray);
