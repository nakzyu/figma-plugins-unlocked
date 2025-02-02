export const onChangeWithMinMax = (
  onChange: (...event: any[]) => void,
  min: number,
  max: number
) => {
  return (...args: any[]) => {
    const event = args[0];

    const value = Number(event.target.value);

    if (isNaN(value)) {
      return;
    }

    if (value < min || value > max) {
      return;
    }

    onChange(...args);
  };
};
