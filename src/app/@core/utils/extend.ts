declare interface Key {
  name: string;
  code: string;
}

export const listToTable = (items, keys: Key[], parent?) => {
  const is = [];
  items.forEach(item => {
    is.push({
      id: item.id,
      parentId: parent ? (item[parent] ? item[parent].id : 0) : 0,
      value: (() => {
        const value = {};
        keys.forEach(keyItem => {
          value[keyItem.name] = item[keyItem.code];
        });
        return value;
      })(),
      children: [],
      isExpanded: false,
      isVisible: true,
    });
  });
  return is;
};

export const hump = (key) => {
  return key.replace(/\-(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
};

export function formData(body: object): FormData {
  const _formData: FormData = new FormData();
  for (const kn in body) {
    if (body) {
      _formData.append(kn, body[kn] === undefined ? '' : body[kn]);
    }
  }
  return _formData;
}
