export interface ICrudService<T> {
  getAll(): Promise<T[]>
  getOne(id: string): Promise<T | null>
  update(id: string, item: T): Promise<T>
  create(item: T): Promise<T>
  remove(item: T): void
}
