const modulesContext = require.context('./', true, /\.js$/)
let API = {}
import {HOST} from "../../../config";


const chunks = modulesContext.keys().reduce((modules, key) => {
  if (key !== './index.js') {
    API = {
      ...API,
      ...modulesContext(key).default
    }
  }
  return API
}, {})
for (let key in chunks) {
  chunks[key] = HOST + chunks[key]
}
export default {
  ...chunks
}
