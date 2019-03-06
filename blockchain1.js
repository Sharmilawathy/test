const SHA256 = require('crypto-js/sha256');

class Block {

  constructor(index,timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }


  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString());
  }

}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }


  createGenesisBlock() {
    return new Block(0,"01/07/17","Genesis Block" ,"0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }



}


let milaCoin = new Blockchain();
milaCoin.addBlock(new Block(1,"10/07/17",{ amount:4 }));
milaCoin.addBlock(new Block(2,"12/07/17",{ amount:12 }));

console.log(JSON.stringify(milaCoin, null, 4));