class DrinkMaker{
    constructor(){
        this.itemBox = document.querySelector('.menu_list.button_type');
    }
    async setup(){
        const respons = await this.dataLoad();
        this.maker(respons);
    }
    async dataLoad(){
        try{
            const respons = await fetch('./items.json');
            if(!respons.ok){
                throw new Error(`HTTP error status: ${respons.status}`);
            }
            return await respons.json();

        }catch(error){
            console.error(error)
        }
    }
    maker(data){
        let list = new DocumentFragment()
        data.forEach(el => {
            const liWrap = document.createElement('li');
            const liTemplate = 
            `<button type="button" class="obj" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
                <div class="img_wrap obj_img">
                    <img src="./img/${el.img}" alt=${el.name}>
                </div>
                <span class="obj_name">${el.name}</span>
                <strong class="obj_price">${el.cost}원</strong>
            </button>`
            liWrap.innerHTML = liTemplate;
            list.append(liWrap);
        });
        this.itemBox.append(list);
    }
}

export default DrinkMaker