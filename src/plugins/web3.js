import Web3 from 'web3';
import PoolFactory from '../contracts/PoolFactory.json';
import Pool from '../contracts/Pool.json';
import SavingPoolFactory from '../contracts/SavingsPoolFactory.json';
import SavingPool from '../contracts/SavingsPool.json';
import IERC20 from '../contracts/IERC20.json';

const web3 = new Web3(Web3.givenProvider);

// ERC 20
const ierc20 = (address = process.env.REACT_APP_CONTRACT_ADDRESS_TOKEN) =>
  new web3.eth.Contract(IERC20.abi, address);

const approveAccount = (toPool, userAddress, amount) =>
  ierc20().methods.approve(toPool, amount).send({
    from: userAddress,
  });

const balanceERC20 = (userAddress) =>
  ierc20().methods.balanceOf(userAddress).call();

// TODO Lottery Pool
const contractLotteryPoolFactory = (
  address = process.env.REACT_APP_CONTRACT_LOTTERY_POOL_FACTORY,
) => new web3.eth.Contract(PoolFactory.abi, address);

const createLotteryPool = (
  startDate,
  participationEndDate,
  endDate,
  poolCost,
  isLottery,
  address,
) =>
  contractLotteryPoolFactory()
    .methods.createPool(
      startDate,
      participationEndDate,
      endDate,
      poolCost,
      isLottery,
    )
    .send({ from: address });

const participationInLottery = (poolAddress, userAddress) =>
  contractLotteryPoolFactory()
    .methods.participate(poolAddress)
    .send({ from: userAddress });

const setWinnerLottery = (poolAddress, userAddress) =>
  contractLotteryPoolFactory()
    .methods.liquidate(poolAddress)
    .send({ from: userAddress });

const claim = (poolAddress, userAddress) =>
  contractLotteryPoolFactory()
    .methods.claim(poolAddress)
    .send({ from: userAddress });

// Pool
const contractLotteryPool = (
  address = process.env.REACT_APP_CONTRACT_LOTTERY_POOL,
) => new web3.eth.Contract(Pool.abi, address);

// const getBalanceUSDT = (poolAddress) =>
//   contractLotteryPool(poolAddress).methods.poolBalance().call();

// TODO Saving Pool
const contractSavingPoolFactory = (
  address = process.env.REACT_APP_CONTRACT_SAVING_POOL_FACTORY,
) => new web3.eth.Contract(SavingPoolFactory.abi, address);

const contractSavingPool = (
  address = process.env.REACT_APP_CONTRACT_SAVING_POOL,
) => new web3.eth.Contract(SavingPool.abi, address);

const createSavingPool = (userAddress) =>
  contractSavingPoolFactory().methods.createPool().send({ from: userAddress });

const participationSavingPool = (userAddress, poolAddress, amount) =>
  contractSavingPoolFactory()
    .methods.participate(poolAddress, amount)
    .send({ from: userAddress });

const claimSavingPool = (poolAddress, currentAddress) =>
  contractSavingPoolFactory()
    .methods.claim(poolAddress)
    .send({ from: currentAddress });

export {
  web3,
  contractLotteryPoolFactory,
  contractLotteryPool,
  contractSavingPoolFactory,
  contractSavingPool,
  createLotteryPool,
  createSavingPool,
  ierc20,
  approveAccount,
  participationInLottery,
  participationSavingPool,
  setWinnerLottery,
  claim,
  claimSavingPool,
  balanceERC20,
};
