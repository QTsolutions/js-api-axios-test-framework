const { expect } = require("chai");
const UtilitiesFunction = require("../utilities/UtilitiesFunction");
const propertiesReader = require("properties-reader");
const property = propertiesReader("config/config.properties");

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

    expect(resGet.status).equal(200);
  });

  it("@test post API request", async () => {
    const resPost = await utilityFunction.postRequest(
      property.get("postEndpoint")
    );
    console.log("post request response ", await resPost.data);

    expect(resPost.status).equal(201);
  });

  it("put API request", async () => {
    const resPut = await utilityFunction.putRequest(
      property.get("putEndpoint")
    );
    console.log("put request response ", await resPut.data);

    expect(resPut.status).equal(200);
  });

  it("patch API request", async () => {
    const resPatch = await utilityFunction.patchRequest(
      property.get("patchEndpoint")
    );
    console.log("patch request response ", await resPatch.data);

    expect(resPatch.status).equal(200);
  });

  it("delete API request", async () => {
    const resDelete = await utilityFunction.deleteRequest(
      property.get("deleteEndpoint")
    );
    console.log("delete request response ", await resDelete.data);

    expect(resDelete.status).equal(204);
  });
});
