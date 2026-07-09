/** Default number of parallel shards for CI and local sharded runs. */
export const SHARD_TOTAL = Number(process.env.SHARD_TOTAL ?? 5);

export function shardArg(shardIndex: number, shardTotal: number = SHARD_TOTAL): string {
  return `${shardIndex}/${shardTotal}`;
}
