'use strict';

module.exports = function IndexModel(timeString, weatherModel, nestModel) {
    var innie = {};
    innie.location = "defaultLocation";
    for(var location in nestModel.nest.structure) {
        innie.location = nestModel.nest.structure[location].name;
    }
    for(var device in nestModel.nest.shared) {
        console.log(nestModel.nest.shared[device].name);
        if(nestModel.nest.shared[device].name == 'Charon') {
            console.log("Setting Charon");
            var up = {};
            up.name = nestModel.nest.shared[device].name;
            //Note: consider refactoring temp into namespaces and adding C as well as F.
            up.target_temp = celsiusToFahrenheit(nestModel.nest.shared[device].target_temperature);
            up.current_temp = celsiusToFahrenheit(nestModel.nest.shared[device].current_temperature);
            up.humidity = nestModel.nest.device[device].current_humidity;
            innie.up = up;
        } else if(nestModel.nest.shared[device].name == 'Pluto') {
            console.log("Setting Pluto");
            var down = {};
            down.name = nestModel.nest.shared[device].name;
            down.target_temp = celsiusToFahrenheit(nestModel.nest.shared[device].target_temperature);
            down.current_temp = celsiusToFahrenheit(nestModel.nest.shared[device].current_temperature);
            down.humidity = nestModel.nest.device[device].current_humidity;
            innie.down = down;
            console.log(JSON.stringify(down));
        } else {
            console.log('Unknown device: ' + nestModel.nest.shared[device].name);
        }
    }
    return {
        name: 'index',
        time: timeString,
        in: innie,
        out: weatherModel
    };
};

function celsiusToFahrenheit(temp) {
    return Math.round(temp * (9 / 5.0) + 32.0);
}
