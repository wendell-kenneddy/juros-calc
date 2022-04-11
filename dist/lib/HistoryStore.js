export class HistoryStore {
  #key = '@juroscalc:history';

  constructor() {}

  getEntries() {
    return JSON.parse(localStorage.getItem(this.#key)) ?? [];
  }

  addEntry(newEntry) {
    const currentData = this.getEntries();

    if (currentData.length === 14) {
      currentData[0] = newEntry;
      localStorage.setItem(this.#key, JSON.stringify(currentData));
      return;
    }

    currentData.unshift(newEntry);
    localStorage.setItem(this.#key, JSON.stringify(currentData));
  }

  removeEntries() {
    localStorage.setItem(this.#key, JSON.stringify([]));
  }
}
