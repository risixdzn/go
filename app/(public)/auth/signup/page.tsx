import { RegisterForm } from "@/components/register-form";
import { env } from "@/lib/env";

export default function SignUpPage() {
    const signUpMode = env.SIGNUP_MODE;

    return <RegisterForm signUpMode={signUpMode} />;
}
