import { Model } from "./src/model/Model.js";
import { View } from "./src/view/View.js";
import { Controller } from "./src/controller/Controller.js";

window.addEventListener("load", () => {

    fetch("./js/data.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            let model = new Model(jsondata);
            let view = new View();
            let controller = new Controller(model, view);
            controller.run();
        });

});
