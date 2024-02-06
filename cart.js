fetch('http://localhost:3000/carts')
	.then(response => response.json())
	.then(data => {
        console.log(data.result);
		if (data.result) {
            let total = 0;
            for (let i =0; i < data.cart.length; i++) {
            document.querySelector('#cart').innerHTML += `<div class="cart-trip" id=${data.cart[i].travel._id}>
               <p>${data.cart[i].travel.departure} > ${data.cart[i].travel.arrival}</p>
               </br>
               <p>${new Date(data.cart[i].travel.date).getHours()}:${new Date(data.cart[i].travel.date).getMinutes()}</p>
                </br>
                <p>${data.cart[i].travel.price}</p>
                </br>
                <button class="delete-btn">X</button>
            </div>
            </br>`
              total += data.cart[i].travel.price;
            } 
        document.querySelector('#total').textContent = String(total);
        updateDeleteCartEventListener();
        } else {
            document.querySelector('#body-container').innerHTML = `<div id="empty-cart-container">
            <div id="cart-message">
                <h4>No trip in your cart.</h4></br>
                <h4>Why not plan a trip ?</h4>
            </div>
        </div>`
        }
        return data;
	}).then(data => console.log(data));

  function updateDeleteCartEventListener() {

  for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
    let travel = document.querySelectorAll(".cart-trip")[i].id;
		document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
      fetch('http://localhost:3000/carts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({travel})
      })
				.then(response => response.json())
				.then(data => {
          this.parentNode.remove();
          document.querySelector('#total').textContent -= data.deletedTravel.travel.price;
          console.log(data);
        }).then(data => {
          if(document.querySelectorAll(".cart-trip").length === 0) {
            document.querySelector('#body-container').innerHTML = `<div id="empty-cart-container">
          <div id="cart-message">
              <h4>No trip in your cart.</h4></br>
              <h4>Why not plan a trip ?</h4>
          </div>
      </div>`
          };
        }
        ).then();
    })
}
}

function updateDeleteAllCartEventListener() {

  /*for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {}
    let travel = document.querySelectorAll(".cart-trip")[i].id; */


		document.querySelector('#purchase-btn').addEventListener('click', function () {
      fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({travel})
      })
				.then(response => response.json())
				.then(data => {
          this.parentNode.remove();
          console.log(data);
        }).then()
    })

}




