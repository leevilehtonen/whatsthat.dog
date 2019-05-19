import * as tf from "@tensorflow/tfjs"
import categories from "../category_names.json"


export const init = async () => {
    console.log("loading model")
    const model = await tf.loadGraphModel("https://raw.githubusercontent.com/leevilehtonen/whatsthat.dog/master/web-front/src/models/model102402/model.json")
    console.log("loaded model")
    return model;
}

export const preprocess = (canvas) => {
    const tensor = tf.browser.fromPixels(canvas)
    const resized = tf.image.resizeBilinear(tensor, [224, 224])
    const normalized = tf.div(resized, tf.scalar(255.0))
    const reshaped = tf.reshape(normalized, [-1, 224, 224, 3])
    return reshaped;
}

export const classify = (model, input) => {
    const output = model.predict(input, { batchSize: 1 })
    const outputdata = output.arraySync();
    const response = outputdata[0].map((val, i) => ({ breed: categories[i], prob: val, index: i }))
    const sorted_response = response.sort((a, b) => b.prob - a.prob)
    return sorted_response
}





