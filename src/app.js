import react from 'react '
import reactDom from "reactDom"
import 'antd/dist/antd.css'; 
import "./css/common.css"
import Layer from "./components/layer";
import { DatePicker } from 'antd';
const App = function(){
    var layer = new Layer();
    var app = document.getElementById("app");
    app.innerHTML = layer.tpl({name:45454})
    
}
reactDom.render(
    <DatePicker/>,
    document.getElementById("app")
)