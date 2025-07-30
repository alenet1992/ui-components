export interface IFormField {
  id: string
  isValid: boolean
  error: string | null
  validate: () => boolean
}