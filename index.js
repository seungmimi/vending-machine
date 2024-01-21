//모둘화된 js를 모아줄 곳
import DrinkMaker from "./js/jsonSet.js";
import VendingMachineFunc from "./js/vendingMachineFn.js";

const drinkMaker = new DrinkMaker();
await drinkMaker.setup();

const vendingMachineFunc = new VendingMachineFunc;
vendingMachineFunc.setup();