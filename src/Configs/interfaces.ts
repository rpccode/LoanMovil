interface Customer {
  state: boolean;
    InfoId: number;
    TenantId: string;
    InfoTypeId: number;
    TypeDNI: string;
    DNI: string;
    FirstName: string;
    LastName: string;
    Telefono: string;
    Email: string;
    Position: number;
    AddressID: number | null;
    LoadedFromAPI: boolean;
    loansWithDues?: loanWhitDues[];
  }
  interface Loan {
    LoanId: number;
    TenantId: string;
    UserId: string;
    infoId: number;
    FrequencyId: number;
    Amount: number;
    Dues: number;
    Interest: number;
    Start_date: string;
    StateId: number;
}

interface LoanDetail {
  id: number;
  LoanId: number;
  TenantId: string;
  Dues_num: number;
  Dues_amount: number;
  Total_amount: number;
  Total_interest: number;
  Start_date: string;
  StateId: number;
}

interface LoanDetailResponse {
  ok: boolean;
  dues: LoanDetail[];
}
interface LoanResponse {
  ok: boolean;
  loans: Loan[];
}
interface customerResponse {
  ok: boolean;
  customers: Customer[];
}
  
   interface LoginData {
    email:   string;
    password: string;
}

 interface RegisterData {
    email:   string;
    password: string;
    nombre:   string;
}


 interface LoginResponse {
    ok:true;
    usuario: Usuario;
    token: string;
}

interface Usuario{
  UserId: string;
  TenantId: string;
  infoId?: number;
  UserType: number;
  Email: string;
  Password: string;
  token?: string;
  state: boolean;
}

interface UserInfo {
  InfoId: number;
  TenantId: string;
  InfoTypeId: number;
  TypeDNI: string;
  DNI: string;
  FirstName: string;
  LastName: string;
  AddressID: number | null;
  Telefono: string;
  Email: string;
  Position: number;
  state: boolean;
}

interface UserResponse {
  ok: boolean;
  User: {
      UserId: string;
      TenantId: string;
      infoId: UserInfo;
      UserType: number;
      Email: string;
      Password: string;
      token: string;
      state: boolean;
  };
}


interface loanWhitDues {
  loan: Loan;
  dues: LoanDetail[];
}[]
  export type {
    Customer,
    LoginData,
    Usuario,
    RegisterData,
    LoginResponse,
    UserResponse,
    Loan,
    LoanResponse,
    LoanDetail,
    LoanDetailResponse,
    loanWhitDues,
    customerResponse

  }