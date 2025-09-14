export const saveAuthData = (token: string, tokenType: string, user: any) => {
  localStorage.setItem('token', token);
  localStorage.setItem('token_type', tokenType);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('token_type');
  localStorage.removeItem('user');
};
