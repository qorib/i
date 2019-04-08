const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const fs = require("async-file");
const { URLSearchParams } = require("url");
const moment = require("moment");
const rp = require("request-promise");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const apikey = readline.question("Masukan Api Key : ");
const Reff = readline.question("Masukan Kode Referal : ");
const LooP = readline.question("Mau Berapa Banyak ? ");
const DelaY = readline.question(
  "Mau Berapa Lama (millisecond), semakin lama semakin besar peluang langsung verifikasi : "
);
const choice = readline.question(
  "mau pakai domain dari script atau dari file (y/n) ?, jika y dari script jika n dari file : "
);

let file = "";

if (choice === "n") {
  file += readline.question("Masukan nama file letak domain berada : ");
}

console.log("");
console.log("");

const functionRegister = (email, domain) =>
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

const functionCreateEmail = (email, domain) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/create-email?uname=${email}&domain=${domain}`,
      {
        method: "post",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => resolve(res))
      .catch(err =>
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada masalah sssSssstt..."
        )
      );
  });

const timeoutPromise = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, time);
  });
};

const functionGetMessages = (email, domain) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/message?uname=${email}&domain=${domain}`,
      {
        method: "POST",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.json())
      .then(text => {
        resolve(text.url);
      })
      .catch(err =>
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada masalah sssSssstt..."
        )
      );
  });

const functionVerification = (email, token) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/email-verification?email=${email}&token=${token}`,
      {
        method: "POST",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.text())
      .then(text => {
        resolve(text);
      })
      .catch(err =>
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada masalah sssSssstt..."
        )
      );
  });

const functionGetLocation = domain =>
  new Promise((resolve, reject) => {
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/get-location?url=${domain}`,
      {
        method: "POST",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.text())
      .then(text => {
        resolve(text);
      })
      .catch(err =>
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada masalah sssSssstt..."
        )
      );
  });

const genEmail = length =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible =
      "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });

const domain = [];
const domainIntern = ["aminudin.me", "pengangguran.me"];
(async () => {
  if (choice === "y") {
    for (let index = 0; index < LooP; index++) {
      try {
        const timeout = await timeoutPromise(1000);
        const item = await domainIntern[
          (Math.random() * domainIntern.length) | 0
        ];
        const emel = await genEmail(10);
        await delay(10000);
        const register = await functionRegister(emel, item);
        const email = emel + "@" + item;
        // console.log(register.length + register + " " + email);

        await console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Membuat Email..."
        );

        if (register.length === 2) {
          await console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Sukses register dengan email :" +
              " " +
              `${email}`
          );

          const createMail = await functionCreateEmail(emel, item);
          await console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Mengambil Token..."
          );

          await delay(DelaY);

          const message = await functionGetMessages(emel, item);

          if (message === undefined) {
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Gagal Mengambil Token..."
            );
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Cek sendiri dan tunggu dalam beberapa menit/jam kedepan :" +
                " " +
                `https://generator.email/${email}`
            );
            fs.appendFile(
              "result_url.txt",
              `https://generator.email/${email} \n`,
              "utf-8"
            );
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Lokasi Link :" +
                " " +
                `result_url.txt`
            );
            console.log("");
            console.log("");
          } else {
            const getLocation = await functionGetLocation(message);
            const decodeURL = await decodeURIComponent(getLocation);

            const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);

            const resGex = await regex.exec(decodeURL);

            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Proses Verifikasi"
            );
            const veryf = await functionVerification(email, resGex[1]);
            console.log(veryf);
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Veryf Sukses"
            );
            console.log("");
            console.log("");
          }
        } else {
          console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Email Sudah Terdaftar / Tidak Valid"
          );
          console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Message : " +
              " " +
              register
          );
          console.log("");
          console.log("");
        }
      } catch (e) {
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada error, Code error :" +
            " " +
            e
        );
        console.log("");
        console.log("");
      }
    }
  } else {
    const dm = await fs.readFile(file, "utf8");
    const array = await dm
      .toString()
      .replace(/\r\n|\r|\n/g, " ")
      .split(" ");

    const arpush = array.map(ury => {
      if (ury.length !== 0) {
        domain.push(ury);
      }
    });

    for (let index = 0; index < LooP; index++) {
      try {
        const timeout = await timeoutPromise(1000);
        const item = await domain[(Math.random() * domain.length) | 0];
        const emel = await genEmail(10);
        await delay(10000);
        const register = await functionRegister(emel, item);
        const email = emel + "@" + item;

        await console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Membuat Email..."
        );

        if (register.length === 2) {
          await console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Sukses register dengan email :" +
              " " +
              `${email}`
          );

          const createMail = await functionCreateEmail(emel, item);
          await console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Mengambil Token..."
          );

          await delay(DelaY);

          const message = await functionGetMessages(emel, item);

          if (message === undefined) {
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Gagal Mengambil Token..."
            );
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Cek sendiri dan tunggu dalam beberapa menit/jam kedepan :" +
                " " +
                `https://generator.email/${email}`
            );
            fs.appendFile(
              "result_url.txt",
              `https://generator.email/${email} \n`,
              "utf-8"
            );
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Lokasi Link :" +
                " " +
                `result_url.txt`
            );
            console.log("");
            console.log("");
          } else {
            const getLocation = await functionGetLocation(message);
            const decodeURL = await decodeURIComponent(getLocation);

            const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);

            const resGex = await regex.exec(decodeURL);

            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Proses Verifikasi"
            );
            const veryf = await functionVerification(email, resGex[1]);
            console.log(veryf);
            console.log(
              "[" +
                " " +
                moment().format("HH:mm:ss") +
                " " +
                "]" +
                " " +
                "Veryf Sukses"
            );
            console.log("");
            console.log("");
          }
        } else {
          console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Email Sudah Terdaftar / Tidak Valid"
          );
          console.log("");
          console.log("");
        }
      } catch (e) {
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada error, Code error :" +
            " " +
            e
        );
        console.log("");
        console.log("");
      }
    }
  }
})();
