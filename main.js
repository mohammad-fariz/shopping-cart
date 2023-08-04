let shop = document.getElementById("shop");

let shopItemsData = [
	{
		id: "gahgs",
		name: "Office Shirt",
		price: 45,
		desc: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
		img: "images/imagess.jpg",
	},
	{
		id: "giufjdkyheikyfu",
		name: "Casual T-Shirt",
		price: 76,
		desc: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
		img: "images/img.jpg",
	},
	{
		id: "hdikloeqhfoi",
		name: "Formal Shirt",
		price: 93,
		desc: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
		img: "images/mohamad-khosravi-4fkUAduhoSY-unsplash.jpg",
	},
	{
		id: "gpiorugjpu",
		name: "Shirt",
		price: 100,
		desc: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
		img: "images/viktor-nikolaienko-EU-xyudgHPc-unsplash(1).jpg",
	},
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
	return (shop.innerHTML = shopItemsData
		.map((x) => {
			let { id, name, price, desc, img } = x;
			let search = basket.find((x) => x.id === id) || [];
			return `
    <div id=product-id-${id} class="item">
    <div class="image-container">
    <img src="${img}" alt="">
    </div>

    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus"></i>
            </div>
        </div>
    </div>
</div>
    `;
		})
		.join(""));
};

generateShop();

let increment = (id) => {
	// console.log("clicked");
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem.id);
	if (search === undefined) {
		basket.push({
			id: selectedItem.id,
			item: 1,
		});
	} else {
		search.item += 1;
	}

	console.log("tre", basket);
	update(selectedItem.id);
	localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem.id);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}
	update(selectedItem.id);
	basket = basket.filter((x) => x.item !== 0);
	//console.log(basket);

	localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
	let search = basket.find((x) => x.id === id);

	document.getElementById(id).innerHTML = search.item;
	calculations();
};

let calculations = () => {
	let cartIcon = document.getElementById("cartAmount");
	cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculations();
