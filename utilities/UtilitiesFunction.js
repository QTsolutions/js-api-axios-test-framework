const axios = require("axios");
const propertiesReader = require("properties-reader");
const property = propertiesReader("config/config.properties");
const data = require("../utilities/payload.json");

class UtilitiesFunction {
  async getRequest(endpointGet) {
    return await axios.get(property.get("baseUri") + endpointGet);
  }

  async postRequest(endpointPost) {
    return await axios.post(
      property.get("baseUri") + endpointPost,
      data.postPayload
    );
  }

  async putRequest(endpointPut) {
    return await axios.put(
      property.get("baseUri") + endpointPut,
      data.putPayload
    );
  }

  async patchRequest(endpointPatch) {
    return await axios.patch(
      property.get("baseUri") + endpointPatch,
      data.patchPayload
    );
  }

  async deleteRequest(endpointDelete) {
    return await axios.delete(property.get("baseUri") + endpointDelete);
  }
}

module.exports = UtilitiesFunction;
