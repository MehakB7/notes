const chai = require("chai");
const chaihttp = require("chai-http");

const { app } = require("../server");
const expect = chai.expect;
chai.use(chaihttp);

describe("Notes testing", () => {
  it("it should get all the data ", (done) => {
    chai
      .request(app)
      .get("/notes")
      .end((err, response) => {
        console.log("response boday", response.body);
        expect(response.statusCode).to.be.eq(200);
        expect(response.body).to.be.an("object");
      });
    done();
  });
});
