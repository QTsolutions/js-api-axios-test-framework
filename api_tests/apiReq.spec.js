const { expect } = require("chai");
const UtilitiesFunction = require("../utilities/UtilitiesFunction");
const propertiesReader = require("properties-reader");
const property = propertiesReader("config/config.properties");
const assertionData = require("../utilities/assertion.json");
const data = require("../utilities/payload.json");

describe("API requests", () => {
  let utilityFunction;
  before(async () => {
    utilityFunction = new UtilitiesFunction();
  });

  it("@test get API request", async () => {
    const resGet = await utilityFunction.getRequest(
      property.get("getEndpoint")
    );
    console.log("get request response ", await resGet.data);
    //to validate the response code
    expect(resGet.status).equal(200);

    //to validate total has to be 12 (as per response)
    expect(resGet.data.total).to.equal(12);

    //to validate data array should not be empty
    expect(resGet.data.data).to.not.be.empty;

    //to validate array[0] response
    expect(resGet.data.data[0]).to.deep.include(assertionData.dataZero);

    //validate to check array[0] should be an object
    expect(resGet.data.data[0]).to.be.an("object");

    //validate to check array[0].id should be an number
    expect(resGet.data.data[0].id).to.be.an("number");

    //validate to check array should include keys
    expect(resGet.data).to.include.keys(assertionData.expectedKeys);

    expect(resGet.data.data[0]).to.include.keys(assertionData.innerArray);

    for (let ele of resGet.data.data) {
      console.log("print the ele", await ele);
      expect(ele).to.include.keys(assertionData.innerArray);
    }
  });

  it("@test post API request", async () => {
    const resPost = await utilityFunction.postRequest(
      property.get("postEndpoint")
    );
    console.log("post request response ", await resPost.data);

    expect(resPost.status).equal(201);
    expect(resPost.data.name).to.equal(data.postPayload.name);
    expect(resPost.data.job).to.equal(data.postPayload.job);
  });

  it("put API request", async () => {
    const resPut = await utilityFunction.putRequest(
      property.get("putEndpoint")
    );
    console.log("put request response ", await resPut.data);

    expect(resPut.status).equal(200);
    expect(resPut.data.name).to.equal(data.putPayload.name);
    expect(resPut.data.job).to.equal(data.putPayload.job);
  });

  it("patch API request", async () => {
    const resPatch = await utilityFunction.patchRequest(
      property.get("patchEndpoint")
    );
    console.log("patch request response ", await resPatch.data);

    expect(resPatch.status).equal(200);
    expect(resPatch.data.name).to.equal(data.patchPayload.name);
    expect(resPatch.data.job).to.equal(data.patchPayload.job);
  });

  it.only("delete API request", async () => {
    const resDelete = await utilityFunction.deleteRequest(
      property.get("deleteEndpoint")
    );
    console.log("delete request response ", await resDelete.data);

    expect(resDelete.status).equal(204);
    expect(resDelete.data).to.be.empty;
  });
});
