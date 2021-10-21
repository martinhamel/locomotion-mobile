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
  avatar?: {
    url: string;
    sizes?: {
      thumbnail?: string;
    };
  };
};

type AppContextType = {
  tokens: Tokens | null;
  setTokens: (token: Tokens | null) => void;
  user: User | null;
  loadingUser: boolean
};
