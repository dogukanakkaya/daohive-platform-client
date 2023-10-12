'use client'
import Image from 'next/image'
import Button, { Variant } from '@/components/Button'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify'
import LoadingOverlay from '@/components/LoadingOverlay'
import { withLoading } from '@/utils/hof'
import { MetamaskProvider, useFormValidation, useColorScheme } from '@/hooks'
import { CredentialsSchema } from '@/modules/auth'
import ConnectMetamask from '@/components/ConnectMetamask'
import { Database } from '@/supabase.types'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { HCAPTCHA_SITEKEY, NODE_ENV } from '@/config'
import { cookieOptions } from '@/config'

export default function Login() {
  const supabase = createClientComponentClient<Database>({ cookieOptions })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const captcha = useRef<HCaptcha>(null)
  const router = useRouter()
  const colorScheme = useColorScheme()
  const { state: { email, password }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ email: '', password: '' }, CredentialsSchema)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_IN') {
        setLoading(false)
        router.push('/contracts')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  const handleSignUp = withLoading(async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        captchaToken
      }
    })
    captcha.current?.resetCaptcha()

    if (error) toast.error(error.message)
    else if (data.user?.identities?.length === 0) await handleSignIn() // if there is no identites means user already signed up, try to sign in
    else toast.success('Please check your inbox and verify your email address.', { autoClose: false })
  }, setLoading)

  const handleSignIn = withLoading(async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken
      }
    })
    captcha.current?.resetCaptcha()

    if (error) toast.error(error.message)
  }, setLoading)

  return (
    <div className="bg-cover bg-no-repeat bg-[url('/images/light-login.jpg')] dark:bg-[url('/images/dark-login.jpg')]">
      <main className="flex-center h-[calc(100vh-theme('spacing.40'))] flex-col">
        <div className="relative flex-center w-11/12 sm:w-3/5 xl:w-4/12">
          {loading && <LoadingOverlay />}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full">
            <div className="p-5 flex flex-col items-center justify-center">
              <div className="flex h-16 items-center gap-4">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  className="w-[50px] h-12"
                  width={100}
                  height={100}
                  priority
                />
                <h1 className="text-3xl font-semibold">daohive</h1>
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <MetamaskProvider>
                  <ConnectMetamask setLoading={setLoading} captchaToken={captchaToken} />
                </MetamaskProvider>
                <Button onClick={signInWithGoogle} variant={Variant.Tertiary} className="shadow-md flex items-center gap-4 rounded">
                  <Image
                    className="relative"
                    src="/images/google.svg"
                    alt="Sign in with Google"
                    width={32}
                    height={32}
                    priority
                  />
                  Sign in with Google
                </Button>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <label className="form-label"><i className="bi bi-envelope"></i> E-Mail</label>
                <input value={email} onChange={handleChange} onBlur={validateForm} className="form-input" type="email" name="email" placeholder="info@daohive.io" autoFocus autoComplete="email" />
                <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.email}</small>
              </div>
              <div className="mb-4">
                <label className="form-label"><i className="bi bi-key"></i> Password</label>
                <div className="relative">
                  <input value={password} onChange={handleChange} onBlur={validateForm} className="form-input" type={showPassword ? 'text' : 'password'} name="password" placeholder="********" autoComplete="current-password" />
                  <span className="w-20 text-sm flex-center gap-2 absolute z-10 right-0 top-0 block p-2 h-full cursor-pointer rounded-tr-lg rounded-br-lg hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'} <i className={`bi bi-${showPassword ? 'eye-slash' : 'eye'}`}></i></span>
                </div>
                <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.password}</small>
              </div>
              {NODE_ENV !== 'development' && (
                <div className="mb-4 flex justify-end">
                  <HCaptcha theme={colorScheme} ref={captcha} sitekey={HCAPTCHA_SITEKEY} onVerify={token => setCaptchaToken(token)} />
                </div>
              )}
              <div className="flex justify-between items-center">
                <a href="#" className="text-blue-400 hover:text-blue-500">Forgot password?</a>
                <div className="flex items-center gap-2">
                  <Button onClick={handleSignUp} isEnabled={isFormValid} variant={Variant.Secondary}><i className="bi bi-person-add"></i> Sign Up</Button>
                  <Button onClick={handleSignIn} isEnabled={isFormValid}>Sign in <i className="bi bi-box-arrow-in-right"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="flex flex-col md:flex-row items-center justify-evenly md:h-40 p-4 bg-white dark:bg-black shadow-inner text-center lg:text-left">
        <a href="#" target="_blank" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Are you a developer? Check out our docs to get started.
          </p>
        </a>
        <a href="#" target="_blank" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Proposals{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            See the latest proposals made by the people.
          </p>
        </a>
        <a href="#" target="_blank" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Support{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Need help? Contact us and we will get back to you.
          </p>
        </a>
      </div>
    </div>
  )
}
