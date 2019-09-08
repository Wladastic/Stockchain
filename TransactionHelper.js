const EvantRuntime = require('./EvanRuntime');

const contractAddress = '0xA636948088D1abB10cD1bc065759FCE1530757A1';

class TransactionHelper {
  static async getContractEntry(accountId, privateKey, password, entryName) {
    const runtime = await EvantRuntime.initializeRuntime(
      accountId,
      privateKey,
      password
    );

    const result = await runtime.dataContract.getEntry(
      contractAddress,
      entryName,
      accountId
    );

    return result;
  }

  static async getContractState(accountId, privateKey, password) {
    return await TransactionHelper.getContractEntry(
      accountId,
      privateKey,
      password,
      'state'
    );
  }

  static async setContractEntry(accountId, privateKey, password, newValue, entryName) {
    const runtime = await EvantRuntime.initializeRuntime(
      accountId,
      privateKey,
      password
    );

    const contract = await runtime.contractLoader.loadContract(
      'DataContract',
      contractAddress
    );

    await runtime.dataContract.setEntry(
      contract,
      entryName,
      newValue,
      accountId
    );
  }

  static async setContractQuantityAndReason(
    accountId,
    privateKey,
    password,
    newQuantity,
    newReason
  ) {
    const newState = {
      quantity: newQuantity,
      reason: newReason
    };

    await TransactionHelper.setContractEntry(
      accountId,
      privateKey,
      password,
      newState,
      'state'
    );
  }
}

module.exports = TransactionHelper;
