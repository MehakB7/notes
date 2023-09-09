const chai = require("chai");
const chaihttp = require("chai-http");

const { app } = require("../server");
const { response } = require("express");
const { StatusCodes } = require("http-status-codes");
const expect = chai.expect;

chai.use(chaihttp);

before(function (done) {
  app.on("appStarted", function () {
    done();
  });
});

describe("User Testing", () => {
  const email = "testuser@gmail.com";
  const password = "Mehak@123";
  const firstName = "Test";
  const lastName = "User";

  describe("Register", () => {
    it("should register new  user", (done) => {
      chai
        .request(app)
        .post("/auth/register/")
        .send({ email, password, firstName, lastName })
        .end((err, response) => {
          if (response) {
            expect(response.statusCode).to.be.eq(201);
            console.log("resoponse", response.body);
          }
          done();
        });
    });
    it("should give 400 when not send required fields", (done) => {
      chai
        .request(app)
        .post("/auth/register/")
        .send({ password, firstName, lastName })
        .end((err, response) => {
          if (response) {
            expect(response.statusCode).to.be.eq(StatusCodes.BAD_REQUEST);
            expect(response.body.message).to.be.eq(
              "Please Provide Required Information"
            );
            console.log("resoponse", response.body);
          }
          done();
        });
    });
    it("should give error when user already registerd", (done) => {
      chai
        .request(app)
        .post("/auth/register/")
        .send({ email, password, firstName, lastName })
        .end((err, response) => {
          if (response) {
            expect(response.statusCode).to.be.eq(StatusCodes.BAD_REQUEST);
            expect(response.body.message).to.be.eq("User already registered");
            console.log("resoponse", response.body);
          }
          done();
        });
    });
  });

  describe("Login", () => {
    it("should login user", () => {});
    it("should return error if user doesn't exist", () => {});
    it("should return error if password is incorrect", () => {});
  });
});

describe("Notes testing", () => {
  let id = "";
  it("it should get all the data ", (done) => {
    chai
      .request(app)
      .get("/notes")
      .end((err, response) => {
        expect(response.statusCode).to.be.eq(200);
        expect(response.body).to.be.an("object");
      });
    done();
  });

  it("it should post new note", (done) => {
    const notes = {
      title: "Learning Mocha and chai",
      body: "I will be complete node-js by this week",
    };
    chai
      .request(app)
      .post("/notes")
      .set("email", "mehakbisht5@gmail.com")
      .send(notes)
      .end((err, response) => {
        if (response) {
          expect(response.statusCode).to.be.equal(201);
          expect(response.body).to.be.an("object");
          expect(response.body).to.have.property("id");
          id = response.body.id;
        } else {
          console.log("error", err);
        }
        done();
      });
  });

  it("it should edit old post", (done) => {
    const notes = {
      title: "Learning Mocha and chai",
      body: "it will  edit",
    };
    chai
      .request(app)
      .put(`/notes/${id}`)
      .send(notes)
      .end((err, response) => {
        if (response) {
          expect(response.statusCode).to.be.eq(StatusCodes.OK);
          expect(response.body).to.be.an("object");
          expect(response.body.updatedNote).to.have.property("title");
          expect(response.body.updatedNote).to.have.property("body");
          expect(response.body.updatedNote).to.have.property("user");
          expect(response.body.updatedNote.title).to.eq(notes.title);
          expect(response.body.updatedNote.body).to.eq(notes.body);
        } else {
          console.log("eror ", err);
        }
        done();
      });
  });

  it("it should delete any post for specific id", (done) => {
    chai
      .request(app)
      .delete(`/notes/${id}`)
      .end((err, response) => {
        if (response) {
          expect(response.status).to.be.eq(StatusCodes.OK);
        }
        done();
      });
  });

  it("it should return error when deleting wrong note", (done) => {
    chai
      .request(app)
      .delete(`/notes/${id}`)
      .end((err, response) => {
        if (response) {
          expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
          expect(response.body.message).to.be.eq("Note doesn't exist");
        }
        done();
      });
  });

  it("it should return error when editing wrong note", (done) => {
    chai
      .request(app)
      .put(`/notes/${id}`)
      .send({ title: "Hello edit" })
      .end((err, response) => {
        if (response) {
          expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
          expect(response.body.message).to.be.eq("Note not found");
        }
        done();
      });
  });
});
