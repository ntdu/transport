type fetchingErrorType = null | undefined | string
// type fetchingErrorType = null | string

export type AuthState = {
    fetchingSignInRequest: boolean
    errorSignIn: fetchingErrorType

    fetchingSignUpRequest: boolean
    errorSignUp: fetchingErrorType

    otpToken: string
    token: string

    fetchingVerifyRequest: boolean
    errorVerify: fetchingErrorType

    fetchingRefreshToken: boolean
    errorRefreshToken: fetchingErrorType

    accessToken: string
    refreshToken: string
}

export interface RootState {
    auth: AuthState
}