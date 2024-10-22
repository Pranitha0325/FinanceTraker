const Transaction = require("../models/transaction");

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, user: req.user.id });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transactions (with pagination)
exports.getTransactions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!transaction)
      return res.status(404).json({ error: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    res.status(404).json({ error: "Transaction not found" });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(404).json({ error: "Transaction not found" });
  }
};

// Get transaction summary
exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        acc.balance = acc.totalIncome - acc.totalExpense;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0 }
    );
    res.json(summary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
