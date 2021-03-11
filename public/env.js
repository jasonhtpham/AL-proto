$(document).ready(function() {
    console.log('Document ready')

    //bind submit button
    $('#submitBtn').click(function() {
        var unitCode = $('#unitCode').val()
        var unitName = $('#unitName').val()
        var numberGrade = $('#numberGrade').val()
        var letterGrade = $('#letterGrade').val()

        // pack the information to be sent in one packet
        info = {
            unitCode,
            unitName,
            numberGrade,
            letterGrade,
        }

        // return result
        // make a GET request to the server
        // including `info` as query information
        // if server send something back, past it into the function as `data`
        $.get("/result", info, function(data) {
            alert(data);
        })
    })

    // Test button
    $('#testBtn').click(function() {
        $.get("/test", function(data) {

            console.log({data})
            $('#result').html(data)
        })
    })

    // Search button
    $('#searchBtn').click(function() {
        var unitCode = $('#unitCodeSearch').val()

        // pack the information to be sent in one packet
        info = {
            unitCode,
        }

        $.get("/search", info, function(data) {
            console.log({data})
            $('#searchResult').html(data)
        })
    })
})