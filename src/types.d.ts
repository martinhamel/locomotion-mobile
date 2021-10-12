type Tokens = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

type User = {
  id: number;
  name?: string;
  last_name?: string;
  description?: string;
  date_of_birth?: Date;
  address?: string;
  phone?: string;
  other_phone?: string;
  role?: string;
};

type AppContextType = {
    tokens: Tokens | undefined,
    setTokens: (Tokens) => void
}