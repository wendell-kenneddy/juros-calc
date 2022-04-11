import { SimpleInterestCalculator } from './SimpleInterestCalculator.js';
import { CompoundInterestCalculator } from './CompoundInterest.js';
import { FormHandler } from './FormHandler.js';
import { HistoryStore } from './HistoryStore.js';

const USER_FRIENDLY_INTEREST_TYPES = {
  simple: 'Simples',
  compound: 'Composto'
};

export class App {
  #simpleInterestCalculator = new SimpleInterestCalculator();
  #compoundInterestCalculator = new CompoundInterestCalculator();
  #formHandler = new FormHandler();
  #totalDisplay = document.getElementById('total');
  #historyContainer = document.getElementById('history');
  #historyStore = new HistoryStore();

  constructor() {}

  init() {
    this.#handleForm();
    this.#showHistoryOnScreen();
    this.#handleClearHistoryButton();
  }

  #handleForm() {
    this.#formHandler.handleSubmit((values) => {
      const total = this.#calculateTotal(values);
      this.#showTotalOnScreen(total);
      this.#updateHistory(total, values);
      this.#showHistoryOnScreen();
      this.#formHandler.clearForm();
    });
  }

  #showHistoryOnScreen() {
    this.#historyContainer.innerHTML = '';
    const entries = this.#historyStore.getEntries();
    entries.forEach((entry) => {
      const li = document.createElement('li');
      li.innerText = entry;
      this.#historyContainer.appendChild(li);
    });
  }

  #handleClearHistoryButton() {
    const clearHistoryButton = document.getElementById('clear-history');
    clearHistoryButton.addEventListener('click', () => {
      this.#historyStore.removeEntries();
      this.#historyContainer.innerHTML = '';
    });
  }

  #updateHistory(total, values) {
    const newEntry = this.#buildNewHistoryEntry(total, values);
    this.#historyStore.addEntry(newEntry);
  }

  #showTotalOnScreen(total) {
    this.#totalDisplay.innerText = `Montante: ${total}`;
  }

  #calculateTotal(values) {
    const { capital, rate, time, interestType } = values;
    const total =
      interestType === 'simple'
        ? this.#simpleInterestCalculator.calculate({ capital, rate, time })
        : this.#compoundInterestCalculator.calculate({ capital, rate, time });
    return this.#formatCurrency(total);
  }

  #formatCurrency(value) {
    const formatter = new Intl.NumberFormat('pt-br', {
      currency: 'BRL',
      style: 'currency'
    });
    return formatter.format(value);
  }

  #buildNewHistoryEntry(total, values) {
    const { capital, rate, time, interestType } = values;
    const newEntry = `${total} - Capital: ${capital}, Taxa: ${
      rate * 100
    }%/mês, Tempo: ${time} meses, Tipo: ${
      USER_FRIENDLY_INTEREST_TYPES[interestType]
    }`;
    return newEntry;
  }
}
