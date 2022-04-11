export class CompoundInterestCalculator {
  constructor() {}

  calculate(values) {
    const { capital, rate, time } = values;
    const total = capital * (1 + rate) ** time;
    return total;
  }
}
