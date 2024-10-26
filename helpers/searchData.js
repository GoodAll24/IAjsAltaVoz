const axios = require("axios");
const listaTags = require("./tags");

const getInputData = async (url) => {
  // input data
  const inputData = { data: [] };
  const newsAdders = "/api/news-adders";
  const pagination = "pagination[pageSize]=100";
  const forPagination = "pagination[page]=";
  const newsAddersFilters =
    "filters[$and][0][state][$ne]=pendiente&filters[$and][1][state][$ne]=oculta";
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`${url}${newsAdders}?${pagination}&${newsAddersFilters}`)
      .then(async (response) => {
        // getting metadata
        inputData.metaData = {
          total: response.data.pagination.total,
          pages: response.data.pagination.pageCount,
        };
        // console.log(metaData);

        // getting the input data
        for (let i = 0; i < inputData.metaData.pages + 1; i++) {
          await axios
            .get(
              `${url}${newsAdders}?${pagination}&${newsAddersFilters}&${forPagination}${i}`,
            )
            .then((inputRes) => {
              inputRes.data.data.forEach((input) =>
                inputData.data.push({
                  title: input.title,
                  id: input.id,
                }),
              );
            })
            .catch((e) => {
              console.log(e);
              reject(e);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    resolve(inputData);
  });
};

const getOutputData = async (url) => {
  const tags = "/api/tags";
  const pagination = "pagination[pageSize]=100";
  const tagFilters = "filters[entity_type]=news-adder";
  const forPagination = "pagination[page]=";
  const outputData = { data: [] };

  await axios
    .get(`${url}${tags}?${pagination}&${tagFilters}`)
    .then(async (response) => {
      // getting metadata
      console.log(response.data);
      outputData.metaData = {
        total: response.data.pagination.total,
        pages: response.data.pagination.pageCount,
      };
      console.log(outputData.metaData);

      // getting the output data
      for (let i = 0; i < outputData.metaData.pages + 1; i++) {
        await axios
          .get(`${url}${tags}?${pagination}&${tagFilters}&${forPagination}${i}`)
          .then((outputRes) => {
            console.log(outputRes);
            outputRes.data.results.forEach((output) => {
              const tagId = listaTags.findIndex(output.name);
              outputData.data.push({
                name: output.name,
                newId: output.entity_id,
                tagId,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // console.log(outputData.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return outputData;
};

module.exports = { getInputData, getOutputData };
