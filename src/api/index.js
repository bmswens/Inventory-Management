import { default as demo } from './demo'
import { default as custom } from './custom'

let outgoing = process.env.REACT_APP_ENV === "DOCKER" ? custom : demo

export default outgoing