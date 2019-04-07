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
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/register?email=${email}@${domain}&Reff=${Reff}`,
      {
        method: "post",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.text())
      .then(json => {
        resolve(json);
      })
      .catch(err => reject(err));
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
          console.log("");
          console.log("");
        }
      } catch (e) {
        console.log("Ada error mengulangi....");
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
              "]" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "Email Sudah Terdaftar / Tidak Valid"
          );
          console.log("");
          console.log("");
        }
      } catch (e) {
        console.log("Ada error mengulangi....");
        console.log("");
        console.log("");
      }
    }
  }
})();
