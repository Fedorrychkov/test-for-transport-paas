// @flow

type MatchingType = {
  fields: string[],
  types?: Object,
}

type ValuesType = {
  text: string,
  key: string,
  index: number
}

export const valueMatching = ({ fields, types }: MatchingType) => {
  return fields.reduce((acc, curr, i) => {
    const { index, key } = matchTypeByIndex(types, i)
    return [...acc, { text: curr, index: index || '', key: key || '' }]
  }, []);
};

export const getParsedValues = (values: ValuesType[]): Object => {
  const parsedValues = values.reduce((acc, curr, i) => {
    if (curr.key) {
      return [...acc, [curr.key, i]];
    }
    return acc;
  }, []);
  return Object.fromEntries(parsedValues);
}

export const matchTypeByIndex = (types: Object, index: number) => {
  let value;
  let name;
  for (let key in types) {
    if (index === types[key]) {
      value = types[key];
      name = key
    }
  }
  return { index: value, key: name }
};
