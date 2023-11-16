function Car(obj) {
    this.id = obj.id;
    this.model_name = obj.model;
    this.serial_number = obj.serial_number;
}

Car.prototype = {
    constructor: Car,
    print: function(){
        console.log(this.to_string());
    },
    to_string: function() {
        return "Id: " + this.id + ", serial_number: " + this.serial_number + ", name: " + this.model_name;
    },
    to_table_entry: function() {
        return '<tr><td>' + 
        this.id + '</td><td>' + 
        this.serial_number + '</td><td>' + 
        this.model_name + '</td></tr>'
    }
}