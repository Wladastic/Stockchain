const EvanRuntime = require('./EvanRuntime');

const odcAccountId = '0x7712c757D1B7c6534ed64E61f26a810Fe9A17229';
const odcPassword = '3jg0q9GAASG120is0insgh';
const odcPrivateKey = 'a672919cd7316ae2e7db9b8fd98a5a336161452220104ba477a9a724f5d608f1';
const warehouseAccountId = '0xdD2F6492Fada366E898d3c9Eb56f7aF308FC0B52';
const customerAccountId = '0xFe74137330AAdB9995e6bbBb5373D84bED32f73A';
const endCustomerAccountId = '0xb9BBD0DB5B5F318FB5FbB30683200C7585F11Da2';
let contract;
const contractAddress = '0x6991bA71C0850aEB7503cB61eE813506f69c1996';

async function inviteUserToContract(runtime, userAccountId) {
  runtime.dataContract.inviteToContract(
    null,
    contractAddress,
    odcAccountId,
    userAccountId
  );

  const key = await runtime.sharing.getKey(contractAddress, odcAccountId, '*');
  await runtime.sharing.addSharing(contractAddress, odcAccountId, userAccountId, '*', 0, key);
}

async function grantModifyPermission(runtime, accountId, memberRole) {
  await runtime.rightsAndRoles.addAccountToRole(
    contractAddress,
    odcAccountId,
    accountId,
    memberRole,
  );

  const Entry = '0x84f3db82fb6cd291ed32c6f64f7f5eda656bda516d17c6bc146631a1f05a1833';
  const SetPermisstion = '0xd2f67e6aeaad1ab7487a680eb9d3363a597afa7a3de33fa9bf3ae6edcb88435d';

  await runtime.rightsAndRoles.setOperationPermission(
    contractAddress,
    odcAccountId,
    memberRole,
    'state',
    Entry,
    SetPermisstion,
    true,
  );
}

async function initDataContract() {
  const runtime = await EvanRuntime.initializeRuntime(
    odcAccountId,
    odcPrivateKey,
    odcPassword
  );

  await inviteUserToContract(runtime, warehouseAccountId);
  await inviteUserToContract(runtime, customerAccountId);
  await inviteUserToContract(runtime, endCustomerAccountId);

  await grantModifyPermission(runtime, odcAccountId, 0);
  await grantModifyPermission(runtime, warehouseAccountId, 1);
  await grantModifyPermission(runtime, customerAccountId, 2);

  console.log('Done');
}

async function createNewDataContract() {
  const runtime = await EvanRuntime.initializeRuntime(
    odcAccountId,
    odcPrivateKey,
    odcPassword
  );

  contract = await runtime.dataContract.create('testdatacontract', odcAccountId);

  // To get contract address
  console.dir(contract);
}

// Run this function first to get contract address in the console log
// then set it to contractAddress variable in this file and TransactionHelper.js file
// createNewDataContract();

// Then run this function to grant permission to users
initDataContract();
