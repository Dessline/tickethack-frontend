document.querySelector("#search-btn").addEventListener("click", () => getTravels())
document.querySelectorAll("#book-btn").addEventListener("click", () => bookTravel())


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
                //let time = moment(date).format("LT")
                document.querySelector("#right").innerHTML += `
                <div class="trip">
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
    })
}

function bookTravel() {
    
}