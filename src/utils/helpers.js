import moment from 'moment';
import { web3 } from '../plugins/web3';

const ellipsis = (string, start = 7, end = -4) => {
  if (!string) return '';
  return `${string.substr(0, start)}...${string.substr(end)}`;
};

const randomColor = () => {
  return `#${`${Math.random().toString(16)}000000`.substring(2, 8)}`;
};

const convertUSDTtoEther = (amount) => {
  return web3.utils.toWei(String(amount), 'ether');
};

const convertEtherToUSDT = (amount) => {
  return `${web3.utils.fromWei(amount, 'ether')} USDT`;
};

const convertTimeMSecToSec = (time) =>
  new Date(moment(time).format()).getTime() / 1000;

const convertTimeSecToMSec = (time) => Number(time) * 1000;

export {
  ellipsis,
  randomColor,
  convertEtherToUSDT,
  convertUSDTtoEther,
  convertTimeMSecToSec,
  convertTimeSecToMSec,
};
