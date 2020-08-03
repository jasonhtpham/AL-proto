$(document).ready(function() {
    console.log('Document ready')

    //bind submit button
    $('#submitBtn').click(function() {
        var id = $('#id').val()
        var firstName = $('#firstname').val()
        var lastName = $('#lastname').val()

        // pack the information to be sent in one packet
        info = {
            id,
            firstName,
            lastName
        }

        // return result
        // make a GET request to the server
        // including `info` as query information
        // if server send something back, past it into the function as `data`
        $.get("/result", info, function(data) {
            // format the JSON data sent from server
            let dataString = JSON.stringify(data);

            // console.log(`Data:  ${dataString}`);
            $('#result').html(dataString)
        })
    })

    // Test button
    $('#testBtn').click(function() {
        $.get("/test", function(data) {
            // format the JSON data sent from server
            let dataString = JSON.stringify(data);

            // console.log(`Data:  ${dataString}`);
            $('#result').html(dataString)
        })
    })
})