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
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/register?email=${email}&Reff=${Reff}`,
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
  array.map(async DotEmail => {
    await delay(DelaY);

    if (DotEmail.length !== 0 && DotEmail.length > 11) {
      try {
        const regist = await functionRegister(DotEmail);
        await delay(5000);
        if (regist.length > 5) {
          console.log(regist);
        }

        if (regist > 10) {
          console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "EMAIL SUDAH TERDAFTAR :" +
              " " +
              DotEmail
          );
        } else {
          console.log(
            colors.FgGreen,
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "BERHASIL REGIST :" +
              " " +
              DotEmail,
            colors.Reset
          );
        }
      } catch (e) {
        console.log(
          colors.FgGreen,
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "ADA MASALAH... Mengulangi :" +
            " "
        );
      }
    }
  });
})();
