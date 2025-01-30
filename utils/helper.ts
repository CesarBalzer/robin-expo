import {Colors} from '@app/constants';
import {parse, isValid, isAfter, isBefore} from 'date-fns';
const STORAGE_KEY = 'customerUserVDC_';

export const fakerAsync = (seconds = 2000, shouldError = false) =>
	new Promise<any[]>((resolve, reject) => {
		setTimeout(() => {
			if (shouldError) {
				reject({code: '1002', error: 'Unauthorized'});
			} else {
				resolve([]);
			}
		}, seconds);
	});

export function decimal(value: number | string, decimals: number = 2): number {
	const v = parseFloat(String(value || 0).replace(/\D+/g, ''));
	let n = isNaN(v) ? 0 : v / 100;
	return Number(n.toFixed(decimals) || 0);
}

export const validateWordCount = (minWords: number, maxWords: number) => {
	return (value: string | undefined) => {
		if (!value) return true;
		const words = value.trim().split(/\s+/);
		const numberOfWords = words.filter(Boolean).length;
		if (numberOfWords < minWords) {
			return `Insira pelo menos ${minWords} palavras`;
		} else if (numberOfWords > maxWords) {
			return `Insira no máximo ${maxWords} palavras`;
		}
		return true;
	};
};

export function formatCurrency(value: number | undefined | null, options?: {digits?: number; prefix?: string}) {
	const formated = Intl.NumberFormat('pt-BR', {
		maximumFractionDigits: options?.digits ?? 2,
		minimumFractionDigits: options?.digits ?? 2
	}).format(value ?? 0);

	return options?.prefix ? options.prefix + formated : formated;
}

export function formatTime(date: Date) {
	return `${date.getMinutes()}:${('0' + date.getSeconds()).slice(-2)}`;
}

export function copyToClipboard(text: string) {
	const textArea = document.createElement('textarea');
	textArea.value = text;
	document.body.prepend(textArea);
	textArea.focus();
	textArea.select();
	try {
		document.execCommand('copy');
	} catch (err) {
		console.error('Unable to copy to clipboard', err);
	}
	document.body.removeChild(textArea);
}

export function maskPhone(value = '') {
	return value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{5})(\d)/, '$1-$2')
		.replace(/(-\d{4})(\d+?)$/, '$1');
}

export function onlyNumbers(value: string) {
	return value.replace(/\D/g, '');
}

export function autoCapitalize(str?: string, option?: 'words' | 'sentences' | 'characters') {
	if (!str) return '';

	switch (option) {
		case 'words':
			return str.replace(/\b\w/g, (char) => char.toUpperCase());
		case 'sentences':
			return str.replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
		case 'characters':
			return str.toUpperCase();
		default:
			return str;
	}
}

export function validateEmail(email?: string) {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email || '');
}

export function validatePhone(value: string) {
	const exp = /^55[1-9]{2}[6789][0-9]{8}$/;
	return exp.test(value);
}

export const truncateFileName = (fileName: string): string => {
	const maxLength: number = 20;
	const extensionRegex: RegExp = /\.(mp4|gif|png|jpg|jpeg|svg)$/i;

	if (fileName.length > maxLength) {
		const match: RegExpMatchArray | null = fileName.match(extensionRegex);
		if (match) {
			const extension: string = match[0];
			const extensionLength: number = extension.length;
			const fileNameWithoutExtensionLength: number = maxLength - extensionLength;
			const firstPart: string = fileName.substring(0, Math.ceil(fileNameWithoutExtensionLength / 2));
			const lastPart: string = fileName.substring(fileName.length - Math.floor(fileNameWithoutExtensionLength / 2));
			return `${firstPart}...${lastPart}${extension}`;
		} else {
			return fileName.substring(0, maxLength) + '...';
		}
	} else {
		return fileName;
	}
};

export const status = [
	{label: 'Pendente', value: 'Pending', color: 'yellow'},
	{label: 'Aprovado', value: 'Approved', color: 'green'},
	{label: 'Reprovado', value: 'Disapproved', color: 'red'}
];

