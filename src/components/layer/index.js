import tpl from "./index.tpl"
import "./index.less"
import {logBeforeFn,readonly} from "../decorators/common"

@logBeforeFn
class layer {
    @readonly changename = "readonly"
    constructor() {
        this.name="layer",
        this.tpl=tpl
    }
}
export default layer