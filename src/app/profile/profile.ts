export class InfoData {
  constructor(
    public aboutMeData: any,
    public performanceData: string[]) {}
}

export class PerformanceData {
  constructor(
    public performanceData: string[]) {}
}

export class StatisticsData {
  constructor(
    public worldRankData: string[],
    public bestPerformancesData: string[],
    public otherData: string[]) {}
}
