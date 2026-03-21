export interface ValidationError {
  Path: string;
  Message: string;
}

export interface ValidationResponse {
  Errors: ValidationError[];
}
