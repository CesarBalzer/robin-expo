function validateLicensePlate(plate: string) {
  const oldPattern = /^[A-Z]{3}\d{4}$/i; // (AAA1234)
  const newPattern = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i; // (AAA1A23)

  return oldPattern.test(plate) || newPattern.test(plate);
}