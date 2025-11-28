import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '..';
import { fetchPatientsRequest } from '@/entities/patient/models/slice/patientsSlice';
import { useEffect } from 'react';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useInitializeAppData = () => {
  const dispatch = useTypedDispatch();
  const token = useTypedSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchPatientsRequest({ limit: 15, offset: 0 }));
    }
  }, [token]);
};
