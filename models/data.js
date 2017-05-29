'use strict';

module.exports = function DataModel(timeString, weatherModel, nestModel) {
    var innie = {};
    innie.location = "defaultLocation";
    for(var location in nestModel.nest.structure) {
        innie.location = nestModel.nest.structure[location].name;
    }

    //TODO: shared.name doesn't seem to be set for any device.
    //09AA01AC341608V3 == Upstairs
    //09AA01AC341608UD == Ground
    //09AA01AC36160RMP == Basement


    for(var device in nestModel.nest.shared) {
        console.log(device);
        if(device == '09AA01AC36160RMP') {
            console.log("Setting Basement");
            var basement = {};
            basement.name = 'Basement';
            //Note: consider refactoring temp into namespaces and adding C as well as F.
            basement.target_temp = celsiusToFahrenheit(nestModel.nest.shared[device].target_temperature);
            basement.current_temp = celsiusToFahrenheit(nestModel.nest.shared[device].current_temperature);
            basement.humidity = nestModel.nest.device[device].current_humidity;
            basement.target_temperature_type = nestModel.nest.shared[device].target_temperature_type;
            innie.basement = basement;
            console.log(JSON.stringify(basement));
        } else if(device == '09AA01AC341608UD') {
            console.log("Setting Ground");
            var ground = {};
            ground.name = 'Ground';
            ground.target_temp = celsiusToFahrenheit(nestModel.nest.shared[device].target_temperature);
            ground.current_temp = celsiusToFahrenheit(nestModel.nest.shared[device].current_temperature);
            ground.humidity = nestModel.nest.device[device].current_humidity;
            ground.target_temperature_type = nestModel.nest.shared[device].target_temperature_type;
            innie.ground = ground;
            console.log(JSON.stringify(ground));
        } else if(device == '09AA01AC341608V3') {
            console.log("Setting Upstairs");
            var upstairs = {};
            upstairs.name = 'Upstairs';
            upstairs.target_temp = celsiusToFahrenheit(nestModel.nest.shared[device].target_temperature);
            upstairs.current_temp = celsiusToFahrenheit(nestModel.nest.shared[device].current_temperature);
            upstairs.humidity = nestModel.nest.device[device].current_humidity;
            upstairs.target_temperature_type = nestModel.nest.shared[device].target_temperature_type;
            innie.upstairs = upstairs;
            console.log(JSON.stringify(upstairs));
        } else {
            console.log('Unknown device: name=' + nestModel.nest.shared[device].name + ', id=' + nestModel.nest.shared[device]);
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
