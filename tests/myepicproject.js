const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("Start testing stuff...");

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;
  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startStuff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("You transaction signature is: ", tx);

  // fetch data from the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF Count", account.totalGifs.toString());

  await program.rpc.addGif(
    "https://media.giphy.com/media/tEcIyVc6ukQV2eb86t/giphy.gif",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  // Get the account again to see what changed
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF Count:", account.totalGifs.toString());

  // access the gif_list on the account
  console.log("GIF List:", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
