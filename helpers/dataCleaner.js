const { input } = require("@tensorflow/tfjs");

const getCleanData = (rawData) => {
    const trainData = { input: [], output: [] };
    return new Promise((resolve, reject) => {
        rawData["input"].forEarch(async (input) => {
            trainData.input.push(input.title);
            const cleanOutput = await outputCleaning(rawData.output, input.id);
            const cleanOutputArray = [];
            cleanOutput.forEach((output) => {
                cleanOutputArray.push(output.tagId);
            });
            trainData.output.push(cleanOutputArray);
            if (!rawData.output.length) resolve(trainData);
        });
        resolve(trainData);
    });
    // for (i of rawData["input"]) {
    //     trainData["input"].append(i["title"]);
    //     cleanOutput = outputCleaning(rawData["output"], i["id"]);
    //     cleanOutputArray = [];
    //     for (j of cleanOutput) {
    //         cleanOutputArray.append(j["tagID"]);
    //     }
    //     trainData["output"].push(cleanOutputArray);
    //     if (rawData["output"] == []) return trainData;
    // }
    // return trainData;
};

const outputCleaning = (rawOutput, id) => {
    const metaOutput = [];
    const cleanOutput = [];
    return new Promise(() => {
        rawOutput.forEach((output) => {
            output.id === id
                ? cleanOutput.push(output)
                : metaOutput.push(output);
        });
        rawOutput = metaOutput;
        resolve(cleanOutput);
    });
};

const deletingNonTaggedNews = (data) => {
    const fullData = { input: [], output: [] };
    return new Promise((resolve, reject) => {
        for (let i = 0; i < data.input.length; i++) {
            if (data.output[i].length) {
                fullData.input.push(data.input[i]);
                fullData.output.push(data.output[i]);
            }
        }
        fullData.numClasses = fullData.output.length;
        resolve(fullData);
    });
};

// def deletingNonTaggedNews(data):
// fullData = {"input": [], "output": []}
// for i in range(len(data["input"])):
//     if len(data["output"][i]) > 0:
//         fullData["input"].append(data["input"][i])
//         fullData["output"].append(data["output"][i])
// fullData["num_classes"] = len(fullData["input"])
// return fullData


module.exports={
    
};