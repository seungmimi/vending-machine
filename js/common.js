//토스트메시지 함수
// let tostMessage = document.getElementById('tost_message');
// function tostOn(){
//     tostMessage.classList.add('active');
//     setTimeout(function(){
//         tostMessage.classList.remove('active');
//     },1000);
// }

// let insertCoinForm = document.getElementById('input_m');
// let insertCoinBtn = document.getElementById('insert_coin_btn');
// let changeBtn = document.getElementById('change_btn');
// let changeForm = document.getElementById('change');
// let insertCoin = 0
// let change = 0;
// let wallet = document.getElementById('wallet');
// let walletCoin = 25000;

//입금 버튼
// insertCoinBtn.addEventListener('click',function(){
//     if(insertCoinForm.value == 0){
//         alert('입금하실 금액을 입력해 주세요!');
//     }else if(insertCoinForm.value > walletCoin){
//         alert('소지금이 부족합니다!');
//     }else{
//         //1. 입금을 하면 잔액에 + 
//         let insertCoin = insertCoinForm.value;
//         change = Number(insertCoin) + Number(change);
//         changeForm.innerHTML = change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '<span class="unit">원</span>';
//         tostMessage.innerHTML = insertCoin + '원이 입금 되었습니다!'
//         insertCoinForm.value = null;
//         tostOn();
//         //소지금 - 처리
//         walletCoin = walletCoin - insertCoin;
//         wallet.innerHTML = walletCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '<span class="unit">원</span>'
//     }
// });

//반환 버튼
// changeBtn.addEventListener('click',function(){
//     if(changeForm.innerText == '0원'){
//         alert('반환 가능한 금액이 없습니다!');
//     }else{
//         walletCoin = walletCoin + change;
//         wallet.innerHTML = walletCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '<span class="unit">원</span>'
//         tostMessage.innerHTML = change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원이 반환 되었습니다!'
//         tostOn();
//         //소지금 + 처리
//         change = 0;
//         changeForm.innerHTML = change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '<span class="unit">원</span>';
//     }
// });