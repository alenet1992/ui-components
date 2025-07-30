export const validatePostalCode = (value: string): string | null => {
  if (!value) { 
    return 'Postleitzahl ist erforderlich';
  }
 
  const postalCodeRegex = /^\d{5}$/;
  if (!postalCodeRegex.test(value)) {
    return 'Postleitzahl muss 5-stellig sein';
  }
  return null;
};

export const validateDoorNumber = (value: string): string | null => {
  if (!value) {
    return 'Türnummer ist erforderlich';
  }

  const doorNumberRegex = /^[0-9]+[a-zA-Z]?(-[0-9]+[a-zA-Z]?)?$/;
  if (!doorNumberRegex.test(value.trim())) {
    return 'Ungültiges Türnummernformat';
  }
  return null;
};

export const validateEmail = (value: string): string | null => {
  if (!value) {
    return 'E-Mail ist erforderlich';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Ungültige E-Mail';
  }
  return null;
};

export const validateStadt = (value: string): string | null => {
  if (!value) {
    return 'Stadt ist erforderlich';
  }
  const stadtRegex = /^[a-zA-ZäöüÄÖÜß\s\-']+$/;
  if (!stadtRegex.test(value.trim())) {
    return 'Ungültiger Stadtname';
  }
  if (value.trim().length < 2) {
    return 'Der Name der Stadt muss aus mindestens 2 Zeichen bestehen';
  }
  return null;
};

export const validateText = (value: string): string | null => {
  if (!value || value.trim() === '') {
    return 'Dieses Feld ist erforderlich';
  }
  return null;
};

export type GermanValidationType = 'postal_code' | 'door_number' | 'email' | 'stadt' | 'text' | 'none'

export const validateByType = (value: string, validationType: GermanValidationType): string | null => {
  switch (validationType) {
    case 'postal_code':
      return validatePostalCode(value);
    case 'door_number':
      return validateDoorNumber(value);
    case 'email':
      return validateEmail(value);
    case 'stadt':
      return validateStadt(value);
    case 'text':
      return validateText(value);
    case 'none':
    default:
      return null;
  }
};