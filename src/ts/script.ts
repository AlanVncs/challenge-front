// Elements
const $cartImg = document.getElementById('cart');
const $cartContent = document.getElementById('cart-content');
const $cartProducts = document.getElementById('cart-products');
const $cartSum = document.getElementById('cart-sum');



// Configura os eventos que exibem e escondem o conteúdo do carrinho
$cartImg.addEventListener('click', async event => {
    event.stopPropagation();
    if(toggleCartView()){
        // TODO exibir animação de loading
        const cartData = await requestCartData();
        setCartView(cartData);
        // Não é uma boa solução fazer um request sempre que usuário quiser ver o carrinho
        // Aqui foi aberto uma exceção para que haja uma maneira de testar o request
    }
});

$cartContent.addEventListener('click', event => {
    event.stopPropagation();
});

document.addEventListener('click', event => {
    toggleCartView(true);
});
//-------------------------------------------------------------------


// Alterna a visibilidade do conteúdo do carrinho ou apenas esconde se 'flag' for true
// Retorna o estado do carrinho após a chamada: true => Visível | false => escondido
function toggleCartView(flag?: boolean){
    if(flag){
        $cartContent.style.display = 'none';
        return false;
    }
    else{
        if(!$cartContent.style.display || $cartContent.style.display == 'none'){    
            $cartContent.style.display = 'inline-block';
            return true;
        }
        else{
            $cartContent.style.display = 'none';    
            return false;
        }
    }
}

// Faz uma requisição e retorna o conteúdo do carrinho
async function requestCartData(){
    return new Promise(async resolve => {
        const data = await fetch("data/products.json");
        resolve(await data.json());
    });
}

// Cria um elemento com as classes especificadas
function createElement(tagName, classArray): Element {
    const $element = document.createElement(tagName);
    $element.classList.add(...classArray);
    return $element;
}

// Cria um produto e insere as informações
function createProductElement({name, bestPriceFormated, quantity, image}){
    const $product       = createElement('div', ['product']);
    const $productImg    = createElement('img', ['product-img']);
    const $productInfo   = createElement('div', ['product-info']);
    const $productName   = createElement('div', ['product-name']);
    const $productStatus = createElement('div', ['product-status']);
    const $productQtd    = createElement('div', ['product-qtd']);
    const $productPrice  = createElement('div', ['product-price']);

    $productImg.setAttribute('src', image);
    $productName.append(name);
    $productQtd.append(`Qtd.: ${quantity}`);
    $productPrice.append(bestPriceFormated);
    $productStatus.append($productQtd, $productPrice);
    $productInfo.append($productName, $productStatus);
    $product.append($productImg, $productInfo);

    return $product;
}

// Injeta as informações dos produtos
function setCartView(cartData){
    $cartProducts.innerHTML = '';
    let sum = 0;
    cartData.cart.item.forEach(product => {
        const $product = createProductElement(product);
        $cartProducts.appendChild($product);
        $cartProducts.appendChild(createElement('div', ['hr-line'])); // Linha entre os produtos
        sum += product.bestPrice*product.quantity;
    });
    $cartSum.innerText = `R$ ${(sum/100).toLocaleString('pt-br')}`;
}

