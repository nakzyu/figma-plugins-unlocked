export const onChangeWithMinMax = (
  onChange: (...event: any[]) => void,
  min: number,
  max: number
) => {
  return (...args: any[]) => {
    // 일반적으로 첫 번째 인자가 event 객체라고 가정합니다.
    const event = args[0];
    // event.target.value가 문자열일 수 있으므로 숫자로 변환합니다.
    const value = Number(event.target.value);

    // 값이 NaN인 경우에도 그냥 리턴하거나, 원래 함수 호출 여부를 결정할 수 있습니다.
    if (isNaN(value)) {
      return;
    }

    // min보다 작거나 max보다 크면 원래 onChange를 호출하지 않습니다.
    if (value < min || value > max) {
      return;
    }

    // 범위 내의 값일 경우 원래의 onChange를 호출합니다.
    onChange(...args);
  };
};
