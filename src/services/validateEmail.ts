export const ValidateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
}