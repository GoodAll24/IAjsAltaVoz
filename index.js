const tf = require("@tensorflow/tfjs-node");
const natural = require("natural");
const axios = require("axios");
const { getInputData, getOutputData } = require("./helpers/searchData");

const main = async () => {
  // // Input data
  // const inputTexts = [
  //   'Boza, cantante panameño presenta "Orion" en Lima (Video)',
  //   'Quevedo lo sigue petando hasta retirado: está en el TOP 20 de artistas españoles más escuchados en el mundo este año',
  //   'Hermanos Ríos pondrán su sabor al 'beis' de La Laguna'
  // ];

  // // Output data
  // const outputData = [[40], [1, 20], [38, 2]];

  // URLs
  const url = "https://srv585271.hstgr.cloud";
  // const newsAdders = "/api/news-adders";
  // const tags = "/api/tags";
  // const pagination = "pagination[pageSize]=100";
  // const tagQueries = "filters[entity_type]=news-adder";
  // const forPagination = "pagination[page]=";
  // const newsAddersFilters =
  //   "filters[$and][0][state][$ne]=pendiente&filters[$and][1][state][$ne]=oculta";
  // Declaring input and output data

  const inputData = await getInputData(url);
  const outputData = await getOutputData(url);

  console.log(inputData.data[0]);
  console.log(outputData.data[0]);

  // // Tokenize and pad sequences
  // const tokenizer = new natural.WordTokenizer();
  // const vocab = new Set(inputTexts.flatMap((text) => tokenizer.tokenize(text)));
  // const vocabSize = vocab.size;
  // const maxLen = Math.max(
  //   ...inputTexts.map((text) => tokenizer.tokenize(text).length),
  // );

  // const textToSequence = (text) => {
  //   const tokens = tokenizer.tokenize(text);
  //   return tokens.map((token) => Array.from(vocab).indexOf(token) + 1);
  // };

  // const paddedSequences = inputTexts.map((text) => {
  //   const sequence = textToSequence(text);
  //   return tf.tensor2d([
  //     sequence.concat(Array(maxLen - sequence.length).fill(0)),
  //   ]);
  // });

  // // Prepare input tensor
  // const inputTensor = tf.concat(paddedSequences);

  // // Prepare output tensor
  // const outputTensor = tf.tensor2d(outputData);

  // // Define the model
  // const model = tf.sequential();
  // model.add(
  //   tf.layers.embedding({
  //     inputDim: vocabSize + 1,
  //     outputDim: 16,
  //     inputLength: maxLen,
  //   }),
  // );
  // model.add(tf.layers.flatten());
  // model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  // model.add(tf.layers.dense({ units: outputData[0].length }));

  // // Compile the model
  // model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  // // Train the model
  // (async () => {
  //   await model.fit(inputTensor, outputTensor, {
  //     epochs: 100,
  //     callbacks: {
  //       onEpochEnd: (epoch, logs) => {
  //         console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}`);
  //       },
  //     },
  //   });

  //   // Make predictions
  //   for (let i = 0; i < inputTexts.length; i++) {
  //     const input = tf.tensor2d([
  //       textToSequence(inputTexts[i]).concat(
  //         Array(maxLen - textToSequence(inputTexts[i]).length).fill(0),
  //       ),
  //     ]);
  //     const prediction = model.predict(input);
  //     console.log(`Input: "${inputTexts[i]}"`);
  //     console.log(`Actual output: [${outputData[i]}]`);
  //     console.log(
  //       `Predicted output: [${prediction.dataSync().map((v) => v.toFixed(2))}]`,
  //     );
  //     console.log("---");
  //   }
  // })();
};

main();
