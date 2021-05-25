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
const contractPoolFactory = (
  address = process.env.REACT_APP_CONTRACT_ADDRESS_POOL_FACTORY,
) => new web3.eth.Contract(PoolFactory.abi, address);

const createPoolLottery = (
  startDate,
  participationEndDate,
  endDate,
  poolCost,
  isLottery,
  ownerAddress,
) =>
  contractPoolFactory()
    .methods.createPool(
      startDate,
      participationEndDate,
      endDate,
      poolCost,
      isLottery,
    )
    .send({ from: ownerAddress });

const participationInLottery = (poolAddress, userAddress) =>
  contractPoolFactory()
    .methods.participate(poolAddress)
    .send({ from: userAddress });

const setWinnerLottery = (poolAddress, userAddress) =>
  contractPoolFactory()
    .methods.liquidate(poolAddress)
    .send({ from: userAddress });

const claim = (poolAddress, userAddress) =>
  contractPoolFactory().methods.claim(poolAddress).send({ from: userAddress });

// Pool
const contractPool = (address = process.env.REACT_APP_CONTRACT_ADDRESS_POOL) =>
  new web3.eth.Contract(Pool.abi, address);

// const getBalanceUSDT = (poolAddress) =>
//   contractPool(poolAddress).methods.poolBalance().call();

// ERC 20
const ierc20 = (address = process.env.REACT_APP_CONTRACT_ADDRESS_TOKEN) =>
  new web3.eth.Contract(IERC20.abi, address);

const approveAccount = (toPool, userAddress, amount) =>
  ierc20().methods.approve(toPool, amount).send({
    from: userAddress,
  });

const getBalanceUSDT = (poolAddress) =>
  ierc20().methods.balanceOf(poolAddress).call();

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
  claim,
};
