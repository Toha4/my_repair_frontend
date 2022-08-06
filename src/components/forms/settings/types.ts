interface IModalForm {
  id: number | null;
  isOpen: boolean;
  onClose(): void;
  onUpdateTable(): void;
}