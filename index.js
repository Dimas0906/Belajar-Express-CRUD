"use strict";

const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// data
let linuxs = [
  {
    name: "Mulia",
    os: "kali",
  },
  {
    name: "Dimas",
    os: "elementary",
  },
  {
    name: "Yusril",
    os: "mint",
  },
];

// Dari ID
app.get("/status", (req, res) => {
  res.status(200).send(linuxs);
});

app.post("/status", (req, res) => {
  const { nama, os } = req.body;

  const dataBaru = {
    id: linuxs.length + 1,
    name: nama,
    os: os,
  };
  linuxs.push(dataBaru);
  res.status(201).send(dataBaru);
});

// dari Index
app.get("/linuxs", (req, res) => {
  res.status(200).send(linuxs);
});

app.post("/linuxs", (req, res) => {
  const newData = req.body;
  linuxs.push(newData);
  res.status(201).send(newData);
});

app.delete("/linuxs/:index", (req, res) => {
  const id = req.params.index;

  const whichData = linuxs.findIndex((idx) => idx === Number(id));

  linuxs.splice(whichData, 1);

  res.status(200).send({ msg: "Anda sudah menghapus data" });
});

app.put("/linuxs/:id", (req, res) => {
  const id = req.params.id;
  const { nama, os } = req.body;

  const newUpdate = {
    name: nama,
    os: os,
  };

  linuxs = linuxs.map((item, idx) => {
    if (idx === Number(id)) {
      return newUpdate;
    }
    return item;
  });
  res.status(201).send(newUpdate);
});

app.patch("/linuxs/:id", (req, res) => {
  const id = req.params.id;
  const { os } = req.body;

  linuxs = linuxs.map((item, idx) => {
    if (idx === Number(id)) {
      return { ...item, os: os };
    }
    return item;
  });
  res.status(201).send({ msg: "Berhasil YEEEEE" });
});

app.listen(port, () => {
  console.log(`Server sedang berjalan di localhost:${port}`);
});
