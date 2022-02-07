const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain{
    constructor(){  
      this.chain = [this.createGenesisBlock];  
    }
 
    createGenesisBlock(){
        return new Block(0,"1/4/2022","Genesis block","0");
    }


    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let cryptoCoin = new Blockchain();
cryptoCoin.addBlock(new Block(0,"1/4/2022", "Genesis block", "0"));
cryptoCoin.addBlock(new Block(1,"2/4/2022", {money: 100}));
cryptoCoin.addBlock(new Block(2,"3/4/2022", {money: 200}));
cryptoCoin.addBlock(new Block(3,"4/4/2022", {money: 300}));


console.log(JSON.stringify(cryptoCoin,null, 4));

 