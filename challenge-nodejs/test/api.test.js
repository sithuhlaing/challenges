"use strict";

const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());
const { init } = require("../index");

describe("GET /", () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.statusCode).to.equal(200);
  });

  it("should fail in parsing json due to no payload", async function () {
    const options = {
      method: "POST",
      url: "/",
    };
    const data = await server.inject(options);
    expect(data.statusCode).to.equal(400);
    expect(data.result.message).to.equal("Invalid request payload input");
  });

  it("should parsing json successfully", async function () {
    const options = {
      method: "POST",
      url: "/",
      payload: JSON.stringify({
        "0": [
          { id: 10, title: "House", level: 0, children: [], parent_id: null },
        ],
        "1": [
          { id: 12, title: "Red Roof", level: 1, children: [], parent_id: 10 },
          { id: 18, title: "Blue Roof", level: 1, children: [], parent_id: 10 },
          { id: 13, title: "Wall", level: 1, children: [], parent_id: 10 },
        ],
        "2": [
          {
            id: 17,
            title: "Blue Window",
            level: 2,
            children: [],
            parent_id: 12,
          },
          { id: 16, title: "Door", level: 2, children: [], parent_id: 13 },
          {
            id: 15,
            title: "Red Window",
            level: 2,
            children: [],
            parent_id: 12,
          },
        ],
      }),
    };
    const data = await server.inject(options);
    expect(data.statusCode).to.equal(200);
    expect(data.result).to.equal({
      id: 10,
      title: "House",
      level: 0,
      children: [
        {
          id: 12,
          title: "Red Roof",
          level: 1,
          children: [
            {
              id: 17,
              title: "Blue Window",
              level: 2,
              children: [],
              parent_id: 12,
            },
            {
              id: 15,
              title: "Red Window",
              level: 2,
              children: [],
              parent_id: 12,
            },
          ],
          parent_id: 10,
        },
        {
          id: 18,
          title: "Blue Roof",
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 13,
          title: "Wall",
          level: 1,
          children: [
            {
              id: 16,
              title: "Door",
              level: 2,
              children: [],
              parent_id: 13,
            },
          ],
          parent_id: 10,
        },
      ],
      parent_id: null,
    });
  });

  it("should search repository successfully", async function () {
    const options = {
      method: "POST",
      url: "/search",
      payload: JSON.stringify({
        q: "nodejs",
        per_page: 10,
        page: 10,
      }),
    };
    const data = await server.inject(options);
    expect(data.statusCode).to.equal(200);
    expect(data.result.incomplete_results).to.equal(false);
  });
});
