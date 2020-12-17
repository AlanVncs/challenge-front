// Elements
const $menuContainer = document.getElementById('menu-container');
const $cartImg = document.getElementById('cart');
const $cartContent = document.getElementById('cart-content');
const $cartProducts = document.getElementById('cart-products');
const $cartSum = document.getElementById('cart-sum');


setMenuView();



// Faz o request e exibe o conteúdo do carrinho
// esconde o carrinho se já estiver sendo exibido
$cartImg.addEventListener('click', async event => {
    event.stopPropagation();
    if(toggleCartView()){
        // TODO exibir animação de loading
        const cartData = await requestCartData();
        setCartView(cartData);
    }
});

// Clicar na página (fora do carrinho), esconde o conteúdo
// do carrinho
document.addEventListener('click', event => {
    toggleCartView(true);
});

// Evita que um clique no conteúdo do carrinho seja entendido
// como um clique na página
$cartContent.addEventListener('click', event => {
    event.stopPropagation();
});





// Alterna a visibilidade do conteúdo do carrinho ou apenas esconde se 'flag' for true
// Retorna o estado do carrinho após a chamada: true => visível | false => escondido
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
async function requestCartData(): Promise<any>{
    return new Promise(async resolve => {
        const data = await fetch("data/products.json");
        resolve(await data.json());
    });
}

// Faz uma requisição e retorna o conteúdo do menu
async function requestMenuData(): Promise<any> {
    return new Promise(async resolve => {
        const data = await fetch("data/menu.json");
        resolve(await data.json());
    });
}





// Cria um elemento com as classes especificadas
function createElement(tagName, classArray=[]): Element {
    const $element = document.createElement(tagName);
    $element.classList.add(...classArray);
    return $element;
}

// Cria um produto
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

// Injeta as informações dos produtos na view
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










// Cria um link (<a>) 
function createLinkElement(text:string, url:string): Element{
    const $element = createElement('a');
    $element.append(text);
    $element.setAttribute('href', url);
    return $element;
}

// Cria um item do menu
function createMenuItemElement({name, url, children}): Element{

    const $menuItem = createElement('li');
    $menuItem.appendChild(createLinkElement(name, url));
    // TODO Adicionar filhos (recursão)

    return $menuItem;
}

// Injeta as informações no menu
async function setMenuView(){
    const $menu = createElement('ul');

    const {menu} = await requestMenuData();
    menu.forEach(menuItem => {
        $menu.appendChild(createMenuItemElement(menuItem));
    });

    $menuContainer.appendChild($menu);
}
