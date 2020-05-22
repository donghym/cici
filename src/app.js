import "./css/common.css"
import Layer from "./components/layer";
const App = function(){
    var layer = new Layer();
    var app = document.getElementById("app");
    app.innerHTML = layer.tpl({name:45454})
    
}
new App()