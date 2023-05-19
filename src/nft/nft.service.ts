import { Inject, Injectable } from '@nestjs/common';
import { MintNftDto } from './dto/nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Contract } from 'web3-eth-contract';
import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';


@Injectable()
export class NftService {

  constructor(@Inject('CONTRACT') private readonly contract: Contract,
  @Inject('WEB3') private readonly web3: Web3
  ) {}

  async getPrice(tokenId: number) {
    let price = 0;
    try {
      // console.log(this.contract.methods);
      price = await this.contract.methods.getPrice(tokenId).call();
    }
    catch (e) {
    }
    
    return price;
  }

  async setPrice(tokenId: number, newPrice: number) {
    let price = 0;
    try {
      // console.log(this.contract.methods);
      price = await this.contract.methods.setPrice(tokenId, newPrice).send();
    }
    catch (e) {
    }
    
    return price;
  }

  async mint(mintNftDto: MintNftDto) {
    let tokenId: number = -1;
   // const gasPrice = await this.web3.eth.getGasPrice();
   // const gasLimit = 21000;
    try {
      tokenId = await this.contract.methods.mint(mintNftDto.imageUrl, mintNftDto.name ,mintNftDto.price).send({from: mintNftDto.from, gas: 4712388});
      console.log(tokenId);
    }
    catch (e) {
      console.log(e.message);
    }
    return tokenId;
  }

  async buy(tokenId: number) {
    try {
      // console.log(this.contract.methods);
      return await this.contract.methods.buy(tokenId).send();
    }
    catch (e) {
      console.log(e.message);
    }
    
    return;
  }

  async createAccount(userId: string): Promise<any> {
    const account = this.web3.eth.accounts.create();
    return account;
  }


  async checkSufficientFunds(buyerId: string, nftToken: string): Promise<any> {
    // Implement the logic to check if the buyer has sufficient funds
    // Example:
    // Retrieve the buyer's balance and compare it with the NFT's price
    // Return a Promise that resolves to a boolean indicating if the buyer has sufficient funds
  }

  async buyNft(buyerId: number, nftToken: number): Promise<any> {
        const NftPrice = this.getPrice(nftToken);
        // const userAccountEntity = await this.userAccountRepository.findOne({where: {userId: buyerId}});
        this.contract.methods.buy(nftToken).send({from: buyerId, value: NftPrice});
  }

  async checkUserNft(tokenId: string, userId: string): Promise<any> {
    // Implement the logic to check if the NFT belongs to the user
    // Example:
    // Retrieve the NFT's owner based on the tokenId and compare it with the userId
    // Return a Promise that resolves to a boolean indicating if the NFT belongs to the user
  }

  async putNftOnSale(tokenId: string): Promise<any> {
    // Implement the logic to put the NFT on sale
    // Example:
    // Update the NFT's status to indicate it's available for sale
    // Return a Promise that resolves to a boolean indicating if the operation was successful
  }



  /*
  // ALTTAKILER TEST EDILMEDI, alttakıler calısılacak, chat-gpt ile olusturuldu.
  async generateWalletWeb3(userId: string): Promise<any> {
    const account = this.web3.eth.accounts.create(this.web3.utils.randomHex(32));
    const wallet = this.web3.eth.accounts.wallet.add(account);
    const keystore = wallet.encrypt(this.web3.utils.randomHex(32));

    return {keystore, wallet, account}; 
  }

  async addAccountToWallet(walletMnemonic: string, accountIndex: number): Promise<string> {
    const provider = new HDWalletProvider({
      mnemonic: walletMnemonic,
      providerOrUrl: process.env.WEB3_HTTP_PROVIDER_URL as string,
    });
    const web3 = new Web3(provider);
  
    const accounts = await web3.eth.getAccounts();
    const newAccount = accounts[accountIndex];
  
    // Unlock the wallet with the new account
    await web3.eth.personal.unlockAccount(newAccount, null, null);
  
    return newAccount;
  }

  async getAccountFromWallet(walletMnemonic: string, accountIndex: number): Promise<string> {
    const provider = new HDWalletProvider({
      mnemonic: walletMnemonic,
      providerOrUrl: process.env.WEB3_HTTP_PROVIDER_URL as string // Replace with your Infura project ID
    });
    const web3 = new Web3(provider);
  
    const accounts = await web3.eth.getAccounts();
    const account = accounts[accountIndex];
  
    return account;
  }

  async addWalletToAccount(account: string, walletMnemonic: string): Promise<boolean> {
    const provider = new HDWalletProvider({
      mnemonic: walletMnemonic,
      providerOrUrl: process.env.WEB3_HTTP_PROVIDER_URL as string, // Replace with your Infura project ID
    });
    const web3 = new Web3(provider);
  
    // Unlock the account with the wallet mnemonic
    await web3.eth.personal.importRawKey(walletMnemonic, null);
    await web3.eth.personal.unlockAccount(account, null, null);
  
    return true;
  }
  
  */



  findAll() {
    return `This action returns all nft`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`;
  }

  update(id: number, updateNftDto: UpdateNftDto) {
    return `This action updates a #${id} nft`;
  }

  remove(id: number) {
    return `This action removes a #${id} nft`;
  }
}
