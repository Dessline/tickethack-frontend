fetch('http://localhost:3000/carts')
	.then(response => response.json())
	.then(data => {
        console.log(data);
		//if (data.cart.length > 0) {
            for (let i =0; i < data.cart.length; i++) {
            document.querySelector('#cart').innerHTML += `<div class="cart-trip">
            <p>${data.cart[i].travel.departure} > ${data.cart[i].travel.arrival}</p>
            </br>
            <p>${new Date(data.cart[i].travel.date).getHours()}:${new Date(data.cart[i].travel.date).getMinutes()}</p>
            </br>
            <p>${data.cart[i].travel.price}</p>
            </br>
            <button class="delete-btn">X</button>
        </div>
        </br>`
        }
      //  } else {
      //      document.querySelector('#cart').innerHTML += `<p>Error</p>`
      //  }
	});