export const statuses = [...status, {label: 'Não revisado', value: 'Unreviewed', color: 'primary'}];

export const statusFilters = [
	{label: 'Todos', value: '', color: 'gray'},
	...status,
	{label: 'Não revisado', value: 'Unreviewed', color: 'purple'}
];

export const getStatusLabel = (value: string) => {
	const filter = statuses.find((status) => status.value.toUpperCase() === value?.toUpperCase());
	return filter ? filter.label : 'Desconhecido';
};

export const getStatusFilterLabel = (value: string) => {
	const filter = statusFilters.find((status) => status.value.toUpperCase() === value?.toUpperCase());
	return filter ? filter.label : 'Desconhecido';
};

export const getStatusColor = (value: string) => {
	const filter = statusFilters.find((status) => status.value.toUpperCase() === value?.toUpperCase());
	return filter ? filter.color : 'primary';
};

export const shortedNameInitials = (text: string) => {
	if (!!text) {
		let [first_name, last_name] = text.split(' ');
		let initials = first_name[0] + last_name[0];
		return initials;
	}
	return;
};

// Validar se a data é depois da data mínima permitida
export const validateIsAfterEarliestDate = (value: string) => {
	const earliestDate = new Date(1900, 0, 1);
	const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
	return !isBefore(parsedDate, earliestDate) || 'Data não pode ser anterior a 01/01/1900';
};

// Validar o formato da data
export const validateDateFormat = (value: string) => {
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	return dateRegex.test(value) || 'Formato de data inválido';
};

// Validar se a data é válida
export const validateIsValidDate = (value: string) => {
	const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
	return isValid(parsedDate) || 'Data inválida';
};

// Validar se a data é menor ou igual a hoje
export const validateIsBeforeOrEqualToday = (value: string) => {
	const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
	return !isAfter(parsedDate, new Date()) || 'Data não pode ser maior que a data de hoje';
};

// Validar o intervalo de datas
export const validateDateRange = (initialDate: string, finalDate: string) => {
	const parsedInitialDate = parse(initialDate, 'yyyy-MM-dd', new Date());
	const parsedFinalDate = parse(finalDate, 'yyyy-MM-dd', new Date());

	if (isAfter(parsedInitialDate, parsedFinalDate)) {
		return 'A data inicial não pode ser maior que a data final';
	}

	if (isBefore(parsedFinalDate, parsedInitialDate)) {
		return 'A data final não pode ser menor que a data inicial';
	}

	return true;
};

export const sortArray = (array: any, field: string, order: string) => {
	return array.sort((a: any, b: any) => {
		if (order === 'asc') {
			return a[field] > b[field] ? 1 : -1;
		} else if (order === 'desc') {
			return a[field] < b[field] ? 1 : -1;
		} else {
			throw new Error('Order must be either "asc" or "desc"');
		}
	});
};

export const greeting = () => {
	const now = new Date().getHours();
	if (now > 18) {
		return 'Boa noite';
	}
	if (now > 12) {
		return 'Boa tarde';
	}
	return 'Bom dia';
};

export const shortedName = (text: string) => {
	if (!!text) {
		let [first_name] = text.split(' ');
		let initials = first_name;
		return initials;
	}
	return;
};

export const setItem = (data: any) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getItem = () => {
	const item = localStorage.getItem(STORAGE_KEY);
	return item ? JSON.parse(item) : null;
};

export const removeItem = () => {
	localStorage.removeItem(STORAGE_KEY);
};

export const formatHash = (first: number, hash: string, last: number): string => {
	if (hash.length < first + last) {
		return hash;
	}

	const firstPart = hash.slice(0, first);
	const lastPart = hash.slice(-last);
	return `${firstPart}.....${lastPart}`;
};

export const capitalizeFirstLetter = (text: string): string => {
	if (!text) return '';
	const lowercasedText = text.toLowerCase();
	return lowercasedText.charAt(0).toUpperCase() + lowercasedText.slice(1);
};

