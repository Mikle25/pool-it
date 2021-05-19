import Web3 from 'web3';
import PoolFactory from '../contracts/PoolFactory.json';
import Pool from '../contracts/Pool.json';
import IERC20 from '../contracts/IERC20.json';

const { ethereum } = window;
const web3 = new Web3(Web3.givenProvider);

// Connect to MetaMask
const connectAcc = () =>
  ethereum.request({
    method: 'eth_requestAccounts',
  });

const getAccBalance = (acc) => web3.eth.getBalance(acc);

const getAccount = () => web3.eth.getAccounts();

// PoolFactory
const contractPoolFactory = new web3.eth.Contract(
  PoolFactory.abi,
  process.env.REACT_APP_CONTRACT_ADDRESS_POOL_FACTORY,
);

const createPoolLottery = (
  startDate,
  participationEndDate,
  endDate,
  poolCost,
  isLottery,
  ownerAddress,
) =>
  contractPoolFactory.methods
    .createPool(startDate, participationEndDate, endDate, poolCost, isLottery)
    .send({ from: ownerAddress });

const participationInLottery = (poolAddress, userAddress) =>
  contractPoolFactory.methods
    .participate(poolAddress)
    .send({ from: userAddress });

const setWinnerLottery = (poolAddress, userAddress) =>
  contractPoolFactory.methods
    .liquidate(poolAddress)
    .call({ from: userAddress })
    .then(console.log);

// Pool
const contractPool = (address = process.env.REACT_APP_CONTRACT_ADDRESS_POOL) =>
  new web3.eth.Contract(Pool.abi, address);

// ERC 20
const ierc20 = (address = process.env.REACT_APP_CONTRACT_ADDRESS_TOKEN) =>
  new web3.eth.Contract(IERC20.abi, address);

const approveAccount = (toPool, userAddress, amount) =>
  ierc20().methods.approve(toPool, amount).send({
    from: userAddress,
  });

const getBalanceUSDT = (address) => ierc20().methods.balanceOf(address).call();

export {
  connectAcc,
  getAccBalance,
  getAccount,
  web3,
  contractPoolFactory,
  contractPool,
  createPoolLottery,
  ierc20,
  getBalanceUSDT,
  approveAccount,
  participationInLottery,
  setWinnerLottery,
};
