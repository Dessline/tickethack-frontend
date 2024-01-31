document.querySelector("#search-btn").addEventListener("click", () => getTravels())

function getTravels() {
    let departure = document.querySelector("#search-departure").value
    let arrival = document.querySelector("#search-arrival").value
    let date = document.querySelector("#search-date").value
    console.log(date)
    fetch("http://localhost:3000/travels/", {
        method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure, arrival, date }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.travels.length < 1) {
            document.querySelector("#right").innerHTML = `
            <img src="./images/notfound.png">
            <p>No trip found.</p>
            `
        } else {
            document.querySelector("#right").innerHTML = ""
            for (let i = 0 ; i < data.travels.length; i ++) {
                let hour = new Date(data.travels[i].date).getHours()
                let min = new Date(data.travels[i].date).getMinutes()
                document.querySelector("#right").innerHTML += `
                <div class="trip" id=${data.travels[i]._id}>
                <div class="trip-text">
                    <div class="departure">${data.travels[i].departure}</div><span>-</span><div class="arrival">${data.travels[i].arrival}</div>
                </div>
                <div class="time">${hour}:${min}</div>
                <div class="price">${data.travels[i].price}$</div>
                <button class ="book-btn">Book</button>
            </div>
                `
            }
        }
    bookTravel()
    })
}

function bookTravel() {
    for (let i = 0 ; i < document.querySelectorAll(".book-btn").length ; i ++) {
        document.querySelectorAll(".book-btn")[i].addEventListener("click", () => {
            let travel = document.querySelectorAll(".trip")[i].id
            fetch("http://localhost:3000/carts/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ travel }),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(window.location.assign("http://127.0.0.1:5501/tickethack-frontend/myCart.html"));
        });
    };
};