import * as tf from "@tensorflow/tfjs"
import { loadGraphModel } from "@tensorflow/tfjs-converter"

const model = loadGraphModel("file:\\C:\\Users\\lleevi\\Desktop\\whatsthat.dog\\src\\models\\model51202\\model.json")
console.log(model)

export default model;