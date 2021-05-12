import Web3 from 'web3';
import PoolFactory from '../contracts/PoolFactory.json';
import Pool from '../contracts/Pool.json';

const web3 = new Web3(Web3.givenProvider);

const contract = new web3.eth.Contract(
  PoolFactory.abi,
  '0xa2d76da2e8ee6292b719a773ad83dbe4b3ad6b6f',
);

const getContract = new web3.eth.Contract(
  Pool.abi,
  '0x1B50A794b8d4451BEB2DF50F8940cD1906F878d8',
);

const infoPool = async () => {
  // await getContract.methods.startDate().call().then(console.log);
  // await getContract.methods.participationEndDate().call().then(console.log);
  // await getContract.methods.endDate().call().then(console.log);
  // await getContract.methods.poolCost().call().then(console.log);
  // await getContract.methods.poolToken().call().then(console.log);
};

const allTransaction = async () => {};

export { web3, getContract, contract, infoPool, allTransaction };
