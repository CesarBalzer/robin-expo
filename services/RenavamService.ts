export class RenavamService {
	// Main function to validate RENAVAM
	public static validateRenavam(renavam: string | number): boolean {
		if (!renavam) return false;

		const renavamString = renavam.toString();
		const normalizedRenavam = this.normalizeRenavamLength(renavamString);

		if (!this.hasValidLength(normalizedRenavam)) return false;

		const renavamWithoutCheckDigit = this.removeCheckDigit(normalizedRenavam);
		const realCheckDigit = this.extractCheckDigit(renavamString);

		const calculatedCheckDigit = this.calculateCheckDigit(renavamWithoutCheckDigit);

		return realCheckDigit === calculatedCheckDigit;
	}

	// Normalize old RENAVAM numbers (9 digits) to 11 digits
	private static normalizeRenavamLength(renavam: string): string {
		return renavam.match('^([0-9]{9})$') ? `00${renavam}` : renavam;
	}

	// Check if RENAVAM has the correct length (11 digits)
	private static hasValidLength(renavam: string): boolean {
		return renavam.length === 11;
	}

	// Remove the last digit (check digit) from RENAVAM
	private static removeCheckDigit(renavam: string): string {
		return renavam.substring(0, 10);
	}

	// Extract the real check digit from the RENAVAM string
	private static extractCheckDigit(renavam: string): number {
		return Number(renavam.charAt(renavam.length - 1));
	}

	// Calculate the check digit using the RENAVAM without the last digit
	private static calculateCheckDigit(renavamWithoutCheckDigit: string): number {
		const reversedRenavam = renavamWithoutCheckDigit.split('').reverse().join('');

		let sum = 0;

		for (let i = 0; i < 8; i++) {
			const digit = Number(reversedRenavam[i]);
			const multiplier = i + 2;
			sum += digit * multiplier;
		}

		sum += Number(reversedRenavam.charAt(8)) * 2;
		sum += Number(reversedRenavam.charAt(9)) * 3;

		const mod11 = sum % 11;
		let checkDigit = 11 - mod11;

		return checkDigit >= 10 ? 0 : checkDigit;
	}

	// Generate a valid RENAVAM number
	public static generateValidRenavam(): string {
		const renavamWithoutCheckDigit = this.generateRandomDigits(10);
		const checkDigit = this.calculateCheckDigit(renavamWithoutCheckDigit);

		return renavamWithoutCheckDigit + checkDigit;
	}

	// Generate random digits for the RENAVAM
	private static generateRandomDigits(length: number): string {
		let digits = '';
		for (let i = 0; i < length; i++) {
			digits += Math.floor(Math.random() * 10);
		}
		return digits;
	}
}

// Example of usage:
// Generate a valid RENAVAM
const newRenavam = RenavamService.generateValidRenavam();
console.log(`Generated RENAVAM: ${newRenavam}`);

// Validate the generated RENAVAM
const isValidRenavam = RenavamService.validateRenavam(newRenavam);
console.log(`Is the generated RENAVAM valid? ${isValidRenavam}`);
