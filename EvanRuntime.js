const Web3 = require('web3');
const { Ipfs, createDefaultRuntime } = require('@evan.network/api-blockchain-core');

class EvanRuntime {
  static async initializeRuntime(accountId, privateKey, password) {
    const runtimeConfig = {
      accountMap: {
        [accountId]: privateKey
      },

      keyConfig: {
        [accountId]: password,
      },

      ipfs: {host: 'ipfs.test.evan.network', port: '443', protocol: 'https'},

      web3Provider: 'wss://testcore.evan.network/ws',
    };

    // initialize dependencies
    const provider = new Web3.providers.WebsocketProvider(
      runtimeConfig.web3Provider,
      { clientConfig: { keepalive: true, keepaliveInterval: 5000 } }
    );

    const web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });

    const dfs = new Ipfs({ dfsConfig: runtimeConfig.ipfs });

    // create runtime
    const runtime = await createDefaultRuntime(
      web3,
      dfs,
      { accountMap: runtimeConfig.accountMap, keyConfig: runtimeConfig.keyConfig }
    );

    return runtime;
  }
}

module.exports = EvanRuntime;
