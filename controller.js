const TransactionHelper = require('./TransactionHelper');

class Controller {
  static async getCurrentState(req, res) {
    try {
      const {
        accountId,
        privateKey,
        password
      } = req.query;

      const state = await TransactionHelper.getContractState(
        accountId,
        privateKey,
        password
      );

      res.send({
        success: true,
        currentQuantity: state.quantity,
        lastUpdateReason : state.reason
      });
    } catch (e) {
      res.send({
        success: false,
        message: e.message
      });
    }
  }

  static async submitNewQuantityAndReason(req, res) {
    try {
      const {
        accountId,
        privateKey,
        password,
        quantity,
        reason
      } = req.query;

      await TransactionHelper.setContractQuantityAndReason(
        accountId,
        privateKey,
        password,
        quantity,
        reason
      );

      res.send({
        success: true,
        message: 'New quantity and reason have been updated'
      });
    } catch (e) {
      res.send({
        success: false,
        message: e.message
      });
    }
  }
}

module.exports = Controller;