export const passwordStrength = (password: string) => {
	const getStrengthLabel = (value: string) => {
		if (!value) return '';
		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}$/.test(value)) {
			return 'Forte';
		} else if (value.length >= 6) {
			return 'Moderada';
		}
		return 'Fraca';
	};

	const strengthLabel = getStrengthLabel(password);

	const textColor =
		strengthLabel === 'Forte' ? 'text-green-500' : strengthLabel === 'Moderada' ? 'text-yellow-500' : 'text-red-500';

	return {color: textColor, strengthLabel: strengthLabel};
};

type MaskType = 'document' | 'cep' | 'phone';

export function maskValue(val: string, maskType: MaskType, hidden: boolean = false, placeholder: string = '*'): string {
	if (!val) return '';

	switch (maskType) {
		case 'document':
			return maskDocument(val, hidden, placeholder);
		case 'cep':
			return maskCep(val);
		case 'phone':
			return maskPhone(val);
		default:
			return val;
	}
}

export function maskDocument(val: string, hidden: boolean = false, placeholder: string = '*'): string {
	if (val.length === 11) {
		return maskCpf(val, hidden, placeholder);
	} else if (val.length === 14) {
		return maskCnpj(val, hidden, placeholder);
	}
	return val;
}

export function maskCpf(val: string, hidden: boolean = false, placeholder: string = '*'): string {
	if (hidden) {
		val = mask(mask(val, placeholder, -2), placeholder, 0, 3);
	}
	return applyMask(val, '###.###.###-##');
}

export function maskCnpj(val: string, hidden: boolean = false, placeholder: string = '*'): string {
	if (hidden) {
		val = mask(mask(val, placeholder, -2), placeholder, 0, 3);
	}
	return applyMask(val, '##.###.###/####-##');
}

export function maskCep(val: string): string {
	return applyMask(val, '#####-###');
}

export function mask(val: string, placeholder: string, start: number, length: number = 0): string {
	const end = length > 0 ? start + length : val.length;
	const maskPart = placeholder.repeat(Math.max(end - start, 0));
	return val.substring(0, start) + maskPart + val.substring(end);
}

export function applyMask(val: string, pattern: string): string {
	let i = 0;
	return pattern.replace(/#/g, () => val[i++] || '');
}

export const getTextSize = (size: 'small' | 'medium' | 'large'): number => {
	switch (size) {
		case 'small':
			return 12;
		case 'medium':
			return 14;
		case 'large':
			return 18;
		default:
			return 16;
	}
};

export const getButtonHeight = (size: 'small' | 'medium' | 'large'): number => {
	switch (size) {
		case 'small':
			return 32;
		case 'medium':
			return 48;
		case 'large':
			return 64;
		default:
			return 48;
	}
};

export const getContrastColor = (hex: string): string => {
	const hexWithoutHash = hex.replace('#', '');
	const normalizedHex =
		hexWithoutHash.length === 3
			? hexWithoutHash
					.split('')
					.map((char) => char + char)
					.join('')
			: hexWithoutHash;

	const r = parseInt(normalizedHex.substring(0, 2), 16);
	const g = parseInt(normalizedHex.substring(2, 4), 16);
	const b = parseInt(normalizedHex.substring(4, 6), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 130 ? Colors.text : Colors.textContrast;
};

export const helper = {
	decimal,
	validateWordCount,
	formatCurrency,
	formatTime,
	copyToClipboard,
	maskPhone,
	onlyNumbers,
	autoCapitalize,
	validateEmail,
	validatePhone,
	truncateFileName,
	status,
	statuses,
	statusFilters,
	getStatusLabel,
	getStatusFilterLabel,
	getStatusColor,
	shortedNameInitials,
	validateIsAfterEarliestDate,
	validateDateFormat,
	validateIsValidDate,
	validateIsBeforeOrEqualToday,
	validateDateRange,
	sortArray,
	greeting,
	shortedName,
	setItem,
	getItem,
	removeItem,
	formatHash,
	capitalizeFirstLetter,
	passwordStrength,
	maskValue,
	maskDocument,
	maskCpf,
	maskCnpj,
	maskCep,
	mask,
	applyMask,
	getTextSize,
	getButtonHeight,
	getContrastColor
};
