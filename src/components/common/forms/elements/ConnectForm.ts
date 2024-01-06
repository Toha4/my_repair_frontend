// Минус в использовании FormProvider и useFormContext в том что каждый компонент будет производить ре-рендер при
// обновлении состояния формы. Например если при изменении один элемент получает errors.message то будет ре-рендер 
// всех элементов формы. Тут https://react-hook-form.com/ru/advanced-usage/ есть описание оптимизации с помощью Memo,
// но мне не удалось заставить это нормально работать (в колбэке обновления errors.message не изменяется). 


import { useFormContext } from "react-hook-form";

interface IConnectForm {
  children(params: any): any;
}

const ConnectForm: React.FC<IConnectForm> = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

export default ConnectForm;