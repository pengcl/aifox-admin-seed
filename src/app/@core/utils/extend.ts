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

export const getPages = (page, count) => {
  console.log(page, count);
  const currentPage = (page._start / page._limit) + 1;
  const firstPage = currentPage === 1 ? '' : 1;
  let lastPage: any = Math.floor((count / page._limit) - 0.1) + 1;
  lastPage = lastPage === currentPage ? '' : lastPage;
  const prevPage = currentPage <= 2 ? '' : (currentPage - 1 === firstPage ? '' : currentPage - 1);
  const nextPage = currentPage >= lastPage - 1 ? '' : (currentPage + 1 === lastPage ? '' : currentPage + 1);
  let pages = [firstPage, prevPage, currentPage, nextPage, lastPage];
  pages = pages.filter(item => item);
  return pages;
};
