import { validateSync, ValidationError } from 'class-validator'

export abstract class Validatable<A> {
  constructor(obj: Partial<A>) {
    Object.assign(this, obj)
  }

  isValid(): boolean {
    const errors = this.errors()
    return !errors || errors.length === 0
  }

  validate(): void {
    const errors = this.errors()
    if (errors && errors.length > 0) {
      throw errors
    }
  }

  errors(): ValidationError[] {
    return validateSync(this)
  }
}
