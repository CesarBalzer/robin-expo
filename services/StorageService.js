import AsyncStorage from '@react-native-async-storage/async-storage';

// import appConfig from '../app.json';

const name = 'robim';

const PREFIX = `@${name}_`;

const storeData = async (key, value) => {
	try {
		await AsyncStorage.setItem(generateKey(key), String(value));
	} catch (e) {
		console.error(e);
		return false;
	}
};

const getData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(generateKey(key));
		if (value !== null) {
			return value;
		}
		return null;
	} catch (e) {
		console.error(e);
		return false;
	}
};
/**
 *
 * @param {string} key
 * @param {object} value
 * @returns
 */
const storeJson = async (key, value) => {
	try {
		await AsyncStorage.setItem(generateKey(key), JSON.stringify(value));
	} catch (e) {
		console.error(e);
		return false;
	}
};

const getJson = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(generateKey(key));
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.error(e);
		return false;
	}
};

const store = async (key, value) => {
	try {
		await AsyncStorage.setItem(generateKey(key), serialize(value));
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

const get = async (key) => {
	try {
		let raw = await AsyncStorage.getItem(generateKey(key));
		return unserialize(raw);
	} catch (e) {
		console.error(e);
		return null;
	}
};

const getAllKeys = async () => {
	let keys = [];
	try {
		keys = await AsyncStorage.getAllKeys();
		return keys;
	} catch (e) {
		console.error(e);
		return false;
	}
};

const remove = async (key) => {
	try {
		return await AsyncStorage.removeItem(generateKey(key));
	} catch (e) {
		console.error(e);
		return false;
	}
};

const clear = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		// clear error
	}
};

const generateKey = (key) => {
	return `${PREFIX}${key}`;
};

const serialize = (value) => {
	return JSON.stringify(value);
};

const unserialize = (value) => {
	try {
		return JSON.parse(value || (value == 0 && value) || '');
	} catch (e) {
		return '';
	}
};

const StorageService = {
	store,
	get,
	remove,
	clear,
	storeData,
	storeJson,
	getData,
	getJson,
	getAllKeys
};

export default StorageService;
