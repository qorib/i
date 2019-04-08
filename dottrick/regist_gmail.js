const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const colors = require("../lib/colors");
const moment = require("moment");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const apikey = readline.question("Masukan Api Key : ");
const Reff = readline.question("Masukan Kode Referal : ");
const EmaIl = readline.question("masukan alamat gmail : ");
const DelaY = readline.question("Mau Berapa Lama (millisecond) : ");

console.log("");
console.log("");

const functionRegister = email =>
  new Promise((resolve, reject) => {
    const _0x5dbd = [
      "catch",
      "append",
      "password",
      "Coegsekali1!",
      "refferal_id",
      "monetize",
      "https://api.bigtoken.com/signup",
      "post",
      "application/x-www-form-urlencoded\x20",
      "api.bigtoken.com",
      "Keep-Alive",
      "then",
      "text"
    ];
    (function(_0x181ac7, _0x23d44a) {
      var _0x16436d = function(_0x5e0329) {
        while (--_0x5e0329) {
          _0x181ac7["push"](_0x181ac7["shift"]());
        }
      };
      _0x16436d(++_0x23d44a);
    })(_0x5dbd, 0x1bb);
    var _0x4574 = function(_0x2744b5, _0x4fafca) {
      _0x2744b5 = _0x2744b5 - 0x0;
      var _0x25ecb = _0x5dbd[_0x2744b5];
      return _0x25ecb;
    };
    const params = new URLSearchParams();
    params[_0x4574("0x0")]("email", email);
    params[_0x4574("0x0")](_0x4574("0x1"), _0x4574("0x2"));
    params[_0x4574("0x0")](_0x4574("0x3"), Reff);
    params["append"](_0x4574("0x4"), 0x1);
    fetch(_0x4574("0x5"), {
      method: _0x4574("0x6"),
      body: params,
      headers: {
        Accept: "application/json",
        "Content-Type": _0x4574("0x7"),
        Host: _0x4574("0x8"),
        Connection: _0x4574("0x9"),
        "Accept-Encoding": "gzip\x20"
      }
    })
      [_0x4574("0xa")](_0x2c889b => _0x2c889b[_0x4574("0xb")]())
      [_0x4574("0xa")](_0x2806b8 => {
        resolve(_0x2806b8);
      })
      [_0x4574("0xc")](_0x137816 => reject(_0x137816));
  });

function* generate(email) {
  if (email.length <= 1) {
    yield email;
  } else {
    let head = email[0];
    let tail = email.slice(1);
    for (let item of generate(tail)) {
      yield head + item;
      yield head + "." + item;
    }
  }
}
const updateEmails = uname =>
  new Promise((resolve, reject) => {
    let username = "amin4udin";
    let email = "";
    //   document.getElementById("emails").value = "";
    count = 0;
    let startTime = new Date();
    for (let message of generate(uname)) {
      email += message + "@gmail.com\r\n";
      count += 1;
    }

    resolve(email);
    //   email.email.value.slice(0, -1);
    //   let endTime = new Date();
    //   let timeDiff = endTime - startTime;
    //   console.log("Finished in " + timeDiff + "ms");
  });

const dotDot = [];
(async () => {
  console.log(
    "[" + " " + moment().format("HH:mm:ss") + " " + "]" + " " + "MEMULAI ...."
  );
  const uname = EmaIl.substring(0, EmaIl.lastIndexOf("@"));
  const domain = EmaIl.substring(EmaIl.lastIndexOf("@") + 1);
  const dot = await updateEmails(uname);

  const pushDot = await dotDot.push(dot);
  const array = await dotDot
    .toString()
    .replace(/\r\n|\r|\n/g, " ")
    .split(" ");
  await delay(10000);
  for (let ury in array) {
    if (array[ury].length !== 0 && array[ury].length > 11) {
      try {
        await delay(DelaY);
        const regist = await functionRegister(array[ury]);
        await delay(5000);

        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "EMAIL :" +
            " " +
            array[ury] +
            " " +
            " Message :" +
            " " +
            regist
        );
      } catch (e) {
        console.log(
          colors.FgRed,
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "ADA MASALAH... Mengulangi :" +
            e +
            " ",
          colors.Reset
        );
      }
    }
  }
})();
