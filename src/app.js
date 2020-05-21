import "./css/common.css"
import Layer from "./components/layer";
const App = ()=>{
    window.onload=function() {
        let dom = document.getElementById('app');
        let layer = new Layer();
        dom.innerHTML = layer.tpl({name:4545})
    }
}
new App()