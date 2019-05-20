import * as tf from "@tensorflow/tfjs"
import categories from "../category_names.json"


export const init = async () => {
    const model = await tf.loadGraphModel("https://s3-eu-west-1.amazonaws.com/ai-data-storage/serve/model51205/model.json")
    const warmupResult = model.predict(tf.zeros([1, 224, 224, 3]));
    await warmupResult.data();
    warmupResult.dispose();
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
    const response = outputdata[0].map((val, i) => ({ Breed: categories[i], Probability: val, index: i }))
    const sorted_response = response.sort((a, b) => b.Probability - a.Probability)
    return sorted_response
}





