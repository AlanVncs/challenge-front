// Interfaces
interface MenuItem {name:string, url:string, children:Array<MenuItem>};
interface Product {productId:number, name:string, salesChannel:number, available: boolean, bestPriceFormated:string, bestPrice:number, quantity:number, image:string};
interface Items {item: Array<Product>};
interface Cart {cart: Items};


// Elements
const $toggleMenu    = <HTMLInputElement> document.getElementById("toggle-menu");
const $menuContainer = <HTMLDivElement> document.getElementById('menu-container');
const $cartImg       = <HTMLImageElement> document.getElementById('cart');
const $cartContent   = <HTMLDivElement> document.getElementById('cart-content');
const $cartProducts  = <HTMLDivElement> document.getElementById('cart-products');
const $cartSum       = <HTMLDivElement> document.getElementById('cart-sum');


setMenuView();



// Faz o request e exibe o conteúdo do carrinho
// esconde o carrinho se já estiver sendo exibido
$cartImg.addEventListener('click', async event => {
    event.stopPropagation();
    $toggleMenu.checked = false;
    if(toggleCartView()){
        // TODO exibir animação de loading
        const cart = await requestCartData();
        setCartView(cart);
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





// Alterna a visibilidade do conteúdo do carrinho
// Necessariamente esconde se 'flag' for true
// Retorna o estado do carrinho após a chamada: true => visível | false => escondido
function toggleCartView(flag?: boolean){
    if(flag || $cartContent.classList.contains("visible")){
        $cartContent.classList.remove("visible");
        return false;
    }
    else{
        $cartContent.classList.add("visible");
        return true;
    }
}

// Faz uma requisição e retorna o conteúdo do carrinho
async function requestCartData(): Promise<Cart>{
    return new Promise(async resolve => {
        const data = await fetch("data/products.json");
        resolve(await data.json());
    });
}

// Faz uma requisição e retorna o conteúdo do menu
async function requestMenuData(): Promise<Array<MenuItem>> {
    return new Promise(async resolve => {
        const data = await fetch("data/menu.json");
        resolve(await data.json());
    });
}





// Cria um elemento com as classes especificadas
function createElement(tagName, classArray?): Element {
    const $element = document.createElement(tagName);
    if(classArray) $element.classList.add(...classArray);
    return $element;
}

// Cria um produto
function createProductElement(product: Product): Element{
    const $product       = createElement('div', ['product']);
    const $productImg    = createElement('img', ['product-img']);
    const $productInfo   = createElement('div', ['product-info']);
    const $productName   = createElement('div', ['product-name']);
    const $productStatus = createElement('div', ['product-status']);
    const $productQtd    = createElement('div', ['product-qtd']);
    const $productPrice  = createElement('div', ['product-price']);

    $productImg.setAttribute('src', product.image);
    $productName.append(product.name);
    $productQtd.append(`Qtd.: ${product.quantity}`);
    $productPrice.append(product.bestPriceFormated);
    $productStatus.append($productQtd, $productPrice);
    $productInfo.append($productName, $productStatus);
    $product.append($productImg, $productInfo);

    return $product;
}

// Injeta as informações dos produtos na view
function setCartView({cart}: Cart){
    $cartProducts.innerHTML = '';
    let sum = 0;
    cart.item.forEach(product => {
        const $product = createProductElement(product);
        $cartProducts.appendChild($product);
        $cartProducts.appendChild(createElement('div', ['hr-line'])); // Linha entre os produtos
        sum += product.bestPrice*product.quantity;
    });
    $cartSum.innerText = `R$ ${(sum/100).toLocaleString('pt-br')}`;
}










// Cria um link (<a>) 
function createLinkElement(menuItem: MenuItem): Element {
    const $element = createElement('a');
    $element.append(menuItem.name);
    $element.setAttribute('href', menuItem.url);
    return $element;
}

// Cria um item do menu
function createMenuItemElement(menuItem: MenuItem): Element {
    const $menuItem = createElement('li');
    $menuItem.appendChild(createLinkElement(menuItem));
    if(menuItem.children && (menuItem.children.length != 0)){
        const $subMenu = createMenuElement(menuItem.children);
        $menuItem.appendChild($subMenu);
    }
    return $menuItem;
}

function createMenuElement(menu: Array<MenuItem>): Element {
    const $menu = createElement('ul');
    menu.forEach(menuItem => {
        $menu.appendChild(createMenuItemElement(menuItem));
    });
    return $menu;
}

// Injeta as informações no menu
async function setMenuView(){
    const menu = await requestMenuData();
    const $menu = createMenuElement(menu);
    $menuContainer.appendChild($menu);
}
