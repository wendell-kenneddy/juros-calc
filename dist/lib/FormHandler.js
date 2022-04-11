export class FormHandler {
  #form = document.querySelector('main form');

  constructor() {}

  handleSubmit(submitCallback) {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();

      try {
        const values = this.#getInputValues();
        this.#validateValues(values);
        submitCallback(values);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  clearForm() {
    const inputs = this.#form.querySelectorAll('input');
    inputs.forEach((input) => (input.value = ''));
  }

  #getInputValues() {
    const capitalInput = document.getElementById('capital');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const interestTypeInput = document.getElementById('interest-type');

    return {
      capital: Number(capitalInput.value),
      rate: Number(rateInput.value) / 100,
      time: Number(timeInput.value),
      interestType: String(interestTypeInput.value)
    };
  }

  #validateValues(values) {
    const { capital, rate, time } = values;
    if (!capital) throw new Error('Capital Inválido');
    if (!rate) throw new Error('Taxa Inválida');
    if (!time) throw new Error('Tempo Inválido');
  }
}
