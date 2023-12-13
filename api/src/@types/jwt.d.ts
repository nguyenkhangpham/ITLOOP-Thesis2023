interface PayloadDto {
  id: number;
  email: string;
}

interface TokenDto {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}
