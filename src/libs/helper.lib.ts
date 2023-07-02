export const isDefined = <T>(argument: T | null | undefined): argument is T => argument !== null && argument !== undefined;

export const getUniqueArray = <T>(arr: T[]) => [...new Set(arr)];

export const getUnix = (targetDate?: Date | string) => {
  const time = (targetDate ? new Date(targetDate) : new Date()).getTime();
  return parseInt((time / 1000).toString(), 10);
};

export const getQueue = <T>(arr: T[], limiter: number) => {
  const queues = [];
  const lArr = arr.length;

  let targetIndex = 0;
  const numberIterations = Math.ceil(lArr / limiter);

  for (let i = 0; i < numberIterations; i += 1) {
    const newQueue = [];

    let conditionValue = limiter;

    if (i === (numberIterations - 1)) {
      conditionValue = lArr - targetIndex;
    }

    for (let j = 0; j < conditionValue; j += 1) {
      newQueue.push(arr[targetIndex]);
      targetIndex += 1;
    }

    queues.push(newQueue);
  }

  return queues;
};
