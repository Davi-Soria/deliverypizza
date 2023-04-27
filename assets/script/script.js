let c = (el) => document.querySelector(el);
let cs = (el) => document.querySelectorAll(el);

let pizzaItem = c('.container-model .model');
let modalQt = ''
let modalKey = 0;
let cartModal = c(".cartModal");
let cart = [];

//Descrição dos itens e colocar na tela
cartModal.addEventListener('click', uptadeCart);
pizzaJson.map((item, index) => {
    let pizzaItem = c('.container-model .model').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-img img').src = item.img;
    pizzaItem.querySelector('.pizza-name h4').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-desc').innerHTML = item.description;

    document.querySelector(".pizza-area").append(pizzaItem);

    //Evento click e Info modal
    pizzaItem.addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.model').getAttribute('data-key');
        modalQt = 1;  
        modalKey = key;  

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = pizzaJson[key].price.toFixed(2)
        c('.pizzaInfo--qt').innerHTML = modalQt
        
        c('.pizzaInfo--size.selected').classList.remove('.selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
        


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = "flex";
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 400)

    })
});
    


    

//Eventos do modal 1;

    function openModal() {
        if(modalQt > 0){
            c('.pizzaWindowArea').style.opacity = 0;
            c('.pizzaWindowArea').style.display = "flex";
            setTimeout(() => {
                c('.pizzaWindowArea').style.opacity = 1;
            }, 400)
        };
    }

    function closeModal(){
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(() => {
            c('.pizzaWindowArea').style.display = "none";
        }, 500)   
    }

    c('.pizzaInfo--cancelButton').addEventListener('click', closeModal);

    c('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if( modalQt > 1 ){
            modalQt--;
            c('.pizzaInfo--qt').innerHTML = modalQt; 
        } else if( modalQt <= 1){
            closeModal()
        }

    })

    c('.pizzaInfo--qtmais').addEventListener('click', () => {
        modalQt++;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    
    });

    cs('.pizzaInfo--size').forEach((size) => {
        size.addEventListener('click', () => {
            c('.pizzaInfo--size.selected').classList.remove('selected');
            size.classList.add('selected');
        })
    });


//Eventos do cart

c('.pizzaInfo--addButton').addEventListener('click',() =>{
    
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>item.identifier === identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    } else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt,
        });
    }


    uptadeCart()
    closeModal();
});

function uptadeCart(){
    c('.cartModal span').innerHTML = cart.length;

    if(cart.length > 0){
        c('.show').style.opacity = 0;
        c('.show').style.display = "flex"
        setTimeout(() => {
            c('.show').style.opacity = 1;
        }, 200);

        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        
        c('.cart').innerHTML = '';
        
        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;
            let cartItem = c('.cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;

            }
        

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                
                uptadeCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                uptadeCart();
            })
            


            c('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('.show').style.opacity = 1;
        c('.show').style.display = "none"
        setTimeout(() => {
            c('.show').style.opacity = 0;
        }, 200);
    }
}
 

c('.closer span').addEventListener('click', () => {
         c('.show').style.opacity = 0;
    setTimeout(() => {
        c('.show').style.display = "none";
    }, 200);
})