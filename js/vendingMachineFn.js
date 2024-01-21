//토스트메시지 함수
let tostMessage = document.getElementById('tost_message');
function tostOn(){
    tostMessage.classList.add('active');
    setTimeout(function(){
        tostMessage.classList.remove('active');
    },1000);
}

class VendingMachineFunc {
  constructor(){
  //소지금 관련 요소
  const myInfo = document.querySelector('.wallet_wrap');
  this.myMoney = myInfo.querySelector('#wallet');
  //흭득한 음료 관련 요소
  const getinfo = document.querySelector('.bill_wrap');
  this.getList = getinfo.querySelector('.menu_list');
  this.totalPrice = getinfo.querySelector('.price_sum');
  //자판기 관련 요소
  const vMachine = document.querySelector('.order_form_area');
  this.balance = vMachine.querySelector('#change'); //잔액
  this.itemList = vMachine.querySelector('.menu_wrap .menu_list');
  this.inputCostEl = vMachine.querySelector('#input_m'); //입금액
  this.btnPut = vMachine.querySelector('#insert_coin_btn');
  this.btnReturn = vMachine.querySelector('#change_btn');
  this.btnGet = vMachine.querySelector('.get_btn');
  this.stagedList = vMachine.querySelector('.order_wrap .menu_list');
  }
  setup(){
    this.bindEvents();
  }
  //선택한 음료 목록 생성
  stagedItemGenerator(target){
    const stagedItem = document.createElement('li');
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.img = target.dataset.img;
    stagedItem.dataset.price = target.dataset.price;
    stagedItem.innerHTML = 
    `
    <div class="obj">
        <div class="img_wrap obj_img">
            <img src="./img/${target.dataset.img}" alt="${target.dataset.item}">
        </div>
        <span class="obj_name">${target.dataset.item}</span>
        <strong class="obj_count">
          1
          <span class="a11y_hidden">개</span>
        </strong>
    </div>
    `
    this.stagedList.append(stagedItem);
  }
  //전체 이벤트
  bindEvents(){
    //1. 입금
    this.btnPut.addEventListener('click',() => {
      //사용자 입력값
      const inputCost = parseInt(this.inputCostEl.value);
      //현자 사용자의 돈'
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',',''));
      //현재 자판기 잔액
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',',''));
      if(inputCost && inputCost > 0){
        if(inputCost <= myMoneyVal){
          this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputCost) + ' 원';
          this.balance.textContent = new Intl.NumberFormat().format((balanceVal?balanceVal:0)+ inputCost) + ' 원';
          tostMessage.innerHTML = inputCost + '원이 입금 되었습니다!'
          tostOn();
        }else {
          alert('소지금이 부족합니다!🥲');
        }
        this.inputCostEl.value = null;
      }
    });

    //2. 반환
    this.btnReturn.addEventListener('click',() => {
      //현자 사용자의 돈'
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',',''));
      //현재 자판기 잔액
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',',''));
      if(balanceVal){
        this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal + balanceVal) + ' 원';
        this.balance.textContent = null;
        tostMessage.innerHTML = balanceVal + '원이 반환 되었습니다!'
        tostOn();
      }else{
        alert('반환 가능한 금액이 없습니다!');
      }
    });


    //3. 자판기 메뉴 클릭 시
    const menutBtn = this.itemList.querySelectorAll('button');
    menutBtn.forEach((obj) => {
      obj.addEventListener('click',() => {
        const balanceVal = parseInt(this.balance.textContent.replaceAll(',',''));
        const targetElPrice =  parseInt(obj.dataset.price);
        let isStaged = false;
        console.log(targetElPrice);
        const stagedListItem = this.stagedList.querySelectorAll('li');
        if(balanceVal >= targetElPrice){
          this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + ' 원';
          for (const item of stagedListItem){
            if(item.dataset.item === obj.dataset.item){
                const itemTxt = item.querySelector('strong');
                itemTxt.firstChild.textContent = parseInt(itemTxt.firstChild.textContent) + 1;
                isStaged = true;
                break;
            }
          }
          if(!isStaged){
              this.stagedItemGenerator(obj);
          }

          obj.dataset.count--;
          if(parseInt(obj.dataset.count) === 0){
            obj.disabled = true;
            obj.classList.add('soldout');
          }
          
        }else{
            alert('잔액이 부족합니다. 돈을 더 입금해 주세요💸')
        }
      });
    });
    //4. 흭득 버튼을 눌렀을 때
    this.btnGet.addEventListener('click',() => {
      const itemStagedList = this.stagedList.querySelectorAll('li');
      const itemGetList = this.getList.querySelectorAll('li');
      let totalPrice1 = 0;

      for(const itemStaged of itemStagedList){
          let isStaged = false;
          for(const itemGet of itemGetList){
              if(itemStaged.dataset.item === itemGet.dataset.item){
                  const itemTxt = itemGet.querySelector('strong');
                  const stagedTxt = itemStaged.querySelector('strong');
                  itemTxt.firstChild.textContent = parseInt(itemTxt.firstChild.textContent) + parseInt(stagedTxt.firstChild.textContent);
                  isStaged = true;
                  break;
              }
          }
          if(!isStaged){
              this.getList.append(itemStaged);
          }
      }
      this.stagedList.innerHTML = null;

      this.getList.querySelectorAll('li').forEach((itemGet) => {
        totalPrice1 += parseInt(itemGet.dataset.price) * parseInt(itemGet.querySelector('strong').firstChild.textContent);
      });
      this.totalPrice.textContent = `총 금액 : ${new Intl.NumberFormat().format(totalPrice1)} 원`;
  });
  }

}

export default VendingMachineFunc;