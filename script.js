var ydb_url = 'https://functions.yandexcloud.net/d4e6v92utnhv67ict4rd'

function preconvert_json(string) {
    let json = string.split('\'').join("\"");
    return json.split('b\"').join("\"");
}

function receive_update_car_list()
{
    $.ajax({
        url: ydb_url,
        method: 'GET',
        data: {
            "data": "automobile_list"
        },
        success: function(data){ 
            console.log(preconvert_json(data))
            console.log(JSON.parse(preconvert_json(data)))
            $("#car_table").show();
            $('#search_button').show();
            update_car_list(data)    
        }
    }).fail(function(data){
        output_error("GET request failed");
    })
}

function update_car_list(data) 
{
    $("#car_table td").parent().remove();
    let received_cars = JSON.parse(preconvert_json(data));
    if(received_cars.length > 0)
    {
        for(let i = 0; i < received_cars.length; ++i) {
            let car = new Car(received_cars[i]);
            $('#car_table tr:last').after(car.to_table_entry());
        }
        $("#car_table").show();
    } else {
        $('.error_message').show();
    }
}

function create_new_car(model, number)
{
    $.ajax({
        url: ydb_url + '?number=' + number,
        crossDomain: true,
        method: 'post',
        dataType: "json",
      }).done(function(response) {
            console.log(response);
            receive_update_car_list()
      });
}

function update_model_selection()
{
    $.ajax({
        url: ydb_url,
        method: 'GET',
        data: {
            "data": "model_list"
        },
        success: function (data) {
            console.log(preconvert_json(data))
            let namearray = JSON.parse(preconvert_json(data));
            console.log(namearray)
            for (let i = 0; i < namearray.length; ++i) {
                $('#car_model_select').append($('<option>', {
                    value: namearray[i].name,
                    text: namearray[i].name
                }));
            }
        }
    }).fail(function (data) {
        output_error("GET models request failed");
    })
}

function output_error(message, timeout = 2000) 
{
    $('.error_message').show();
    $('.error_message').text(message);
    setTimeout(function() {
        $('.error_message').hide();
    }, timeout);
}