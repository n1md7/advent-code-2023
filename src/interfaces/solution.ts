export interface Solution<R = unknown> {
  solve(input: string): R;
}
