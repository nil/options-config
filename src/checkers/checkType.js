import getType from '../helpers/getType';
import PrintError from '../helpers/printError';

export default function (key, val, type) {
  const valType = getType(val);

  if (type && !type.includes(valType)) {
    const typeList = getType(type) === 'array' && type.length > 1 ? `${type.slice(0, -1).join(', ')} or ${type.slice(-1)}` : `${type}`;

    throw new PrintError(`'${val}', ${valType}, is not a valid data type for '${key}' (${typeList}).`);
  }

  return false;
}
