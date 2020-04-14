import Transaction from '../models/Transaction';

interface CreateUserTDO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.reduce('income');
    const outcome = this.reduce('outcome');

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateUserTDO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private reduce(type: string): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((Acumulador, valorAtual) => {
        return Acumulador + valorAtual.value;
      }, 0);
  }
}

export default TransactionsRepository;
