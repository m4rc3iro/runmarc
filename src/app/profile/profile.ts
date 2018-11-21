export class Profile {
  public performance: Performance;
  public statistics: Statistics;

  constructor () {
    this.performance = new Performance();
    this.statistics = new Statistics();
  }
}

export class Performance {
  public overall: string[];
  public detailed: string[];
  public best: string[];

  constructor () {}
}

export class Statistics {
  public worldRank: string[];
  public other: any;

  constructor () {}
}
