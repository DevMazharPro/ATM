import inquirer from "inquirer";

type userType = {
  name: string;
  pin: number;
  balance: number;
};
let tries: number = 3;

let userData: userType = {
  name: "Mazhar Hussain",
  pin: 1002,
  balance: 50000,
};

while (tries > 0) {
  let login = await inquirer.prompt([
    {
      message: "Enter Your Pin",
      type: "password",
      name: "pin",
    },
  ]);

  if (Number(login.pin) !== userData.pin) {
    console.log(`You have entered incorrect Pin. \n${tries - 1} try left.`);
  } else {
    tries = 0;
    const userD: any = await inquirer.prompt([
      {
        message: "Select an Option",
        type: "list",
        name: "option",
        choices: ["Withdraw", "Fast Cash", "Check Balance"],
      },
      {
        message: "Enter Amount in Multiple of 500 RS",
        type: "number",
        name: "amount",
        when(userD) {
          return userD.option === "Withdraw";
        },
      },
      {
        message: "Enter Amount",
        type: "list",
        name: "amount",
        choices: [500, 1000, 2000, 5000, 10000],
        when(userD) {
          return userD.option === "Fast Cash";
        },
      },
      {
        message: `Your Balance  is ${userData.balance}`,
        name: "Account Balance",
        when(userD) {
          return userD.option === "Check Balance";
        },
      },
    ]);
    if (userD.option === "Withdraw", "Fast Cash") {
      userData.balance = userData.balance - userD.amount;
      console.log(`Your new balance is ${userData.balance}`);
    }
    tries--;
  }
}
