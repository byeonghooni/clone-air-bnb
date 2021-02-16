import { useDispatch } from 'react-redux';
import { useSelector as useReduxSelector } from '../store';
import { commonActions } from '../store/common';

export default () => {
  const dispatch = useDispatch();
  const validateMode = useReduxSelector((state) => state.common.validateMode);

  const setValidateMode = (value: boolean) => {
    dispatch(commonActions.setValidateMode(value));
  };

  return { validateMode, setValidateMode };
};
