var express = require("express");
var router = express.Router();
const memos = require("../memo.json");

let count = memos.length;

router.get("/", function (req, res, next) {
  console.log(memos);
  res.send(memos);
});

router.post("/", function (req, res, next) {
  const memo = req.body.data;
  count++;
  const m = {
    id: count,
    date: "2022-05-02",
    todo: memo.todo,
    meal: memo.meal,
    memo: memo.memo,
    img: memo.img,
  };
  memos.push(m);
  res.send("ok");
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const m = memos.filter((memo) => memo.id == id);
  console.log(m[0]);
  res.send(m[0]);
});

router.put("/updateform", function (req, res, next) {
  const memo = req.body.data.memo;
  console.log(memo);

  const index = memos.findIndex((m) => memo.id == m.id);
  memos[index] = memo;
  res.send("ok");
});

router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  const index = memos.findIndex((memo) => memo.id == id);

  memos.splice(index, 1);
  console.log(memos);
  res.send(memos);
});

module.exports = router;
