getBookings()

function getBookings () {
    fetch("http://localhost:3000/bookings")
    .then(response => response.json())
    .then(data => {
        document.querySelector("#body-container").innerHTML = `
        <div id="full-bookings-container">
            <div id="bookings">
                <div id="bookings-title">My bookings</div>
                <div id="bookings-trip"></div>
            </div>
            <div id="enjoy-section">
                <span id="enjoy">Enjoy your travel with Tickethack!</span>
            </div>
        </div>
        `
        for (let i = 0 ; i < data.bookings.length ; i ++) {
            var timestampActuel = moment()
            var timestampCible = moment(data.bookings[i].travel.date)
            var difference = timestampCible.diff(timestampActuel)
            var dureeRestante = moment.duration(difference)
            var time = dureeRestante.hours()
            if (time < 0) {
                time = "oups..."
            }
            //let time = moment(data.bookings[i].travel.date).fromNow();   
            document.querySelector("#bookings-trip").innerHTML += `
                <div class="trip">
                    <div class="trip-text">
                        <div>${data.bookings[i].travel.departure}</div>
                        <div> - </div>
                        <div>${data.bookings[i].travel.arrival}</div>
                    </div>
                    <div>${data.bookings[i].travel.price}$</div>
                    <div>Departure in ${time}</div>
                </div>
            `
        }
    })
}

getBookings()
