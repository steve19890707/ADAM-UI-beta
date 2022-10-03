export const randomMakeId = (length = 0) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
};

export const filterSearch = (data = [], key = '', emptyValue = "") => {
  const update = data.filter((val) => !!~val.toLowerCase().indexOf(key.toLowerCase()));
  const reslut = update.length === 0 ? [emptyValue] : update;
  return reslut
};

export const filterObjSearch = (data = [], key = '', emptyValue = "") => {
  const update = data.filter((val) => !!~val.value.toLowerCase().indexOf(key.toLowerCase()));
  const reslut = update.length === 0 ? [{ value: emptyValue }] : update;
  return reslut
};