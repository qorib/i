const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const colors = require("./lib/colors");
const moment = require("moment");
const JSON = require("circular-json");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const Reff = readline.question("Masukan Kode Referal : ");
const EmaIl = readline.question("masukan alamat gmail : ");
const DelaY = readline.question("Mau Berapa Lama (millisecond) : ");

console.log("");
console.log("");

const functionRegister = email =>
  new Promise((resolve, reject) => {
    const body = {
      password: "Coegsekali1!",
      monetize: true,
      email: `${email}`,
      referral_id: Reff
    };

    fetch("https://api.bigtoken.com/signup", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        Referer: "https://my.bigtoken.com/signup",
        Origin: "https://my.bigtoken.com",
        "X-Requested-With": "XMLHttpRequest",
        "X-Srax-Big-Api-Version": 2,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text())
      .then(json => resolve(json.length))
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
      const regist = await functionRegister(DotEmail);
      await delay(5000);

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
    }
  });
})();
