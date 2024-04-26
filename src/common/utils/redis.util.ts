import * as process from 'process';

export function getRedisDesignationKey(id: number) {
  return 'designation:' + id;
}

export function getPatternKey(){
  return process.env.REDIS_KEY_PREFIX+"*"
}

