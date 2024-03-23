export interface IModalForm {
  id: number | null;
  isOpen: boolean;
  onClose(): void;
}

export interface IModalFormReturned<T> {
  isOpen: boolean;
  onClose(): void;
  onSubmit(form: T): void;
}

export interface IModalSelect {
  isOpen: boolean;
  onClose(): void;
  onOk(select: number | number[]): void;
}