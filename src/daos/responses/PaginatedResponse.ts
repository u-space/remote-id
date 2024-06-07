class PaginatedResponse<T> {
  public data: T[];
  public take: number;
  public skip: number;
  public count: number;

  constructor(data: T[], take: number, skip: number, count: number) {
    this.data = data;
    this.take = take;
    this.skip = skip;
    this.count = count;
  }
}

export default PaginatedResponse;
